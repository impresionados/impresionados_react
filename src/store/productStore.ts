import { create } from 'zustand';

interface Category {
  _id: string;
  nombre_tipo: string;
  super_tipo: string;
}

interface SuperCategory {
  _id: string;
  nombre_super_tipo: string;
}

interface Product {
  _id: string;
  name: string;
  category: string[];
  super_tipo: string;
}

interface ProductStore {
  products: Product[];
  categories: Category[];
  superCategories: SuperCategory[];
  selectedCategories: string[];
  selectedSuperCategory: string | null;

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSuperCategories: () => Promise<void>;
  selectCategory: (categoryId: string) => void;
  selectSuperCategory: (superCategoryId: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],
  superCategories: [],
  selectedCategories: [],
  selectedSuperCategory: null,

  fetchProducts: async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    set({ products: data });
  },

  fetchCategories: async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    set({ categories: data });
  },

  fetchSuperCategories: async () => {
    const response = await fetch('/api/supercategories');
    const data = await response.json();
    set({ superCategories: data });
  },

  selectCategory: (categoryId) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter((id) => id !== categoryId)
        : [...state.selectedCategories, categoryId],
    })),

  selectSuperCategory: (superCategoryId) =>
    set((state) => ({
      selectedSuperCategory: superCategoryId,
      selectedCategories: [],
    })),
}));
