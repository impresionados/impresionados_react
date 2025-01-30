import { create } from 'zustand';

interface Order {
  _id: string;
  user_id: string;
  product_id: string;
  date: string;
  total: number;
  status: string; // "Pendiente", "Enviado", "Entregado"
}

interface OrderStore {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  placeOrder: (cartItems: any[], userId: string) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  // Obtener órdenes del usuario desde la API
  fetchOrders: async () => {
    const response = await fetch('/api/orders');
    const data = await response.json();
    set({ orders: data });
  },

  // Realizar una nueva orden
  placeOrder: async (cartItems, userId) => {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items: cartItems }),
    });
    const data = await response.json();
    set({ orders: [...data] });
  },
}));
