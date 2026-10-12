import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  Download,
  Share2,
  HelpCircle,
  Copy,
  Check
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

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { getOrderById, orders, user, addToast } = useApp();

  const [copied, setCopied] = React.useState(false);

  // Find placed order or use latest order
  const order = (orderId ? getOrderById(orderId) : orders[0]) || orders[0];

  const handleCopyId = () => {
    if (order?.id) {
      navigator.clipboard?.writeText(order.id);
      setCopied(true);
      addToast('Copied to Clipboard', `Order ID: ${order.id}`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        <section className="max-w-3xl mx-auto px-4 mt-10">
          {/* Success Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              ORDER CONFIRMED
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
              Thank You for Your Order!
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              We've received your order and our fulfillment team is preparing it for dispatch. A confirmation message
              has been sent to your registered email &amp; phone.
            </p>

            {/* Order Reference Box */}
            {order && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto flex items-center justify-between text-xs">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Order Reference ID</span>
                  <strong className="text-sm font-black text-slate-900 tracking-wider">{order.id}</strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy ID
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Delivery & Items Summary */}
            {order && (
              <div className="mt-8 border-t border-slate-100 pt-6 text-left space-y-6">
                {/* Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Delivery:</span>
                    <strong className="text-indigo-950 font-extrabold text-sm flex items-center gap-1 mt-0.5">
                      <Truck className="w-4 h-4 text-brand-600" /> {order.estDelivery}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Mode:</span>
                    <strong className="text-slate-800 font-bold block mt-0.5">{order.paymentMethod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Paid:</span>
                    <strong className="text-slate-900 font-black text-sm block mt-0.5">
                      ₹{order.total?.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Items preview */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Items in this shipment ({order.items?.length})
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center gap-3">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                          <span className="text-[11px] text-slate-500">Qty: {item.quantity}</span>
                        </div>
                        <span className="text-xs font-black text-slate-900">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping address preview */}
                {order.shippingAddress && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <span className="font-bold text-slate-900 block mb-1">Delivering To:</span>
                    <p>
                      <strong>{order.shippingAddress.name}</strong> • +91 {order.shippingAddress.phone}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} —{' '}
                      {order.shippingAddress.pincode}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Actions CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 justify-center">
              {order && (
                <Link
                  to={`/track-order?id=${order.id}`}
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-md"
                >
                  <Truck className="w-4 h-4" /> Track Shipment Live
                </Link>
              )}
              <Link
                to="/orders"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-full transition"
              >
                View My Orders
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-full transition"
              >
                Continue Shopping
              </Link>
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

export default OrderSuccessPage;
