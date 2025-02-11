import React, { useState, useEffect, useMemo } from "react";
import { ProductsList } from "../../components/ProductList/ProductList";
import { Footer } from "../../components/Footer/Footer";
import "./Home.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  super_tipo: string;
  ratings: Array<{
    user: string;
    score: number;
    comment: string;
  }>;
}

interface HomeProps {
  searchQuery: string;
}

export const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery); // Nuevo estado con delay

  const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedData = localStorage.getItem("products");
        const storedTimestamp = localStorage.getItem("products_timestamp");

        if (storedData && storedTimestamp && Date.now() - parseInt(storedTimestamp) < CACHE_EXPIRATION) {
          console.log("✅ Usando productos desde localStorage");
          const parsedProducts = JSON.parse(storedData);
          if (Array.isArray(parsedProducts)) {
            setProducts(parsedProducts);
          } else {
            console.warn("⚠️ Datos inválidos en localStorage, haciendo fetch de API...");
            throw new Error("Datos en localStorage no son válidos");
          }
        } else {
          console.log("🔄 Fetching productos desde API...");
          const response = await fetch("http://192.168.1.133:8001/products/");
          if (!response.ok) throw new Error("Error al obtener los productos de la API");

          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
            localStorage.setItem("products", JSON.stringify(data));
            localStorage.setItem("products_timestamp", Date.now().toString());
          } else {
            throw new Error("La respuesta de la API no es una lista de productos válida");
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("❌ Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Delay de 1 segundo antes de actualizar `debouncedSearchQuery`
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // ⏳ Espera 1 segundo antes de actualizar

    return () => clearTimeout(handler); // 🔄 Limpia el timeout si el usuario sigue escribiendo
  }, [searchQuery]);

  // 🔹 Función para convertir Blob a Base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  // 🔹 Obtener imágenes solo si no están en `localStorage`
  useEffect(() => {
    const fetchImages = async () => {
      const images: { [key: string]: string } = {};

      await Promise.all(
        products.map(async (product) => {
          const storedImage = localStorage.getItem(`product_image_${product.id}`);

          if (storedImage) {
            images[product.id] = storedImage;
          } else {
            try {
              const response = await fetch(`http://192.168.1.133:8001/products/${product.id}/image`);
              if (!response.ok) throw new Error(`No se pudo cargar la imagen para ${product.id}`);
              const blob = await response.blob();
              const base64Image = await blobToBase64(blob);
              images[product.id] = base64Image;

              // Guardar la imagen en `localStorage`
              localStorage.setItem(`product_image_${product.id}`, base64Image);
            } catch (err) {
              console.error(`⚠️ Error al obtener imagen del producto ${product.id}:`, err);
            }
          }
        })
      );

      setProductImages(images);
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

  // 🔹 Aplicar filtrado con `debouncedSearchQuery`
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    return filtered.map((product) => ({
      ...product,
      image: productImages[product.id] || "",
    }));
  }, [products, productImages, debouncedSearchQuery]);

  // 🔹 Manejo de errores y carga
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <img src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png" alt="Impresionados" />
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">❌ Error: {error}</p>;
  }

  return (
    <div className="home-container">
      <ProductsList products={filteredProducts} />
      <Footer />
    </div>
  );
};
