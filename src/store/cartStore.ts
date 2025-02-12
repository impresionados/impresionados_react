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
  total: number; // Total del carrito en euros
  addItem: (item: CartItem) => void; // Función para añadir un producto
  removeItem: (id: string) => void; // Función para eliminar un producto
  updateQuantity: (id: string, quantity: number) => void; // Función para actualizar la cantidad de un producto
  clearCart: () => void; // Función para vaciar el carrito
}

// Creamos el estado global del carrito con Zustand
export const useCartStore = create<CartState>((set) => ({
  items: [], // Inicialmente el carrito está vacío
  total: 0, // Inicializamos el total en 0

  // Función para añadir un producto al carrito
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      let newTotal = state.total + item.price; // Aumentamos el total con el precio del nuevo producto

      if (existingItem) {
        // Si el producto ya está en el carrito, aumentamos su cantidad
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: newTotal, // Actualizamos el total
        };
      }

      // Si el producto no está en el carrito, lo añadimos con cantidad 1
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: newTotal, // Actualizamos el total
      };
    }),

  // Función para eliminar un producto del carrito
  removeItem: (id) =>
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === id);
      const newTotal = itemToRemove ? state.total - itemToRemove.price * itemToRemove.quantity : state.total;

      return {
        items: state.items.filter((item) => item.id !== id), // Filtramos y removemos el producto
        total: Math.max(0, newTotal), // Evitamos valores negativos en total
      };
    }),

  // Función para actualizar la cantidad de un producto
  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      // Recalculamos el total sumando precios * cantidades
      const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      return {
        items: updatedItems,
        total: newTotal,
      };
    }),

  // Función para vaciar el carrito
  clearCart: () => set({ items: [], total: 0 }),
}));
