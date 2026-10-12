import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToast
  } = useApp();

  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');

  if (!quickViewProduct) return null;

  const p = quickViewProduct;
  const wished = isInWishlist(p.id);
  const discountPercent = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  const getBadgeColor = (badge) => {
    if (!badge) return 'bg-brand-600';
    if (badge.includes('NEW')) return 'bg-emerald-500';
    if (badge.includes('OFF')) return 'bg-sale';
    if (badge.includes('BEST')) return 'bg-amber-500';
    if (badge.includes('PREMIUM')) return 'bg-slate-900';
    return 'bg-brand-600';
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const estDate = new Date(Date.now() + 2 * 864e5).toDateString();
    addToast('Delivery available!', `Expected by ${estDate}`);
  };

  const handleAddToCart = (e) => {
    addToCart(p.id, qty, e);
  };

  const handleBuyNow = (e) => {
    addToCart(p.id, qty, e);
    setQuickViewProduct(null);
    addToast('Proceeding to checkout...', `Purchasing ${qty} x ${p.name.slice(0, 30)}`);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      {/* Backdrop */}
      <div
        className="modal-bg absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="modal-panel relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2 shadow-2xl z-10">
        {/* Left: Product Image */}
        <div className="relative bg-slate-100 min-h-[280px]">
          <img
            src={p.img1}
            alt={p.name}
            className="w-full h-full max-h-[420px] object-cover md:rounded-l-3xl"
          />
          <span
            className={`absolute top-4 left-4 ${getBadgeColor(
              p.badge
            )} text-white text-xs font-extrabold px-3 py-1.5 rounded-full`}
          >
            {p.badge || `${discountPercent}% OFF`}
          </span>
        </div>

        {/* Right: Product Info */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition grid place-items-center font-bold text-slate-600"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              {p.brand} • {p.cat}
            </p>
            <h3 className="font-extrabold text-xl mt-1 leading-snug text-slate-900">
              {p.name}
            </h3>
            <p className="text-sm mt-2">
              <span className="stars">★★★★★</span> <b>{p.rating}</b>{' '}
              <span className="text-slate-500">
                | {p.reviews.toLocaleString('en-IN')} reviews
              </span>
            </p>
            <p className="mt-3 text-2xl font-black text-slate-900">
              ₹{p.price.toLocaleString('en-IN')}{' '}
              <span className="line-through text-slate-400 text-base font-normal">
                ₹{p.mrp.toLocaleString('en-IN')}
              </span>{' '}
              <span className="text-emerald-600 text-sm font-bold">
                {discountPercent}% OFF
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Inclusive of all taxes • Free delivery by <b>Tomorrow</b>
            </p>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-bold">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                ✓ In Stock
              </span>
              <span className="bg-slate-100 px-3 py-1.5 rounded-full">↩ 7-day returns</span>
              <span className="bg-slate-100 px-3 py-1.5 rounded-full">🛡 1-yr warranty</span>
            </div>

            {/* Quantity Stepper & Wishlist */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-3 border-2 border-slate-200 rounded-full px-2 py-1">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 font-bold transition"
                >
                  −
                </button>
                <span className="font-extrabold w-5 text-center">{qty}</span>
                <button
                  onClick={() => setQty((prev) => Math.min(9, prev + 1))}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 font-bold transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(p.id)}
                className={`w-11 h-11 rounded-full border-2 grid place-items-center transition ${
                  wished
                    ? 'border-sale text-sale bg-rose-50'
                    : 'border-slate-200 hover:border-sale hover:text-sale'
                }`}
                aria-label="Wishlist"
              >
                {wished ? '♥' : '♡'}
              </button>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="border-2 border-slate-900 font-extrabold text-sm py-3 rounded-full hover:bg-slate-900 hover:text-white transition"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3 rounded-full transition shadow-md"
              >
                BUY NOW →
              </button>
            </div>
          </div>

          {/* Delivery Check */}
          <form onSubmit={handlePincodeCheck} className="mt-4 flex gap-2">
            <input
              required
              pattern="[0-9]{6}"
              maxLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter pincode"
              className="flex-1 border-2 border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-brand-600 transition"
            />
            <button
              type="submit"
              className="text-brand-600 font-bold text-sm px-4 hover:underline"
            >
              Check
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
