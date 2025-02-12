import React from "react";
import { useCartStore } from "../../store/cartStore";
import './QuantityControls.css';

// Interfaz para definir las propiedades del control de cantidad
interface QuantityControlsProps {
  id: string;
  quantity: number;
}

// Componente para incrementar o disminuir la cantidad de un producto en el carrito
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
      <button onClick={handleDecrease} className="quantity-button">-</button>
      <span className="quantity-display">{quantity}</span>
      <button onClick={handleIncrease} className="quantity-button">+</button>
    </div>
  );
};
