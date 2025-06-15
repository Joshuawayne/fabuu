export interface Brand {
  id: string;           // Unique identifier for the brand
  name: string;         // Brand name
  logoUrl?: string;     // URL to the brand's logo
  LogoComponent?: React.ComponentType<{ className?: string }>; // React component for the logo
  description?: string; // Optional brand description
  slug: string;         // URL-friendly version of the brand name
  isActive: boolean;    // Whether the brand is currently active
  createdAt: Date;      // When the brand was created
  updatedAt: Date;      // Last time the brand was updated
  products: string[];   // Array of product IDs associated with this brand
  categories?: string[]; // Optional array of categories this brand belongs to
  isFeatured?: boolean; // Whether this brand is featured
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}
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