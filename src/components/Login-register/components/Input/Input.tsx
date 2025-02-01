import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

const Input: React.FC<InputProps> = ({ label, icon: Icon, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputGroup}>
        <input id={id} className={styles.input} {...props} />
        <Icon className={styles.icon} />
      </div>
    </div>
  );
};

export default Input;