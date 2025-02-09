import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { ProductDetail } from "./pages/Products/ProductDetail";
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { CartDisplay } from './pages/Cart/Cart';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} /> {/* ✅ Ahora no dará error */}
        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/cart" element={<CartDisplay />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
