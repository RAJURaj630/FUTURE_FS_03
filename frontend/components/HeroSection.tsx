'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isWatchingDemo, setIsWatchingDemo] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleStartOrdering = () => {
    router.push('/#restaurants');
  };

  const handleWatchDemo = () => {
    setIsWatchingDemo(true);
    // Simulate demo viewing
    setTimeout(() => {
      setIsWatchingDemo(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setLocation('Current Location - Chennai, Tamil Nadu');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Unable to detect location');
        }
      );
    } else {
      setLocation('Location not supported');
    }
  };

  return (
    <section 
      className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20food%20delivery%20scene%20with%20delicious%20diverse%20cuisine%20including%20pizza%20burgers%20sushi%20and%20desserts%20arranged%20beautifully%20on%20clean%20white%20background%20with%20warm%20orange%20lighting%20and%20minimal%20shadows%20creating%20appetizing%20commercial%20photography%20style%20perfect%20for%20food%20apps&width=1200&height=800&seq=hero1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="text-left max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Hungry? We&apos;ve got you covered with
              <span className="text-orange-400 block mt-2">AI-powered delivery</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              Order from your favorite restaurants and get fresh, hot food delivered in minutes
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-2xl mb-8 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-map-pin-line text-gray-400 text-lg"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                    <button
                      onClick={detectLocation}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      <div className="w-5 h-5 flex items-center justify-center text-orange-500 hover:text-orange-600">
                        <i className="ri-crosshair-line text-lg"></i>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-search-line text-gray-400 text-lg"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for food or restaurants"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer font-medium"
                >
                  Order Now
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStartOrdering}
                className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Start Ordering
              </button>
              <button 
                onClick={handleWatchDemo}
                disabled={isWatchingDemo}
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={`${isWatchingDemo ? 'ri-loader-4-line animate-spin' : 'ri-play-circle-line'} text-lg`}></i>
                  </div>
                  {isWatchingDemo ? 'Loading Demo...' : 'Watch Demo'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isWatchingDemo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-play-circle-line text-3xl text-orange-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Demo Video</h3>
            <p className="text-gray-600 mb-4">Experience our seamless food ordering process</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
            <button
              onClick={() => setIsWatchingDemo(false)}
              className="text-orange-500 hover:text-orange-600 cursor-pointer"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-10 right-10 opacity-20">
        <div className="w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-24 h-24 bg-orange-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
}