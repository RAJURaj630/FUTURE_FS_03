
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors duration-200">
                <span className="font-pacifico">FoodieAI</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/#restaurants" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                  Restaurants
                </Link>
                <Link href="/#categories" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                  Categories
                </Link>
                <Link href="/search" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                  Search
                </Link>
                <Link href="/track" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                  Track Order
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shopping-cart-line text-xl"></i>
                  </div>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <Link href="/account" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all duration-200 hover:shadow-lg whitespace-nowrap cursor-pointer">
                  Account
                </Link>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-xl"></i>
                </div>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-menu-line text-xl"></i>
                </div>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/#restaurants" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium px-4">
                  Restaurants
                </Link>
                <Link href="/#categories" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium px-4">
                  Categories
                </Link>
                <Link href="/search" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium px-4">
                  Search
                </Link>
                <Link href="/track" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium px-4">
                  Track Order
                </Link>
                <Link href="/account" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all duration-200 hover:shadow-lg mx-4 whitespace-nowrap cursor-pointer">
                  Account
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
