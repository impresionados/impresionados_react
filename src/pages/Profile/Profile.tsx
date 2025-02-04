import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirige al login si no hay usuario autenticado
    } else {
      setLoading(false);  // Si el usuario está presente, se detiene la carga
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Cargando...</p>;  // Muestra un mensaje de carga hasta que se valide la sesión
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Dirección:</strong> {user.address}</p>
    </div>
  );
};
