import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        {...props}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;