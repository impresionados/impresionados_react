import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.category.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <div className="flex space-x-2">
            <Link
              to={`/product/${product._id}`}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <button
              onClick={() => addItem(product)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className={`text-sm ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};