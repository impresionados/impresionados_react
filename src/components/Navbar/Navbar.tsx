import { useEffect, useState } from 'react';
import { Logo } from './componts/Logo';
import { SearchBar } from './componts/SearchBar';
import { NavLinks } from './componts/NavbarLinks';
import { Filters } from './componts/Filter/Filter'; // Importamos el componente
import { useLocation } from "react-router-dom"; // ✅ Importamos useLocation
import './Navbar.css';

interface NavbarProps {
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation(); // ✅ Obtiene la ruta actual
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // ✅ Función que filtra los productos según los filtros seleccionados
  const updateFilteredProducts = (filters: { [key: string]: string[] }) => {
    const storedData = localStorage.getItem("products");
    if (!storedData) return;

    const products = JSON.parse(storedData);

    // ✅ Filtrar productos según los filtros activos
    const filtered = products.filter((product: any) => {
      if (!product.category || !Array.isArray(product.category) || !product.super_tipo) {
        console.warn("⚠️ Producto sin datos válidos:", product);
        return false;
      }

      return Object.entries(filters).some(([supertype, selectedTypes]) => {
        if (selectedTypes.length === 0) return false; // Si no hay tipos seleccionados en un supertipo, se ignora

        // ✅ Mostrar si el producto pertenece a un supertipo seleccionado
        const matchesSuperType = selectedTypes.includes("__SUPER_TYPE_SELECTED__") && product.super_tipo === supertype;

        // ✅ Mostrar si el producto tiene en `category` al menos un tipo seleccionado
        const matchesCategory = selectedTypes.some(type => product.category.includes(type));

        return matchesSuperType || matchesCategory;
      });
    });

    console.log("✅ Productos que se deben mostrar:", filtered); // 🔥 Console log de los productos filtrados
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      const initialProducts = JSON.parse(storedData);
      console.log("🔄 Productos cargados desde localStorage:", initialProducts); // 🔥 Log inicial de productos
      setFilteredProducts(initialProducts);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Logo />
          <div className="navbar-links">
            {/* ✅ Mostrar los filtros solo cuando la URL es "/" */}
            {location.pathname === "/" && (
              <Filters onFilterChange={updateFilteredProducts} />
            )}
            <SearchBar />
            <NavLinks user={user} /> {/* ✅ Pasamos `user` a NavLinks */}
          </div>
        </div>
      </div>
      {/* ✅ Mostrar la cantidad de productos filtrados (prueba visual) */}
      <div style={{ padding: "10px", textAlign: "center", fontSize: "1.2rem" }}>
        {filteredProducts.length} productos encontrados
      </div>
    </nav>
  );
};
