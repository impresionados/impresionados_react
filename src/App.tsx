// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { Profile } from './pages/Profile/Profile';
import { Home } from './pages/Home/Home'; // Importa el componente Home

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Ruta de la página principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Ruta para el registro */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Ruta para el perfil */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Home />} // Redirige al home si no hay usuario
        />
      </Routes>
    </Router>
  );
};

export default App;
