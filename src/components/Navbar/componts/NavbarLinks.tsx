import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { CartLink } from './CartLink.tsx';

interface NavLinksProps {
  user: any;
}

export const NavLinks: React.FC<NavLinksProps> = ({ user }) => {
  return (
    <>
      <div className="navbar-link">
        <Search className="icon" />
      </div>
      <CartLink />
      <Link to={user ? "/profile" : "/login"} className="navbar-link">
        <User className="icon" />
        <div className="icon-text">{user ? "Perfil" : "Iniciar sesión"}</div>
      </Link>
    </>
  );
};
