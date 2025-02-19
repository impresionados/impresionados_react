import React, { useState, useEffect, useMemo } from "react";
import { ProductsList } from "../../components/ProductList/ProductList";
import { Footer } from "../../components/Footer/Footer";
import "./Home.css";
import  {Product} from "../../types/index"


// Propiedades del componente `Home`
interface HomeProps {
  searchQuery: string; // Término de búsqueda ingresado por el usuario
  selectedCategories: { [key: string]: string[] }; // ✅ Agregado para manejar los filtros de categorías
}

export const Home: React.FC<HomeProps> = ({ searchQuery, selectedCategories }) => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState<Product[]>([]);
  // Estado para almacenar imágenes de productos
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  // Estado de carga
  const [loading, setLoading] = useState(true);
  // Estado de error
  const [error, setError] = useState<string | null>(null);
  // Estado para manejar la búsqueda con un pequeño retraso
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const CACHE_EXPIRATION = 10 * 60 * 1000; // Cache por 10 minutos

  // Efecto para obtener la lista de productos desde la API o localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentamos obtener datos desde `localStorage`
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
          // Si no hay datos válidos en cache, hacemos una petición a la API
          console.log("🔄 Fetching productos desde API...");
          const response = await fetch("http://10.102.10.15:8001/products/");
          if (!response.ok) throw new Error("Error al obtener los productos de la API");

          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
            // Guardamos los datos en `localStorage`
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

  // Efecto para manejar el retraso en la actualización de la búsqueda (500ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Función para convertir un Blob en Base64 (para almacenar imágenes en cache)
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  // Efecto para cargar imágenes de productos
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
              // Fetch de la imagen del producto desde la API
              const response = await fetch(`http://10.102.10.15:8001/products/${product.id}/image`);
              if (!response.ok) throw new Error(`No se pudo cargar la imagen para ${product.id}`);
              const blob = await response.blob();
              const base64Image = await blobToBase64(blob);
              images[product.id] = base64Image;

              // Guardamos la imagen en `localStorage`
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

  // Filtrado de productos según la búsqueda del usuario
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
      .filter((product) => {
        // ✅ Validar estructura de tipos
        if (!Array.isArray(product.tipo) || typeof product.supertipo !== "string") return false;
  
        // ✅ Si no hay filtros activos, mostrar todo
        if (Object.keys(selectedCategories).length === 0) return true;
  
        // ✅ Convertir a minúsculas para comparación case-insensitive
        const productSupertype = product.supertipo.toLowerCase();
        const productSubtypes = product.tipo.map(t => t.toLowerCase());
  
        return Object.entries(selectedCategories).some(([supertype, types]) => {
          const supertypeLower = supertype.toLowerCase();
          const typesLower = types.map(t => t.toLowerCase());
  
          // Caso 1: Supertype seleccionado directamente
          if (typesLower.includes('__super_type_selected__')) {
            return productSupertype === supertypeLower;
          }
  
          // Caso 2: Subtipos seleccionados
          return productSupertype === supertypeLower && 
                 typesLower.some(t => productSubtypes.includes(t));
        });
      })
      .map((product) => ({
        ...product,
        image: productImages[product.id] || "",
      }));
  }, [products, productImages, debouncedSearchQuery, selectedCategories]);
    

  // Muestra un mensaje de carga si los productos aún no están disponibles
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

  // Muestra un mensaje de error si hubo un problema al cargar los productos
  if (error) {
    return <p className="error-message">❌ Error: {error}</p>;
  }

  return (
    <div className="home-container">
      {/* Renderiza la lista de productos filtrados */}
      <ProductsList products={filteredProducts} />
      {/* Renderiza el footer de la página */}
      <Footer />
    </div>
  );
};
