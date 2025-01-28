import React from 'react';
import { ProductImage } from './Components/ProductImage/ProductImage';
import { ProductPrice } from './Components/ProductPrice/ProductPrice';
import { ProductDescription } from './Components/ProductDescription/ProductDescription';
import { ProductCategories } from './Components/ProductCategories/ProductCategories';
import { ProductActions } from './Components/ProductActions/ProductActions';
import { ActionButton } from './Components/ActionButton/ActionButton';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';
import './ProductCard.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  image: string;
}

interface ProductCardProps {
  product: Product;
  context?: 'store' | 'cart'; // Define el contexto: tienda o carrito
  onAction?: () => void; // Acción personalizada (agregar o eliminar)
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, context = 'store', onAction }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <ProductImage src={product.image} alt={product.name} />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <ProductDescription description={product.description} />
        <ProductCategories categories={product.category} />
        <ProductPrice price={product.price} />
        <ProductActions context="store"
          onAction={() => addItem(product)} // Función para añadir al carrito
          productId={product._id}
          stock={product.stock}/>
        <div className="product-stock">
          <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
