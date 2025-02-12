import React, { useState, useEffect, useMemo } from "react";
import { ProductsList } from "../../components/ProductList/ProductList";
import { Footer } from "../../components/Footer/Footer";
import "./Home.css";

/*
📌 Definición de Tipos e Interfaces
- Se define la estructura de un `Product` con todas sus propiedades.
- Se establece la interfaz `HomeProps`, que recibe `searchQuery` como prop.
*/

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

/*
📌 Componente `Home`
- Define los estados para almacenar productos, imágenes, estado de carga y errores.
- También implementa un `debouncedSearchQuery` para evitar búsquedas innecesarias en tiempo real.
*/

export const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const CACHE_EXPIRATION = 10 * 60 * 1000; // ⏳ Definimos el tiempo de expiración del caché en 10 minutos.

  /*
  📌 `useEffect` para Obtener Productos
  - Intenta recuperar los productos desde `localStorage` para evitar llamadas innecesarias a la API.
  - Si los datos en caché no existen o están vencidos, hace una solicitud a la API.
  - Maneja errores y establece el estado de carga y productos correctamente.
  */

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

  /*
  📌 `useEffect` para Aplicar un Delay a la Búsqueda
  - Implementa un debounce de 500ms para evitar filtrar productos en cada pulsación del usuario.
  - Si el usuario sigue escribiendo antes de que se complete el tiempo, reinicia el temporizador.
  */

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  /*
  📌 Función `blobToBase64`
  - Convierte un `Blob` en una cadena Base64, necesaria para almacenar imágenes en `localStorage`.
  */

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  /*
  📌 `useEffect` para Cargar Imágenes de los Productos
  - Verifica si la imagen del producto ya está en `localStorage` y la reutiliza.
  - Si no está almacenada, la obtiene desde la API, la convierte a Base64 y la almacena en `localStorage`.
  */

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

  /*
  📌 Filtrado de Productos con `useMemo`
  - Filtra los productos en base al término de búsqueda (`debouncedSearchQuery`).
  - Agrega la imagen correspondiente a cada producto, obtenida previamente.
  */

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    return filtered.map((product) => ({
      ...product,
      image: productImages[product.id] || "",
    }));
  }, [products, productImages, debouncedSearchQuery]);

  /*
  📌 Manejo de Carga y Errores
  - Si la aplicación está cargando, muestra un spinner de carga.
  - Si hay un error, se muestra un mensaje de error en la UI.
  */

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

  /*
  📌 Renderización Final
  - Se muestra la lista de productos filtrados y el footer.
  */

  return (
    <div className="home-container">
      <ProductsList products={filteredProducts} />
      <Footer />
    </div>
  );
};
