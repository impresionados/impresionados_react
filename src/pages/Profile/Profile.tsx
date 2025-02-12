import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Importa el archivo CSS para los estilos del perfil

// Componente funcional Profile que recibe las propiedades `user` y `setUser`
export const Profile = ({ user, setUser }: { user: any; setUser: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos del usuario

  // Función para cerrar sesión
  const clearUser = () => {
    setUser(null); // Elimina el usuario del estado global
    localStorage.removeItem("user"); // Borra el usuario del almacenamiento local
    navigate('/'); // Redirige a la página de inicio (o login)
  };

  // useEffect para redirigir al usuario si no está autenticado
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Si no hay usuario, se redirige al login
    } else {
      setLoading(false);  // Si hay usuario, se marca como cargado
    }
  }, [user, navigate]);

  // Muestra un mensaje de carga mientras se valida la sesión
  if (loading) {
    return <p className="text-center mt-10 text-xl text-gray-500">Cargando...</p>;
  }

  // Renderiza la interfaz del perfil del usuario con su información
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Perfil de Usuario</h2>

        {/* Sección con la información del usuario */}
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

        {/* Botón para cerrar sesión */}
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
