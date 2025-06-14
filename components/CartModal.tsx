
import React, { useEffect, useMemo } from 'react';
import { CartItem } from '../types';
import CloseIcon from './icons/CloseIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import TrashIcon from './TrashIcon'; // Corrected import path
import Button from './Button';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void; // Added prop for checkout
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout, // Destructure new prop
}) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const grandTotal = subtotal; // Assuming no taxes or shipping for now

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-[100] flex justify-end" 
      onClick={onClose} 
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" style={{ animationDuration: '0.3s' }} />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-luxury-bg shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center justify-between p-6 border-b border-luxury-subtle">
          <h2 id="cart-modal-title" className="text-xl font-semibold text-luxury-text">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-luxury-text/70 hover:text-luxury-accent transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-luxury-text/80 mb-6">Your cart is currently empty.</p>
              <Button onClick={onClose} variant="primary">
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.product.id} className="flex items-start space-x-4 py-4 border-b border-luxury-subtle last:border-b-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-sm border border-luxury-subtle"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-luxury-text">{item.product.name}</h3>
                  <p className="text-sm text-luxury-text/70">Price: ${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity" className="p-1 text-luxury-text/70 hover:text-luxury-accent rounded-full transition-colors">
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity" className="p-1 text-luxury-text/70 hover:text-luxury-accent rounded-full transition-colors">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-luxury-text">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => onRemoveItem(item.product.id)} aria-label="Remove item" className="mt-2 text-luxury-text/60 hover:text-red-500 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-luxury-subtle bg-luxury-bg/50 space-y-4">
            <div className="flex justify-between text-sm text-luxury-text/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-luxury-text">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-luxury-text/60 text-center">Shipping & taxes calculated at checkout.</p>
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={onCheckout} // Updated to call onCheckout prop
                disabled={cartItems.length === 0} // Disable if cart is empty
              >
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;