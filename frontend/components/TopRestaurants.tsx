'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  priceRange: string;
  offer: string;
  isPromoted: boolean;
}

export default function TopRestaurants() {
  const [filterType, setFilterType] = useState<'all' | 'promoted' | 'fastDelivery' | 'topRated'>('all');
  const router = useRouter();

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Mario's Pizzeria",
      cuisine: "Italian, Pizza",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      image: "https://readdy.ai/api/search-image?query=Cozy%20Italian%20pizzeria%20restaurant%20interior%20with%20warm%20lighting%20wood%20fired%20oven%20and%20authentic%20atmosphere%20perfect%20for%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography%20style&width=400&height=250&seq=rest1&orientation=landscape",
      priceRange: "₹200-400",
      offer: "50% OFF up to ₹100",
      isPromoted: true
    },
    {
      id: 2,
      name: "Spice Paradise",
      cuisine: "Indian, Biryani",
      rating: 4.3,
      deliveryTime: "35-40 mins",
      image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20restaurant%20with%20vibrant%20decor%20authentic%20spices%20and%20warm%20ambiance%20perfect%20for%20biryani%20and%20curry%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest2&orientation=landscape",
      priceRange: "₹300-600",
      offer: "20% OFF",
      isPromoted: false
    },
    {
      id: 3,
      name: "Burger Junction",
      cuisine: "American, Burgers",
      rating: 4.6,
      deliveryTime: "20-25 mins",
      image: "https://readdy.ai/api/search-image?query=Modern%20American%20burger%20restaurant%20with%20industrial%20design%20fresh%20ingredients%20display%20and%20appetizing%20atmosphere%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography%20style&width=400&height=250&seq=rest3&orientation=landscape",
      priceRange: "₹150-350",
      offer: "Buy 2 Get 1 Free",
      isPromoted: true
    },
    {
      id: 4,
      name: "Sweet Dreams Bakery",
      cuisine: "Desserts, Bakery",
      rating: 4.7,
      deliveryTime: "15-20 mins",
      image: "https://readdy.ai/api/search-image?query=Elegant%20bakery%20display%20case%20with%20beautiful%20cakes%20pastries%20and%20desserts%20in%20clean%20modern%20setting%20with%20soft%20lighting%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest4&orientation=landscape",
      priceRange: "₹100-300",
      offer: "Free delivery",
      isPromoted: false
    },
    {
      id: 5,
      name: "Dragon Palace",
      cuisine: "Chinese, Asian",
      rating: 4.4,
      deliveryTime: "30-35 mins",
      image: "https://readdy.ai/api/search-image?query=Authentic%20Chinese%20restaurant%20interior%20with%20traditional%20red%20lanterns%20oriental%20decor%20and%20elegant%20dining%20atmosphere%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography%20style&width=400&height=250&seq=rest5&orientation=landscape",
      priceRange: "₹250-500",
      offer: "₹125 OFF above ₹499",
      isPromoted: false
    },
    {
      id: 6,
      name: "Café Delight",
      cuisine: "Coffee, Snacks",
      rating: 4.2,
      deliveryTime: "10-15 mins",
      image: "https://readdy.ai/api/search-image?query=Cozy%20modern%20coffee%20shop%20with%20comfortable%20seating%20artisanal%20coffee%20setup%20and%20warm%20welcoming%20atmosphere%20perfect%20for%20cafe%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest6&orientation=landscape",
      priceRange: "₹80-250",
      offer: "Coffee + Snack Combo",
      isPromoted: true
    },
    {
      id: 7,
      name: "Chennai Tiffin Center",
      cuisine: "South Indian, Breakfast",
      rating: 4.8,
      deliveryTime: "15-20 mins",
      image: "https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20restaurant%20with%20banana%20leaves%20dosa%20counter%20authentic%20Tamil%20Nadu%20ambiance%20brass%20vessels%20and%20warm%20wooden%20interiors%20Chennai%20style%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest7&orientation=landscape",
      priceRange: "₹80-200",
      offer: "Breakfast Special ₹99",
      isPromoted: true
    },
    {
      id: 8,
      name: "Madras Meals",
      cuisine: "South Indian, Thali",
      rating: 4.6,
      deliveryTime: "25-30 mins",
      image: "https://readdy.ai/api/search-image?query=Authentic%20Madras%20style%20restaurant%20with%20traditional%20brass%20thali%20plates%20colorful%20rangoli%20patterns%20and%20classic%20Tamil%20Nadu%20decor%20banana%20leaf%20dining%20experience%20Chennai%20restaurant%20commercial%20photography&width=400&height=250&seq=rest8&orientation=landscape",
      priceRange: "₹150-400",
      offer: "Full Meals ₹199",
      isPromoted: false
    },
    {
      id: 9,
      name: "Chettinad Spice Kitchen",
      cuisine: "Chettinad, South Indian",
      rating: 4.7,
      deliveryTime: "30-35 mins",
      image: "https://readdy.ai/api/search-image?query=Elegant%20Chettinad%20restaurant%20with%20rich%20wooden%20architecture%20traditional%20Tamil%20heritage%20decor%20antique%20brass%20utensils%20and%20authentic%20South%20Indian%20spice%20kitchen%20atmosphere%20Chennai%20restaurant%20commercial%20photography&width=400&height=250&seq=rest9&orientation=landscape",
      priceRange: "₹200-500",
      offer: "Chettinad Special 30% OFF",
      isPromoted: true
    }
  ];

  const getFilteredRestaurants = () => {
    switch (filterType) {
      case 'promoted':
        return restaurants.filter(r => r.isPromoted);
      case 'fastDelivery':
        return restaurants.filter(r => parseInt(r.deliveryTime) <= 20);
      case 'topRated':
        return restaurants.filter(r => r.rating >= 4.5);
      default:
        return restaurants;
    }
  };

  const handleViewAllRestaurants = () => {
    router.push('/search');
  };

  return (
    <section id="restaurants" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Top-rated restaurants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best restaurants near you with highest ratings and fastest delivery
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              filterType === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            All Restaurants
          </button>
          <button
            onClick={() => setFilterType('promoted')}
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              filterType === 'promoted' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            Promoted
          </button>
          <button
            onClick={() => setFilterType('fastDelivery')}
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              filterType === 'fastDelivery' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            Fast Delivery
          </button>
          <button
            onClick={() => setFilterType('topRated')}
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
              filterType === 'topRated' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            Top Rated
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredRestaurants().map((restaurant) => (
            <Link 
              key={restaurant.id}
              href={`/restaurant/${restaurant.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer block"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
                {restaurant.isPromoted && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Promoted
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-star-fill text-orange-400 text-sm"></i>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {restaurant.offer}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-time-line text-gray-400"></i>
                      </div>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-money-rupee-circle-line text-gray-400"></i>
                      </div>
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer font-medium">
                  Order Now
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllRestaurants}
            className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer font-medium"
          >
            View All Restaurants
          </button>
        </div>
      </div>
    </section>
  );
}