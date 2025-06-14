
import React, { useState } from 'react';
import { Product } from '../types';
import Button from './Button';
import CheckIcon from './icons/CheckIcon';

interface ProductCardProps {
  product: Product;
  onViewReceipt: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  animationDelay?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewReceipt, onAddToCart, animationDelay = '0s' }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [onWaitlist, setOnWaitlist] = useState(false);

  const handleAddToCartClick = () => {
    if (product.isOutOfStock) {
      setOnWaitlist(true);
      // Here you might trigger an actual waitlist function in a real app
      setTimeout(() => {
        setOnWaitlist(false);
      }, 1800);
    } else {
      onAddToCart(product);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 1800);
    }
  };

  const getStatusBadge = () => {
    if (!product.status) return null;

    let bgColor = '';
    let textColor = 'text-white';
    let text = '';

    switch (product.status) {
      case 'low-stock':
        bgColor = 'bg-amber-500';
        text = 'Low Stock';
        break;
      case 'popular':
        bgColor = 'bg-sky-500';
        text = 'Popular';
        break;
      case 'limited':
        bgColor = 'bg-luxury-accent';
        text = 'Limited';
        break;
      case 'new-arrival':
        bgColor = 'bg-green-500';
        text = 'New In';
        break;
      default:
        return null;
    }

    return (
      <div 
        className={`absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase z-10 ${bgColor} ${textColor}`}
      >
        {text}
      </div>
    );
  };

  return (
    <div
      className="bg-luxury-bg border border-luxury-subtle/70 rounded-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeInUp"
      style={{ animationDelay }}
      role="listitem"
      aria-labelledby={`product-name-${product.id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {getStatusBadge()}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${product.isOutOfStock ? 'opacity-70' : ''}`}
        />
         {product.isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded">OUT OF STOCK</span>
            </div>
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <p className="text-xs text-luxury-text/60 mb-1 tracking-wider uppercase">{product.category}</p>
        <h3 id={`product-name-${product.id}`} className="text-lg md:text-xl font-medium text-luxury-text mb-2 truncate group-hover:text-luxury-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-luxury-accent mt-auto mb-4">${product.price.toFixed(2)}</p>

        <div className="space-y-2 mt-auto">
          <Button
            onClick={handleAddToCartClick}
            variant={addedToCart || onWaitlist ? "primary" : "secondary"}
            className="w-full text-sm !tracking-normal"
            disabled={addedToCart || onWaitlist || (product.isOutOfStock && !onWaitlist)} // Disable if added, or on waitlist, or out of stock & not yet clicked waitlist
          >
            {product.isOutOfStock ? (
              onWaitlist ? (
                <span className="flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 mr-2" /> On Waitlist!
                </span>
              ) : (
                'Join Waitlist'
              )
            ) : addedToCart ? (
              <span className="flex items-center justify-center">
                <CheckIcon className="w-4 h-4 mr-2" /> Added!
              </span>
            ) : (
              'Add to Cart'
            )}
          </Button>
          <button
            onClick={() => onViewReceipt(product)}
            className="w-full text-xs py-2 px-4 border border-luxury-subtle text-luxury-text hover:border-luxury-accent hover:text-luxury-accent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-luxury-accent/70 rounded font-medium tracking-wide"
            aria-label={`View details for ${product.name}`}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;