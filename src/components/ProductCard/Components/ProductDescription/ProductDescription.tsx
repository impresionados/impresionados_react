import React from 'react';
import './ProductDescription.css';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return <p className="product-description">{description}</p>;
};
