import { ProductCard } from '../../components/ProductCard/ProductCard';

interface ProductsListProps {
  products: { id: string; name: string; description: string }[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
