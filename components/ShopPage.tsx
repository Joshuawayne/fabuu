
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SearchIcon from './icons/SearchIcon'; // Import the new SearchIcon

interface ShopPageProps {
  products: Product[];
  onViewReceipt: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, onViewReceipt, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        if (selectedCategory === 'All') return true;
        return product.category === selectedCategory;
      })
      .filter(product => {
        if (!searchTerm) return true;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(lowerSearchTerm) ||
          product.description.toLowerCase().includes(lowerSearchTerm)
        );
      });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="bg-luxury-bg animate-fadeIn" id="shop-gallery-page">
      {/* Hero Section */}
      <div 
        className="relative pt-32 md:pt-40 pb-20 md:pb-28 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://res.cloudinary.com/ddfa67uba/image/upload/v1749988890/collection_cdtgkl.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-75"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-white mb-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Our Collection
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            Curated for the Discerning. Crafted for the Timeless.
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-10 md:mb-12">
          {/* Search Bar */}
          <div className="relative w-full md:flex-grow animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-base bg-white border border-luxury-subtle rounded-md focus:ring-2 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text placeholder-luxury-text/50 transition-shadow duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-luxury-text/50" />
            </div>
          </div>
        </div>
          {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            {categories.map(category => (
            <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-5 text-sm font-medium rounded-md transition-all duration-300 ease-in-out border-2
                            ${selectedCategory === category 
                                ? 'bg-luxury-accent text-white border-luxury-accent shadow-md' 
                                : 'bg-transparent text-luxury-text border-luxury-subtle hover:border-luxury-accent hover:text-luxury-accent hover:shadow-sm'
                            }`}
            >
                {category}
            </button>
            ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-12 md:gap-y-16">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewReceipt={onViewReceipt}
                onAddToCart={onAddToCart}
                animationDelay={`${index * 80}ms`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <SearchIcon className="w-16 h-16 text-luxury-subtle mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-luxury-text font-semibold mb-3">No Treasures Found</p>
            <p className="text-luxury-text/70 max-w-md mx-auto">
              {searchTerm && selectedCategory !== 'All' 
                ? `We couldn't find products matching "${searchTerm}" in the "${selectedCategory}" category. Try adjusting your search or filters.`
                : searchTerm 
                ? `We couldn't find products matching "${searchTerm}". Try a different term or browse categories.`
                : `No products found in the "${selectedCategory}" category. Try "All" or another category.`
              }
            </p>
            {searchTerm && (
                <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-6 py-2 px-5 text-sm font-medium rounded-md transition-colors duration-300 ease-in-out bg-luxury-accent text-white hover:bg-opacity-90"
                >
                Clear Search & Filters
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
