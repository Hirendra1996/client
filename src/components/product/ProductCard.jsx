import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ProductCard = ({ product, fixed = false, viewMode = 'grid' }) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    toggleCompare,
    compare
  } = useApp();

  const [currentImg, setCurrentImg] = useState(product.img1);
  const [isAdded, setIsAdded] = useState(false);
  const [isHeartPopping, setIsHeartPopping] = useState(false);

  const wished = isInWishlist(product.id);
  const isCompared = compare.includes(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const isLowStock = product.stock <= 8;

  const getBadgeColor = (badge) => {
    if (!badge) return 'bg-brand-600';
    if (badge.includes('NEW')) return 'bg-emerald-500';
    if (badge.includes('OFF')) return 'bg-sale';
    if (badge.includes('BEST')) return 'bg-amber-500';
    if (badge.includes('PREMIUM')) return 'bg-slate-900';
    return 'bg-brand-600';
  };

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  };

  const handleWishClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHeartPopping(true);
    toggleWishlist(product.id);
    setTimeout(() => setIsHeartPopping(false), 500);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1, e);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  // If List View is chosen in Product Listing Page
  if (viewMode === 'list') {
    return (
      <article className="card-hover bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row group transition-all">
        {/* Product Image */}
        <div
          className="relative overflow-hidden img-zoom bg-slate-100 w-full sm:w-56 shrink-0 aspect-[1/1]"
          onMouseEnter={() => {
            if (window.innerWidth > 768 && product.img2) setCurrentImg(product.img2);
          }}
          onMouseLeave={() => setCurrentImg(product.img1)}
        >
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={currentImg}
              alt={product.name}
              loading="lazy"
              className="prod-img w-full h-full object-cover"
            />
          </Link>

          <span
            className={`absolute top-2.5 left-2.5 ${getBadgeColor(
              product.badge
            )} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full`}
          >
            {product.badge || `${discountPercent}% OFF`}
          </span>

          <button
            onClick={handleWishClick}
            aria-label="Wishlist"
            className="wishBtn absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white shadow grid place-items-center hover:scale-110 transition"
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                wished ? 'text-sale fill-current' : 'text-slate-400 fill-none'
              } ${isHeartPopping ? 'heart-pop' : ''}`}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 017.5 5c1.8 0 3.4 1 4.5 2.6A4.5 4.5 0 0116.5 5 4.5 4.5 0 0121 9.5c0 4-4 7.5-9 11.5z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {product.brand} • {product.cat}
              </p>
              <button
                onClick={handleCompareClick}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
                  isCompared
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isCompared ? '✓ Comparing' : '⇄ Compare'}
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="font-bold text-base md:text-lg text-slate-900 hover:text-brand-600 transition-colors block mt-1"
            >
              {product.name}
            </Link>

            <p className="text-slate-500 text-xs md:text-sm mt-1.5 line2">
              {product.description || 'Premium quality product designed for modern lifestyle.'}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="stars text-sm">{renderStars(product.rating)}</span>
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-slate-400 text-xs">
                ({product.reviews.toLocaleString('en-IN')} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-lg md:text-xl font-extrabold text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}{' '}
                <span className="line-through text-slate-400 text-xs font-normal">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>{' '}
                <span className="text-emerald-600 font-bold text-xs">{discountPercent}% OFF</span>
              </p>
              {isLowStock ? (
                <p className="text-[11px] font-bold text-sale mt-0.5">
                  Only {product.stock} left in stock
                </p>
              ) : (
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                  ✓ In Stock — ships in 24h
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/product/${product.id}`}
                className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-900 text-xs font-bold transition"
              >
                View Details
              </Link>
              <button
                onClick={handleAddToCart}
                className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-brand-600 text-white'
                }`}
              >
                {isAdded ? '✓ ADDED' : '+ ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Default)
  return (
    <article
      className={`card-hover bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group ${
        fixed ? 'w-[230px] md:w-[260px] shrink-0' : ''
      }`}
    >
      {/* Product Image Box */}
      <div
        className="relative overflow-hidden img-zoom bg-slate-100 aspect-[1/1]"
        onMouseEnter={() => {
          if (window.innerWidth > 768 && product.img2) {
            setCurrentImg(product.img2);
          }
        }}
        onMouseLeave={() => {
          setCurrentImg(product.img1);
        }}
      >
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={currentImg}
            alt={product.name}
            loading="lazy"
            className="prod-img w-full h-full object-cover"
          />
        </Link>

        {/* Badge */}
        <span
          className={`absolute top-2.5 left-2.5 ${getBadgeColor(
            product.badge
          )} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full pointer-events-none`}
        >
          {product.badge || `${discountPercent}% OFF`}
        </span>

        {/* Extra New Badge */}
        {product.isNew && (
          <span className="absolute top-2.5 left-2.5 mt-7 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full pointer-events-none">
            NEW
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishClick}
          aria-label="Wishlist"
          className="wishBtn absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white shadow grid place-items-center hover:scale-110 transition z-10"
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              wished ? 'text-sale fill-current' : 'text-slate-400 fill-none'
            } ${isHeartPopping ? 'heart-pop' : ''}`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 017.5 5c1.8 0 3.4 1 4.5 2.6A4.5 4.5 0 0116.5 5 4.5 4.5 0 0121 9.5c0 4-4 7.5-9 11.5z" />
          </svg>
        </button>

        {/* Action slide-in bar on hover (Quick View removed, direct link & compare) */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold py-2.5 rounded-full hover:bg-slate-900 hover:text-white transition text-center shadow-sm"
          >
            VIEW DETAILS →
          </Link>
          <button
            onClick={handleCompareClick}
            aria-label="Compare"
            className={`w-10 h-10 rounded-full grid place-items-center transition text-sm shadow-sm ${
              isCompared
                ? 'bg-brand-600 text-white'
                : 'bg-white/95 hover:bg-slate-900 hover:text-white'
            }`}
          >
            ⇄
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          {product.brand}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-[13px] md:text-sm line2 mt-0.5 hover:text-brand-600 transition-colors block"
        >
          {product.name}
        </Link>
        <p className="text-xs mt-1">
          <span className="stars">{renderStars(product.rating)}</span>{' '}
          <span className="font-bold">{product.rating}</span>{' '}
          <span className="text-slate-400">({product.reviews.toLocaleString('en-IN')})</span>
        </p>
        <p className="mt-1.5 text-sm md:text-base">
          <span className="font-extrabold">₹{product.price.toLocaleString('en-IN')}</span>{' '}
          <span className="line-through text-slate-400 text-xs font-normal">
            ₹{product.mrp.toLocaleString('en-IN')}
          </span>{' '}
          <span className="text-emerald-600 font-bold text-xs">{discountPercent}% OFF</span>
        </p>

        {/* Stock / Shipping note */}
        {isLowStock ? (
          <>
            <p className="text-[11px] font-bold text-sale mt-1">
              Only {product.stock} left in stock
            </p>
            <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full progress-shine"
                style={{ width: `${product.sold}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-[11px] font-semibold text-emerald-600 mt-1">
            ✓ In Stock — ships in 24h
          </p>
        )}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className={`addBtn mt-3 w-full border-2 font-extrabold text-xs md:text-sm py-2.5 rounded-full transition ${
            isAdded
              ? '!bg-emerald-600 !border-emerald-600 !text-white'
              : 'border-slate-900 hover:bg-brand-600 hover:border-brand-600 hover:text-white text-slate-900'
          }`}
        >
          {isAdded ? '✓ ADDED' : '+ ADD TO CART'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
