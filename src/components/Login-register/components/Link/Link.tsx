import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

const Link: React.FC<LinkProps> = ({ href, children, isExternal }) => {
  if (isExternal) {
    return (
      <a href={href} className={styles.link}>
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