
'use client';
import { useState } from 'react';

interface SignUpFormProps {
  onSignUp: () => void;
}

export default function SignUpForm({ onSignUp }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSignUp();
      }, 2000);
    }, 1500);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignUp();
    }, 1000);
  };

  const SuccessMessage = () => (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-check-line text-3xl text-green-600"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h3>
        <p className="text-gray-600">Welcome to FoodieAI! Please sign in to continue.</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us and start ordering delicious food</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.firstName ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.lastName ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-gray-400"></i>
                </div>
              </div>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-gray-400"></i>
                </div>
              </div>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.phone ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="+91 98765 43210"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-lock-line text-gray-400"></i>
                </div>
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Create password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-lock-line text-gray-400"></i>
                </div>
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Confirm password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 mt-1 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the <button type="button" className="text-orange-500 hover:text-orange-600 cursor-pointer">Terms of Service</button> and <button type="button" className="text-orange-500 hover:text-orange-600 cursor-pointer">Privacy Policy</button>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleSocialSignUp('Google')}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-google-fill text-red-500"></i>
              </div>
              <span className="ml-2">Google</span>
            </button>
            <button 
              onClick={() => handleSocialSignUp('Facebook')}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-facebook-fill text-blue-600"></i>
              </div>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessMessage />}
    </>
  );
}
