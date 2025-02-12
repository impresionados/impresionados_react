import React from 'react';
import './ProductPrice.css';

// Propiedades del componente de precio
interface ProductPriceProps {
  price: number;
}

// Renderiza el precio con formato de moneda
export const ProductPrice: React.FC<ProductPriceProps> = ({ price }) => {
  return <span className="product-price">{price.toFixed(2)}€</span>;
};
