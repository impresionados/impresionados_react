import React from 'react';
import './ActionButton.css';

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`action-button ${className}`}
    >
      {children}
    </button>
  );
};
