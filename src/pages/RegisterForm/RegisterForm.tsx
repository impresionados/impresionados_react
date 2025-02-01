import React from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Crea una cuenta</h2>
        <form className={styles.form}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nombre completo"
            icon={User}
            required
            placeholder="Inserta tu nombre completo"
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Dirección email"
            icon={Mail}
            required
            placeholder="Inserta tu email"
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            icon={Lock}
            required
            placeholder="Crea una contraseña"
          />

          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Confirmar contraseña"
            icon={Lock}
            required
            placeholder="Confirma contraseña"
          />

          <Button type="submit">
            Registrarse
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/profile">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
