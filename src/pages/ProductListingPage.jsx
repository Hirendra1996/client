import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';

import ProductCard from '../components/product/ProductCard';
import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import { PRODUCTS, CATEGORIES } from '../dummy data';

const ProductListingPage = () => {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const queryCategory = searchParams.get('category');
  const querySearch = searchParams.get('search') || '';
  const querySort = searchParams.get('sort') || 'recommended';
  const queryFilter = searchParams.get('filter') || '';

  // Determine current active category from path param or query param
  const activeCategory = categoryName
    ? decodeURIComponent(categoryName)
    : queryCategory
    ? decodeURIComponent(queryCategory)
    : 'All';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under1000', '1000to3000', '3000to10000', 'above10000'
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(querySort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync when route category changes
  React.useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  // Extract unique brands from dataset
  const allBrands = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.brand));
    return Array.from(set).sort();
  }, []);

  // Find category metadata if viewing specific category
  const categoryInfo = useMemo(() => {
    if (selectedCategory === 'All') return null;
    return CATEGORIES.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.cat.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search keyword filter
      if (querySearch) {
        const match = (p.name + p.brand + p.cat + (p.description || ''))
          .toLowerCase()
          .includes(querySearch.toLowerCase());
        if (!match) return false;
      }

      // Quick filter preset from URL (e.g., sale, new)
      if (queryFilter === 'sale' && !p.badge?.includes('OFF') && !p.flash) return false;
      if (queryFilter === 'new' && !p.isNew && !p.tags?.includes('new')) return false;

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price filter
      if (priceRange === 'under1000' && p.price >= 1000) return false;
      if (priceRange === '1000to3000' && (p.price < 1000 || p.price > 3000)) return false;
      if (priceRange === '3000to10000' && (p.price < 3000 || p.price > 10000)) return false;
      if (priceRange === 'above10000' && p.price <= 10000) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // Discount filter
      const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      if (minDiscount > 0 && discount < minDiscount) return false;

      // In stock filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      // Sort logic
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'bestselling') return b.reviews - a.reviews;
      return 0; // 'recommended'
    });
  }, [
    selectedCategory,
    querySearch,
    queryFilter,
    selectedBrands,
    priceRange,
    minRating,
    minDiscount,
    inStockOnly,
    sortBy
  ]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange('all');
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrands.length > 0 ||
    priceRange !== 'all' ||
    minRating > 0 ||
    minDiscount > 0 ||
    inStockOnly ||
    Boolean(querySearch);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header Layout */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-600 transition">
            Home
          </Link>
          <span>/</span>
          {categoryName ? (
            <>
              <Link to="/products" className="hover:text-brand-600 transition">
                Products
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{activeCategory}</span>
            </>
          ) : (
            <span className="text-slate-900 font-bold">All Products</span>
          )}
          {querySearch && (
            <>
              <span>/</span>
              <span className="text-slate-600">Search: "{querySearch}"</span>
            </>
          )}
        </nav>

        {/* Category Header Banner (If viewing a specific category) */}
        {categoryInfo && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-brand-900 text-white p-6 md:p-10 mb-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="z-10 max-w-xl">
              <span className="inline-block bg-brand-600/60 backdrop-blur text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full mb-3 tracking-widest">
                CATEGORY SPOTLIGHT
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                {categoryInfo.name}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Explore handpicked collection of premium {categoryInfo.name.toLowerCase()} curated for quality, reliability, and value.
              </p>

              {/* Subcategories pills */}
              {categoryInfo.subcategories && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {categoryInfo.subcategories.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchParams({ search: sub })}
                      className="bg-white/10 hover:bg-white hover:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full transition"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-64 h-40 md:h-48 rounded-2xl overflow-hidden shadow-pop shrink-0">
              <img
                src={categoryInfo.img}
                alt={categoryInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Toolbar: Filter Toggle (Mobile) & Sort Dropdown */}
        <div className="flex items-center justify-between lg:justify-end gap-4 mb-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          {/* Left: Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-600 transition"
          >
            <span>⚙️ Filters</span>
            {selectedBrands.length > 0 && (
              <span className="w-4 h-4 bg-brand-600 rounded-full text-[10px] grid place-items-center">
                {selectedBrands.length}
              </span>
            )}
          </button>

          {/* Right: Sort Select */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 border-none rounded-xl px-3 py-2 text-xs md:text-sm font-bold text-slate-800 outline-none cursor-pointer focus:ring-2 focus:ring-brand-100"
            >
              <option value="recommended">Featured</option>
              <option value="bestselling">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Active Filters:
            </span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-100">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-red-500">✕</button>
              </span>
            )}
            {selectedBrands.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200"
              >
                {b}
                <button onClick={() => handleBrandToggle(b)} className="hover:text-red-500">✕</button>
              </span>
            ))}
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                Price: {priceRange}
                <button onClick={() => setPriceRange('all')} className="hover:text-red-500">✕</button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                {minRating}★ &amp; above
                <button onClick={() => setMinRating(0)} className="hover:text-red-500">✕</button>
              </span>
            )}
            {minDiscount > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                {minDiscount}%+ Off
                <button onClick={() => setMinDiscount(0)} className="hover:text-red-500">✕</button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-red-500">✕</button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-sale hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-sale hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Categories
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left text-xs font-bold py-1.5 px-3 rounded-lg transition ${
                    selectedCategory === 'All'
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Categories ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`w-full text-left text-xs font-bold py-1.5 px-3 rounded-lg flex items-center justify-between transition ${
                      selectedCategory.toLowerCase() === c.name.toLowerCase()
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] font-normal text-slate-400">
                      {PRODUCTS.filter((p) => p.cat.toLowerCase() === c.name.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Price
              </h4>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under1000', label: 'Under ₹1,000' },
                  { id: '1000to3000', label: '₹1,000 - ₹3,000' },
                  { id: '3000to10000', label: '₹3,000 - ₹10,000' },
                  { id: 'above10000', label: 'Over ₹10,000' }
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer hover:text-brand-600">
                    <input
                      type="radio"
                      name="priceTier"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id)}
                      className="accent-brand-600"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Brands
              </h4>
              <div className="max-h-44 overflow-y-auto space-y-2 text-xs font-semibold text-slate-700 thin-scroll pr-1">
                {allBrands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-brand-600">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => handleBrandToggle(b)}
                      className="accent-brand-600 rounded"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Rating Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Customer Rating
              </h4>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {[4.5, 4.0, 3.5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                    className={`w-full text-left py-1 px-2 rounded-lg flex items-center justify-between transition ${
                      minRating === stars ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{'★'.repeat(Math.floor(stars))} {stars} &amp; above</span>
                    {minRating === stars && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Discount Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Discount
              </h4>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {[40, 30, 20].map((d) => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer hover:text-brand-600">
                    <input
                      type="radio"
                      name="discountTier"
                      checked={minDiscount === d}
                      onChange={() => setMinDiscount(minDiscount === d ? 0 : d)}
                      className="accent-brand-600"
                    />
                    <span>{d}% or more</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Products List Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode="grid" />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-card">
                <div className="w-20 h-20 bg-slate-100 rounded-full grid place-items-center text-4xl mx-auto mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">No products found</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                  We couldn't find any products matching your active filters. Try resetting filters or using a broader search term.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-8 py-3 rounded-full transition shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-[min(340px,90vw)] bg-white p-6 overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-slate-900">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center font-bold text-slate-600"
                >
                  ✕
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left text-xs font-bold py-2 px-3 rounded-lg ${
                      selectedCategory === 'All' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.name);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left text-xs font-bold py-2 px-3 rounded-lg ${
                        selectedCategory.toLowerCase() === c.name.toLowerCase()
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Price Range</h4>
                <div className="space-y-2 text-xs font-semibold">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under1000', label: 'Under ₹1,000' },
                    { id: '1000to3000', label: '₹1,000 - ₹3,000' },
                    { id: '3000to10000', label: '₹3,000 - ₹10,000' },
                    { id: 'above10000', label: 'Over ₹10,000' }
                  ].map((tier) => (
                    <label key={tier.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mPriceTier"
                        checked={priceRange === tier.id}
                        onChange={() => setPriceRange(tier.id)}
                        className="accent-brand-600"
                      />
                      <span>{tier.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={handleClearFilters}
                  className="flex-1 border border-slate-300 font-bold text-xs py-3 rounded-full"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-brand-600 text-white font-bold text-xs py-3 rounded-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons & Modals */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
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

export default ProductListingPage;
