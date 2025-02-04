import React from 'react';
import { Building2 } from 'lucide-react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Left side - About Us */}
      <div className={styles.leftSide}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <Building2 size={32} />
            <h1 className={styles.title}>CompanyName</h1>
          </div>
          <h2 className={styles.subtitle}>About Us</h2>
          <p className={styles.description}>
            We are a forward-thinking company dedicated to providing innovative solutions
            for our clients. With years of experience and a passionate team, we strive
            to deliver excellence in everything we do.
          </p>
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Right side - Auth Forms */}
      <div className={styles.rightSide}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;