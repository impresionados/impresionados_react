import React from 'react';
import { Product } from '../../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';
import './ProductCart.css';


interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-categories">
          {product.category.map((cat) => (
            <span key={cat} className="product-category">
              {cat}
            </span>
          ))}
        </div>
        <div className="product-info">
          <span className="product-price">${product.price}</span>
          <div className="product-actions">
            <Link
              to={`/product/${product.id}`}
              className="product-action"
            >
              <Eye className="icon" />
            </Link>
            <button
              onClick={() => addItem(product)}
              className="product-action"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="icon" />
            </button>
          </div>
        </div>
        <div className="product-stock">
          <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
