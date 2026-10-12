import React from 'react';
import { useApp } from '../../context/AppContext';

const AppPromo = () => {
  const { addToCart, addToast } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative text-white">
        {/* Glow orb */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Copy */}
        <div className="relative z-10">
          <span className="text-brand-100 bg-white/10 border border-white/15 text-xs font-bold px-4 py-1.5 rounded-full">
            📱 VELVORA APP
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-black mt-4">
            Shopping, Wherever You Go.
          </h2>
          <p className="text-slate-300 mt-2">
            Get the complete shopping experience on your phone. Exclusive app-only deals, live order tracking &amp; one-tap checkout.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>✓ Extra 10% off first app order</li>
            <li>✓ Early access to Flash Sales</li>
            <li>✓ Instant delivery updates</li>
          </ul>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => addToast('Opening Google Play...', 'Downloading Velvora App')}
              className="flex items-center gap-3 bg-white text-slate-900 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition shadow-sm"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3l14 9L4 21z" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-semibold">GET IT ON</span>
                <span className="block font-extrabold">Google Play</span>
              </span>
            </button>

            <button
              onClick={() => addToast('Opening App Store...', 'Downloading Velvora for iOS')}
              className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-slate-900 transition shadow-sm"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm4-8H4a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1z" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px]">Download on</span>
                <span className="block font-extrabold">App Store</span>
              </span>
            </button>
          </div>
        </div>

        {/* 3D Tilted Smartphone Mockup */}
        <div className="relative flex justify-center">
          <div className="w-[260px] bg-white rounded-[2rem] p-2 shadow-pop rotate-2 text-slate-900">
            <div className="bg-slate-50 rounded-[1.6rem] overflow-hidden">
              <div className="bg-white pt-2 pb-3 px-4 flex flex-col items-center border-b">
                <div className="phone-notch mb-2" />
                <div className="flex items-center gap-2 w-full">
                  <span className="w-7 h-7 rounded-lg bg-brand-600 text-white grid place-items-center font-black text-sm">
                    V
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full text-[11px] px-3 py-1.5 text-slate-500">
                    Search products...
                  </div>
                </div>
              </div>
              <div className="p-3">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
                  alt="app product"
                  className="w-full h-40 object-cover rounded-xl"
                  loading="lazy"
                />
                <p className="text-xs font-bold mt-2">StreetRunner Air Sneakers</p>
                <p className="text-[11px] text-amber-500">★★★★★ 4.8</p>
                <p className="text-sm font-extrabold">
                  ₹1,999{' '}
                  <span className="text-[11px] line-through text-slate-400 font-normal">
                    ₹3,499
                  </span>
                </p>
                <button
                  onClick={(e) => addToCart(3, 1, e)}
                  className="mt-2 w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2 rounded-full transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Floating Order Delivered Badge */}
          <div className="absolute bottom-8 -left-2 md:left-6 bg-white rounded-xl shadow-pop px-3 py-2 flex items-center gap-2 -rotate-3 text-slate-900">
            <span className="w-8 h-8 rounded-full bg-emerald-100 grid place-items-center shrink-0">
              📦
            </span>
            <div className="text-xs">
              <p className="font-bold">Order delivered!</p>
              <p className="text-slate-500">2 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
