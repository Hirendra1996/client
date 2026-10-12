import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { wishlistCount, cartCount, user, setIsLoginOpen } = useApp();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-1.5 grid grid-cols-5 text-[10px] font-bold text-slate-600 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]"
      aria-label="Mobile navigation"
    >
      <Link
        to="/"
        className={`flex flex-col items-center gap-0.5 py-1.5 ${
          location.pathname === '/' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" />
        </svg>
        Home
      </Link>

      <Link
        to="/products"
        className={`flex flex-col items-center gap-0.5 py-1.5 ${
          location.pathname.startsWith('/products') || location.pathname.startsWith('/category')
            ? 'text-brand-600'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
        </svg>
        Shop
      </Link>

      <Link
        to="/wishlist"
        className={`relative flex flex-col items-center gap-0.5 py-1.5 ${
          location.pathname === '/wishlist' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 017.5 5c1.8 0 3.4 1 4.5 2.6A4.5 4.5 0 0116.5 5 4.5 4.5 0 0121 9.5c0 4-4 7.5-9 11.5z" />
        </svg>
        Wishlist
        <span
          id="mWishCount"
          className="absolute top-0 right-4 min-w-[16px] h-4 px-1 rounded-full bg-sale text-white text-[9px] grid place-items-center font-bold"
        >
          {wishlistCount}
        </span>
      </Link>

      {user ? (
        <Link
          to="/account"
          className={`flex flex-col items-center gap-0.5 py-1.5 ${
            location.pathname.startsWith('/account') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
          </svg>
          Account
        </Link>
      ) : (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1.5 text-slate-600 hover:text-slate-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
          </svg>
          Sign In
        </button>
      )}

      <Link
        to="/cart"
        className={`relative flex flex-col items-center gap-0.5 py-1.5 ${
          location.pathname === '/cart' ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 4h2l2.4 12.2A1 1 0 008.4 17H18a1 1 0 001-.8L21 8H6" />
          <circle cx="10" cy="20" r="1.4" />
          <circle cx="17" cy="20" r="1.4" />
        </svg>
        Cart
        <span
          id="mCartCount"
          className="absolute top-0 right-4 min-w-[16px] h-4 px-1 rounded-full bg-brand-600 text-white text-[9px] grid place-items-center badge-bounce font-bold"
        >
          {cartCount}
        </span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
