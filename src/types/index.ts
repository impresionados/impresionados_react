export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  tipo: string[];
  image?: string;
  supertipo: string;
  ratings: Array<{
    user: string;
    score: number;
    comment: string;
  }>;
}


export interface User {
  id: string;
  usuario: string;
  email: string;
  registration_date: string;
}


export interface CartItem extends Product {
  quantity: number;
}