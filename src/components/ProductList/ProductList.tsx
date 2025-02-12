import { ProductCard } from '../../components/ProductCard/ProductCard';

// Definimos las propiedades que recibirá el componente
interface ProductsListProps {
  products: { id: string; name: string; description: string }[];
}

// Componente que recibe una lista de productos y los muestra usando `ProductCard`
export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        // Renderiza cada producto utilizando el componente `ProductCard`
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
