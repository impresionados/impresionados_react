import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './LoginForm.module.css';

/*
  Importaciones:
  - Se importan las bibliotecas necesarias de React y React Router.
  - Se importan iconos de la librería `lucide-react`.
  - Se importan componentes reutilizables para inputs, botones y enlaces.
  - Se importa el módulo de estilos CSS para aplicar estilos personalizados.
*/

export const LoginForm = ({ setUser }: { setUser: (user: any) => void }) => {
  // Estados para gestionar los valores de entrada y mensajes de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /*
    Función para manejar el inicio de sesión:
    - Previene el envío del formulario por defecto.
    - Intenta obtener los datos del usuario desde un servidor mediante una petición `fetch`.
    - Si el usuario no se encuentra, muestra un error.
    - Si la contraseña no coincide, muestra un mensaje de error.
    - Si las credenciales son correctas:
      * Se crea un objeto con datos relevantes del usuario.
      * Se actualiza el estado global con `setUser`.
      * Se guarda la información en `localStorage` para persistencia.
      * Se muestra un mensaje de éxito y se redirige a la página de perfil.
  */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://192.168.68.127:8001/users/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const user = await response.json();

      if (user.password !== password) {
        setError('Contraseña incorrecta');
        return;
      }

      // Datos relevantes del usuario para manejar la sesión
      const userData = {
        email: user.email,
        phone: user.tlf,
        address: user.address,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('Inicio de sesión exitoso', user);
      alert('Inicio de sesión exitoso');

      navigate('/profile'); // Redirige al usuario a la página de perfil
    } catch (error: any) {
      setError(error.message);
    }
  };

  /*
    Renderizado del formulario de inicio de sesión:
    - Contenedor principal con clases de estilo.
    - Campo de entrada para el correo electrónico con icono y validaciones.
    - Campo de entrada para la contraseña con icono y validaciones.
    - Se muestra un mensaje de error en caso de credenciales incorrectas.
    - Botón de inicio de sesión.
    - Enlace para registrarse en caso de no tener cuenta.
  */
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
