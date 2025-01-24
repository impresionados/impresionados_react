import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home, Search, Filter } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import './Navbar.css';
import { useState } from 'react';

export const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Contenedor del logo con animación */}
          <Link to="/" className="navbar-logo-container">
            <img
              className="logo-image"
              src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png"
              alt="3D Printing Store"
            />
            <span className="logo-text">Impresionados 3D</span>
          </Link>

          <div className="navbar-links">
            
            {/* Barra de búsqueda dinámica */}
            <div className="search-wrapper">
              <Filter className="icon"/>

              <input
                type="text"
                className="search-bar"
                placeholder="Buscar productos..."
              />
            </div>
            {/* Botón de búsqueda */}
            <div className="navbar-link">
              <Search className="icon" />
              <div className='icon-text'>Buscar</div>
            </div>
            <Link to="/cart" className="navbar-link cart-link">
              <ShoppingCart className="icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
              <div className='icon-text'>Cesta</div>
            </Link>
            <Link to="/profile" className="navbar-link">
              <User className="icon" />
              <div className='icon-text'>Perfil</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
