'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  onLogout: () => void;
}

export default function UserProfile({ onLogout }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses' | 'settings'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210'
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalOffers: true,
    smsNotifications: false
  });
  const router = useRouter();

  const orders = [
    {
      id: 'ORD001',
      restaurant: 'Chennai Tiffin Center',
      items: ['Masala Dosa', 'Filter Coffee'],
      total: 160,
      status: 'delivered',
      date: '2024-01-15',
      image: 'https://readdy.ai/api/search-image?query=Perfect%20golden%20crispy%20masala%20dosa%20with%20spiced%20potato%20filling%20served%20with%20coconut%20chutney%20and%20sambar%20on%20banana%20leaf%20traditional%20South%20Indian%20breakfast%20commercial%20food%20photography&width=100&height=80&seq=order1&orientation=landscape'
    },
    {
      id: 'ORD002',
      restaurant: 'Chettinad Spice Kitchen',
      items: ['Chettinad Chicken Curry', 'Pepper Chicken'],
      total: 648,
      status: 'preparing',
      date: '2024-01-16',
      image: 'https://readdy.ai/api/search-image?query=Rich%20spicy%20Chettinad%20chicken%20curry%20with%20tender%20chicken%20pieces%20traditional%20South%20Indian%20spices%20and%20coconut%20gravy%20in%20authentic%20brass%20vessel%20commercial%20food%20photography&width=100&height=80&seq=order2&orientation=landscape'
    }
  ];

  const [favorites, setFavorites] = useState([
    {
      id: 7,
      name: 'Chennai Tiffin Center',
      cuisine: 'South Indian',
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20restaurant%20with%20banana%20leaves%20dosa%20counter%20authentic%20Tamil%20Nadu%20ambiance%20brass%20vessels%20and%20warm%20wooden%20interiors%20Chennai%20style%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=100&height=80&seq=fav1&orientation=landscape'
    },
    {
      id: 9,
      name: 'Chettinad Spice Kitchen',
      cuisine: 'Chettinad',
      rating: 4.7,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20Chettinad%20restaurant%20with%20rich%20wooden%20architecture%20traditional%20Tamil%20heritage%20decor%20antique%20brass%20utensils%20and%20authentic%20South%20Indian%20spice%20kitchen%20atmosphere%20Chennai%20restaurant%20commercial%20photography&width=100&height=80&seq=fav2&orientation=landscape'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Anna Nagar, Chennai - 600040',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '45 IT Corridor, OMR, Chennai - 600096',
      isDefault: false
    }
  ]);

  const handleReorder = (orderId: string) => {
    router.push(`/restaurant/${orderId === 'ORD001' ? '7' : '9'}`);
  };

  const handleRemoveFavorite = (restaurantId: number) => {
    setFavorites(favorites.filter(fav => fav.id !== restaurantId));
  };

  const handleSetDefaultAddress = (addressId: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleDeleteAddress = (addressId: number) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };

  const handleSaveUserInfo = () => {
    setIsEditing(false);
    // Simulate saving data
    console.log('User info saved:', userInfo);
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-3xl text-orange-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-bag-line"></i>
              </div>
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'favorites' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-heart-line"></i>
              </div>
              Favorites ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'addresses' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-map-pin-line"></i>
              </div>
              Addresses ({addresses.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'settings' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-settings-line"></i>
              </div>
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-logout-box-line"></i>
              </div>
              Logout
            </button>
          </nav>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order History</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-4">
                        <img
                          src={order.image}
                          alt={order.restaurant}
                          className="w-16 h-16 rounded-lg object-cover object-top"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{order.restaurant}</h4>
                          <p className="text-sm text-gray-600 mb-1">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {order.items.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status === 'delivered' ? 'Delivered' : 'Preparing'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <span>{order.date}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleReorder(order.id)}
                          className="text-orange-500 hover:text-orange-600 cursor-pointer"
                        >
                          Reorder
                        </button>
                        <button className="text-gray-500 hover:text-gray-600 cursor-pointer">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Favorite Restaurants</h3>
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-heart-line text-2xl text-gray-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h4>
                  <p className="text-gray-600 mb-4">Start adding restaurants to your favorites</p>
                  <Link href="/search" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer">
                    Explore Restaurants
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <Link href={`/restaurant/${restaurant.id}`}>
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-16 h-16 rounded-lg object-cover object-top cursor-pointer"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link href={`/restaurant/${restaurant.id}`}>
                            <h4 className="font-semibold text-gray-900 hover:text-orange-600 cursor-pointer">{restaurant.name}</h4>
                          </Link>
                          <p className="text-gray-600">{restaurant.cuisine}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-star-fill text-orange-400 text-sm"></i>
                            </div>
                            <span className="text-sm text-gray-600">{restaurant.rating}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(restaurant.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <i className="ri-heart-fill"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Addresses</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer">
                  Add New Address
                </button>
              </div>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{address.type}</h4>
                          {address.isDefault && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{address.address}</p>
                      </div>
                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <button 
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-orange-500 hover:text-orange-600 cursor-pointer text-sm"
                          >
                            Set Default
                          </button>
                        )}
                        <button className="text-orange-500 hover:text-orange-600 cursor-pointer text-sm">
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 hover:text-red-600 cursor-pointer text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Personal Information</h4>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-orange-500 hover:text-orange-600 cursor-pointer"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={handleSaveUserInfo}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" 
                        checked={notifications.orderUpdates}
                        onChange={() => handleNotificationChange('orderUpdates')}
                      />
                      <span className="ml-2 text-gray-700">Order updates</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" 
                        checked={notifications.promotionalOffers}
                        onChange={() => handleNotificationChange('promotionalOffers')}
                      />
                      <span className="ml-2 text-gray-700">Promotional offers</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" 
                        checked={notifications.smsNotifications}
                        onChange={() => handleNotificationChange('smsNotifications')}
                      />
                      <span className="ml-2 text-gray-700">SMS notifications</span>
                    </label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <button className="text-orange-500 hover:text-orange-600 cursor-pointer">
                      Change Password
                    </button>
                    <br />
                    <button className="text-red-500 hover:text-red-600 cursor-pointer">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}