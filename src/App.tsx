// Importa React y los hooks useState y useEffect para manejar el estado y efectos secundarios
import React, { useState, useEffect } from 'react';
// Importa el enrutador y los componentes de rutas de React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa las páginas de la aplicación
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { ProductDetail } from "./pages/Products/ProductDetail";
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { CartDisplay } from './pages/Cart/Cart';
import FAQPage from './pages/FAQP/FAQPage';

// Componente principal de la aplicación
const App: React.FC = () => {
  // Estado para manejar la información del usuario autenticado
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Recupera el usuario desde localStorage si existe
  });

  // Estado para manejar la búsqueda de productos
  const [searchQuery, setSearchQuery] = useState<string>(""); // Se inicializa como una cadena vacía

  // useEffect para actualizar el estado del usuario cuando cambia en `localStorage`
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Agrega un evento que detecta cambios en localStorage
    window.addEventListener("storage", handleStorageChange);
    
    // Limpieza del evento cuando el componente se desmonta
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Barra de navegación, pasando el usuario y la búsqueda como props */}
        <Navbar user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
        
        {/* Contenedor principal con padding y máximo ancho */}
        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            {/* Ruta de la página de inicio con búsqueda */}
            <Route path="/" element={<Home searchQuery={searchQuery || ""} />} />
            
            {/* Ruta de detalles del producto */}
            <Route path="/product/:productId" element={<ProductDetail />} />
            
            {/* Rutas de autenticación */}
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Ruta del perfil del usuario */}
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            
            {/* Ruta del carrito de compras */}
            <Route path="/cart" element={<CartDisplay />} />
            
            {/* Ruta de preguntas frecuentes */}
            <Route path="/faqp" element={<FAQPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
