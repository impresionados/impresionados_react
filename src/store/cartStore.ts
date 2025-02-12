import { create } from 'zustand';
import { CartItem, Product } from '../types';

/**
 * Interfaz que define la estructura de la tienda del carrito de compras.
 * Contiene:
 * - `items`: Lista de productos en el carrito.
 * - Métodos para agregar, eliminar, actualizar cantidades y vaciar el carrito.
 * - `total`: Precio total de los productos en el carrito.
 */
export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

/**
 * Hook de Zustand que maneja el estado del carrito de compras.
 * Inicializa un estado con una lista vacía de productos y un total de 0.
 */
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,

  /**
   * Agrega un producto al carrito.
   * - Si el producto ya existe, incrementa su cantidad.
   * - Si es nuevo, lo agrega con cantidad inicial de 1.
   * - Actualiza el total del carrito sumando el precio del producto agregado.
   */
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

  /**
   * Elimina un producto del carrito.
   * - Filtra los ítems para eliminar el producto especificado.
   * - Reduce el total del carrito restando el costo total del producto eliminado.
   * - Asegura que el total nunca sea negativo.
   */
  removeItem: (productId) =>
    set((state) => {
      const itemsFiltrados = state.items.filter((item) => item.id !== productId);
      const totalEliminado = state.items
        .filter((item) => item.id === productId)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

      return {
        items: itemsFiltrados,
        total: Math.max(0, state.total - totalEliminado),
      };
    }),

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * - Modifica la cantidad del producto especificado.
   * - Recalcula el total del carrito en función de las nuevas cantidades.
   */
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
      total: state.items.reduce(
        (acc, item) => acc + item.price * (item.id === productId ? quantity : item.quantity),
        0
      ),
    })),

  /**
   * Vacía completamente el carrito de compras, dejando la lista de productos vacía y el total en 0.
   */
  clearCart: () => set({ items: [], total: 0 }),
}));
