import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useCartStore } from '../../store/cartStore';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  image: string;
  super_tipo: string;
  ratings: Array<{
    user: string;
    score: number;
    comment: string;
  }>;
}

export const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8001/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally{
        setLoading(false)
      }
    };

    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8001/products/${productId}/image`);
        const blob = await response.blob();
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching product image:', error);
      }
    };

    fetchProduct();
    fetchImage();
  }, [productId]);

  if (!product) {
    return <p className="loading">Cargando producto...</p>;
  }
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"><img src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png" alt="Impresionados" /></div>
        <p>Cargando producto...</p>
      </div>
    );
  }
  
  return (
    <div className="product-detail">
      <h1 className="product-title">{product.name}</h1>
      <div className="product-container">
        <div className="product-image">
          {imageUrl && <img src={imageUrl} alt={product.name} />}
        </div>
        <div className="product-info">
          <div className="details">
            <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
            <p><strong>Categorías:</strong> {product.category.join(', ')}</p>
            <p><strong>Super Tipo:</strong> {product.super_tipo}</p>
            <p><strong>Calificación:</strong> ⭐ </p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="add-to-cart-details"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className="description-container">
        <p className="description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
