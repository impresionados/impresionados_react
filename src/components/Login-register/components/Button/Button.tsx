import React from 'react';
import styles from './Button.module.css';

// Propiedades del botón
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Contenido dentro del botón
}

// Componente reutilizable para botones
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
