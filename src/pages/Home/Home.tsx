import React, { useState } from 'react';
import { CategoryFilters } from '../../components/CategoryFilters/CategoryFilters';
import { ProductsList } from '../../components/ProductList/ProductList';
import './Home.css';

export const Home: React.FC = () => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([
    { _id: '1', name: 'Electrónica' },
    { _id: '2', name: 'Ropa' },
    { _id: '3', name: 'Deporte' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState([
    {
      _id: '101',
      name: 'Camiseta',
      description: 'Ropa deportiva cómoda y de alta calidad',
      price: 19.99,
      stock: 50,
      category: ['Ropa', 'Deporte'],
      image: 'img101',
      super_tipo: 'Vestimenta',
      ratings: [
        { user: 'User1', score: 4, comment: 'Muy buena calidad' },
        { user: 'User2', score: 5, comment: 'Perfecta para entrenar' },
      ],
    },
    {
      _id: '102',
      name: 'Auriculares',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      price: 99.99,
      stock: 30,
      category: ['Electrónica'],
      image: 'img102',
      super_tipo: 'Accesorios',
      ratings: [
        { user: 'User3', score: 5, comment: 'El sonido es espectacular' },
        { user: 'User4', score: 4, comment: 'Buena relación calidad-precio' },
      ],
    },
    {
      _id: '103',
      name: 'Balón',
      description: 'Balón de fútbol profesional',
      price: 29.99,
      stock: 20,
      category: ['Deporte'],
      image: 'img103',
      super_tipo: 'Equipo deportivo',
      ratings: [
        { user: 'User5', score: 4, comment: 'Buen rebote y durabilidad' },
        { user: 'User6', score: 5, comment: 'Excelente para partidos' },
      ],
      
    },
    {
      _id: '103',
      name: 'Balón',
      description: 'Balón de fútbol profesional',
      price: 29.99,
      stock: 20,
      category: ['Deporte'],
      image: 'img103',
      super_tipo: 'Equipo deportivo',
      ratings: [
        { user: 'User5', score: 4, comment: 'Buen rebote y durabilidad' },
        { user: 'User6', score: 5, comment: 'Excelente para partidos' },
      ],
      
    },
    {
      _id: '103',
      name: 'Balón',
      description: 'Balón de fútbol profesional',
      price: 29.99,
      stock: 20,
      category: ['Deporte'],
      image: 'img103',
      super_tipo: 'Equipo deportivo',
      ratings: [
        { user: 'User5', score: 4, comment: 'Buen rebote y durabilidad' },
        { user: 'User6', score: 5, comment: 'Excelente para partidos' },
      ],
      
    },
    {
      _id: '103',
      name: 'Balón',
      description: 'Balón de fútbol profesional',
      price: 29.99,
      stock: 20,
      category: ['Deporte'],
      image: 'img103',
      super_tipo: 'Equipo deportivo',
      ratings: [
        { user: 'User5', score: 4, comment: 'Buen rebote y durabilidad' },
        { user: 'User6', score: 5, comment: 'Excelente para partidos' },
      ],
      
    },
    {
      _id: '103',
      name: 'Balón',
      description: 'Balón de fútbol profesional',
      price: 29.99,
      stock: 20,
      category: ['Deporte'],
      image: 'img103',
      super_tipo: 'Equipo deportivo',
      ratings: [
        { user: 'User5', score: 4, comment: 'Buen rebote y durabilidad' },
        { user: 'User6', score: 5, comment: 'Excelente para partidos' },
      ],
      
    },
  ]);
  

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      product.category.some((cat) => selectedCategories.includes(cat));
    return matchesCategory;
  });

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="home-container">
      {/* Filtros de categorías */}
      <div className="filters-container">
        <CategoryFilters
          categories={categories}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Lista de productos */}
      <ProductsList products={filteredProducts} />
    </div>
  );
};
