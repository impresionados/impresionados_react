import React from 'react';
import './Profile.css';

export const Profile: React.FC = () => {
  // Simulación de un usuario
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatar: 'https://via.placeholder.com/150', // URL de imagen de avatar
  };

  const handleLogout = () => {
    console.log('Cerrar sesión');
    // Aquí puedes implementar la lógica para cerrar sesión
  };

  const handleEditProfile = () => {
    console.log('Editar perfil');
    // Aquí puedes implementar la lógica para editar el perfil
  };

  return (
    <div className="profile-container">
      {/* Contenedor de avatar e información */}
      <div className="profile-header">
        <img src={user.avatar} alt="Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="profile-actions">
        <button className="profile-button edit-button" onClick={handleEditProfile}>
          Editar Perfil
        </button>
        <button className="profile-button logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
