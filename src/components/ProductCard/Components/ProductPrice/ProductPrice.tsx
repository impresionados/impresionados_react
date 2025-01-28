import React from 'react';
import './ProductPrice.css';

interface ProductPriceProps {
  price: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price }) => {
  return <span className="product-price">${price.toFixed(2)}</span>;
};
