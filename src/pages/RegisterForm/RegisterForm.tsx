import React, { useState } from 'react';
import { User, Mail, Lock, Phone, HomeIcon, CreditCard, DollarSign } from 'lucide-react';
import Input from '../../components/Login-register/components/Input/Input';
import Button from '../../components/Login-register/components/Button/Button';
import Link from '../../components/Login-register/components/Link/Link';
import styles from './RegisterForm.module.css';
import { useNavigate } from 'react-router-dom';

// Componente para el registro de usuarios
export const RegisterForm = () => {
  // Estados para almacenar los datos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  // Función para manejar el registro de usuario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Verificar si el email ya existe
      const checkResponse = await fetch(`http://192.168.68.127:8001/users/${encodeURIComponent(email)}`);
      if (checkResponse.ok) {
        setEmailError('Este email ya está en uso');
        return;
      }

      // Enviar solicitud para registrar usuario
      const response = await fetch(`http://192.168.68.127:8001/users/?user_name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&address=${encodeURIComponent(address)}&tlf=${encodeURIComponent(phone)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Error al crear la cuenta');
      }

      alert('Registro exitoso');
      navigate('/login');

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Crea una cuenta</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          {/* Campo de entrada para nombre completo */}
          <Input
            id="name"
            name="name"
            type="text"
            label="Nombre completo"
            icon={User}
            required
            placeholder="Inserta tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Campo de entrada para email */}
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
          {emailError && <p className={styles.error}>{emailError}</p>}

          {/* Campo de entrada para contraseña */}
          <Input
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            icon={Lock}
            required
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Campo de entrada para confirmar contraseña */}
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Confirmar contraseña"
            icon={Lock}
            required
            placeholder="Confirma contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

<Input
            id="address"
            name="address"
            type="text"
            label="Dirección"
            icon={HomeIcon}
            required
            placeholder="Inserta tu dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Input
            id="phone"
            name="phone"
            type="text"
            label="Teléfono"
            icon={Phone}
            required
            placeholder="Inserta tu número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* 🔹 Selección de método de pago */}
          <div className={styles.paymentContainer}>
            <label className={styles.paymentLabel}>Método de pago:</label>
            <div className={styles.paymentOptions}>
              <label className={styles.radioOption}>
              Tarjeta de crédito/débito 
                <input
                  type="radio"
                  name="paymentMethod"
                  value="tarjeta"
                  checked={paymentMethod === 'tarjeta'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CreditCard size={16} />
              </label>
              <label className={styles.radioOption}>
              PayPal 
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <DollarSign size={16} /> 
              </label>

              
            </div>
            </div>

          {/* Métodos de pago */}
          

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit">Registrarse</Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/profile">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
};
