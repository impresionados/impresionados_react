// src/components/Cart/Components/QuantityControls.tsx
import React from "react";
import { useCartStore } from "../../store/cartStore";
import './QuantityControls.css';

interface QuantityControlsProps {
  id: string;
  quantity: number;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({ id, quantity }) => {
  const { updateQuantity } = useCartStore();

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="quantity-controls">
      <button
        onClick={handleDecrease}
        className="quantity-button"
      >
        -
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="quantity-button"
      >
        +
      </button>
    </div>
  );
};
