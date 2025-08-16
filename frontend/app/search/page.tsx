
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  priceRange: string;
  offer: string;
  location: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    deliveryTime: '',
    priceRange: '',
    sortBy: 'relevance'
  });

  const allRestaurants: Restaurant[] = [
    {
      id: 1,
      name: "Mario's Pizzeria",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-30",
      image: "https://readdy.ai/api/search-image?query=Cozy%20Italian%20pizzeria%20restaurant%20interior%20with%20warm%20lighting%20wood%20fired%20oven%20and%20authentic%20atmosphere%20perfect%20for%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography%20style&width=400&height=250&seq=rest1&orientation=landscape",
      priceRange: "₹200-400",
      offer: "50% OFF up to ₹100",
      location: "Downtown Area"
    },
    {
      id: 2,
      name: "Spice Paradise",
      cuisine: "Indian",
      rating: 4.3,
      deliveryTime: "35-40",
      image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20restaurant%20with%20vibrant%20decor%20authentic%20spices%20and%20warm%20ambiance%20perfect%20for%20biryani%20and%20curry%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest2&orientation=landscape",
      priceRange: "₹300-600",
      offer: "20% OFF",
      location: "Heritage District"
    },
    {
      id: 7,
      name: "Chennai Tiffin Center",
      cuisine: "South Indian",
      rating: 4.8,
      deliveryTime: "15-20",
      image: "https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20restaurant%20with%20banana%20leaves%20dosa%20counter%20authentic%20Tamil%20Nadu%20ambiance%20brass%20vessels%20and%20warm%20wooden%20interiors%20Chennai%20style%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=400&height=250&seq=rest7&orientation=landscape",
      priceRange: "₹80-200",
      offer: "Breakfast Special ₹99",
      location: "T. Nagar"
    },
    {
      id: 8,
      name: "Madras Meals",
      cuisine: "South Indian",
      rating: 4.6,
      deliveryTime: "25-30",
      image: "https://readdy.ai/api/search-image?query=Authentic%20Madras%20style%20restaurant%20with%20traditional%20brass%20thali%20plates%20colorful%20rangoli%20patterns%20and%20classic%20Tamil%20Nadu%20decor%20banana%20leaf%20dining%20experience%20Chennai%20restaurant%20commercial%20photography&width=400&height=250&seq=rest8&orientation=landscape",
      priceRange: "₹150-400",
      offer: "Full Meals ₹199",
      location: "Anna Salai"
    },
    {
      id: 9,
      name: "Chettinad Spice Kitchen",
      cuisine: "Chettinad",
      rating: 4.7,
      deliveryTime: "30-35",
      image: "https://readdy.ai/api/search-image?query=Elegant%20Chettinad%20restaurant%20with%20rich%20wooden%20architecture%20traditional%20Tamil%20heritage%20decor%20antique%20brass%20utensils%20and%20authentic%20South%20Indian%20spice%20kitchen%20atmosphere%20Chennai%20restaurant%20commercial%20photography&width=400&height=250&seq=rest9&orientation=landscape",
      priceRange: "₹200-500",
      offer: "Chettinad Special 30% OFF",
      location: "Cathedral Road"
    }
  ];

  const filteredRestaurants = allRestaurants.filter(restaurant => {
    const matchesQuery = query === '' || 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(query.toLowerCase());
    
    const matchesCuisine = filters.cuisine === '' || restaurant.cuisine === filters.cuisine;
    const matchesRating = filters.rating === '' || restaurant.rating >= parseFloat(filters.rating);
    const matchesDeliveryTime = filters.deliveryTime === '' || 
      parseInt(restaurant.deliveryTime.split('-')[0]) <= parseInt(filters.deliveryTime);
    
    return matchesQuery && matchesCuisine && matchesRating && matchesDeliveryTime;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime.split('-')[0]) - parseInt(b.deliveryTime.split('-')[0]);
      case 'priceHigh':
        return parseInt(b.priceRange.split('-')[1].replace('₹', '')) - parseInt(a.priceRange.split('-')[1].replace('₹', ''));
      case 'priceLow':
        return parseInt(a.priceRange.split('-')[0].replace('₹', '')) - parseInt(b.priceRange.split('-')[0].replace('₹', ''));
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Search results for "${query}"` : 'All Restaurants'}
          </h1>
          <p className="text-gray-600">{sortedRestaurants.length} restaurants found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                  <select
                    value={filters.cuisine}
                    onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  >
                    <option value="">All Cuisines</option>
                    <option value="Italian">Italian</option>
                    <option value="Indian">Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Chettinad">Chettinad</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Delivery Time</label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => setFilters({...filters, deliveryTime: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  >
                    <option value="">Any Time</option>
                    <option value="20">Under 20 mins</option>
                    <option value="30">Under 30 mins</option>
                    <option value="45">Under 45 mins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Highest Rated</option>
                    <option value="deliveryTime">Fastest Delivery</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({
                    cuisine: '',
                    rating: '',
                    deliveryTime: '',
                    priceRange: '',
                    sortBy: 'relevance'
                  })}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedRestaurants.map((restaurant) => (
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
                    <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
                    <p className="text-gray-500 text-sm mb-3">{restaurant.location}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-time-line text-gray-400"></i>
                          </div>
                          <span>{restaurant.deliveryTime} mins</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-money-rupee-circle-line text-gray-400"></i>
                          </div>
                          <span>{restaurant.priceRange}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer font-medium">
                      Order Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {sortedRestaurants.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-search-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
