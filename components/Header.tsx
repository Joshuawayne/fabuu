
import React, { useState, useEffect } from 'react';
import FabuLogo from './icons/FabuLogo';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import { NAVIGATION_LINKS } from '../constants';
import { NavItem } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onCartIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartIconClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerBaseClass = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
  const scrolledClass = "bg-luxury-bg/95 backdrop-blur-sm shadow-subtle py-3 md:py-4 border-b border-luxury-subtle";
  const unscrolledClass = "bg-transparent py-5 md:py-6";

  const logoColor = isScrolled || isMenuOpen ? '#333333' : '#333333'; // luxury-text

  return (
    <header 
      className={`${headerBaseClass} ${
        isScrolled || isMenuOpen ? scrolledClass : unscrolledClass
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center space-x-2 text-luxury-text hover:opacity-80 transition-opacity">
          <FabuLogo className="h-8 md:h-9" color={logoColor} accentColor="#B08D57" />
        </a>

        <div className="flex items-center">
          {/* Desktop Navigation - Standard Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 mr-6 lg:mr-8">
            {NAVIGATION_LINKS.map((item: NavItem) => (
              <a
                key={item.label}
                href={item.href}
                className="text-luxury-text hover:text-luxury-accent font-medium tracking-wide transition-colors duration-300 ease-in-out pb-1 border-b-2 border-transparent hover:border-luxury-accent/70"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cart Icon */}
          <div className="relative mr-2 md:mr-0">
            <button 
              onClick={onCartIconClick}
              aria-label="View shopping cart" 
              className="text-luxury-text hover:text-luxury-accent p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5 md:w-6 md:h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-accent text-white text-[10px] font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-luxury-text hover:text-luxury-accent p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-colors"
            >
              {isMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-luxury-bg shadow-lg py-4 animate-fadeIn border-t border-luxury-subtle">
          <nav className="flex flex-col items-center space-y-2">
            {NAVIGATION_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)} 
                className="text-luxury-text hover:text-luxury-accent text-base font-medium py-3 px-4 transition-colors w-full text-center hover:bg-luxury-subtle/50 rounded-md"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
