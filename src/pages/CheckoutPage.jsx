import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
  Building,
  Lock,
  ChevronRight
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

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI (Google Pay, PhonePe, Paytm)', desc: 'Instant 0% fee verification', badge: 'Fastest' },
  { id: 'card', name: 'Credit or Debit Card', desc: 'Visa, MasterCard, RuPay, Amex' },
  { id: 'netbanking', name: 'Net Banking', desc: '50+ Indian banking portals' },
  { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Pay with cash or UPI at your doorstep' }
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    addresses,
    addAddress,
    placeOrder,
    user,
    addToast
  } = useApp();

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const product = getProductById(id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || null
  );

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    type: 'Home'
  });

  const isFreeDelivery = cartSubtotal >= 999;
  const shippingFee = cartEntries.length === 0 ? 0 : isFreeDelivery ? 0 : 99;
  const totalAmount = cartSubtotal + shippingFee;

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.phone || !newAddr.street || !newAddr.pincode) {
      addToast('Missing Info', 'Please fill in name, mobile, address, and pincode.');
      return;
    }
    const created = addAddress(newAddr);
    setSelectedAddressId(created.id);
    setIsAddingAddress(false);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartEntries.length === 0) {
      addToast('Empty Cart', 'Please add products before checking out.');
      navigate('/products');
      return;
    }

    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    if (!selectedAddr) {
      addToast('Select Address', 'Please select or add a delivery address.');
      setIsAddingAddress(true);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cartEntries.map(({ product, qty }) => ({
        productId: product.id,
        quantity: qty,
        price: product.price,
        name: product.name,
        img: product.img1,
        brand: product.brand
      }));

      const newOrder = placeOrder({
        items: orderItems,
        shippingAddress: selectedAddr,
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || 'UPI',
        total: totalAmount,
        shippingFee: shippingFee
      });

      setIsProcessing(false);
      navigate(`/order-success/${newOrder.id}`);
    }, 1500);
  };

  if (cartEntries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <AnnouncementBar />
        <Navbar />
        <CategoryNav />
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-16 text-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Add products to your cart before proceeding to checkout.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-full transition"
            >
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
        <ToastContainer />
      </div>
    );
  }

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
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-brand-600 transition">Home</Link>
              <span>/</span>
              <Link to="/cart" className="hover:text-brand-600 transition">Cart</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">Secure Checkout</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
              <Lock className="w-6 h-6 text-brand-600" /> Secure Checkout
            </h1>
          </div>
        </section>

        {/* Checkout Steps */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Steps */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Delivery Address */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-black text-xs grid place-items-center">
                      1
                    </span>
                    <div>
                      <h2 className="font-extrabold text-slate-900 text-base">Select Delivery Address</h2>
                      <p className="text-xs text-slate-500">Choose where you'd like your order delivered</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress((prev) => !prev)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> {isAddingAddress ? 'Cancel' : 'Add New Address'}
                  </button>
                </div>

                {/* Add New Address Form Modal/Dropdown */}
                {isAddingAddress && (
                  <form onSubmit={handleCreateAddress} className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <h3 className="font-bold text-slate-900 text-xs">New Delivery Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">10-Digit Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-600 font-semibold mb-1">Street Address, Flat / House No.</label>
                        <input
                          type="text"
                          required
                          value={newAddr.street}
                          onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">6-Digit Pincode</label>
                        <input
                          type="text"
                          required
                          maxLength="6"
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold"
                      >
                        Save &amp; Deliver Here
                      </button>
                    </div>
                  </form>
                )}

                {/* Saved Address Cards */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition relative ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {addr.type}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-brand-600" />
                          )}
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900 mt-1">{addr.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-2">
                          Phone: +91 {addr.phone}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-black text-xs grid place-items-center">
                    2
                  </span>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-base">Select Payment Mode</h2>
                    <p className="text-xs text-slate-500">100% Protected 256-bit SSL encrypted checkout</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {PAYMENT_METHODS.map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <label
                        key={pm.id}
                        className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-600'
                            : 'border-slate-200 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={pm.id}
                            checked={isSelected}
                            onChange={() => setPaymentMethod(pm.id)}
                            className="mt-1 text-brand-600 focus:ring-brand-500"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-slate-900 block">{pm.name}</span>
                            <span className="text-xs text-slate-500">{pm.desc}</span>
                          </div>
                        </div>
                        {pm.badge && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {pm.badge}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Sub-form preview based on payment */}
                {paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <label className="block font-bold text-slate-700 mb-1.5">Enter Virtual Payment Address (UPI ID)</label>
                    <input
                      type="text"
                      placeholder="mobile@upi or user@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">A payment authorization request will be sent to your UPI app.</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">16-Digit Card Number</label>
                      <input
                        type="text"
                        maxLength="19"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength="5"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength="4"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Order Items Summary & Final CTA */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
                <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100">
                  Order Summary ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
                </h3>

                {/* Items preview list */}
                <div className="py-3 max-h-52 overflow-y-auto divide-y divide-slate-100 thin-scroll">
                  {cartEntries.map(({ product, qty }) => (
                    <div key={product.id} className="py-2.5 flex items-center gap-3">
                      <img src={product.img1} alt={product.name} className="w-11 h-11 rounded-xl object-cover border border-slate-200" />
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-slate-900 truncate">{product.name}</span>
                        <span className="text-[11px] text-slate-500">Qty: {qty} × ₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        ₹{(product.price * qty).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-bold text-emerald-600">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-base font-black text-slate-900">
                    <span>Grand Total</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Confirming Order...
                    </>
                  ) : (
                    <>
                      Place Order &amp; Pay ₹{totalAmount.toLocaleString('en-IN')} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-3">
                  🔒 By completing this purchase, you agree to Velvora’s Terms &amp; Refund Policy.
                </p>
              </div>
            </div>
          </div>
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

export default CheckoutPage;
