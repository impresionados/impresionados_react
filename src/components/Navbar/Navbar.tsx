import { useLocation } from "react-router-dom";
import { Logo } from "./componts/Logo";
import { SearchBar } from "./componts/SearchBar";
import { NavLinks } from "./componts/NavbarLinks";
import { Filters } from "./componts/Filter/Filter";
import "./Navbar.css";

interface NavbarProps {
  user: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, searchQuery, setSearchQuery }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">import { useLocation } from "react-router-dom";  // Importa el hook 'useLocation' de 'react-router-dom' para obtener la ruta actual.
import { Logo } from "./componts/Logo";  // Importa el componente 'Logo' para mostrar el logo de la aplicación.
import { SearchBar } from "./componts/SearchBar";  // Importa el componente 'SearchBar' para la barra de búsqueda.
import { NavLinks } from "./componts/NavbarLinks";  // Importa el componente 'NavLinks' para los enlaces de navegación.
import { Filters } from "./componts/Filter/Filter";  // Importa el componente 'Filters' para los filtros condicionales.
import "./Navbar.css";  // Importa los estilos CSS para el Navbar.

interface NavbarProps {
  user: any;  // Prop para almacenar los datos del usuario (puede ser un objeto de tipo 'any').
  searchQuery: string;  // Prop que contiene la cadena de texto de la búsqueda.
  setSearchQuery: (query: string) => void;  // Función para actualizar la búsqueda.
}

export const Navbar: React.FC<NavbarProps> = ({ user, searchQuery, setSearchQuery }) => {
  const location = useLocation();  // Usa 'useLocation' para obtener la ruta actual de la aplicación.

  return (
    <nav className="navbar">  {/* Contenedor principal del Navbar */}
      <div className="navbar-container">  {/* Contenedor para organizar los elementos dentro del Navbar */}
        <div className="navbar-content">  {/* Contenedor que agrupa el logo y los enlaces de navegación */}
          <Logo />  {/* Muestra el logo de la aplicación */}
          <div className="navbar-links">  {/* Contenedor para los enlaces y la barra de búsqueda */}
            {/* Renderiza el componente 'Filters' solo si la ruta actual es "/" (página de inicio) */}
            {location.pathname === "/" && <Filters onFilterChange={() => {}} />}  
            {/* Muestra la barra de búsqueda y pasa las props correspondientes */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />  {/* ✅ Pasamos los props */}
            {/* Muestra los enlaces de navegación, pasándole el objeto 'user' */}
            <NavLinks user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

        <div className="navbar-content">
          <Logo />
          <div className="navbar-links">
            {location.pathname === "/" && <Filters onFilterChange={() => {}} />}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* ✅ Pasamos los props */}
            <NavLinks user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};
