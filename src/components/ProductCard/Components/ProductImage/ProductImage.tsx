import React from 'react';
import './ProductImage.css';

// Propiedades del componente de imagen del producto
interface ProductImageProps {
  src: string;
  alt: string;
}

// Renderiza la imagen del producto
export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className='product-image-container'>
      <img src={src} alt={alt} className="product-image" />
    </div>
  );
};
