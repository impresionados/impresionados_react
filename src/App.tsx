import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { CartDisplay } from './pages/Cart/Cart';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} /> {/* Aquí le pasas setUser */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/cart" element={<CartDisplay/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
