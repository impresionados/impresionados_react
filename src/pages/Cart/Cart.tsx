// src/components/Cart/CartDisplay.tsx
import React from "react";
import { useCartStore } from "../../store/cartStore";
import CartItem from "../../components/Cart/CartItem";
import './Cart.css';

export const CartDisplay: React.FC = () => {
  const { items, total } = useCartStore();

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {items.length > 0 ? (
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-container">
              <CartItem 
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
              />
            </div>
          ))}
          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">El carrito está vacío</p>
      )}
    </div>
  );
};

