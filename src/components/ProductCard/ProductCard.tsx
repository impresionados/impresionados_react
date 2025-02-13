import React from 'react';
import { ProductImage } from './Components/ProductImage/ProductImage';
import { ProductPrice } from './Components/ProductPrice/ProductPrice';
import { ProductDescription } from './Components/ProductDescription/ProductDescription';
import { ProductCategories } from './Components/ProductCategories/ProductCategories';
import { ProductActions } from './Components/ProductActions/ProductActions';
import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import  {Product} from "../../types/index"


// Definimos las propiedades del `ProductCard`
interface ProductCardProps {
  product: Product;
  context?: 'store' | 'cart'; // Contexto: tienda o carrito
  onAction?: () => void; // Acción personalizada (agregar o eliminar del carrito)
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, context = 'store', onAction }) => {
  // Hook para agregar un producto al carrito
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      {/* Link para ver el producto en detalle */}
      <Link to={`/product/${product.id}`} className="product-action">
        <ProductImage src={product.image || "../img/proximamente.png"} alt={product.name} />
      </Link>

      <div className="product-details">
        <Link to={`/product/${product.id}`} className="product-action">
          <h3 className="product-name">{product.name}</h3>
          <ProductDescription description={product.description} />
          <ProductCategories categories={product.tipo} />
          <ProductPrice price={product.price} />
        </Link>

        {/* Acciones del producto (Agregar al carrito, etc.) */}
        <ProductActions context="store"
          onAction={() => addItem(product)}
          productId={product.id}
          stock={product.stock}
        />

        {/* Muestra el estado de stock del producto */}
        <Link to={`/product/${product.id}`} className="product-action">
          <div className="product-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
