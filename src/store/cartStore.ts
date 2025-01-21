import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartStore {
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
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item._id === product._id
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
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
      total: state.total - (state.items.find((item) => item._id === productId)?.price ?? 0),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
      total: state.items.reduce((acc, item) => acc + item.price * (item._id === productId ? quantity : item.quantity), 0),
    })),
  clearCart: () => set({ items: [], total: 0 }),
}));