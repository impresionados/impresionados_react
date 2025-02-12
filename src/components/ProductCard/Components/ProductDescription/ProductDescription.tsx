import React from 'react';
import './ProductDescription.css';

// Propiedades del componente de descripción
interface ProductDescriptionProps {
  description: string;
}

// Renderiza la descripción del producto
export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return <p className="product-description">{description}</p>;
};
