
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface OrderStatus {
  step: number;
  title: string;
  description: string;
  time?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('ORD001');
  const [showPhoneCall, setShowPhoneCall] = useState(false);
  const [callType, setCallType] = useState<'restaurant' | 'delivery' | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([
    {
      step: 1,
      title: 'Order Confirmed',
      description: 'Your order has been confirmed by the restaurant',
      time: '2:45 PM',
      isCompleted: true,
      isActive: false
    },
    {
      step: 2,
      title: 'Preparing',
      description: 'Restaurant is preparing your delicious food',
      time: '2:50 PM',
      isCompleted: true,
      isActive: false
    },
    {
      step: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way to your location',
      time: '3:15 PM',
      isCompleted: false,
      isActive: true
    },
    {
      step: 4,
      title: 'Delivered',
      description: 'Your order has been delivered successfully',
      isCompleted: false,
      isActive: false
    }
  ]);

  const currentOrder = {
    id: 'ORD001',
    restaurant: {
      name: 'Chennai Tiffin Center',
      phone: '+91 98765 11111',
      address: '42 T. Nagar Main Road, Chennai'
    },
    deliveryPartner: {
      name: 'Ravi Kumar',
      phone: '+91 98765 99999',
      vehicle: 'TN 09 AB 1234'
    },
    items: [
      { name: 'Masala Dosa', quantity: 2, price: 240 },
      { name: 'Filter Coffee', quantity: 2, price: 80 }
    ],
    total: 369,
    estimatedTime: '15-20 mins',
    deliveryAddress: '123 Anna Nagar, Chennai - 600040'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStatuses(current => {
        const activeIndex = current.findIndex(status => status.isActive);
        if (activeIndex < current.length - 1 && Math.random() > 0.85) {
          return current.map((status, index) => {
            if (index === activeIndex) {
              return { ...status, isCompleted: true, isActive: false };
            } else if (index === activeIndex + 1) {
              return { ...status, isActive: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            }
            return status;
          });
        }
        return current;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleCall = (type: 'restaurant' | 'delivery') => {
    setCallType(type);
    setShowPhoneCall(true);
    setTimeout(() => {
      setShowPhoneCall(false);
      setCallType(null);
    }, 3000);
  };

  const handleSendMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const PhoneCallPopup = () => (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <i className="ri-phone-line text-3xl text-green-600"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Calling...</h3>
        <p className="text-gray-600">
          {callType === 'restaurant' ? currentOrder.restaurant.phone : currentOrder.deliveryPartner.phone}
        </p>
      </div>
    </div>
  );

  const MessagePopup = () => (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-message-2-line text-3xl text-blue-600"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">Your delivery partner will receive your message shortly.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Order ID: {currentOrder.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
              
              <div className="space-y-8">
                {orderStatuses.map((status, index) => (
                  <div key={status.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        status.isCompleted 
                          ? 'bg-green-500 border-green-500' 
                          : status.isActive 
                            ? 'bg-orange-500 border-orange-500 animate-pulse' 
                            : 'bg-gray-100 border-gray-300'
                      }`}>
                        {status.isCompleted ? (
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-check-line text-white text-lg"></i>
                          </div>
                        ) : status.isActive ? (
                          <div className="w-6 h-6 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center text-gray-400">
                            {status.step}
                          </div>
                        )}
                      </div>
                      {index < orderStatuses.length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${
                          status.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${
                          status.isCompleted ? 'text-green-600' : 
                          status.isActive ? 'text-orange-600' : 'text-gray-500'
                        }`}>
                          {status.title}
                        </h3>
                        {status.time && (
                          <span className="text-sm text-gray-500">{status.time}</span>
                        )}
                      </div>
                      <p className="text-gray-600">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Live Location</h2>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-transparent"></div>
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                    <i className="ri-map-pin-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery in Progress</h3>
                  <p className="text-gray-600">Your delivery partner is on the way!</p>
                  <p className="text-sm text-orange-600 font-medium mt-2">ETA: {currentOrder.estimatedTime}</p>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Details</h3>
              
              <div className="space-y-3 mb-4">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">₹{item.price}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>₹{currentOrder.total}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Restaurant</h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{currentOrder.restaurant.name}</p>
                <p className="text-gray-600 text-sm">{currentOrder.restaurant.address}</p>
                <button 
                  onClick={() => handleCall('restaurant')}
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-phone-line"></i>
                  </div>
                  Call Restaurant
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Partner</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-orange-600 text-xl"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentOrder.deliveryPartner.name}</p>
                  <p className="text-sm text-gray-500">{currentOrder.deliveryPartner.vehicle}</p>
                </div>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => handleCall('delivery')}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-phone-line"></i>
                  </div>
                  Call Delivery Partner
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-message-2-line"></i>
                  </div>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {showPhoneCall && <PhoneCallPopup />}
      {showMessage && <MessagePopup />}
    </div>
  );
}
