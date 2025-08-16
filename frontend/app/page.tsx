'use client';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import TopRestaurants from '../components/TopRestaurants';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoryCards />
      <TopRestaurants />
      <Footer />
    </div>
  );
}

