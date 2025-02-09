import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Importa el archivo CSS

export const Profile = ({ user, setUser }: { user: any; setUser: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga

  const clearUser = () => {
    setUser(null); // Elimina el usuario del estado global
    localStorage.removeItem("user"); // Elimina el usuario del almacenamiento local
    navigate('/'); // Redirige al login después de cerrar sesión
  };

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirige al login si no hay usuario autenticado
    } else {
      setLoading(false);  // Si el usuario está presente, se detiene la carga
    }
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-xl text-gray-500">Cargando...</p>;  // Muestra un mensaje de carga hasta que se valide la sesión
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Perfil de Usuario</h2>

        <div className="profile-info">
          <h3 className="profile-info-label">Correo electrónico:</h3>
          <p className="profile-info-value">{user?.email}</p>
        </div>

        <div className="profile-info">
          <h3 className="profile-info-label">Teléfono:</h3>
          <p className="profile-info-value">{user?.phone}</p>
        </div>

        <div className="profile-info">
          <h3 className="profile-info-label">Dirección:</h3>
          <p className="profile-info-value">{user?.address}</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={clearUser}
            className="logout-button"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
