import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  Trash2,
  Plus,
  ShoppingBag,
  Star,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ArrowRight,
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

import { useApp } from '../context/AppContext';
import { PRODUCTS, getProductById } from '../dummy data';

const ComparePage = () => {
  const { compare, toggleCompare, clearCompare, addToCart, addToast } = useApp();

  const [searchToAdd, setSearchToAdd] = useState('');

  // Selected products for comparison
  const comparedProducts = compare
    .map((id) => getProductById(id))
    .filter(Boolean);

  // If user has fewer than 2 items in comparison, suggest some defaults
  const availableToAdd = PRODUCTS.filter((p) => !compare.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Breadcrumb banner */}
        <section className="bg-white border-b border-slate-200/80 py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Link to="/" className="hover:text-brand-600 transition">Home</Link>
                <span>/</span>
                <span className="text-slate-900 font-bold">Compare Products</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <Scale className="w-6 h-6 text-brand-600" /> Side-by-Side Product Comparison
              </h1>
            </div>

            {comparedProducts.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold rounded-xl transition self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Comparison
              </button>
            )}
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          {comparedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5">
                <Scale className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">No Products Selected to Compare</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Add up to 3 products from our catalog to compare specifications, ratings, price differences, and warranties side-by-side.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    toggleCompare(1);
                    toggleCompare(2);
                  }}
                  className="px-5 py-3 rounded-full bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition"
                >
                  Compare Top Bestsellers
                </button>
                <Link
                  to="/products"
                  className="px-5 py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Comparison Table */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="p-6 bg-slate-50/70 w-48 text-xs font-black uppercase tracking-wider text-slate-400 align-top">
                          Products ({comparedProducts.length}/3)
                        </th>
                        {comparedProducts.map((p) => (
                          <th key={p.id} className="p-6 min-w-[240px] max-w-[280px] align-top">
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => toggleCompare(p.id)}
                                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                                title="Remove from compare"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <Link to={`/product/${p.id}`} className="block">
                                <img
                                  src={p.img1}
                                  alt={p.name}
                                  className="w-full h-44 object-cover rounded-2xl border border-slate-200 bg-slate-50 mb-3"
                                />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                  {p.brand}
                                </span>
                                <h3 className="font-extrabold text-sm text-slate-900 hover:text-brand-600 transition line2">
                                  {p.name}
                                </h3>
                              </Link>
                              <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-lg font-black text-slate-900">
                                  ₹{p.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{p.mrp.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => addToCart(p.id, 1, e)}
                                className="mt-4 w-full flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-sm"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {/* Rating */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Rating &amp; Reviews
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 font-semibold">
                            <div className="flex items-center gap-1.5">
                              <span className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md text-xs">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {p.rating}
                              </span>
                              <span className="text-xs text-slate-500">({p.reviews} verified reviews)</span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Category */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Category
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 font-semibold text-slate-800">
                            {p.cat}
                          </td>
                        ))}
                      </tr>

                      {/* Discount Percentage */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Discount Savings
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 font-extrabold text-emerald-600">
                            {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF (Save ₹{(p.mrp - p.price).toLocaleString('en-IN')})
                          </td>
                        ))}
                      </tr>

                      {/* Stock Availability */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Stock Availability
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({p.stock} units available)
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Product Specifications & Details */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Overview &amp; Features
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 text-xs text-slate-600 leading-relaxed">
                            {p.description}
                          </td>
                        ))}
                      </tr>

                      {/* Return Policy */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Return Policy
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 text-xs text-slate-700 font-semibold">
                            7-Day Doorstep Replacement / Instant Refund
                          </td>
                        ))}
                      </tr>

                      {/* Warranty */}
                      <tr>
                        <td className="p-4 sm:p-6 bg-slate-50/70 font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Warranty Coverage
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} className="p-4 sm:p-6 text-xs text-slate-700 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-brand-600" /> 1-Year Official Manufacturer Warranty
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add More Products to Compare section */}
              {comparedProducts.length < 3 && availableToAdd.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="font-black text-slate-900 text-base mb-4">
                    Add Another Product to Compare
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {availableToAdd.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl border border-slate-200 hover:border-brand-500 transition text-center flex flex-col justify-between"
                      >
                        <img src={item.img1} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">{item.brand}</span>
                          <h4 className="text-xs font-bold text-slate-900 line1">{item.name}</h4>
                          <span className="text-xs font-black text-slate-900 block mt-1">₹{item.price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCompare(item.id)}
                          className="mt-3 w-full py-1.5 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-bold text-xs rounded-lg transition"
                        >
                          + Compare
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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

export default ComparePage;
