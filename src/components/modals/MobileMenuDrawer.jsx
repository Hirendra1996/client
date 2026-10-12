import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const MobileMenuDrawer = () => {
  const navigate = useNavigate();
  const { isMobileMenuOpen, setIsMobileMenuOpen, setIsLoginOpen, addToast } = useApp();

  if (!isMobileMenuOpen) return null;

  const handleLinkClick = (anchor) => {
    setIsMobileMenuOpen(false);
    if (anchor.startsWith('#')) {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <aside
        className="drawer fixed top-0 left-0 h-full w-[300px] bg-white z-[71] flex flex-col shadow-2xl transition-transform"
        aria-label="Menu"
      >
        <div className="p-5 bg-slate-900 text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brand-600 grid place-items-center font-black">
            V
          </span>
          <div>
            <p className="font-bold">Hello, Welcome!</p>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginOpen(true);
              }}
              className="text-xs text-indigo-300 font-bold hover:underline"
            >
              Sign In / Register →
            </button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto font-bold text-slate-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-1 text-sm font-semibold overflow-y-auto">
          <button
            onClick={() => handleLinkClick('#flash')}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            ⚡ Flash Sale
          </button>
          <button
            onClick={() => handleLinkClick('#categories')}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            🗂️ All Categories
          </button>
          <button
            onClick={() => handleLinkClick('#trending')}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            📈 Trending
          </button>
          <button
            onClick={() => handleLinkClick('#new')}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            ✨ New Arrivals
          </button>
          <button
            onClick={() => handleLinkClick('#best')}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            🏆 Best Sellers
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/contact');
            }}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            📦 Track Order
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/refund-policy');
            }}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            ↩️ Returns &amp; Refunds Policy
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/about');
            }}
            className="w-full text-left flex p-3 rounded-xl hover:bg-slate-100 transition"
          >
            🏢 About Velvora
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/contact');
            }}
            className="w-full text-left flex p-3 rounded-xl hover:bg-indigo-50 text-brand-600 transition font-bold"
          >
            💬 Contact Us &amp; Support
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenuDrawer;
