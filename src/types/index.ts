export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  image: string;
  ratings: any[];
}

export interface User {
  _id: string;
  usuario: string;
  email: string;
  registration_date: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}