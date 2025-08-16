
'use client';
import { useCart } from '../lib/CartContext';
import { useState } from 'react';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const deliveryFee = 49;
  const taxAmount = Math.round(getTotalPrice() * 0.05);
  const finalTotal = getTotalPrice() + deliveryFee + taxAmount;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setShowSuccess(true);
      clearCart();
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-check-line text-3xl text-green-600"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
        <p className="text-gray-600 mb-6">You will receive a confirmation shortly. Track your order for live updates.</p>
        <Link 
          href="/track" 
          onClick={onClose}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer inline-block"
        >
          Track Order
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>

      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Cart ({getTotalItems()})</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shopping-cart-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some delicious items to get started</p>
                <button
                  onClick={onClose}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover object-top flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.restaurantName}</p>
                        <p className="text-lg font-bold text-orange-600">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer"
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="text-lg font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                      <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{taxAmount}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Checkout ₹${finalTotal}`
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {showSuccess && <SuccessPopup />}
    </>
  );
}
