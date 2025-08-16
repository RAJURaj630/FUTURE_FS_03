'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: 'ri-facebook-fill', url: 'https://facebook.com/foodieai', name: 'Facebook' },
    { icon: 'ri-twitter-fill', url: 'https://twitter.com/foodieai', name: 'Twitter' },
    { icon: 'ri-instagram-line', url: 'https://instagram.com/foodieai', name: 'Instagram' },
    { icon: 'ri-youtube-fill', url: 'https://youtube.com/foodieai', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors duration-200">
              <span className="font-pacifico">FoodieAI</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-md">
              Your favorite food delivery app powered by AI. Fast, fresh, and delicious meals delivered to your doorstep with the latest technology.
            </p>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-2 text-green-400 text-sm">Thank you for subscribing!</p>
              )}
            </div>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-orange-500 transition-all duration-200 cursor-pointer group"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg group-hover:scale-110 transition-transform duration-200`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Careers</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Press</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Blog</Link></li>
              <li><Link href="/investors" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Investors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">For You</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Security</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Support</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">For Partners</h3>
            <ul className="space-y-3">
              <li><Link href="/partner" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Partner with us</Link></li>
              <li><Link href="/delivery-jobs" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Delivery Jobs</Link></li>
              <li><Link href="/restaurant-portal" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Restaurant Portal</Link></li>
              <li><Link href="/business-api" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Business API</Link></li>
              <li><Link href="/merchant-support" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Merchant Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 FoodieAI. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="ri-shield-check-line"></i>
                <span>Secure payments powered by SSL</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}