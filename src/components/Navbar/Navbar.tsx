import { Logo } from './componts/Logo';
import { SearchBar } from './componts/SearchBar';
import { NavLinks } from './componts/NavbarLinks';
import './Navbar.css';

interface NavbarProps {
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Logo />
          <div className="navbar-links">
            <SearchBar />
            <NavLinks user={user} /> {/* ✅ Pasamos `user` a NavLinks */}
          </div>
        </div>
      </div>
    </nav>
  );
};
