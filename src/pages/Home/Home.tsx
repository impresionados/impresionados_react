import React, { useState, useEffect, useMemo } from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import './Home.css';
import { Footer } from '../../components/Footer/Footer'


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

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos

  // 🔹 Obtener productos desde `localStorage` o API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedData = localStorage.getItem("products");
        const storedTimestamp = localStorage.getItem("products_timestamp");

        if (storedData && storedTimestamp && Date.now() - parseInt(storedTimestamp) < CACHE_EXPIRATION) {
          console.log("✅ Usando productos de `localStorage`");
          setProducts(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        console.log("🔄 Fetching productos desde API...");
        const response = await fetch('http://192.168.1.133:8001/products/');
        const data = await response.json();
        setProducts(data);

        // Guardar en `localStorage`
        localStorage.setItem("products", JSON.stringify(data));
        localStorage.setItem("products_timestamp", Date.now().toString());

      } catch (err) {
        console.error("❌ Error al obtener productos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // 🔹 Filtrado de productos con imágenes asignadas
  const filteredProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      image: productImages[product.id] || "",
    }));
  }, [products, productImages]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"><img src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png" alt="Impresionados" /></div>
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
      <Footer/>

    </div>
  );
};
