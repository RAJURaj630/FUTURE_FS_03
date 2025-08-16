
'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';
import UserProfile from '../../components/UserProfile';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'profile'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isLoggedIn ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'signin' && <SignInForm onLogin={handleLogin} />}
              {activeTab === 'signup' && <SignUpForm onSignUp={() => setActiveTab('signin')} />}
            </div>
          </div>
        ) : (
          <UserProfile onLogout={handleLogout} />
        )}
      </div>

      <Footer />
    </div>
  );
}
