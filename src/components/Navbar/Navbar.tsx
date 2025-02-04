import { Logo } from './componts/Logo';
import { SearchBar } from './componts/SearchBar';
import { NavLinks } from './componts/NavbarLinks';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Logo />
          <div className="navbar-links">
            <SearchBar />
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};
