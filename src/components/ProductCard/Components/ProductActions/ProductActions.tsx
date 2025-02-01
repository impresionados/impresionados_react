import React from 'react';
import { ShoppingCart, Trash, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionButton } from '../ActionButton/ActionButton';
import './ProductActions.css';

interface ProductActionsProps {
  context: 'store' | 'cart'; // Contexto: "store" para tienda, "cart" para carrito
  onAction?: () => void; // Acción personalizada
  productId: string; // ID del producto
  stock: number; // Cantidad de stock del producto
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  context,
  onAction,
  productId,
  stock,
}) => {
  return (
    <div className="product-actions">
      <>
        <ActionButton
          onClick={onAction}
          disabled={stock === 0}
          className="add-to-cart"
        >
          <ShoppingCart className="icon" />
        </ActionButton>
      </>
      
    </div>
  );
};
