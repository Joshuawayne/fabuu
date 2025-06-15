
import React, { useEffect, useMemo } from 'react';
import { CartItem } from '../types';
import FabuLogo from './icons/FabuLogo';
import CloseIcon from './icons/CloseIcon';
import Button from './Button'; 
import { APP_NAME, TAX_RATE } from '../constants';

interface CheckoutReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: CartItem[] | null;
}

const CheckoutReceiptModal: React.FC<CheckoutReceiptModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
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
    if (!orderDetails) return 0;
    return orderDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [orderDetails]);

  const shippingCost = 0; // Placeholder
  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + shippingCost + taxAmount;

  const orderNumber = useMemo(() => `ORD-${Date.now().toString().slice(-8)}`, [orderDetails]); 
  const orderDate = useMemo(() => new Date().toLocaleString(), [orderDetails]);

  const generateReceiptHTML = (
    details: CartItem[], 
    currentOrderNumber: string, 
    currentOrderDate: string,
    currentSubtotal: number,
    currentShipping: number,
    currentTax: number,
    currentGrandTotal: number
  ): string => {
    let html = `<html><head><title>${APP_NAME} Receipt - ${currentOrderNumber}</title>`;
    html += `<script src="https://cdn.tailwindcss.com"></script>`;
    html += `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;
    html += `<style>
        body { 
          font-family: 'Poppins', sans-serif; 
          margin: 0; 
          color: #333333; 
          font-size: 12px;
          background-color: #fff;
        }
        .receipt-container { 
          max-width: 800px; 
          margin: 20px auto; 
          padding: 15px; 
          border: 1px solid #EAEAEA; 
          background-color: #fff; 
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .pt-2 { padding-top: 0.5rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-base { font-size: 1rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .border-b { border-bottom-width: 1px; }
        .border-t { border-top-width: 1px; }
        .border-dashed { border-style: dashed; }
        .border-neutral-300 { border-color: #D1D5DB; }
        .border-neutral-400 { border-color: #9CA3AF; }
        .text-neutral-500 { color: #6B7280; }
        .text-neutral-600 { color: #4B5563; }
        .text-neutral-700 { color: #374151; }
        .text-luxury-text { color: #333333; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; }
        th { border-bottom: 2px solid #EAEAEA; }
        td { border-bottom: 1px dotted #EAEAEA; }
        .logo-text { font-size: 28px; font-weight: 600; letter-spacing: 0.05em; color: #333333; }
        .logo-accent-dot { display: inline-block; width: 8px; height: 8px; background-color: #B08D57; border-radius: 50%; margin-left: 5px; }
        @media print {
          body { margin: 0; font-size: 10pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .receipt-container { border: none; box-shadow: none; padding: 0; margin: 0 auto; width: 100%; max-width: 100%; }
          .no-print { display: none !important; }
        }
      </style></head><body>`;

    html += `<div class="receipt-container">`;
    // Header
    html += `<div class="text-center mb-6 pt-4">
               <div class="logo-text">${APP_NAME}<span class="logo-accent-dot"></span></div>
               <h2 class="text-xl sm:text-2xl font-semibold tracking-wider text-luxury-text mt-2">THANK YOU FOR YOUR ORDER!</h2>
               <p class="text-xs text-neutral-600 mt-1">Order #${currentOrderNumber}</p>
               <p class="text-xs text-neutral-500">${currentOrderDate}</p>
             </div>`;
    
    html += `<div class="border-t border-b border-dashed border-neutral-300 my-4 py-3 text-xs text-neutral-600">
               <p><span class="font-medium text-neutral-700">Billed To:</span> Valued FABU Customer</p>
               <p><span class="font-medium text-neutral-700">Shipping To:</span> Your Confirmed Address</p>
           </div>`;

    // Items
    html += `<table><thead>
               <tr>
                 <th>ITEM</th>
                 <th class="text-center">QTY</th>
                 <th class="text-right">PRICE</th>
                 <th class="text-right">TOTAL</th>
               </tr>
             </thead><tbody>`;
    details.forEach(item => {
      html += `<tr>
                 <td>${item.product.name}</td>
                 <td class="text-center">${item.quantity}</td>
                 <td class="text-right">KSH ${item.product.price.toFixed(2)}</td>
                 <td class="text-right font-medium">KSH ${(item.product.price * item.quantity).toFixed(2)}</td>
               </tr>`;
    });
    html += `</tbody></table>`;

    // Summary
    html += `<div class="mt-auto pt-4 border-t border-dashed border-neutral-300 space-y-1 text-sm text-right">
               <div><span>Subtotal:</span> <span class="font-medium">KSH ${currentSubtotal.toFixed(2)}</span></div>
               <div class="text-neutral-600"><span>Shipping:</span> <span class="font-medium">KSH ${currentShipping.toFixed(2)}</span></div>
               <div class="text-neutral-600"><span>Tax (${(TAX_RATE * 100).toFixed(0)}%):</span> <span class="font-medium">KSH ${currentTax.toFixed(2)}</span></div>
               <div class="font-semibold text-base sm:text-lg text-luxury-text border-t border-neutral-400 pt-2 mt-2">
                 <span>Grand Total:</span> <span class="font-medium">KSH ${currentGrandTotal.toFixed(2)}</span>
               </div>
             </div>`;

    // Footer
    html += `<div class="text-center mt-6 text-xs text-neutral-600">
               <p>A confirmation email has been (not really) sent to your address.</p>
               <p class="mt-1">Thank you for shopping with ${APP_NAME}!</p>
               <p class="mt-1">${APP_NAME}.com</p>
             </div>`;
    
    html += `</div>`; // end receipt-container
    html += `</body></html>`;
    return html;
  };
  
  const downloadAsTxtFallback = () => {
    if (!orderDetails) return;
    let receiptText = `${APP_NAME} - ORDER RECEIPT\n`;
    receiptText += `--------------------------------------------------\n`;
    receiptText += `Order Number: ${orderNumber}\n`;
    receiptText += `Order Date: ${orderDate}\n\n`;
    receiptText += `Billed To: Valued FABU Customer\n`;
    receiptText += `Shipping To: Your Confirmed Address\n\n`;
    receiptText += `ITEMS:\n`;
    receiptText += `--------------------------------------------------\n`;
    orderDetails.forEach(item => {
      receiptText += `${item.product.name}\n`;
      receiptText += `  Qty: ${item.quantity} x KSH ${item.product.price.toFixed(2)}\n`;
      receiptText += `  Total: KSH ${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });
    receiptText += `--------------------------------------------------\n`;
    receiptText += `Subtotal: KSH ${subtotal.toFixed(2)}\n`;
    receiptText += `Shipping: KSH ${shippingCost.toFixed(2)}\n`;
    receiptText += `Tax (${(TAX_RATE * 100).toFixed(0)}%): KSH ${taxAmount.toFixed(2)}\n`;
    receiptText += `--------------------------------------------------\n`;
    receiptText += `GRAND TOTAL: KSH ${grandTotal.toFixed(2)}\n\n`;
    receiptText += `Thank you for shopping with ${APP_NAME}!\n`;
    receiptText += `${APP_NAME}.com\n`;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${APP_NAME}-Receipt-${orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  const handleDownloadReceipt = () => {
    if (!orderDetails) return;

    const receiptHTML = generateReceiptHTML(
        orderDetails, 
        orderNumber, 
        orderDate,
        subtotal,
        shippingCost,
        taxAmount,
        grandTotal
    );

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute'; 
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '1px'; 
    iframe.style.height = '1px';
    iframe.style.border = '0';
    
    document.body.appendChild(iframe); 

    try {
        if (!iframe.contentWindow || !iframe.contentWindow.document) {
            console.error("Iframe content window or document not available immediately after append.");
            throw new Error("Iframe content window not ready for writing.");
        }
        
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(receiptHTML);
        doc.close();

        iframe.onload = () => {
            try {
                if (!iframe.contentWindow) { 
                    throw new Error("Iframe content window lost before printing.");
                }
                iframe.contentWindow.focus(); 
                iframe.contentWindow.print(); 
            } catch (printError) {
                console.error("Error during print dialog:", printError);
                alert("Could not open print dialog. Downloading as TXT instead.");
                downloadAsTxtFallback();
            } finally {
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 2000); 
            }
        };
    } catch (setupError) {
        console.error("Error setting up iframe for printing:", setupError);
        alert("Could not generate PDF view. Downloading as TXT instead.");
        downloadAsTxtFallback();
        if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
        }
    }
  };


  if (!isOpen || !orderDetails) {
    return null;
  }
  
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.05); /* Slightly transparent track */
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #B08D57; /* luxury-accent */
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #947341; /* Darker accent */
    }
    /* For Firefox */
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #B08D57 rgba(0,0,0,0.05);
    }
  `;


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-receipt-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose} 
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="text-neutral-800 font-mono p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg animate-fadeInUp relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          animationDelay: '0.1s',
          backgroundImage: 'url(https://res.cloudinary.com/ddfa67uba/image/upload/v1749719181/downloaded_image_3_tfa4dq.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <button
          aria-label="Close receipt"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 transition-colors z-10 no-print"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <FabuLogo className="h-12 mx-auto mb-3" color="#333333" accentColor="#B08D57" />
          <h2 id="checkout-receipt-title" className="text-xl sm:text-2xl font-semibold tracking-wider text-luxury-text">
            THANK YOU FOR YOUR ORDER!
          </h2>
          <p className="text-xs text-neutral-600 mt-1">Order #{orderNumber}</p>
          <p className="text-xs text-neutral-500">{orderDate}</p>
        </div>
        
        <div className="border-t border-b border-dashed border-neutral-300 my-4 py-3 text-xs text-neutral-600">
            <p><span className="font-medium text-neutral-700">Billed To:</span> Valued FABU Customer</p>
            <p><span className="font-medium text-neutral-700">Shipping To:</span> Your Confirmed Address</p>
        </div>


        {/* Itemized List - Scrollable */}
        <div className="flex-grow overflow-y-auto mb-4 -mx-1 px-1 custom-scrollbar">
          <div className="grid grid-cols-12 gap-x-2 gap-y-1 py-2 border-b border-dashed border-neutral-300 text-xs font-medium text-neutral-700">
            <div className="col-span-6">ITEM</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-2 text-right">PRICE</div>
            <div className="col-span-2 text-right">TOTAL</div>
          </div>
          {orderDetails.map((item) => (
            <div key={item.product.id} className="grid grid-cols-12 gap-x-2 gap-y-1 py-2 text-xs border-b border-dotted border-neutral-300 last:border-b-0">
              <div className="col-span-6 truncate" title={item.product.name}>{item.product.name}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-right">KSH {item.product.price.toFixed(2)}</div>
              <div className="col-span-2 text-right font-medium">KSH {(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="mt-auto pt-4 border-t border-dashed border-neutral-300 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>KSH {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Shipping:</span>
            <span>KSH {shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%):</span>
            <span>KSH {taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base sm:text-lg text-luxury-text border-t border-neutral-400 pt-2 mt-2">
            <span>Grand Total:</span>
            <span>KSH {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-neutral-600">
          <p>A confirmation email has been (not really) sent to your address.</p>
          <p className="mt-1">Thank you for shopping with {APP_NAME}!</p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-3 no-print">
            <Button onClick={onClose} variant="secondary" className="w-full sm:w-auto">
                Continue Shopping
            </Button>
            <Button onClick={handleDownloadReceipt} variant="outline" className="w-full sm:w-auto text-xs !py-2 !px-4">
                Download Receipt (PDF)
            </Button>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      </div>
    </div>
  );
};

export default CheckoutReceiptModal;
