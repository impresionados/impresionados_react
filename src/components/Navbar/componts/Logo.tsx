import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="navbar-logo-container">
      <img
        className="logo-image"
        src="https://i.postimg.cc/d17rw6vp/sinfondoo-sinletra.png"
        alt="3D Printing Store"
      />
      <span className="logo-text">Impresionados 3D</span>
    </Link>
  );
};
