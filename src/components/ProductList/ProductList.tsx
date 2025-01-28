import { ProductCard } from '../../components/ProductCard/ProductCard';

interface ProductsListProps {
  products: { _id: string; name: string; description: string }[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
