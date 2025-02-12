import React from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { QuantityControls } from "./QuantityControls";
import './CartItem.css';
import { Link } from 'react-router-dom';

// Interfaz para definir las propiedades de un item en el carrito
interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Componente que representa un producto dentro del carrito
export const CartItem: React.FC<CartItemProps> = ({ id, name, image, price, quantity }) => {
  const { removeItem } = useCartStore(); // Hook para remover un producto del carrito

  return (
    <div className="cart-item">
      {/* Enlace a la página de detalle del producto */}
      <Link to={`/product/${id}`} className="product-action">
        {image && (
          <img src={image} alt={name} className="cart-item-image" />
        )}
      </Link>

      {/* Detalles del producto */}
      <div className="cart-item-details">
        <Link to={`/product/${id}`} className="product-action">
          <h2 className="cart-item-name">{name}</h2>
          <p className="cart-item-quantity">Cantidad: {quantity}</p>
          <p className="cart-item-price">€{(price * quantity).toFixed(2)}</p> {/* Cambio de $ a € */}
        </Link>
      </div>

      {/* Controles de cantidad y botón para eliminar */}
      <div className="cart-item-actions">
        <QuantityControls id={id} quantity={quantity} />
        <button onClick={() => removeItem(id)} className="remove-item-button">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
