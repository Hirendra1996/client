import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
  return (
    <div className="bg-slate-900 text-white text-[11px] md:text-xs font-semibold tracking-wide overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap md:justify-between">
        <div className="hidden md:flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" />
            <circle cx="7" cy="19" r="1.5" />
            <circle cx="18" cy="19" r="1.5" />
          </svg>
          FREE SHIPPING ON ORDERS ABOVE ₹999
        </div>
        <div className="flex marquee-track md:marquee-none gap-8 items-center">
          <span className="flex items-center gap-2">
            🚚 FREE SHIPPING ABOVE ₹999 <span className="text-slate-500 mx-2">•</span>
          </span>
          <span className="flex items-center gap-2">
            ↩️ EASY 7-DAY RETURNS <span className="text-slate-500 mx-2">•</span>
          </span>
          <span className="flex items-center gap-2">
            🔒 100% SECURE PAYMENTS <span className="text-slate-500 mx-2">•</span>
          </span>
          <span className="hidden md:inline text-indigo-300">
            ✨ FESTIVE SALE — UP TO 60% OFF SITEWIDE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300 font-medium">
          <Link to="/track-order" className="hover:text-white transition">
            Track Order
          </Link>
          <span className="text-slate-600">|</span>
          <Link to="/faq" className="hover:text-white transition">
            Help &amp; Support
          </Link>
          <span className="text-slate-600">|</span>
          <Link to="/contact" className="hover:text-white transition">
            Sell on Velvora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
