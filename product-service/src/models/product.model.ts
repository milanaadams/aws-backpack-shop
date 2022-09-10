export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    count: number;
    image: string;
  }

  export interface ProductRequest {
    title: string;
    description: string;
    price: number;
    count: number;
    image: string;
  }
