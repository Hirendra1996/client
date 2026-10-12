import React from 'react';
import { useApp } from '../../context/AppContext';

const Hero = () => {
  const { addToCart } = useApp();

  const scrollToFlash = () => {
    const el = document.getElementById('flash');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 md:pt-6">
      <div className="grid md:grid-cols-2 gap-6 items-stretch bg-gradient-to-br from-white via-indigo-50/60 to-white border border-slate-200 rounded-3xl overflow-hidden shadow-card">
        {/* Left Column */}
        <div className="p-6 md:p-12 flex flex-col justify-center">
          <span className="hero-enter inline-flex w-fit items-center gap-2 bg-brand-600 text-white text-[11px] font-extrabold tracking-widest px-4 py-1.5 rounded-full">
            ✨ NEW COLLECTION 2026
          </span>
          <h1 className="hero-enter mt-4 text-3xl md:text-5xl font-black leading-[1.08] tracking-tight">
            Everything You Need.
            <br />
            <span className="text-brand-600">One Better</span> Shopping Experience.
          </h1>
          <p className="hero-enter-2 mt-4 text-slate-600 md:text-lg leading-relaxed">
            Discover 50,000+ premium products across electronics, fashion, beauty &amp; home — curated for quality, priced for everyone, delivered lightning-fast.
          </p>

          <div className="hero-enter-2 mt-6 flex flex-wrap gap-3">
            <button
              onClick={scrollToFlash}
              className="bg-slate-900 hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-full transition shadow-lift text-sm md:text-base"
            >
              SHOP NOW →
            </button>
            <button
              onClick={scrollToCategories}
              className="border-2 border-slate-900 hover:border-brand-600 hover:text-brand-600 font-bold px-8 py-3 rounded-full transition text-sm md:text-base"
            >
              EXPLORE COLLECTION
            </button>
          </div>

          <div className="hero-enter-3 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-xs font-bold">
                ✓
              </span>
              Secure Payments
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-xs font-bold">
                ✓
              </span>
              Easy Returns
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-xs font-bold">
                ✓
              </span>
              Fast Delivery
            </span>
          </div>

          <div className="hero-enter-3 mt-6 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/64?img=32"
                alt="customer"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://i.pravatar.cc/64?img=47"
                alt="customer"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://i.pravatar.cc/64?img=12"
                alt="customer"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
              <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-[10px] font-bold grid place-items-center border-2 border-white">
                2M+
              </span>
            </div>
            <div className="text-sm">
              <div className="stars font-bold">
                ★★★★★ <span className="text-slate-900">4.8</span>
              </div>
              <p className="text-slate-500 text-xs">Trusted by 2M+ happy shoppers</p>
            </div>
          </div>
        </div>

        {/* Right Column / Hero Image + Floating Badges */}
        <div className="relative min-h-[320px] md:min-h-[520px] hero-enter-3">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            alt="Happy shopper with bags - new collection"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />

          {/* Floating Deal Card */}
          <div className="absolute top-5 right-5 bg-white rounded-2xl shadow-pop p-4 floaty max-w-[170px]">
            <p className="text-[11px] font-extrabold text-sale tracking-widest uppercase">
              Limited Time
            </p>
            <p className="text-2xl font-black leading-none mt-1">
              UP TO
              <br />
              40% OFF
            </p>
            <button
              onClick={scrollToFlash}
              className="mt-2 w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-full hover:bg-brand-600 transition"
            >
              Grab Deal
            </button>
          </div>

          {/* Floating Product Quick Add Card */}
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur rounded-2xl shadow-pop p-3 flex items-center gap-3 floaty2">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
              alt="Headphones"
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="text-sm min-w-0">
              <p className="font-bold line1">Wireless Headphones</p>
              <p className="text-xs text-slate-500">★★★★★ 4.7 (2.3k)</p>
              <p className="font-extrabold">
                ₹1,499{' '}
                <span className="line-through text-slate-400 font-normal text-xs">
                  ₹2,499
                </span>
              </p>
            </div>
            <button
              onClick={(e) => addToCart(1, 1, e)}
              className="ml-2 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-brand-700 shrink-0 transition"
            >
              Add +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
