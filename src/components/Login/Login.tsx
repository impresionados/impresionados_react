import React, { useState } from 'react';
import './Login.css'

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el email
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña
  const [isRegistering, setIsRegistering] = useState<boolean>(false); // Controla si está en modo registro

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      console.log('Registrando usuario:', { email, password });
    } else {
      console.log('Iniciando sesión con:', { email, password });
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{isRegistering ? 'Registro' : 'Inicio de sesión'}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Campo de Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="form-button">
          {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Cambiar entre login y registro */}
      <p className="toggle-text">
        {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
};
