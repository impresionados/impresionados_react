import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { ProductDetail } from "./pages/Products/ProductDetail";
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { CartDisplay } from './pages/Cart/Cart';
import FAQPage from './pages/FAQP/FAQPage';
import { Product } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string[] }>({});
  const [allProducts, setAllProducts] = useState<any[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simulación de carga de productos desde una API o caché local
    const fetchProducts = async () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        setAllProducts(products);
        setFilteredProducts(products); // Inicialmente, mostrar todos los productos
      } else {
        try {
          const response = await fetch("http://10.102.10.35:8001/products/");
          if (!response.ok) throw new Error("Error al obtener productos");

          const products = await response.json();
          localStorage.setItem("products", JSON.stringify(products));
          setAllProducts(products);
          setFilteredProducts(products);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Filtrado dinámico por búsqueda y categorías
  useEffect(() => {
    let updatedProducts = [...allProducts];
  
    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (Object.keys(selectedCategories).length > 0) {
      updatedProducts = updatedProducts.filter((product: Product) => {
        const productSupertype = product.supertipo.toLowerCase();
        const productSubtypes = product.tipo.map(t => t.toLowerCase());
  
        return Object.entries(selectedCategories).some(([supertype, types]) => {
          const supertypeLower = supertype.toLowerCase();
          const typesLower = types.map(t => t.toLowerCase());
  
          // Caso 1: Supertype seleccionado directamente
          if (typesLower.includes('__super_type_selected__')) {
            return productSupertype === supertypeLower;
          }
          
          // Caso 2: Subtipos seleccionados
          return productSupertype === supertypeLower && 
                 typesLower.some(t => productSubtypes.includes(t));
        });
      });
    }
  
    setFilteredProducts(updatedProducts);
  }, [searchQuery, selectedCategories, allProducts]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          user={user} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories} 
        /> 

        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} selectedCategories={selectedCategories} />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/cart" element={<CartDisplay />} />
            <Route path="/faqp" element={<FAQPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
