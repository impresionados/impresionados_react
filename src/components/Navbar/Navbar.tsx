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
      <div className="navbar-container">
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
