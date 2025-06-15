
import { Product, NavItem,Brand } from './types';

export const APP_NAME = "FABU";
export const TAX_RATE = 0.16; // 16% VAT

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ethereal White Blouse',
    category: 'Tops',
    price: 10398.70, // Was $79.99, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749713557/ac359f6b-3248-4431-aaa1-c3d745064312_zzi2i6.jpg',
    description: 'A light and airy blouse, perfect for any occasion. Crafted from sustainable organic cotton.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Ivory'],
    status: 'popular',
  },
  {
    id: '2',
    name: 'Urban Flow Trousers',
    category: 'Bottoms',
    price: 15598.70, // Was $119.99, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749713852/9bee35a0-64d1-4785-8c3c-74920310539a_vtffg0.jpg',
    description: 'Comfortable and stylish wide-leg trousers for the modern urbanite. Made with a blend of linen and tencel.',
    sizes: ['S', 'M', 'L'],
    colors: ['Charcoal', 'Beige'],
    isOutOfStock: true,
  },
  {
    id: '3',
    name: 'Celestial Silk Scarf',
    category: 'Accessories',
    price: 6498.70, // Was $49.99, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749714024/bb5e139a-60bc-4a32-a3f3-fb30b7406088_glgcxg.jpg',
    description: 'A luxurious 100% silk scarf with an abstract celestial print. Adds a touch of elegance to any outfit.',
    sizes: ['One Size'],
    colors: ['Midnight Blue', 'Gold Accent'],
    status: 'limited',
  },
  {
    id: '4',
    name: 'Geometric Knit Sweater',
    category: 'Knitwear',
    price: 19498.70, // Was $149.99, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749714348/3a393c2e-2097-4271-af6c-f356dad9a30e_mcbzgj.jpg',
    description: 'A cozy and chic knit sweater featuring a subtle geometric pattern. Perfect for cooler days.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Forest Green', 'Cream'],
    status: 'low-stock',
  },
   {
    id: '5',
    name: 'Avant-Garde Midi Dress',
    category: 'Dresses',
    price: 24698.70, // Was $189.99, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749714601/Texturelabs_Fabric_161M_p2qo6g.png',
    description: 'Make a statement with this uniquely structured midi dress, blending art and fashion.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Deep Teal'],
    status: 'new-arrival',
  },
  {
    id: '6',
    name: 'Minimalist Leather Tote',
    category: 'Accessories',
    price: 28600.00, // Was $220.00, KSH @ ~130
    imageUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749985812/Minimalist_Leather_Totes_arz15b.jpg',
    description: 'A timeless and spacious leather tote bag, designed for everyday elegance and functionality.',
    sizes: ['One Size'],
    colors: ['Tan', 'Black'],
  }
];
export const FEATURED_BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Brand A',
    logoUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749988210/logo_nwjriu.jpg',
    slug: 'brand-a',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    description: 'Premium fashion brand'
  },
  {
    id: '2',
    name: 'Brand B',
    logoUrl: 'https://res.cloudinary.com/ddfa67uba/image/upload/v1749988294/logo1_cncep6.jpg',
    slug: 'brand-b',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    description: 'Sustainable fashion'
  },
  {
    id: '3',
    name: 'Brand C',
    logoUrl: 'path/to/brand-c-logo.png',
    slug: 'brand-c',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    description: 'Modern classics'
  }
];
export const NAVIGATION_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop-gallery' }, // Updated href for dedicated shop page
  { label: 'Our Story', href: '#our-story' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#', icon: 'fabu-instagram' }, // Placeholder icon names
  { name: 'Pinterest', href: '#', icon: 'fabu-pinterest' },
  { name: 'Facebook', href: '#', icon: 'fabu-facebook' },
];
