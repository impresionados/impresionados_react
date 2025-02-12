import React from 'react';
import styles from './Checkbox.module.css';

// Propiedades del Checkbox
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Texto asociado al checkbox
}

// Componente reutilizable para checkboxes
const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.container}>
      {/* Campo de checkbox */}
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        {...props}
      />
      {/* Etiqueta asociada al checkbox */}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
