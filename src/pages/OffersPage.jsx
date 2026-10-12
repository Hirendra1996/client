import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Percent,
  Sparkles,
  Clock,
  Tag,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Flame,
  Gift
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
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../dummy data';

const COUPONS = [
  { code: 'VELVORA10', discount: '10% OFF', min: 'Min Order ₹999', expiry: 'Expires in 3 days', desc: 'Valid sitewide on all categories' },
  { code: 'FESTIVE500', discount: '₹500 OFF', min: 'Min Order ₹2,999', expiry: 'Limited slots left', desc: 'Festive shopping super saver voucher' },
  { code: 'FREESHIP', discount: 'FREE EXPRESS SHIPPING', min: 'Min Order ₹499', expiry: 'All metro cities', desc: 'Get guaranteed next-day delivery' },
  { code: 'TECH15', discount: '15% OFF', min: 'Electronics & Audio', expiry: 'AudioFest Special', desc: 'Valid on smartwatches and headphones' }
];

const OffersPage = () => {
  const { addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedCode, setCopiedCode] = useState('');

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast('Coupon Copied! 🎉', `Use code ${code} at checkout.`);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const discountedProducts = PRODUCTS.filter((p) => {
    const isDiscounted = p.mrp > p.price;
    if (activeCategory === 'All') return isDiscounted;
    if (activeCategory === 'Flash') return p.flash;
    return p.cat.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden py-14 md:py-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sale/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Offers &amp; Deals</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sale/20 text-rose-300 border border-sale/30 text-xs font-bold mb-4">
                <Flame className="w-4 h-4 text-sale animate-pulse" /> FESTIVE MEGA DEALS • UP TO 70% OFF
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Exclusive Deals &amp; Vouchers
              </h1>

              <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                Shop curated deals with authentic brand warranties, instant bank discounts, and free doorstep delivery!
              </p>

              {/* Countdown timer pill */}
              <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" /> Flash Deals End In:
                </div>
                <div className="flex items-center gap-2 text-sm font-black font-mono">
                  <span className="bg-slate-900 px-2 py-1 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="bg-slate-900 px-2 py-1 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="bg-sale px-2 py-1 rounded-lg text-white">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coupon Cards Strip */}
        <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUPONS.map((cp) => (
              <div
                key={cp.code}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-lift transition flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-50 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                      {cp.discount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{cp.expiry}</span>
                  </div>
                  <h3 className="font-black text-sm text-slate-900 tracking-wider font-mono">{cp.code}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cp.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">{cp.min}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCoupon(cp.code)}
                    className="inline-flex items-center gap-1 font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg transition"
                  >
                    {copiedCode === cp.code ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Tabs & Products Grid */}
        <section className="max-w-7xl mx-auto px-4 mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black tracking-widest text-sale uppercase bg-rose-50 px-3 py-1 rounded-full">
                HANDPICKED DISCOUNTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Today's Best Discounted Products
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              {['All', 'Flash', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl transition ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'Flash' ? '⚡ Flash Deals' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {discountedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
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

export default OffersPage;
