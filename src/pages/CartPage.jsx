import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  Percent
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
import { getProductById } from '../dummy data';

const COUPONS = [
  { code: 'VELVORA10', discount: 10, type: 'percent', minOrder: 999, desc: '10% off on orders above ₹999' },
  { code: 'FESTIVE500', discount: 500, type: 'flat', minOrder: 2999, desc: 'Flat ₹500 off on orders above ₹2,999' },
  { code: 'FREESHIP', discount: 99, type: 'flat', minOrder: 499, desc: 'Free Express Shipping' }
];

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartSavings,
    changeQty,
    removeFromCart,
    toggleWishlist,
    isInWishlist,
    addToast
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const product = getProductById(id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  // Delivery calculation
  const isFreeDelivery = cartSubtotal >= 999;
  const shippingFee = cartEntries.length === 0 ? 0 : isFreeDelivery ? 0 : 99;
  const amountNeededForFreeShip = Math.max(0, 999 - cartSubtotal);

  // Coupon calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discount) / 100);
    } else {
      couponDiscount = appliedCoupon.discount;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const cleanCode = couponCode.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      setCouponError('Invalid coupon code. Try VELVORA10 or FESTIVE500.');
      return;
    }

    if (cartSubtotal < found.minOrder) {
      setCouponError(`Requires minimum order value of ₹${found.minOrder.toLocaleString('en-IN')}`);
      return;
    }

    setAppliedCoupon(found);
    addToast('Coupon Applied! 🎉', `Code ${found.code} applied successfully.`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon Removed');
  };

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
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Link to="/" className="hover:text-brand-600 transition">Home</Link>
                <span>/</span>
                <span className="text-slate-900 font-bold">Shopping Cart</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                Shopping Cart
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600">
                  {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                </span>
              </h1>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Cart Contents */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          {cartEntries.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-20 h-20 rounded-full bg-indigo-50 text-brand-600 flex items-center justify-center mx-auto mb-5">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Your Cart is Empty</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Looks like you haven't added anything to your cart yet. Discover trending deals and bestseller products!
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-md"
                >
                  Explore Trending Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/wishlist"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-full transition"
                >
                  View Saved Wishlist
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Item List & Delivery Progress */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free Shipping Alert Bar */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isFreeDelivery ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-50 text-brand-600'
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {isFreeDelivery ? (
                      <p className="text-xs font-bold text-emerald-700">
                        🎉 Yay! You have unlocked <strong>FREE Standard Delivery</strong> on this order!
                      </p>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Add <strong>₹{amountNeededForFreeShip.toLocaleString('en-IN')}</strong> more for <span className="text-brand-600 font-bold">FREE Delivery</span>
                        </p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="bg-brand-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Container */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
                  {cartEntries.map(({ product, qty }) => {
                    const itemSavings = (product.mrp - product.price) * qty;
                    const wished = isInWishlist(product.id);

                    return (
                      <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 transition hover:bg-slate-50/50">
                        <Link to={`/product/${product.id}`} className="shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={product.img1} alt={product.name} className="w-full h-full object-cover" />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {product.brand}
                              </span>
                              <Link
                                to={`/product/${product.id}`}
                                className="block font-bold text-sm sm:text-base text-slate-900 hover:text-brand-600 transition line2"
                              >
                                {product.name}
                              </Link>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-2 flex flex-wrap items-baseline gap-2">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              ₹{(product.price * qty).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{(product.mrp * qty).toLocaleString('en-IN')}
                            </span>
                            {itemSavings > 0 && (
                              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Save ₹{itemSavings.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          {/* Controls row */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-slate-200 rounded-full bg-white shadow-xs">
                              <button
                                type="button"
                                onClick={() => changeQty(product.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-brand-600 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-slate-900">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => changeQty(product.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-brand-600 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Wishlist toggle */}
                            <button
                              type="button"
                              onClick={() => toggleWishlist(product.id)}
                              className={`text-xs font-bold flex items-center gap-1.5 transition ${
                                wished ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`} />
                              {wished ? 'Saved in Wishlist' : 'Move to Wishlist'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Order Summary & Coupon */}
              <div className="lg:col-span-4 space-y-4">
                {/* Coupon Box */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-brand-600" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Apply Promo Coupon
                    </h3>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div>
                        <span className="font-extrabold text-emerald-800 tracking-wider">
                          {appliedCoupon.code}
                        </span>
                        <p className="text-[11px] text-emerald-700 mt-0.5">
                          ₹{couponDiscount.toLocaleString('en-IN')} discount applied
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. VELVORA10"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="w-full text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>
                      )}
                    </form>
                  )}

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Active: <strong>VELVORA10</strong> (10% off)</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponCode('VELVORA10');
                      }}
                      className="text-brand-600 font-bold hover:underline"
                    >
                      Use code
                    </button>
                  </div>
                </div>

                {/* Price Summary Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
                  <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100">
                    Price Details ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
                  </h3>

                  <div className="py-4 space-y-2.5 text-xs text-slate-600 border-b border-slate-100">
                    <div className="flex justify-between">
                      <span>Total Subtotal (MRP)</span>
                      <span className="font-semibold text-slate-900">
                        ₹{(cartSubtotal + cartSavings).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between text-emerald-600">
                      <span>Product Discount</span>
                      <span className="font-bold">
                        - ₹{cartSavings.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Coupon Discount ({appliedCoupon.code})</span>
                        <span className="font-bold">
                          - ₹{couponDiscount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Delivery</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="font-bold text-emerald-600">FREE</span>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="py-4 flex justify-between items-baseline">
                    <span className="font-extrabold text-sm text-slate-900">Total Amount</span>
                    <span className="font-black text-xl text-slate-900">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {cartSavings + couponDiscount > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center mb-4">
                      🎉 You will save ₹{(cartSavings + couponDiscount).toLocaleString('en-IN')} on this order!
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-4 space-y-2 text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Secure 256-Bit Encrypted Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                      <span>7-Day Easy Doorstep Returns Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
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

export default CartPage;
