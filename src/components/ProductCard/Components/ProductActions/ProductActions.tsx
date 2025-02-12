import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { ActionButton } from '../ActionButton/ActionButton';
import './ProductActions.css';

// Propiedades del componente de acciones del producto
interface ProductActionsProps {
  context: 'store' | 'cart'; // Contexto: tienda o carrito
  onAction?: () => void; // Acción personalizada
  productId: string; // ID del producto
  stock: number; // Stock disponible
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  context,
  onAction,
  productId,
  stock,
}) => {
  return (
    <div className="product-actions">
      {/* Botón para agregar el producto al carrito */}
      <ActionButton onClick={onAction} className="add-to-cart">
        <ShoppingCart className="icon" />
      </ActionButton>
    </div>
  );
};
