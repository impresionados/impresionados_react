import { create } from 'zustand';

// Definimos la estructura de un producto en el carrito
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Definimos el estado y las acciones del carrito
interface CartState {
  items: CartItem[]; // Lista de productos en el carrito
  addItem: (item: CartItem) => void; // Función para añadir un producto
  removeItem: (id: string) => void; // Función para eliminar un producto
  clearCart: () => void; // Función para vaciar el carrito
}

// Creamos el estado global del carrito con Zustand
export const useCartStore = create<CartState>((set) => ({
  items: [], // Inicialmente el carrito está vacío

  // Función para añadir un producto al carrito
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, aumentamos su cantidad
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      // Si el producto no está en el carrito, lo añadimos con cantidad 1
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  // Función para eliminar un producto del carrito
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id), // Filtramos y removemos el producto
    })),

  // Función para vaciar el carrito
  clearCart: () => set({ items: [] }),
}));

