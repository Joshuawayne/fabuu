
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import SectionTitle from './components/SectionTitle';
import Button from './components/Button';
import ReceiptModal from './components/ReceiptModal';
import CartModal from './components/CartModal';
import CheckoutReceiptModal from './components/CheckoutReceiptModal';
import OurStoryPage from './components/OurStoryPage';
import ShopPage from './components/ShopPage'; 
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './components/ContactPage'; // Import ContactPage
import CircularText from './components/CircularText';
import BrandMarquee from './components/BrandMarquee'; 
import ChatbotWidget from './components/ChatbotWidget'; // Import ChatbotWidget
import { SAMPLE_PRODUCTS, FEATURED_BRANDS } from './constants'; 
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 3);
  const allProducts = SAMPLE_PRODUCTS;

  const [selectedProductForReceipt, setSelectedProductForReceipt] = useState<Product | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutReceiptModalOpen, setIsCheckoutReceiptModalOpen] = useState(false);
  const [checkoutOrderDetails, setCheckoutOrderDetails] = useState<CartItem[] | null>(null);

  const [activeView, setActiveView] = useState(determineActiveView());

  function determineActiveView() {
    if (typeof window !== 'undefined') {
        switch (window.location.hash) {
        case '#our-story':
            return 'our-story';
        case '#shop-gallery': 
            return 'shop-gallery';
        case '#checkout': 
            return 'checkout';
        case '#contact-page': // Added new contact page view
            return 'contact-page';
        case '#shop': 
            // If #shop is part of homepage, treat as home and scroll.
            // If #shop should be the shop gallery, then: return 'shop-gallery';
            return 'home'; 
        case '#contact': // Old contact hash, redirect to new one or treat as home
            window.location.hash = '#contact-page'; // Or handle as part of home
            return 'contact-page'; 
        case '#home':
        default:
            return 'home';
        }
    }
    return 'home';
  }

  useEffect(() => {
    const handleHashChange = () => {
      const newView = determineActiveView();
      setActiveView(newView);
      
      const scrollablePageViews = ['our-story', 'shop-gallery', 'checkout', 'contact-page'];
      if (scrollablePageViews.includes(newView) || window.location.hash === '' || window.location.hash === '#home') {
        window.scrollTo(0, 0); 
      } else { // Handle specific homepage section scrolls
        const elementId = window.location.hash.substring(1);
        const section = document.getElementById(elementId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);


  const handleViewReceipt = (product: Product) => {
    setSelectedProductForReceipt(product);
    setIsReceiptModalOpen(true);
  };

  const handleCloseReceipt = () => {
    setIsReceiptModalOpen(false);
    setTimeout(() => {
      setSelectedProductForReceipt(null);
    }, 300);
  };

  const handleAddToCart = (productToAdd: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product: productToAdd, quantity: 1 }];
    });
  };
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const finalizeOrderAndDisplayReceipt = (submittedCartItems: CartItem[]) => {
    if (submittedCartItems.length === 0) return;
    setCheckoutOrderDetails([...submittedCartItems]);
    setIsCheckoutReceiptModalOpen(true);
    setCartItems([]); 
    window.location.hash = '#home'; 
  };

  const handleCloseCheckoutReceipt = () => {
    setIsCheckoutReceiptModalOpen(false);
    setTimeout(() => {
      setCheckoutOrderDetails(null);
    }, 300);
  };
  
  const proceedToCheckoutPage = () => {
    closeCartModal();
    window.location.hash = '#checkout';
  };

  const renderMainContent = () => {
    if (activeView === 'our-story') {
      return <OurStoryPage />;
    }
    if (activeView === 'shop-gallery') {
      return <ShopPage 
                products={allProducts} 
                onViewReceipt={handleViewReceipt} 
                onAddToCart={handleAddToCart} 
             />;
    }
    if (activeView === 'checkout') { 
      return <CheckoutPage 
                cartItems={cartItems}
                onPlaceOrder={finalizeOrderAndDisplayReceipt} 
             />;
    }
    if (activeView === 'contact-page') { // Render new ContactPage
      return <ContactPage />;
    }
    
    // Default to 'home' view
    return (
      <>
        <HeroSection />

        <section className="py-16 md:py-20 bg-luxury-bg flex justify-center items-center overflow-hidden">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <CircularText
              text="FABU • TIMELESS • ELEGANCE • MODERN • STYLE •"
              spinDuration={30} 
              onHover="speedUp"
              radius={70} 
              className="w-48 h-48 md:w-56 md:h-56 text-luxury-accent/70"
            />
          </div>
        </section>

        <section id="featured" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Curated Selection" subtitle="Signature Pieces" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredProducts.map((product: Product, index: number) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewReceipt={handleViewReceipt}
                  onAddToCart={handleAddToCart}
                  animationDelay={`${index * 100}ms`} 
                />
              ))}
            </div>
            <div className="text-center mt-16">
              <Button href="#shop-gallery" variant="primary" size="large" showArrow={true}>Explore All</Button>
            </div>
          </div>
        </section>

        <section id="shop" className="py-20 md:py-32 bg-luxury-bg">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="The Collection Preview" subtitle="Discover Your Next Statement" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {featuredProducts.map((product: Product, index: number) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewReceipt={handleViewReceipt}
                  onAddToCart={handleAddToCart}
                  animationDelay={`${index * 150}ms`}
                />
              ))}
            </div>
             <div className="text-center mt-16">
              <Button href="#shop-gallery" variant="secondary" size="large">View Full Collection</Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white border-t border-b border-luxury-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Collaborations & Features" subtitle="Trusted By The Finest" />
            </div>
            <BrandMarquee brands={FEATURED_BRANDS} speed="normal" />
        </section>


        <section id="contact" className="py-20 md:py-32 bg-luxury-bg border-t border-luxury-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Connect With Us" subtitle="Inquiries & Collaborations" />
            <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md border border-luxury-subtle/80">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                  <input type="text" name="name" id="name" className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" placeholder="Your Full Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Email Address</label>
                  <input type="email" name="email" id="email" className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-luxury-text/70 mb-1.5 tracking-wider uppercase">Message</label>
                  <textarea name="message" id="message" rows={5} className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" placeholder="Share your thoughts..."></textarea>
                </div>
                <div className="text-center pt-2">
                  <Button type="submit" variant="primary" size="large" className="w-full sm:w-auto">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-luxury-bg text-luxury-text">
      <Header cartItemCount={totalCartItems} onCartIconClick={openCartModal} />
      <main className="flex-grow pt-16 md:pt-20"> 
        {renderMainContent()}
      </main>
      <ChatbotWidget /> {/* Render ChatbotWidget globally */}
      <Footer />

      {selectedProductForReceipt && (
        <ReceiptModal
          product={selectedProductForReceipt}
          isOpen={isReceiptModalOpen}
          onClose={handleCloseReceipt}
        />
      )}

      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={proceedToCheckoutPage}
      />

      {checkoutOrderDetails && (
          <CheckoutReceiptModal
            isOpen={isCheckoutReceiptModalOpen}
            onClose={handleCloseCheckoutReceipt}
            orderDetails={checkoutOrderDetails}
        />
      )}
    </div>
  );
};

export default App;