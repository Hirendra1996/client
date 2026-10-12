import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRODUCTS, getProductById, REVIEWS } from '../dummy data';

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

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    toggleCompare,
    compare,
    location,
    setIsLocationOpen,
    addToast
  } = useApp();

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Find target product
  const product = useMemo(() => {
    return getProductById(productId) || PRODUCTS[0];
  }, [productId]);

  // Gallery Images List (combine img1, img2 and extra realistic angle views)
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const imgs = [product.img1];
    if (product.img2 && product.img2 !== product.img1) {
      imgs.push(product.img2);
    }
    // High-quality angle variants based on category
    if (product.cat === 'Electronics') {
      imgs.push('https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80');
      imgs.push('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80');
    } else if (product.cat === 'Fashion') {
      imgs.push('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80');
      imgs.push('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80');
    } else {
      imgs.push('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80');
      imgs.push('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    }
    return imgs.slice(0, 4);
  }, [product]);

  // Interactive UI States
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Midnight Black');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews' | 'shipping'
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  // New review form states
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState([
    {
      id: 101,
      name: 'Aditya Sen',
      city: 'Mumbai',
      date: '2 days ago',
      rating: 5,
      verified: true,
      title: 'Exceeded my expectations!',
      text: 'The build quality is remarkably premium. Fast delivery, neatly packed, and works like a dream right out of the box.'
    },
    {
      id: 102,
      name: 'Meera Nambiar',
      city: 'Bangalore',
      date: '1 week ago',
      rating: 5,
      verified: true,
      title: 'Superb product & value',
      text: 'Totally worth every rupee spent. Looks even better in real life than the photos. Velvora customer service is also 10/10.'
    },
    {
      id: 103,
      name: 'Karan Mehra',
      city: 'Delhi NCR',
      date: '2 weeks ago',
      rating: 4,
      verified: true,
      title: 'Great overall experience',
      text: 'High quality materials and very comfortable to use daily. Arrived on time with proper warranty documentation.'
    }
  ]);

  // Update selected image when product changes
  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    }
  }, [galleryImages]);

  // Derived values
  const wished = isInWishlist(product.id);
  const isCompared = compare.includes(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const savingsAmount = product.mrp - product.price;
  const isLowStock = product.stock <= 8;

  // Color options palette
  const colorOptions = useMemo(() => [
    { name: 'Midnight Black', hex: '#0F172A' },
    { name: 'Titanium Grey', hex: '#64748B' },
    { name: 'Frost Silver', hex: '#E2E8F0' },
    { name: 'Royal Navy', hex: '#1E3A8A' }
  ], []);

  // Size / Config options based on category
  const sizeOptions = useMemo(() => {
    if (product.cat === 'Fashion') return ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
    if (product.cat === 'Electronics') return ['128 GB', '256 GB', '512 GB'];
    return ['Standard', 'Deluxe Pro'];
  }, [product.cat]);

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  }, [product]);

  // Also bought products
  const recommendedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.cat !== product.cat).slice(0, 4);
  }, [product]);

  // Handlers
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) {
        addToast(`Only ${product.stock} units available in stock`);
        return product.stock;
      }
      return next;
    });
  };

  const handleAddToCart = (e) => {
    setIsAdding(true);
    addToCart(product.id, quantity, e);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = (e) => {
    addToCart(product.id, quantity, e);
    addToast('Proceeding to Checkout', `Purchasing ${quantity} unit(s)`);
    navigate('/products');
  };

  const handleWishlistToggle = () => {
    setIsHeartPopping(true);
    toggleWishlist(product.id);
    setTimeout(() => setIsHeartPopping(false), 500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard!', 'Share it with your friends');
    }
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setPincodeStatus({ success: false, message: 'Please enter a valid 6-digit PIN code' });
      return;
    }
    const days = 2;
    const estDate = new Date(Date.now() + days * 864e5).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    setPincodeStatus({
      success: true,
      message: `Delivery available by ${estDate}. Free shipping on this order!`
    });
  };

  const handleApplyCoupon = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCouponCopied(true);
      addToast(`Coupon "${code}" copied!`, 'Paste during checkout for extra discount');
      setTimeout(() => setCouponCopied(false), 3000);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      addToast('Please complete all fields');
      return;
    }
    const createdReview = {
      id: Date.now(),
      name: newReviewName.trim(),
      city: 'Verified Buyer',
      date: 'Just now',
      rating: newReviewRating,
      verified: true,
      title: 'Customer Review',
      text: newReviewComment.trim()
    };
    setLocalReviews([createdReview, ...localReviews]);
    setIsReviewModalOpen(false);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    addToast('Thank you!', 'Your review has been submitted successfully');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header Components */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-600 transition font-medium">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-600 transition font-medium">
            Products
          </Link>
          <span>/</span>
          <Link to={`/category/${product.cat}`} className="hover:text-brand-600 transition font-medium">
            {product.cat}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Hero: 2 Columns */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Image Gallery & Previews (5 cols) */}
            <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails row / column */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    onMouseEnter={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-brand-600 ring-2 ring-brand-100 shadow-md scale-105'
                        : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Showcase Image */}
              <div className="relative flex-1 bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden aspect-square group shadow-inner">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setIsZoomModalOpen(true)}
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-brand-600 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg tracking-wider">
                    {product.badge}
                  </span>
                )}

                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2.5">
                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    aria-label="Wishlist"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md grid place-items-center hover:bg-white hover:scale-110 transition active:scale-95"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        wished ? 'text-sale fill-current' : 'text-slate-400 fill-none'
                      } ${isHeartPopping ? 'scale-125' : ''}`}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 017.5 5c1.8 0 3.4 1 4.5 2.6A4.5 4.5 0 0116.5 5 4.5 4.5 0 0121 9.5c0 4-4 7.5-9 11.5z" />
                    </svg>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    aria-label="Share"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md grid place-items-center hover:bg-white hover:scale-110 transition active:scale-95 text-slate-500 hover:text-slate-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>

                  {/* Zoom Preview Button */}
                  <button
                    onClick={() => setIsZoomModalOpen(true)}
                    aria-label="Enlarge Image"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md grid place-items-center hover:bg-white hover:scale-110 transition active:scale-95 text-slate-500 hover:text-slate-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-none flex items-center gap-1.5">
                  <span>🔍 Click to expand view</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Details & Purchase Controls (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              {/* Brand & Social Proof Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-50 text-brand-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-brand-100">
                    {product.brand}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified Store
                  </span>
                </div>

                {product.sold && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <b>{product.sold}+ bought</b> in past month
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews Bar */}
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-extrabold text-slate-900">{product.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <a
                  href="#reviews-section"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('reviews');
                    const el = document.getElementById('details-tabs-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  {product.reviews.toLocaleString('en-IN')} verified customer ratings
                </a>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  SKU: VEL-{product.id * 892}
                </span>
              </div>

              {/* Price Block */}
              <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 md:p-5 mb-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-slate-400 line-through font-semibold">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-sale text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                    {discountPercent}% OFF
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/40 text-xs">
                  <p className="text-emerald-700 font-bold">
                    You save ₹{savingsAmount.toLocaleString('en-IN')} (Inclusive of all taxes)
                  </p>
                  <p className="text-slate-500 font-medium">
                    EMI starts at <b className="text-slate-800">₹{Math.round(product.price / 6)}/mo</b>
                  </p>
                </div>
              </div>

              {/* Color Options */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Color: <b className="text-slate-900 font-bold">{selectedColor}</b>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full transition-transform flex items-center justify-center ${
                        selectedColor === c.name ? 'ring-2 ring-brand-600 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <svg className={`w-4 h-4 ${c.hex === '#E2E8F0' ? 'text-slate-900' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size / Configuration Options */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {product.cat === 'Fashion' ? 'Select Size:' : 'Variant / Edition:'} <b className="text-slate-900 font-bold">{selectedSize}</b>
                  </span>
                  {product.cat === 'Fashion' && (
                    <button
                      onClick={() => addToast('Size Guide', 'Standard Indian sizing fits true to size.')}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      Size Chart
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status Urgency */}
              <div className="mb-6">
                {isLowStock ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-sale bg-red-50 border border-red-100 px-3.5 py-2 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-sale animate-ping" />
                    <span>Hurry! Only {product.stock} units left in stock. Order soon.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl">
                    <span>✓ In Stock — Ready to ship from Velvora Mumbai Hub</span>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Main Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 mb-6">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 h-12 shrink-0">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-11 h-full grid place-items-center text-slate-600 hover:bg-slate-200 transition disabled:opacity-30 disabled:cursor-not-allowed text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-black text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="w-11 h-full grid place-items-center text-slate-600 hover:bg-slate-200 transition disabled:opacity-30 disabled:cursor-not-allowed text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 h-12 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 transition shadow-lg shadow-brand-600/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{isAdding ? 'Adding to Cart...' : 'Add to Cart'}</span>
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-slate-900/20"
                >
                  <span>⚡ Buy Now</span>
                </button>
              </div>

              {/* Compare Button */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`flex items-center gap-2 text-xs font-bold transition ${
                    isCompared ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>{isCompared ? '✓ Added to Comparison' : '+ Compare with other products'}</span>
                </button>

                <span className="text-xs text-slate-400">
                  Deliver to: <b className="text-slate-700">{location}</b>
                </span>
              </div>

              {/* Pincode & Delivery Checker */}
              <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/80 mb-6">
                <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>📍 Check Delivery Availability</span>
                </h4>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`text-xs font-semibold mt-2 ${pincodeStatus.success ? 'text-emerald-700' : 'text-sale'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </div>

              {/* Value Badges & Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs">
                  <span className="text-xl mb-1 block">🚚</span>
                  <p className="text-[11px] font-extrabold text-slate-900">Free Shipping</p>
                  <p className="text-[10px] text-slate-400">On all orders</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs">
                  <span className="text-xl mb-1 block">🔄</span>
                  <p className="text-[11px] font-extrabold text-slate-900">7-Day Return</p>
                  <p className="text-[10px] text-slate-400">No questions asked</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs">
                  <span className="text-xl mb-1 block">🛡️</span>
                  <p className="text-[11px] font-extrabold text-slate-900">1 Yr Warranty</p>
                  <p className="text-[10px] text-slate-400">Brand authorized</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs">
                  <span className="text-xl mb-1 block">🔒</span>
                  <p className="text-[11px] font-extrabold text-slate-900">Secure Pay</p>
                  <p className="text-[10px] text-slate-400">256-bit SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons & Bank Offers Promo Strip */}
        <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10 border border-brand-200/60 rounded-3xl p-5 md:p-6 mb-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white grid place-items-center text-xl shrink-0 shadow-md">
              🏷️
            </div>
            <div>
              <h4 className="font-extrabold text-sm md:text-base text-slate-900">
                Exclusive Deal: Extra ₹150 OFF on this item
              </h4>
              <p className="text-slate-600 text-xs">
                Use code <b className="font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">VELVORA150</b> at checkout. Valid on prepaid orders.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleApplyCoupon('VELVORA150')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-sm shrink-0"
          >
            {couponCopied ? '✓ Code Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* DETAILS TABS SECTION */}
        <div id="details-tabs-section" className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden mb-12">
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-xs md:text-sm font-extrabold transition border-b-2 shrink-0 ${
                activeTab === 'overview'
                  ? 'border-brand-600 text-brand-600 bg-brand-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview &amp; Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs md:text-sm font-extrabold transition border-b-2 shrink-0 ${
                activeTab === 'specs'
                  ? 'border-brand-600 text-brand-600 bg-brand-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-xs md:text-sm font-extrabold transition border-b-2 shrink-0 ${
                activeTab === 'reviews'
                  ? 'border-brand-600 text-brand-600 bg-brand-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Ratings &amp; Reviews ({localReviews.length + product.reviews})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-4 text-xs md:text-sm font-extrabold transition border-b-2 shrink-0 ${
                activeTab === 'shipping'
                  ? 'border-brand-600 text-brand-600 bg-brand-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Shipping &amp; Policies
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* 1. OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">About this product</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-4">
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xl">✨</span>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Premium Grade Materials</h5>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Manufactured with highest-tier engineering for extended durability and luxurious feel.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xl">⚡</span>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Optimized Performance</h5>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Calibrated for peak efficiency, seamless daily usability, and unmatched reliability.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xl">🌿</span>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Eco-Conscious Packaging</h5>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Shipped in 100% recyclable, zero-waste protective cushioning.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xl">🏆</span>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Certified Quality Tested</h5>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Passes 24 stringent multi-point quality inspections prior to dispatch.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* In the Box */}
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-3">
                    What's in the Box
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> 1x {product.name}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> 1x User Manual &amp; Setup Guide
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> 1x Official Warranty Certificate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> 1x Velvora Authenticity Card
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-black text-slate-900 mb-4">Detailed Specifications</h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  <div className="grid grid-cols-3 p-4 bg-slate-50/60 text-xs">
                    <span className="font-bold text-slate-500">Brand</span>
                    <span className="col-span-2 font-bold text-slate-900">{product.brand}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Category</span>
                    <span className="col-span-2 font-semibold text-slate-800">{product.cat}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-slate-50/60 text-xs">
                    <span className="font-bold text-slate-500">Item Model Number</span>
                    <span className="col-span-2 font-semibold text-slate-800">VEL-{product.id * 102}X</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Selected Color</span>
                    <span className="col-span-2 font-semibold text-slate-800">{selectedColor}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-slate-50/60 text-xs">
                    <span className="font-bold text-slate-500">Edition / Size</span>
                    <span className="col-span-2 font-semibold text-slate-800">{selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Warranty Term</span>
                    <span className="col-span-2 font-semibold text-slate-800">1 Year National Brand Replacement Warranty</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 bg-slate-50/60 text-xs">
                    <span className="font-bold text-slate-500">Country of Origin</span>
                    <span className="col-span-2 font-semibold text-slate-800">India</span>
                  </div>
                  <div className="grid grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Manufacturer</span>
                    <span className="col-span-2 font-semibold text-slate-800">{product.brand} Global Lifestyle Pvt. Ltd.</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. RATINGS & REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                {/* Summary Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                      <span className="text-4xl md:text-5xl font-black text-slate-900">{product.rating}</span>
                      <div>
                        {renderStars(product.rating)}
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">Based on {product.reviews} reviews</p>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-700 font-bold mt-1">
                      ✓ 94% of verified buyers recommend this item
                    </p>
                  </div>

                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-6 py-3 rounded-full transition shadow-md"
                  >
                    ✍️ Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs grid place-items-center">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-xs text-slate-900">{rev.name}</h5>
                              {rev.verified && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-1.5 py-0.5 rounded">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">{rev.city} • {rev.date}</span>
                          </div>
                        </div>
                        {renderStars(rev.rating)}
                      </div>
                      <h6 className="font-bold text-xs text-slate-900 mb-1">{rev.title}</h6>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SHIPPING & POLICIES */}
            {activeTab === 'shipping' && (
              <div className="max-w-4xl space-y-6 text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">Shipping Information</h4>
                  <p>
                    All orders are packed securely and dispatched via our express courier network (BlueDart, Delhivery, DTDC). Standard transit time is 2-4 business days depending on location.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">7-Day Return &amp; Exchange</h4>
                  <p>
                    If you receive a defective or incorrect item, request an effortless pickup within 7 days of delivery. Refunds are credited to original payment source within 48 hours of return inspection.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">Brand Warranty</h4>
                  <p>
                    This item includes a 1-year comprehensive brand warranty. For service assistance, contact Velvora 24/7 Support or the manufacturer's authorized customer care.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                  More in {product.cat}
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Explore similar high-rated picks</p>
              </div>
              <Link
                to={`/category/${product.cat}`}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                View all in {product.cat} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} viewMode="grid" />
              ))}
            </div>
          </section>
        )}

        {/* RECOMMENDED FOR YOU */}
        {recommendedProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                  Customers Also Viewed
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Handpicked recommendations for your lifestyle</p>
              </div>
              <Link
                to="/products"
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                Explore Catalog →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} viewMode="grid" />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MOBILE STICKY PURCHASE BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-brand-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5"
          >
            <span>Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-slate-900 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-md"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* ZOOM LIGHTBOX MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 grid place-items-center transition text-lg font-bold"
          >
            ✕
          </button>
          <div className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-contain" />
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 grid place-items-center transition font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-1">Write a Review</h3>
            <p className="text-xs text-slate-500 mb-5">Share your feedback on {product.name}</p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="text-2xl text-amber-400 transition hover:scale-110"
                    >
                      {star <= newReviewRating ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-2">
                    {newReviewRating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="What did you like or dislike? How was the quality?"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full text-xs font-bold transition shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Modals and Footer */}
      <Footer />

      {/* Floating Buttons */}
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

export default ProductDetailPage;
