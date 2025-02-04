import React, { useState, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://10.102.10.15::8001/users/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const user = await response.json();

      if (user.password !== password) {
        setError('Contraseña incorrecta');
        return;
      }

      // Guardar los datos en sessionStorage
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userPassword', password);  
      sessionStorage.setItem('userPhone', user.phone);  
      sessionStorage.setItem('userAddress', user.address);  

      console.log('Inicio de sesión exitoso', user);
      alert('Inicio de sesión exitoso');
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Bienvenido de nuevo</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Dirección email"
            icon={Mail}
            required
            placeholder="Inserta tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            icon={Lock}
            required
            placeholder="Inserta tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

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
