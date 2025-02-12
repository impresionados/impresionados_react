import React from 'react';
import './ProductCategories.css';

// Propiedades del componente de categorías del producto
interface ProductCategoriesProps {
  categories: string[];
}

// Renderiza las categorías como etiquetas
export const ProductCategories: React.FC<ProductCategoriesProps> = ({ categories }) => {
  return (
    <div className="product-categories">
      {categories.map((category) => (
        <span key={category} className="product-category">
          {category}
        </span>
      ))}
    </div>
  );
};
