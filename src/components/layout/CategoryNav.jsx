import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../dummy data';

const CategoryNav = () => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const navCategories = [
    { name: 'All Products', href: '/products' },
    { name: 'Electronics', href: '/category/Electronics' },
    { name: 'Fashion', href: '/category/Fashion' },
    { name: 'Home & Kitchen', href: '/category/Home%20&%20Kitchen' },
    { name: 'Beauty', href: '/category/Beauty' },
    { name: 'Sports', href: '/category/Sports' },
    { name: 'Accessories', href: '/category/Accessories' },
    { name: 'Mobiles', href: '/category/Mobiles' },
    { name: 'Computers', href: '/category/Computers' },
    { name: '✨ New Arrivals', href: '/products?filter=new', special: 'brand' },
    { name: '🏆 Best Sellers', href: '/products?sort=bestselling' },
    { name: '🔥 Offers', href: '/offers', special: 'sale' }
  ];

  return (
    <nav className="border-t border-slate-100 bg-white relative z-40" aria-label="Categories">
      <div
        className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar py-3 text-sm font-medium text-slate-700"
        id="catNav"
      >
        {/* Mega Menu Toggle */}
        <button
          onMouseEnter={() => setIsMegaOpen(true)}
          onClick={() => setIsMegaOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[13px] font-bold shrink-0 hover:bg-brand-600 transition"
        >
          ☰ All Categories
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Categories navigation links */}
        {navCategories.map((cat, idx) => {
          let textColor = 'text-slate-700 hover:text-brand-600';
          if (cat.special === 'brand') textColor = 'text-brand-600 font-bold';
          if (cat.special === 'sale') textColor = 'text-sale font-bold';

          return (
            <Link
              key={idx}
              to={cat.href}
              className={`cat-link shrink-0 transition ${textColor}`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Mega menu */}
      {isMegaOpen && (
        <div
          id="megaMenu"
          onMouseLeave={() => setIsMegaOpen(false)}
          className="absolute left-1/2 -translate-x-1/2 top-full w-[min(920px,94vw)] bg-white border border-slate-200 rounded-2xl shadow-pop p-6 z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <div>
            <Link
              to="/category/Electronics"
              onClick={() => setIsMegaOpen(false)}
              className="font-bold text-sm mb-3 block text-slate-900 hover:text-brand-600"
            >
              Electronics →
            </Link>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/products?search=Headphones" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Headphones
                </Link>
              </li>
              <li>
                <Link to="/products?search=Smartwatch" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link to="/products?search=Speaker" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Speakers
                </Link>
              </li>
              <li>
                <Link to="/products?search=Camera" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Cameras
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link
              to="/category/Fashion"
              onClick={() => setIsMegaOpen(false)}
              className="font-bold text-sm mb-3 block text-slate-900 hover:text-brand-600"
            >
              Fashion →
            </Link>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/products?search=Men" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products?search=Women" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products?search=Shoes" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/products?search=Watch" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Watches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link
              to="/category/Home%20&%20Kitchen"
              onClick={() => setIsMegaOpen(false)}
              className="font-bold text-sm mb-3 block text-slate-900 hover:text-brand-600"
            >
              Home &amp; Living →
            </Link>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/products?search=Kitchen" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link to="/products?search=Decor" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Decor
                </Link>
              </li>
              <li>
                <Link to="/products?search=Furniture" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/products?search=Mixer" onClick={() => setIsMegaOpen(false)} className="hover:text-brand-600 transition">
                  Appliances
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-brand-50 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-brand-600">FESTIVE SALE</p>
              <p className="font-extrabold text-lg mt-1 text-slate-900">Up to 60% Off</p>
              <p className="text-xs text-slate-600 mt-1">Top brands. Limited time deals.</p>
            </div>
            <Link
              to="/products?filter=sale"
              onClick={() => setIsMegaOpen(false)}
              className="mt-3 inline-block text-center bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-brand-700 transition"
            >
              Shop All Deals →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CategoryNav;
