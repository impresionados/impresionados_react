import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';

// Propiedades que acepta el componente Link
interface LinkProps {
  href: string; // URL destino del enlace
  children: React.ReactNode; // Contenido dentro del enlace
  isExternal?: boolean; // Indica si el enlace es externo
}

// Componente reutilizable para enlaces internos y externos
const Link: React.FC<LinkProps> = ({ href, children, isExternal }) => {
  if (isExternal) {
    return (
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} className={styles.link}>
      {children}
    </RouterLink>
  );
};

export default Link;
