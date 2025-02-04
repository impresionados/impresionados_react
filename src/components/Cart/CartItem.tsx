// src/components/Cart/Components/CartItem.tsx
import React from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import {QuantityControls} from "./QuantityControls";
import './CartItem.css';
import { Link } from 'react-router-dom';

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({ id, name, image, price, quantity }) => {
  const { removeItem } = useCartStore();

  return (
    <div className="cart-item">
      <Link to={`/product/${id}`} className="product-action">
      
        {image && (
          <img
            src={image}
            alt={name}
            className="cart-item-image"
          />
        )}
      </Link>

        <div className="cart-item-details">
        <Link to={`/product/${id}`} className="product-action">

          <h2 className="cart-item-name">{name}</h2>
          <p className="cart-item-quantity">Cantidad: {quantity}</p>
          <p className="cart-item-price">${(price * quantity).toFixed(2)}</p>
        </Link>
        </div>
      <div className="cart-item-actions">
        <QuantityControls id={id} quantity={quantity} />
        <button
          onClick={() => removeItem(id)}
          className="remove-item-button"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

