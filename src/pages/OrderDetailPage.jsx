import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download,
  RotateCcw,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import AccountSidebar from '../components/layout/AccountSidebar';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

import { useApp } from '../context/AppContext';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, orders, cancelOrder, addToast } = useApp();

  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <AnnouncementBar />
        <Navbar />
        <CategoryNav />
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-16 text-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900">Order Not Found</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              We couldn't locate an order with ID <strong>{orderId}</strong>.
            </p>
            <Link
              to="/orders"
              className="mt-6 inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-full transition"
            >
              Back to My Orders
            </Link>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
        <ToastContainer />
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    addToast('Invoice Downloaded', `Tax invoice for order #${order.id} downloaded.`);
  };

  const handleCancel = () => {
    const reason = window.prompt('Specify cancellation reason:', 'Accidental order');
    if (reason !== null) {
      cancelOrder(order.id, reason);
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
        {/* Breadcrumb banner */}
        <section className="bg-white border-b border-slate-200/80 py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Link to="/" className="hover:text-brand-600 transition">Home</Link>
                <span>/</span>
                <Link to="/orders" className="hover:text-brand-600 transition">My Orders</Link>
                <span>/</span>
                <span className="text-slate-900 font-bold">{order.id}</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-3">
                Order #{order.id}
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download Tax Invoice
              </button>
              <Link
                to={`/track-order?id=${order.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" /> Track Live
              </Link>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Order Details Body (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Order Milestones / Timeline Progress */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="font-extrabold text-base text-slate-900">Shipment Milestone Progress</h2>
                    <p className="text-xs text-slate-500">
                      Courier: <strong>{order.courier}</strong> • AWB: <strong>{order.trackingNumber}</strong>
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {order.estDelivery}
                  </span>
                </div>

                {/* Vertical Timeline */}
                <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {order.timeline?.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 text-xs">
                      <div
                        className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          step.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                      </div>
                      <div className="flex-1">
                        <strong className={`block text-xs ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </strong>
                        <span className="text-[11px] text-slate-400">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-extrabold text-base text-slate-900 pb-4 border-b border-slate-100">
                  Ordered Products ({order.items?.length})
                </h3>

                <div className="divide-y divide-slate-100">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                          />
                        )}
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {item.brand}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                          <span className="text-xs text-slate-500 mt-1 block">
                            Quantity: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-black text-sm text-slate-900">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-xs font-bold text-brand-600 hover:underline"
                        >
                          Buy Again →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Payment Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shipping details */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
                    <MapPin className="w-4 h-4 text-brand-600" /> Delivery Address
                  </div>
                  {order.shippingAddress && (
                    <>
                      <p className="font-bold text-slate-900">{order.shippingAddress.name}</p>
                      <p className="text-slate-600 leading-relaxed">
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} —{' '}
                        {order.shippingAddress.pincode}
                      </p>
                      <p className="text-slate-500 pt-1">Phone: +91 {order.shippingAddress.phone}</p>
                    </>
                  )}
                </div>

                {/* Payment breakdown */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
                    <CreditCard className="w-4 h-4 text-brand-600" /> Payment Summary
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span>Payment Method</span>
                      <strong className="text-slate-900">{order.paymentMethod}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Shipping</span>
                      <strong className="text-emerald-600">
                        {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
                      </strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
                      <span>Total Paid</span>
                      <span>₹{order.total?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return / Support Banner */}
              <div className="bg-slate-100 rounded-3xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-6 h-6 text-brand-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Need to return or replace an item?</span>
                    <span className="text-slate-500">
                      Eligible items can be returned within 7 days of delivery with free doorstep pickup.
                    </span>
                  </div>
                </div>
                <Link
                  to="/refund-policy"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-800 hover:bg-slate-50 transition shrink-0"
                >
                  Return Guidelines
                </Link>
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

export default OrderDetailPage;
