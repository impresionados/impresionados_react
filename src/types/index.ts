export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  image: string;
  ratings: any[];
}

export interface User {
  id: string;
  usuario: string;
  email: string;
  registration_date: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}