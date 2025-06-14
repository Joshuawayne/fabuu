import React, { useEffect } from 'react';
import { Product } from '../types';
import CloseIcon from './icons/CloseIcon';
import { APP_NAME } from '../constants';

interface ReceiptModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const transactionId = `TXN-${Date.now().toString().slice(-6)}-${product.id}`;

  const price = product.price;
  const tax = 0; // Assuming 0 tax for simplicity
  const total = price + tax;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-stone-100 text-neutral-800 font-mono p-6 sm:p-8 rounded-md shadow-xl w-full max-w-sm sm:max-w-md animate-fadeInUp relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{ animationDelay: '0.1s' }} 
      >
        <button
          aria-label="Close receipt"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 id="receipt-title" className="text-2xl font-semibold tracking-wider uppercase">{APP_NAME} Boutique</h2>
          <p className="text-xs">123 Fashion Ave, Style City, SC 45678</p>
          <p className="text-xs mt-1">Thank you for your digital visit!</p>
        </div>

        {/* Transaction Info */}
        <div className="text-xs mb-4">
          <p>Date: {formattedDate}</p>
          <p>Transaction ID: {transactionId}</p>
          <p>Cashier: WebBot</p>
        </div>

        <div className="border-t-2 border-b-2 border-dashed border-neutral-400 py-3 my-3 text-sm">
           {/* Item Header - subtle for less clutter */}
          <div className="grid grid-cols-12 gap-2 mb-1 text-xs text-neutral-600">
            <div className="col-span-6 font-medium">ITEM</div>
            <div className="col-span-2 text-right font-medium">QTY</div>
            <div className="col-span-4 text-right font-medium">PRICE</div>
          </div>
          {/* Item Details */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6 truncate" title={product.name}>{product.name}</div>
            <div className="col-span-2 text-right">1</div>
            <div className="col-span-4 text-right">${price.toFixed(2)}</div>
          </div>
           <p className="text-xs text-neutral-500 mt-1 ml-1">SKU: {product.id} / CAT: {product.category}</p>
        </div>

        {/* Totals */}
        <div className="space-y-1 text-sm mt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Tax (0.00%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-dashed border-neutral-400 pt-2 mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs">
          <p>THANK YOU FOR YOUR PATRONAGE!</p>
          <p className="mt-1">--- DIGITAL VINTAGE RECEIPT ---</p>
          <p className="mt-1">{APP_NAME}.com</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;