import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

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

import ProductCard from '../components/product/ProductCard';
import { useApp } from '../context/AppContext';
import { PRODUCTS, getProductById } from '../dummy data';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart, addToast } = useApp();

  const wishlistProducts = wishlist
    .map((id) => getProductById(id))
    .filter(Boolean);

  const handleMoveAllToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((p) => {
      addToCart(p.id, 1);
    });
    addToast('Moved to Cart', `Added ${wishlistProducts.length} items to your shopping cart.`);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlist.forEach((id) => toggleWishlist(id));
      addToast('Wishlist Cleared');
    }
  };

  const recommended = PRODUCTS.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-16">
        {/* Breadcrumb banner */}
        <section className="bg-white border-b border-slate-200/80 py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Link to="/" className="hover:text-brand-600 transition">Home</Link>
                <span>/</span>
                <span className="text-slate-900 font-bold">My Wishlist</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                My Wishlist
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600">
                  {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
                </span>
              </h1>
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMoveAllToCart}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move All to Cart
                </button>
                <button
                  type="button"
                  onClick={handleClearWishlist}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold rounded-xl transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Wishlist Grid */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-5">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Your Wishlist is Empty</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Explore our catalog and click the heart icon on any product to save your favorites for later!
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-md"
              >
                Explore Trending Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Recommended For You Section */}
        {recommended.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> You May Also Love
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Recommended Picks</h2>
              </div>
              <Link
                to="/products"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recommended.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
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

export default WishlistPage;
