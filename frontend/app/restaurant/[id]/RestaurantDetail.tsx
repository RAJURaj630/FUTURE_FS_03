
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useCart } from '../../../lib/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  reviews: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  priceRange: string;
  offer: string;
  address: string;
  phone: string;
  menu: MenuItem[];
}

export default function RestaurantDetail({ restaurantId }: { restaurantId: string }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const restaurantData: { [key: string]: Restaurant } = {
      '1': {
        id: 1,
        name: "Mario's Pizzeria",
        cuisine: "Italian, Pizza",
        rating: 4.5,
        deliveryTime: "25-30 mins",
        image: "https://readdy.ai/api/search-image?query=Cozy%20Italian%20pizzeria%20restaurant%20interior%20with%20warm%20lighting%20wood%20fired%20oven%20and%20authentic%20atmosphere%20perfect%20for%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography%20style&width=800&height=400&seq=rest1detail&orientation=landscape",
        priceRange: "₹200-400",
        offer: "50% OFF up to ₹100",
        address: "123 Food Street, Downtown Area",
        phone: "+91 98765 43210",
        menu: [
          {
            id: 101,
            name: "Margherita Pizza",
            description: "Fresh mozzarella, tomato sauce, basil leaves on thin crust",
            price: 299,
            image: "https://readdy.ai/api/search-image?query=Classic%20margherita%20pizza%20with%20fresh%20mozzarella%20tomato%20sauce%20and%20basil%20leaves%20on%20wooden%20board%20clean%20white%20background%20commercial%20food%20photography&width=300&height=200&seq=pizza1&orientation=landscape",
            category: "Pizza",
            isVeg: true,
            rating: 4.6,
            reviews: 245
          },
          {
            id: 102,
            name: "Pepperoni Pizza",
            description: "Spicy pepperoni, mozzarella cheese, tomato sauce",
            price: 399,
            image: "https://readdy.ai/api/search-image?query=Delicious%20pepperoni%20pizza%20with%20spicy%20pepperoni%20slices%20and%20melted%20cheese%20on%20clean%20white%20background%20commercial%20food%20photography%20style&width=300&height=200&seq=pizza2&orientation=landscape",
            category: "Pizza",
            isVeg: false,
            rating: 4.7,
            reviews: 189
          },
          {
            id: 103,
            name: "Chicken Alfredo Pasta",
            description: "Creamy alfredo sauce with grilled chicken and parmesan",
            price: 349,
            image: "https://readdy.ai/api/search-image?query=Creamy%20chicken%20alfredo%20pasta%20with%20grilled%20chicken%20pieces%20and%20parmesan%20cheese%20in%20elegant%20bowl%20clean%20background%20commercial%20food%20photography&width=300&height=200&seq=pasta1&orientation=landscape",
            category: "Pasta",
            isVeg: false,
            rating: 4.4,
            reviews: 156
          },
          {
            id: 104,
            name: "Garlic Bread",
            description: "Crispy bread with garlic butter and herbs",
            price: 149,
            image: "https://readdy.ai/api/search-image?query=Golden%20crispy%20garlic%20bread%20slices%20with%20herbs%20and%20butter%20on%20wooden%20board%20clean%20background%20commercial%20food%20photography%20style&width=300&height=200&seq=bread1&orientation=landscape",
            category: "Starters",
            isVeg: true,
            rating: 4.3,
            reviews: 98
          },
          {
            id: 105,
            name: "Tiramisu",
            description: "Classic Italian dessert with coffee and mascarpone",
            price: 199,
            image: "https://readdy.ai/api/search-image?query=Elegant%20tiramisu%20dessert%20with%20coffee%20and%20mascarpone%20layers%20dusted%20with%20cocoa%20powder%20on%20white%20plate%20commercial%20food%20photography&width=300&height=200&seq=dessert1&orientation=landscape",
            category: "Desserts",
            isVeg: true,
            rating: 4.8,
            reviews: 78
          }
        ]
      },
      '2': {
        id: 2,
        name: "Spice Paradise",
        cuisine: "Indian, Biryani",
        rating: 4.3,
        deliveryTime: "35-40 mins",
        image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20restaurant%20with%20vibrant%20decor%20authentic%20spices%20and%20warm%20ambiance%20perfect%20for%20biryani%20and%20curry%20food%20delivery%20app%20restaurant%20showcase%20commercial%20photography&width=800&height=400&seq=rest2detail&orientation=landscape",
        priceRange: "₹300-600",
        offer: "20% OFF",
        address: "456 Spice Lane, Heritage District",
        phone: "+91 87654 32109",
        menu: [
          {
            id: 201,
            name: "Chicken Biryani",
            description: "Fragrant basmati rice with tender chicken and aromatic spices",
            price: 399,
            image: "https://readdy.ai/api/search-image?query=Aromatic%20chicken%20biryani%20with%20fragrant%20basmati%20rice%20tender%20chicken%20pieces%20and%20colorful%20spices%20in%20traditional%20pot%20commercial%20food%20photography&width=300&height=200&seq=biryani1&orientation=landscape",
            category: "Biryani",
            isVeg: false,
            rating: 4.7,
            reviews: 312
          },
          {
            id: 202,
            name: "Veg Biryani",
            description: "Aromatic rice with mixed vegetables and traditional spices",
            price: 299,
            image: "https://readdy.ai/api/search-image?query=Colorful%20vegetable%20biryani%20with%20mixed%20vegetables%20fragrant%20rice%20and%20traditional%20Indian%20spices%20in%20elegant%20serving%20bowl%20commercial%20food%20photography&width=300&height=200&seq=biryani2&orientation=landscape",
            category: "Biryani",
            isVeg: true,
            rating: 4.4,
            reviews: 198
          },
          {
            id: 203,
            name: "Butter Chicken",
            description: "Creamy tomato curry with tender chicken pieces",
            price: 349,
            image: "https://readdy.ai/api/search-image?query=Rich%20butter%20chicken%20curry%20with%20tender%20chicken%20pieces%20in%20creamy%20tomato%20sauce%20garnished%20with%20cilantro%20commercial%20Indian%20food%20photography&width=300&height=200&seq=curry1&orientation=landscape",
            category: "Curry",
            isVeg: false,
            rating: 4.6,
            reviews: 267
          }
        ]
      },
      '7': {
        id: 7,
        name: "Chennai Tiffin Center",
        cuisine: "South Indian, Breakfast",
        rating: 4.8,
        deliveryTime: "15-20 mins",
        image: "https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20restaurant%20with%20banana%20leaves%20dosa%20counter%20authentic%20Tamil%20Nadu%20ambiance%20brass%20vessels%20and%20warm%20wooden%20interiors%20Chennai%20style%20food%20delivery%20restaurant%20showcase%20commercial%20photography&width=800&height=400&seq=rest7detail&orientation=landscape",
        priceRange: "₹80-200",
        offer: "Breakfast Special ₹99",
        address: "42 T. Nagar Main Road, Chennai",
        phone: "+91 98765 11111",
        menu: [
          {
            id: 701,
            name: "Masala Dosa",
            description: "Crispy golden dosa with spiced potato filling and traditional chutneys",
            price: 120,
            image: "https://readdy.ai/api/search-image?query=Perfect%20golden%20crispy%20masala%20dosa%20with%20spiced%20potato%20filling%20served%20with%20coconut%20chutney%20and%20sambar%20on%20banana%20leaf%20traditional%20South%20Indian%20breakfast%20commercial%20food%20photography&width=300&height=200&seq=dosa1&orientation=landscape",
            category: "Dosa",
            isVeg: true,
            rating: 4.9,
            reviews: 456
          },
          {
            id: 702,
            name: "Idli Sambar",
            description: "Soft steamed rice cakes with lentil curry and coconut chutney",
            price: 80,
            image: "https://readdy.ai/api/search-image?query=Fresh%20soft%20white%20idli%20steamed%20rice%20cakes%20with%20aromatic%20sambar%20lentil%20curry%20and%20coconut%20chutney%20served%20on%20traditional%20brass%20plate%20South%20Indian%20breakfast%20commercial%20food%20photography&width=300&height=200&seq=idli1&orientation=landscape",
            category: "Breakfast",
            isVeg: true,
            rating: 4.8,
            reviews: 389
          },
          {
            id: 703,
            name: "Rava Upma",
            description: "Seasoned semolina with vegetables, curry leaves and mustard seeds",
            price: 90,
            image: "https://readdy.ai/api/search-image?query=Aromatic%20rava%20upma%20with%20colorful%20vegetables%20curry%20leaves%20and%20mustard%20seeds%20tempering%20served%20in%20traditional%20South%20Indian%20style%20with%20coconut%20chutney%20commercial%20food%20photography&width=300&height=200&seq=upma1&orientation=landscape",
            category: "Breakfast",
            isVeg: true,
            rating: 4.6,
            reviews: 234
          },
          {
            id: 704,
            name: "Vada Sambar",
            description: "Crispy lentil donuts with spicy sambar and fresh chutneys",
            price: 100,
            image: "https://readdy.ai/api/search-image?query=Golden%20crispy%20medu%20vada%20lentil%20donuts%20served%20with%20spicy%20sambar%20and%20fresh%20coconut%20chutney%20on%20banana%20leaf%20traditional%20South%20Indian%20breakfast%20commercial%20food%20photography&width=300&height=200&seq=vada1&orientation=landscape",
            category: "Breakfast",
            isVeg: true,
            rating: 4.7,
            reviews: 312
          },
          {
            id: 705,
            name: "Filter Coffee",
            description: "Traditional South Indian filter coffee with fresh milk and jaggery",
            price: 40,
            image: "https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20filter%20coffee%20in%20steel%20tumbler%20and%20davara%20with%20rich%20aroma%20and%20creamy%20froth%20authentic%20Chennai%20style%20coffee%20commercial%20food%20photography&width=300&height=200&seq=coffee1&orientation=landscape",
            category: "Beverages",
            isVeg: true,
            rating: 4.9,
            reviews: 567
          }
        ]
      },
      '8': {
        id: 8,
        name: "Madras Meals",
        cuisine: "South Indian, Thali",
        rating: 4.6,
        deliveryTime: "25-30 mins",
        image: "https://readdy.ai/api/search-image?query=Authentic%20Madras%20style%20restaurant%20with%20traditional%20brass%20thali%20plates%20colorful%20rangoli%20patterns%20and%20classic%20Tamil%20Nadu%20decor%20banana%20leaf%20dining%20experience%20Chennai%20restaurant%20commercial%20photography&width=800&height=400&seq=rest8detail&orientation=landscape",
        priceRange: "₹150-400",
        offer: "Full Meals ₹199",
        address: "88 Anna Salai, Thousand Lights, Chennai",
        phone: "+91 98765 22222",
        menu: [
          {
            id: 801,
            name: "Traditional Thali",
            description: "Complete South Indian meal with rice, sambar, rasam, vegetables and curd",
            price: 199,
            image: "https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20thali%20on%20banana%20leaf%20with%20rice%20sambar%20rasam%20variety%20of%20vegetables%20pickle%20papad%20and%20curd%20authentic%20Tamil%20Nadu%20style%20meal%20commercial%20food%20photography&width=300&height=200&seq=thali1&orientation=landscape",
            category: "Meals",
            isVeg: true,
            rating: 4.8,
            reviews: 678
          },
          {
            id: 802,
            name: "Fish Curry Meals",
            description: "Spicy Tamil fish curry with rice and traditional accompaniments",
            price: 299,
            image: "https://readdy.ai/api/search-image?query=Authentic%20Tamil%20fish%20curry%20with%20tender%20fish%20pieces%20in%20spicy%20coconut%20gravy%20served%20with%20steamed%20rice%20and%20traditional%20South%20Indian%20accompaniments%20commercial%20food%20photography&width=300&height=200&seq=fish1&orientation=landscape",
            category: "Meals",
            isVeg: false,
            rating: 4.7,
            reviews: 423
          },
          {
            id: 803,
            name: "Curd Rice",
            description: "Comforting South Indian curd rice with tempering and pickle",
            price: 120,
            image: "https://readdy.ai/api/search-image?query=Creamy%20South%20Indian%20curd%20rice%20with%20mustard%20seeds%20curry%20leaves%20tempering%20and%20traditional%20pickle%20served%20in%20brass%20bowl%20authentic%20Chennai%20style%20comfort%20food%20commercial%20photography&width=300&height=200&seq=curd1&orientation=landscape",
            category: "Rice",
            isVeg: true,
            rating: 4.6,
            reviews: 289
          },
          {
            id: 804,
            name: "Rasam",
            description: "Tangy tomato rasam with traditional spices and curry leaves",
            price: 80,
            image: "https://readdy.ai/api/search-image?query=Hot%20tangy%20tomato%20rasam%20with%20black%20pepper%20traditional%20South%20Indian%20spices%20and%20fresh%20curry%20leaves%20in%20traditional%20brass%20bowl%20authentic%20Tamil%20Nadu%20style%20soup%20commercial%20food%20photography&width=300&height=200&seq=rasam1&orientation=landscape",
            category: "Soup",
            isVeg: true,
            rating: 4.8,
            reviews: 345
          }
        ]
      },
      '9': {
        id: 9,
        name: "Chettinad Spice Kitchen",
        cuisine: "Chettinad, South Indian",
        rating: 4.7,
        deliveryTime: "30-35 mins",
        image: "https://readdy.ai/api/search-image?query=Elegant%20Chettinad%20restaurant%20with%20rich%20wooden%20architecture%20traditional%20Tamil%20heritage%20decor%20antique%20brass%20utensils%20and%20authentic%20South%20Indian%20spice%20kitchen%20atmosphere%20Chennai%20restaurant%20commercial%20photography&width=800&height=400&seq=rest9detail&orientation=landscape",
        priceRange: "₹200-500",
        offer: "Chettinad Special 30% OFF",
        address: "25 Cathedral Road, Gopalapuram, Chennai",
        phone: "+91 98765 33333",
        menu: [
          {
            id: 901,
            name: "Chettinad Chicken Curry",
            description: "Spicy Chettinad chicken with traditional spices and coconut base",
            price: 349,
            image: "https://readdy.ai/api/search-image?query=Rich%20spicy%20Chettinad%20chicken%20curry%20with%20tender%20chicken%20pieces%20traditional%20South%20Indian%20spices%20and%20coconut%20gravy%20in%20authentic%20brass%20vessel%20commercial%20food%20photography&width=300&height=200&seq=chettinad1&orientation=landscape",
            category: "Curry",
            isVeg: false,
            rating: 4.9,
            reviews: 512
          },
          {
            id: 902,
            name: "Pepper Chicken",
            description: "Dry spiced chicken with black pepper and curry leaves",
            price: 299,
            image: "https://readdy.ai/api/search-image?query=Aromatic%20Chettinad%20pepper%20chicken%20dry%20roasted%20with%20black%20pepper%20curry%20leaves%20and%20traditional%20South%20Indian%20spices%20served%20in%20traditional%20brass%20plate%20commercial%20food%20photography&width=300&height=200&seq=pepper1&orientation=landscape",
            category: "Starters",
            isVeg: false,
            rating: 4.8,
            reviews: 387
          },
          {
            id: 903,
            name: "Kara Kulambu",
            description: "Spicy tamarind curry with vegetables and traditional spices",
            price: 189,
            image: "https://readdy.ai/api/search-image?query=Traditional%20Chettinad%20kara%20kulambu%20spicy%20tamarind%20curry%20with%20mixed%20vegetables%20and%20authentic%20South%20Indian%20spices%20in%20brass%20bowl%20commercial%20food%20photography&width=300&height=200&seq=kulambu1&orientation=landscape",
            category: "Curry",
            isVeg: true,
            rating: 4.6,
            reviews: 234
          },
          {
            id: 904,
            name: "Appam with Stew",
            description: "Soft hoppers with coconut milk vegetable stew",
            price: 179,
            image: "https://readdy.ai/api/search-image?query=Soft%20fluffy%20appam%20hoppers%20with%20creamy%20coconut%20milk%20vegetable%20stew%20traditional%20South%20Indian%20breakfast%20served%20on%20banana%20leaf%20commercial%20food%20photography&width=300&height=200&seq=appam1&orientation=landscape",
            category: "Breakfast",
            isVeg: true,
            rating: 4.7,
            reviews: 298
          },
          {
            id: 905,
            name: "Kothu Parotta",
            description: "Shredded parotta with spices, vegetables and egg",
            price: 159,
            image: "https://readdy.ai/api/search-image?query=Delicious%20kothu%20parotta%20with%20shredded%20bread%20spices%20colorful%20vegetables%20and%20scrambled%20egg%20traditional%20Tamil%20street%20food%20style%20commercial%20food%20photography&width=300&height=200&seq=kothu1&orientation=landscape",
            category: "Street Food",
            isVeg: false,
            rating: 4.8,
            reviews: 445
          }
        ]
      }
    };

    setRestaurant(restaurantData[restaurantId] || restaurantData['1']);
  }, [restaurantId]);

  if (!restaurant) return <div>Loading...</div>;

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];
  const filteredMenu = selectedCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantName: restaurant.name,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90">{restaurant.cuisine}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-star-fill text-green-600"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{restaurant.rating}</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-orange-600"></i>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{restaurant.deliveryTime}</p>
                <p className="text-sm text-gray-500">Delivery Time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-blue-600"></i>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{restaurant.priceRange}</p>
                <p className="text-sm text-gray-500">Price Range</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-discount-percent-line text-red-600"></i>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{restaurant.offer}</p>
                <p className="text-sm text-gray-500">Current Offer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover object-top flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-1">
                      {item.isVeg ? (
                        <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <i className="ri-star-fill text-orange-400 text-sm"></i>
                        <span className="text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-lg whitespace-nowrap cursor-pointer font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
