import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import styles from './Input.module.css';

// Definimos las propiedades del Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Etiqueta del input
  icon: LucideIcon; // Icono asociado al input
}

// Componente reutilizable para inputs con iconos
const Input: React.FC<InputProps> = ({ label, icon: Icon, id, ...props }) => {
  return (
    <div>
      {/* Etiqueta del input */}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputGroup}>
        {/* Campo de entrada */}
        <input id={id} className={styles.input} {...props} />
        {/* Icono del input */}
        <Icon className={styles.icon} />
      </div>
    </div>
  );
};

export default Input;
