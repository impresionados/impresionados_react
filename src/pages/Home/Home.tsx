import React, { useState, useEffect, useMemo } from 'react';
import { CategoryFilters } from '../../components/CategoryFilters/CategoryFilters';
import { ProductsList } from '../../components/ProductList/ProductList';
import './Home.css';
import { SuperCategoryFilters } from '../../components/SuperCategoryFilters/SuperCategoryFilters';

const categories = [
  { id: '1', name: 'Electrónica' },
  { id: '2', name: 'Ropa' },
  { id: '3', name: 'Deporte' },
];

const superCategories = [
  { id: '1', name: 'Vestimenta' },
  { id: '2', name: 'Pijama' },
  { id: '3', name: 'Totorota' },
];

const defaultImage = "/images/default-image.png";




interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  super_tipo: string;
  ratings: Array<{
    user: string;
    score: number;
    comment: string;
  }>;
}

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuperCategories, setSelectedSuperCategories] = useState<string[]>([]);

  // 🔹 Obtener productos sin imágenes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8001/products/');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error al obtener productos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Obtener imágenes por separado para cada producto
  useEffect(() => {
    const fetchImages = async () => {
      const images: { [key: string]: string } = {};
      await Promise.all(
        products.map(async (product) => {
          try {
            const response = await fetch(`http://localhost:8001/products/${product.id}/image`);
            const blob = await response.blob();
            images[product.id] = URL.createObjectURL(blob);
          } catch (err) {
            console.error(`⚠️ Error al obtener imagen del producto ${product.id}:`, err);
          }
        })
      );
      setProductImages(images);
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

  // 🔹 Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      image: productImages[product.id] || "", // Asigna la imagen descargada
    })).filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        product.category.some((cat) => selectedCategories.includes(cat));

      const matchesSuperCategory =
        selectedSuperCategories.length === 0 ||
        selectedSuperCategories.includes(product.super_tipo);

      return matchesCategory && matchesSuperCategory;
    });
  }, [products, productImages, selectedCategories, selectedSuperCategories]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSuperCategorySelect = (superCategoryName: string) => {
    setSelectedSuperCategories((prev) =>
      prev.includes(superCategoryName)
        ? prev.filter((c) => c !== superCategoryName)
        : [...prev, superCategoryName]
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">❌ Error: {error}</p>;
  }

  return (
    <div className="home-container">
      {/* Filtros de categorías */}
      {/* <div className="filters-container">
        <CategoryFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
        />
        <SuperCategoryFilters
          superCategories={superCategories}
          selectedSuperCategories={selectedSuperCategories}
          onSuperCategorySelect={handleSuperCategorySelect}
        />
      </div> */}

      {/* Lista de productos */}
      <ProductsList products={filteredProducts} />
    </div>
  );
};
