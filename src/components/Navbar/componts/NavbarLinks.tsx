import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { CartLink } from './CartLink.tsx';

export const NavLinks: React.FC = () => {
  return (
    <>
      <div className="navbar-link">
        <Search className="icon" />
        <div className="icon-text">Buscar</div>
      </div>
      <CartLink />
      <Link to="/profile" className="navbar-link">
        <User className="icon" />
        <div className="icon-text">Perfil</div>
      </Link>
    </>
  );
};
