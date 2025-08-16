'use client';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export default function CategoryCards() {
  const router = useRouter();

  const categories: Category[] = [
    {
      id: 1,
      name: 'Pizza',
      image: 'https://readdy.ai/api/search-image?query=Delicious%20pizza%20with%20melted%20cheese%20and%20fresh%20toppings%20on%20clean%20white%20background%20with%20warm%20lighting%20perfect%20for%20food%20delivery%20app%20category%20showcase%20commercial%20photography%20style&width=400&height=300&seq=cat1&orientation=squarish',
      count: 245
    },
    {
      id: 2,
      name: 'Biryani',
      image: 'https://readdy.ai/api/search-image?query=Aromatic%20biryani%20rice%20dish%20with%20tender%20meat%20and%20fragrant%20spices%20served%20in%20elegant%20bowl%20on%20clean%20white%20background%20with%20warm%20lighting%20food%20delivery%20app%20style%20commercial%20photography&width=400&height=300&seq=cat2&orientation=squarish',
      count: 189
    },
    {
      id: 3,
      name: 'Desserts',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20assorted%20desserts%20including%20cakes%20pastries%20and%20sweets%20arranged%20elegantly%20on%20clean%20white%20background%20with%20soft%20lighting%20food%20delivery%20category%20style%20commercial%20photography&width=400&height=300&seq=cat3&orientation=squarish',
      count: 156
    },
    {
      id: 4,
      name: 'Burgers',
      image: 'https://readdy.ai/api/search-image?query=Gourmet%20burger%20with%20fresh%20ingredients%20lettuce%20tomato%20and%20juicy%20patty%20on%20clean%20white%20background%20with%20appetizing%20lighting%20food%20delivery%20app%20category%20commercial%20photography%20style&width=400&height=300&seq=cat4&orientation=squarish',
      count: 298
    },
    {
      id: 5,
      name: 'Chinese',
      image: 'https://readdy.ai/api/search-image?query=Authentic%20Chinese%20cuisine%20with%20noodles%20dumplings%20and%20stir%20fry%20dishes%20beautifully%20arranged%20on%20clean%20white%20background%20with%20warm%20lighting%20food%20delivery%20category%20commercial%20photography&width=400&height=300&seq=cat5&orientation=squarish',
      count: 167
    },
    {
      id: 6,
      name: 'South Indian',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20South%20Indian%20dishes%20including%20dosa%20idli%20and%20sambar%20served%20on%20banana%20leaf%20with%20clean%20white%20background%20warm%20lighting%20food%20delivery%20app%20category%20commercial%20photography&width=400&height=300&seq=cat6&orientation=squarish',
      count: 134
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search?cuisine=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  const handleViewAllCategories = () => {
    router.push('/search');
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What&apos;s on your mind?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our popular categories and discover your next favorite meal
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-24 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-1 group-hover:text-orange-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {category.count} places
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllCategories}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 whitespace-nowrap cursor-pointer font-medium"
          >
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}