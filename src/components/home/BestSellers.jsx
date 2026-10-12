import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getBestSellers } from '../../dummy data';

const BestSellers = () => {
  const { addToCart } = useApp();
  const bestSellers = getBestSellers();

  const getRankBadgeClass = (index) => {
    switch (index) {
      case 0:
        return 'bg-amber-400 text-slate-900';
      case 1:
        return 'bg-slate-300 text-slate-800';
      case 2:
        return 'bg-amber-700 text-white';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <section id="best" className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 shadow-card">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              🏆 Best Sellers
            </h2>
            <p className="text-slate-500 mt-1">Ranked by real sales. Loved by millions.</p>
          </div>
          <Link
            to="/products"
            className="text-brand-600 font-bold text-sm hidden md:block hover:underline"
          >
            View Rankings →
          </Link>
        </div>

        <div id="bestGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map((p, index) => (
            <div
              key={p.id}
              className="card-hover border border-slate-200 rounded-2xl p-3 flex gap-3 relative overflow-hidden bg-white"
            >
              {/* Rank Badge */}
              <span
                className={`absolute -top-1 -left-1 ${getRankBadgeClass(
                  index
                )} text-xs font-black px-3 py-1.5 rounded-br-2xl shadow-sm`}
              >
                #{index + 1}
              </span>

              {/* Product Thumbnail with direct link */}
              <Link to={`/product/${p.id}`} className="shrink-0 mt-5 block">
                <img
                  src={p.img1}
                  alt={p.name}
                  loading="lazy"
                  className="w-24 h-24 rounded-xl object-cover hover:opacity-90 transition"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 mt-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {p.brand}
                </p>
                <Link
                  to={`/product/${p.id}`}
                  className="font-bold text-[13px] line2 hover:text-brand-600 transition-colors block"
                >
                  {p.name}
                </Link>
                <p className="text-xs mt-0.5">
                  <span className="stars">★★★★★</span> <b>{p.rating}</b>
                </p>

                {/* Sales meter */}
                <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${p.sold}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {(p.reviews / 1000).toFixed(1)}k bought this month
                </p>

                {/* Price and Add button */}
                <div className="flex items-center justify-between mt-1.5">
                  <p className="font-extrabold text-sm">₹{p.price.toLocaleString('en-IN')}</p>
                  <button
                    onClick={(e) => addToCart(p.id, 1, e)}
                    className="bg-slate-900 hover:bg-brand-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full transition shadow-sm"
                  >
                    ADD +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
