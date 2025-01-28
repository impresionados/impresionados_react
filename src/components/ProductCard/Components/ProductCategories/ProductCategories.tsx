import React from 'react';
import './ProductCategories.css';

interface ProductCategoriesProps {
  categories: string[];
}

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
