import React, { useState } from 'react';
import { CategoryFilters } from '../../components/CategoryFilters/CategoryFilters';
import { ProductsList } from '../../components/ProductList/ProductList';
import './Home.css';
import { SuperCategoryFilters } from '../../components/SuperCategoryFilters/SuperCategoryFilters';

export const Home: React.FC = () => {
  const [categories] = useState<{ _id: string; name: string }[]>([
    { _id: '1', name: 'Electrónica' },
    { _id: '2', name: 'Ropa' },
    { _id: '3', name: 'Deporte' },
  ]);
  const [superCategories] = useState<{ _id: string; name: string }[]>([
    { _id: '1', name: 'Vestimenta' },
    { _id: '2', name: 'Pijama' },
    { _id: '3', name: 'Totorota' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuperCategories, setSelectedSuperCategories] = useState<string[]>([]);
  const [products] = useState([
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
      _id: '104',
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
      _id: '105',
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
      _id: '106',
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
      _id: '107',
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
  
    const matchesSuperCategory =
      selectedSuperCategories.length === 0 ||
      selectedSuperCategories.includes(product.super_tipo);
  
    return matchesCategory && matchesSuperCategory; // 🔥 Ambos filtros deben cumplirse
  });
  

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
  

  return (
    <div className="home-container">
      {/* Filtros de categorías */}
      <div className="filters-container">
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

        
      </div>
      
      {/* Lista de productos */}
      <ProductsList products={filteredProducts} />
    </div>
  );
};
