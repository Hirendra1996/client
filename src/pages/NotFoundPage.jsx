import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Search,
  Home,
  ShoppingBag,
  HelpCircle,
  Sparkles
} from 'lucide-react';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

import ProductCard from '../components/product/ProductCard';
import { PRODUCTS } from '../dummy data';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const trendingProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-brand-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
            <Compass className="w-12 h-12 animate-spin-slow" />
          </div>

          <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
            ERROR 404 • PAGE NOT FOUND
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Lost in the Aisles?
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you requested doesn't exist or may have been relocated. Use the search bar below or explore popular categories.
          </p>

          {/* Quick Store Search */}
          <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, brands, or gadgets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-brand-600 outline-none bg-white shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm rounded-2xl transition shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center text-xs font-bold">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white transition shadow-sm"
            >
              <Home className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Explore Catalog
            </Link>
            <Link
              to="/offers"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
            >
              🔥 View Deals
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Contact Support
            </Link>
          </div>
        </section>

        {/* Popular Recommendations */}
        <section className="max-w-7xl mx-auto px-4 mt-8 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> POPULAR PICKS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                You Might Find What You're Looking For Here
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />
      <MobileBottomNav />

      {/* 4. Widgets */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        <BackToTop />
        <ChatWidget />
      </div>

      <LoginModal />
      <LocationModal />
      <MobileMenuDrawer />
      <CompareBar />
      <ToastContainer />
    </div>
  );
};

export default NotFoundPage;
