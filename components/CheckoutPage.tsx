
import React, { useState, useMemo, useEffect } from 'react';
import { CartItem } from '../types';
import Button from './Button';
import Spinner from './icons/Spinner'; 
import CreditCardIcon from './icons/CreditCardIcon'; 

interface CheckoutPageProps {
  cartItems: CartItem[];
  onPlaceOrder: (orderDetails: CartItem[]) => void;
}

interface FormData {
  email: string; // Note: email is part of FormData for shipping/billing
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

// Define specific keys for the errors state
type ErrorKeys = keyof FormData | 'payment' | 'emailContact';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onPlaceOrder }) => {
  const [contactInfo, setContactInfo] = useState({ email: '' });
  const [shippingAddress, setShippingAddress] = useState<FormData>({
    name: '', email: '', addressLine1: '', addressLine2: '', city: '', postalCode: '', country: 'United States'
  });
  const [billingAddress, setBillingAddress] = useState<FormData>({
    name: '', email: '', addressLine1: '', addressLine2: '', city: '', postalCode: '', country: 'United States'
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentData>({
    cardNumber: '', expiryDate: '', cvc: ''
  });
  const [useSameAddressForBilling, setUseSameAddressForBilling] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ErrorKeys, string>>>({});

  useEffect(() => {
    if (useSameAddressForBilling) {
      setBillingAddress(shippingAddress);
    }
  }, [shippingAddress, useSameAddressForBilling]);

  const handleInputChange = <TState extends Record<string, any>>(
    setter: React.Dispatch<React.SetStateAction<TState>>,
    field: keyof TState,
    errorKeyToClear?: ErrorKeys
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // If errorKeyToClear is provided, use it. Otherwise, assume field name is the error key.
    // This is safe for FormData fields as keyof FormData is part of ErrorKeys.
    const keyToUseForErrorClearing = errorKeyToClear || (field as ErrorKeys);
    if (errors[keyToUseForErrorClearing]) {
      setErrors(prev => ({ ...prev, [keyToUseForErrorClearing]: undefined }));
    }
  };
  
  // Specific handler for contactInfo.email as its error key is 'emailContact'
  const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ email: e.target.value });
    if (errors.emailContact) {
      setErrors(prev => ({ ...prev, emailContact: undefined }));
    }
  };


  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const shippingCost = 0; // Placeholder
  const taxAmount = subtotal * 0.00; // Placeholder 0% tax
  const grandTotal = subtotal + shippingCost + taxAmount;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<ErrorKeys, string>> = {};
    if (!contactInfo.email.trim() || !/\S+@\S+\.\S+/.test(contactInfo.email)) newErrors.emailContact = 'Valid email is required.';
    
    // Validate shipping address
    if (!shippingAddress.name.trim()) newErrors.name = 'Full name is required.';
    if (!shippingAddress.addressLine1.trim()) newErrors.addressLine1 = 'Address is required.';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required.';
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    if (!shippingAddress.country.trim()) newErrors.country = 'Country is required.';
    // Note: shippingAddress.email is in FormData, but not explicitly in the form UI. If added, validate it.

    if (!useSameAddressForBilling) {
      if (!billingAddress.name.trim()) newErrors.name = 'Billing full name is required.'; // Could use specific keys like billingName
      if (!billingAddress.addressLine1.trim()) newErrors.addressLine1 = 'Billing address is required.';
      if (!billingAddress.city.trim()) newErrors.city = 'Billing city is required.';
      if (!billingAddress.postalCode.trim()) newErrors.postalCode = 'Billing postal code is required.';
      if (!billingAddress.country.trim()) newErrors.country = 'Billing country is required.';
    }
    
    // Basic mock payment validation (presence)
    if (!paymentDetails.cardNumber.trim()) newErrors.payment = 'Card number is required.';
    else if (!paymentDetails.expiryDate.trim()) newErrors.payment = 'Expiry date is required.';
    else if (!paymentDetails.cvc.trim()) newErrors.payment = 'CVC is required.';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessingOrder(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    onPlaceOrder(cartItems);
    setIsProcessingOrder(false);
  };

  if (cartItems.length === 0 && !isProcessingOrder) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center animate-fadeIn">
        <h1 className="text-3xl font-semibold text-luxury-text mb-6">Your Cart is Empty</h1>
        <p className="text-luxury-text/80 mb-8">Please add items to your cart before proceeding to checkout.</p>
        <Button href="#shop-gallery" variant="primary" size="large">
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  const renderError = (field: ErrorKeys) => {
    return errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-semibold text-luxury-text mb-10 md:mb-12 text-center">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Forms Section */}
        <div className="lg:w-2/3 space-y-10">
          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-medium text-luxury-text mb-6 border-b border-luxury-subtle pb-3">Contact Information</h2>
            <div>
              <label htmlFor="emailContact" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Email Address</label>
              <input type="email" id="emailContact" value={contactInfo.email} onChange={handleContactEmailChange} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" placeholder="your.email@example.com" />
              {renderError('emailContact')}
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-xl font-medium text-luxury-text mb-6 border-b border-luxury-subtle pb-3">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                <input type="text" id="name" value={shippingAddress.name} onChange={handleInputChange(setShippingAddress, 'name')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('name')}
              </div>
              <div> 
                <label htmlFor="addressLine1" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Address Line 1</label>
                <input type="text" id="addressLine1" value={shippingAddress.addressLine1} onChange={handleInputChange(setShippingAddress, 'addressLine1')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('addressLine1')}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="addressLine2" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Address Line 2 <span className="text-luxury-text/50 normal-case">(Optional)</span></label>
                <input type="text" id="addressLine2" value={shippingAddress.addressLine2} onChange={handleInputChange(setShippingAddress, 'addressLine2')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('addressLine2')}
              </div>
              <div>
                <label htmlFor="city" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">City</label>
                <input type="text" id="city" value={shippingAddress.city} onChange={handleInputChange(setShippingAddress, 'city')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('city')}
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Postal Code</label>
                <input type="text" id="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange(setShippingAddress, 'postalCode')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('postalCode')}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="country" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Country</label>
                <input type="text" id="country" value={shippingAddress.country} onChange={handleInputChange(setShippingAddress, 'country')} className="w-full bg-white border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                {renderError('country')}
              </div>
            </div>
          </section>

          {/* Billing Address */}
          <section>
            <h2 className="text-xl font-medium text-luxury-text mb-6 border-b border-luxury-subtle pb-3">Billing Address</h2>
            <div className="flex items-center mb-5">
              <input
                type="checkbox"
                id="sameAsShipping"
                checked={useSameAddressForBilling}
                onChange={(e) => setUseSameAddressForBilling(e.target.checked)}
                className="h-4 w-4 text-luxury-accent border-luxury-subtle rounded focus:ring-luxury-accent"
              />
              <label htmlFor="sameAsShipping" className="ml-2 text-sm text-luxury-text">Same as shipping address</label>
            </div>
            {!useSameAddressForBilling && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                    <label htmlFor="billingName" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                    <input type="text" id="billingName" value={billingAddress.name} onChange={handleInputChange(setBillingAddress, 'name')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                    {renderError('name')} 
                </div>
                 <div> 
                    <label htmlFor="billingAddressLine1" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Address Line 1</label>
                    <input type="text" id="billingAddressLine1" value={billingAddress.addressLine1} onChange={handleInputChange(setBillingAddress, 'addressLine1')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                     {renderError('addressLine1')}
                </div>
                {/* Add other billing fields as needed, similar to shipping, e.g., city, postalCode, country */}
                 <div className="md:col-span-2">
                    <label htmlFor="billingAddressLine2" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Address Line 2 <span className="text-luxury-text/50 normal-case">(Optional)</span></label>
                    <input type="text" id="billingAddressLine2" value={billingAddress.addressLine2} onChange={handleInputChange(setBillingAddress, 'addressLine2')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                </div>
                <div>
                    <label htmlFor="billingCity" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">City</label>
                    <input type="text" id="billingCity" value={billingAddress.city} onChange={handleInputChange(setBillingAddress, 'city')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                    {renderError('city')}
                </div>
                <div>
                    <label htmlFor="billingPostalCode" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Postal Code</label>
                    <input type="text" id="billingPostalCode" value={billingAddress.postalCode} onChange={handleInputChange(setBillingAddress, 'postalCode')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                    {renderError('postalCode')}
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="billingCountry" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Country</label>
                    <input type="text" id="billingCountry" value={billingAddress.country} onChange={handleInputChange(setBillingAddress, 'country')} className="w-full bg-white border-luxury-subtle rounded p-3" />
                    {renderError('country')}
                </div>
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-xl font-medium text-luxury-text mb-6 border-b border-luxury-subtle pb-3">Payment Method</h2>
            <div className="bg-white border border-luxury-subtle p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                    <CreditCardIcon className="w-6 h-6 text-luxury-accent mr-3"/>
                    <span className="text-luxury-text font-medium">Credit Card</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">Card Number</label>
                        <input type="text" id="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange(setPaymentDetails, 'cardNumber', 'payment')} className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">Expiry Date</label>
                            <input type="text" id="expiryDate" value={paymentDetails.expiryDate} onChange={handleInputChange(setPaymentDetails, 'expiryDate', 'payment')} className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3" placeholder="MM / YY" />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">CVC</label>
                            <input type="text" id="cvc" value={paymentDetails.cvc} onChange={handleInputChange(setPaymentDetails, 'cvc', 'payment')} className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3" placeholder="•••" />
                        </div>
                    </div>
                    {renderError('payment')}
                </div>
            </div>
            <p className="text-xs text-luxury-text/60 mt-4 text-center">
                Your payment information is securely processed. (This is a mock form).
            </p>
          </section>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-white border border-luxury-subtle p-6 md:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium text-luxury-text mb-6 border-b border-luxury-subtle pb-3">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between items-start text-sm">
                  <div className="flex items-start">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-16 object-cover rounded mr-3 border border-luxury-subtle/50"/>
                    <div>
                        <p className="text-luxury-text font-medium">{item.product.name}</p>
                        <p className="text-luxury-text/70">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-luxury-text">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 py-4 border-t border-b border-luxury-subtle">
              <div className="flex justify-between text-sm text-luxury-text/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-luxury-text/80">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-luxury-text/80">
                <span>Taxes (Est.)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg text-luxury-text mt-4 mb-8">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              variant="primary"
              size="large"
              className="w-full"
              disabled={isProcessingOrder || cartItems.length === 0}
            >
              {isProcessingOrder ? (
                <div className="flex items-center justify-center">
                  <Spinner className="w-5 h-5 mr-2" /> Processing...
                </div>
              ) : (
                'Place Order'
              )}
            </Button>
          </div>
        </div>
      </div>
       <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #EAEAEA; /* luxury-subtle */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #B08D57; /* luxury-accent */
          }
        `}</style>
    </div>
  );
};

export default CheckoutPage;
