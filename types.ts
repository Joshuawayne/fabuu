
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  sizes: string[];
  colors: string[];
  status?: 'low-stock' | 'popular' | 'limited' | 'new-arrival'; // For FOMO, etc.
  isOutOfStock?: boolean; // For waitlist functionality
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}