export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'pastry' | 'sandwich';
  image: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}