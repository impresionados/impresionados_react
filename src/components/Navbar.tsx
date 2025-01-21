import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-12 w-auto"
                src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png"
                alt="3D Printing Store"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-colors"
            >
              <Home className="h-6 w-6" />
            </Link>
            <Link
              to="/cart"
              className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};