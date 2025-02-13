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
  selectedCategories: { [key: string]: string[] }; // ✅ Agregado
  setSelectedCategories: (categories: { [key: string]: string[] }) => void; // ✅ Agregado
}

export const Navbar: React.FC<NavbarProps> = ({ user, searchQuery, setSearchQuery, selectedCategories, setSelectedCategories }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Logo />
          <div className="navbar-links">
          {location.pathname === "/" && <Filters onFilterChange={setSelectedCategories} />}          {/* ✅ Ahora pasamos `setSelectedCategories` */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <NavLinks user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

