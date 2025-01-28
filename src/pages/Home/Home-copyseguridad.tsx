import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product, Category } from '../../types';
import './Home.css';
import { Search, Filter } from 'lucide-react';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products and categories from API
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/categories'),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      product.category.some((cat) => selectedCategories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Categorías y búsqueda */}
      <div className="filters-container">
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(category.name)
                    ? prev.filter((c) => c !== category.name)
                    : [...prev, category.name]
                );
              }}
              className={`category-button ${
                selectedCategories.includes(category.name)
                  ? 'category-button-active'
                  : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Productos filtrados */}
      <div className="products-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
