import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Crown
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

const AccountDashboardPage = () => {
  const { user, orders, wishlistCount, addresses } = useApp();

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const recentOrders = orders.slice(0, 2);

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
              <span className="text-slate-900 font-bold">My Account</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Account Overview
            </h1>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Main Dashboard Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Member Tier Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-card">
                <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                      <Crown className="w-3.5 h-3.5 text-amber-400" /> VELVORA VIP MEMBER
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                      Welcome, {user?.name || 'Shopper'}!
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-md">
                      You enjoy unlimited free express delivery, early access to festive sales, and 24/7 dedicated support.
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition shrink-0"
                  >
                    Start Shopping <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/orders"
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{orders.length}</div>
                  <div className="text-xs font-bold text-slate-600 mt-0.5">Total Orders Placed</div>
                  <div className="text-[11px] text-brand-600 font-semibold mt-2 flex items-center gap-1">
                    View order history →
                  </div>
                </Link>

                <Link
                  to="/wishlist"
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{wishlistCount}</div>
                  <div className="text-xs font-bold text-slate-600 mt-0.5">Saved in Wishlist</div>
                  <div className="text-[11px] text-rose-600 font-semibold mt-2 flex items-center gap-1">
                    View saved items →
                  </div>
                </Link>

                <Link
                  to="/addresses"
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{addresses.length}</div>
                  <div className="text-xs font-bold text-slate-600 mt-0.5">Saved Addresses</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    Manage addresses →
                  </div>
                </Link>
              </div>

              {/* Recent Orders Section */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="font-black text-base text-slate-900">Recent Orders</h3>
                  <Link to="/orders" className="text-xs font-bold text-brand-600 hover:underline">
                    View All Orders ({orders.length}) →
                  </Link>
                </div>

                {recentOrders.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No orders placed yet. Start shopping today!
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    {recentOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {ord.items?.[0]?.img && (
                            <img
                              src={ord.items[0].img}
                              alt={ord.items[0].name}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-white"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-900">{ord.id}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  ord.status === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'In Transit'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-700 mt-1 line1">
                              {ord.items?.[0]?.name}
                              {ord.items?.length > 1 && ` + ${ord.items.length - 1} more`}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Placed on {ord.date} • Total: <strong>₹{ord.total?.toLocaleString('en-IN')}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to={`/orders/${ord.id}`}
                            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
                          >
                            Details
                          </Link>
                          <Link
                            to={`/track-order?id=${ord.id}`}
                            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" /> Track
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Default Address Preview */}
              {defaultAddr && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{defaultAddr.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                          Default Delivery
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {defaultAddr.street}, {defaultAddr.city}, {defaultAddr.state} — {defaultAddr.pincode}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Phone: +91 {defaultAddr.phone}</p>
                    </div>
                  </div>
                  <Link
                    to="/addresses"
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 shrink-0"
                  >
                    Manage Addresses →
                  </Link>
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

export default AccountDashboardPage;
