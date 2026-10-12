import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  RotateCcw,
  Search,
  ExternalLink,
  ArrowRight,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle
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

const MyOrdersPage = () => {
  const { orders, cancelOrder, addToast } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Delivered' && o.status === 'Delivered') ||
      (activeFilter === 'In Transit' && o.status === 'In Transit') ||
      (activeFilter === 'Cancelled' && o.status === 'Cancelled');

    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items?.some((item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleCancelClick = (orderId) => {
    const reason = window.prompt('Please specify the cancellation reason:', 'Changed my mind');
    if (reason !== null) {
      cancelOrder(orderId, reason);
    }
  };

  const handleDownloadInvoice = (orderId) => {
    addToast('Invoice Downloaded', `Tax invoice for #${orderId} generated.`);
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
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-brand-600 transition">Home</Link>
              <span>/</span>
              <Link to="/account" className="hover:text-brand-600 transition">My Account</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">My Orders</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
              Order History
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600">
                {orders.length} Total
              </span>
            </h1>
          </div>
        </section>

        {/* Orders Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Orders List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Filter Tabs & Search */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Status tabs */}
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {['All', 'In Transit', 'Delivered', 'Cancelled'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveFilter(f)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        activeFilter === f
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Search orders */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID or item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              {/* Order Cards */}
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-extrabold text-base text-slate-900">No Orders Found</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {searchQuery ? 'No orders match your search query.' : 'You have no orders in this category.'}
                  </p>
                  <Link
                    to="/products"
                    className="mt-5 inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-full transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Order Placed</span>
                            <span className="font-bold text-slate-900">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                            <span className="font-extrabold text-slate-900">₹{ord.total?.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Mode</span>
                            <span className="font-semibold text-slate-700">{ord.paymentMethod}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'In Transit'
                                ? 'bg-blue-100 text-blue-800'
                                : ord.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status === 'Delivered' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {ord.status === 'In Transit' && <Truck className="w-3.5 h-3.5" />}
                            {ord.status === 'Cancelled' && <XCircle className="w-3.5 h-3.5" />}
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="p-4 sm:p-6 divide-y divide-slate-100">
                        {ord.items?.map((item, idx) => (
                          <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
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
                                <h4 className="font-bold text-sm text-slate-900 line1">{item.name}</h4>
                                <span className="text-xs text-slate-500 mt-0.5 block">
                                  Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>
                            <span className="font-black text-sm text-slate-900">
                              ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Actions */}
                      <div className="p-4 sm:p-5 bg-slate-50/40 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Truck className="w-4 h-4 text-brand-600" />
                          <span>
                            {ord.status === 'Delivered'
                              ? `Delivered on ${ord.deliveredOn || ord.date}`
                              : `Expected: ${ord.estDelivery}`}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDownloadInvoice(ord.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-100 transition"
                          >
                            <Download className="w-3.5 h-3.5" /> Invoice
                          </button>
                          <Link
                            to={`/orders/${ord.id}`}
                            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 hover:bg-slate-100 transition"
                          >
                            View Order
                          </Link>
                          {ord.status !== 'Cancelled' && (
                            <Link
                              to={`/track-order?id=${ord.id}`}
                              className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition flex items-center gap-1"
                            >
                              <Truck className="w-3.5 h-3.5" /> Track Package
                            </Link>
                          )}
                          {ord.status === 'Processing' && (
                            <button
                              type="button"
                              onClick={() => handleCancelClick(ord.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default MyOrdersPage;
