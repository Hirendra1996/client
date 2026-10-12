import React from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';

import Hero from '../components/home/Hero';
import TrustFeatures from '../components/home/TrustFeatures';
import ShopByCategory from '../components/home/ShopByCategory';
import FlashSale from '../components/home/FlashSale';
import TrendingProducts from '../components/home/TrendingProducts';
import PromoBanner from '../components/home/PromoBanner';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import BrandsSection from '../components/home/BrandsSection';
import Recommendations from '../components/home/Recommendations';
import CustomerReviews from '../components/home/CustomerReviews';
import AppPromo from '../components/home/AppPromo';
import Newsletter from '../components/home/Newsletter';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Category Bar with Mega Menu */}
      <CategoryNav />

      {/* 4. Main Home Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Trust Features */}
        <TrustFeatures />

        {/* Shop By Category */}
        <ShopByCategory />

        {/* Flash Sale with live countdown and Swiper slider */}
        <FlashSale />

        {/* Trending / Featured with filter tabs */}
        <TrendingProducts />

        {/* Promotional Banner */}
        <PromoBanner />

        {/* New / Fresh Arrivals with Swiper slider */}
        <NewArrivals />

        {/* Best Sellers with real sales rankings */}
        <BestSellers />

        {/* Partner Brands */}
        <BrandsSection />

        {/* Personalized Recommendations with Swiper slider */}
        <Recommendations />

        {/* Customer Reviews & Testimonials with Swiper slider */}
        <CustomerReviews />

        {/* Mobile App Promotion */}
        <AppPromo />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Mobile Bottom App Bar */}
      <MobileBottomNav />

      {/* 7. Floating Action Buttons (Support Chat & Back to Top) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        <BackToTop />
        <ChatWidget />
      </div>

      {/* 8. Interactive Modals & Drawers (QuickView removed as product detail page is separate) */}
      <LoginModal />
      <LocationModal />
      <MobileMenuDrawer />
      <CompareBar />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
