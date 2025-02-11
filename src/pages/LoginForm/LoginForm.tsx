import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './LoginForm.module.css';

export const LoginForm = ({ setUser }: { setUser: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://192.168.1.133:8001/users/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const user = await response.json();

      if (user.password !== password) {
        setError('Contraseña incorrecta');
        return;
      }

      // Crear objeto de usuario con datos importantes
      const userData = {
        email: user.email,
        phone: user.tlf,
        address: user.address,
      };

      // Guardar en estado global
      setUser(userData);

      // Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('Inicio de sesión exitoso', user);
      alert('Inicio de sesión exitoso');

      // Redirigir a la ventana principal
      navigate('/profile');
    } catch (error: any) {
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
          <Button type="submit">Iniciar sesión</Button>
        </form>

        <p className={styles.footer}>
          ¿No tienes una cuenta?{' '}
          <Link href="/register">Registrarse</Link>
        </p>
      </div>
    </div>
  );
};
