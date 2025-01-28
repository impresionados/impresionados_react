import React from 'react';
import './ProductImage.css';

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="product-image" />;
};
