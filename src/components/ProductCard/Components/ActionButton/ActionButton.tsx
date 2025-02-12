import React from 'react';
import './ActionButton.css';

// Definimos las propiedades del botón de acción
interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode; // Contenido del botón
}

// Componente de botón reutilizable
export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  className = '',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`action-button ${className}`}
    >
      {children} {/* Renderiza el contenido del botón */}
    </button>
  );
};
