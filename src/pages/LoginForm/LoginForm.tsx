import React from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Checkbox from '../../components/Login-register/components/Checkbox/Checkbox';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Bienvenido de nuevo</h2>
        <form className={styles.form}>
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
            placeholder="Inserta tu contraseña"
          />




            <Link href="#" isExternal> 
              ¿Olvidaste tu contraseña?
            </Link>
          

          <Button type="submit">
            Iniciar sesión
          </Button>
        </form>

        <p className={styles.footer}>
          ¿No tienes una cuenta?{' '}
          <Link href="/register">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

