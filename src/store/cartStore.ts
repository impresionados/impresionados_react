import { create } from 'zustand';
import { CartItem, Product } from '../types';

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + product.price,
          
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        total: state.total + product.price,
      };
    }),
    removeItem: (productId) =>
      set((state) => {
    
          // Filtra los ítems, eliminando todas las ocurrencias del productId
          const itemsFiltrados = state.items.filter((item) => item.id !== productId);
    
          // Calcular la cantidad total eliminada correctamente
          const totalEliminado = state.items
              .filter((item) => item.id === productId)
              .reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
          return {
              items: itemsFiltrados,
              total: Math.max(0, state.total - totalEliminado), // Asegurar que el total no sea negativo
          };
      }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
      total: state.items.reduce((acc, item) => acc + item.price * (item.id === productId ? quantity : item.quantity), 0),
    })),
  clearCart: () => set({ items: [], total: 0 }),
}));