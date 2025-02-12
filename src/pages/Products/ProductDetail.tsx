import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useCartStore } from '../../store/cartStore';

// Definimos la interfaz para la estructura del producto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  image?: string;
  super_tipo: string;
  ratings: Array<{
    user: string;
    score: number;
    comment: string;
  }>;
}

export const ProductDetail: React.FC = () => {
  // Obtenemos el `productId` de los parámetros de la URL
  const { productId } = useParams<{ productId: string }>();

  // Estados del componente
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para almacenar la imagen
  const [loading, setLoading] = useState(true); // Estado de carga
  const addItem = useCartStore((state) => state.addItem); // Hook para agregar al carrito

  // Efecto para cargar los datos del producto desde el caché (localStorage)
  useEffect(() => {
    const loadProductFromCache = () => {
      const cachedProducts = localStorage.getItem("products");

      if (cachedProducts) {
        const allProducts: Product[] = JSON.parse(cachedProducts);
        const foundProduct = allProducts.find((p) => p.id === productId);

        if (foundProduct) {
          console.log(`✅ Producto encontrado en caché: ${productId}`);
          setProduct(foundProduct);
          setLoading(false);
          return;
        }
      }

      console.warn(`⚠️ Producto ${productId} no encontrado en caché. Usando valores por defecto.`);
      setProduct({
        id: productId || `unknown_${Date.now()}`,
        name: "Producto desconocido",
        description: "Sin descripción disponible.",
        price: 0,
        stock: 0,
        category: [],
        super_tipo: "Desconocido",
        ratings: [],
      });
      setLoading(false);
    };

    const loadImageFromCache = () => {
      const cachedImage = localStorage.getItem(`product_image_${productId}`);

      if (cachedImage) {
        console.log(`✅ Imagen encontrada en caché para el producto ${productId}`);
        setImageUrl(cachedImage);
      } else {
        console.warn(`⚠️ Imagen no encontrada en caché para el producto ${productId}`);
      }
    };

    loadProductFromCache();
    loadImageFromCache();
  }, [productId]);

  // Si el estado está en carga, mostramos un spinner
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <img src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png" alt="Impresionados" />
        </div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  // Si no se encuentra el producto en el caché, mostramos un mensaje de error
  if (!product) {
    return <p className="loading">❌ Error: No se encontró el producto en caché.</p>;
  }

  return (
    <div className="product-detail">
      {/* Título del producto */}
      <h1 className="product-title">{product.name}</h1>
      
      <div className="product-container">
        {/* Imagen del producto */}
        <div className="product-image">
          {imageUrl ? <img src={imageUrl} alt={product.name} /> : <p>Imagen no disponible</p>}
        </div>

        {/* Información del producto */}
        <div className="product-info">
          <div className="details">
            <p><strong>Precio:</strong> €{product.price.toFixed(2)}</p> {/* Cambio de $ a € */}
            {product.stock === 0 ? (
              <p><strong>Stock:</strong> En producción...</p>
            ) : (
              <p><strong>Stock:</strong> {product.stock} unidades disponibles.</p>
            )}
            <p><strong>Categorías:</strong> {product.category.join(', ')}</p>
            <p><strong>Super Tipo:</strong> {product.super_tipo}</p>
            <p><strong>Calificación:</strong> ⭐ </p>
          </div>

          {/* Botón para añadir al carrito */}
          <button onClick={() => addItem(product)} className="add-to-cart-details">
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* Descripción del producto */}
      <div className="description-container">
        <p className="description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
