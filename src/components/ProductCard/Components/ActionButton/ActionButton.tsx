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
  className = '',
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`action-button ${className}`}
    >
      {children}
    </button>
  );
};
