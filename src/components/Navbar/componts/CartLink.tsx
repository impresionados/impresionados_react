import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';

export const CartLink: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <Link to="/cart" className="navbar-link cart-link">
      <ShoppingCart className="icon" />
      {cartItems.length > 0 && (
        <span className="cart-count">{cartItems.length}</span>
      )}
      <div className="icon-text">Cesta</div>
    </Link>
  );
};
