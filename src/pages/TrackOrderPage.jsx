import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Truck,
  Search,
  Package,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  ArrowRight
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

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const { orderId: paramId } = useParams();
  const { orders, getOrderById, addToast } = useApp();

  const queryId = searchParams.get('id') || searchParams.get('orderId') || paramId || '';

  const [inputVal, setInputVal] = useState(queryId || (orders[0]?.id || 'VEL-89214'));
  const [currentOrder, setCurrentOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const target = queryId || inputVal;
    if (target) {
      const found = getOrderById(target) || orders.find((o) => o.trackingNumber === target) || orders[0];
      setCurrentOrder(found || null);
    }
  }, [queryId, orders]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const clean = inputVal.trim().toUpperCase();
    if (!clean) return;

    const found =
      getOrderById(clean) ||
      orders.find((o) => o.id.toUpperCase() === clean || o.trackingNumber?.toUpperCase() === clean);

    if (found) {
      setCurrentOrder(found);
      addToast('Tracking Updated', `Live status for ${found.id}`);
    } else {
      // Create a mock tracking result for whatever ID the user typed
      setCurrentOrder({
        id: clean,
        date: 'Today',
        status: 'In Transit',
        estDelivery: 'Within 2 days',
        courier: 'Velvora Express Logistics',
        trackingNumber: `AWB-${clean}`,
        paymentMethod: 'Prepaid (UPI)',
        total: 1999,
        shippingAddress: {
          name: 'Customer',
          phone: '9876543210',
          street: 'Registered Shipping Address',
          city: 'City',
          state: 'State',
          pincode: '400001'
        },
        items: [
          {
            name: 'Velvora Verified Package',
            quantity: 1,
            price: 1999,
            brand: 'Velvora'
          }
        ],
        timeline: [
          { title: 'Order Verified & Approved', time: 'Today, 08:30 AM', done: true },
          { title: 'Dispatched from Central Warehouse', time: 'Today, 11:45 AM', done: true },
          { title: 'In Transit to Destination Hub', time: 'In Progress', done: true },
          { title: 'Out for Doorstep Delivery', time: 'Pending', done: false },
          { title: 'Delivered', time: 'Expected Soon', done: false }
        ]
      });
      addToast('Tracking Found', `Live transit data for ${clean}`);
    }
  };

  const copyAWB = () => {
    if (currentOrder?.trackingNumber) {
      navigator.clipboard?.writeText(currentOrder.trackingNumber);
      setCopied(true);
      addToast('Copied', currentOrder.trackingNumber);
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
        {/* Breadcrumb banner */}
        <section className="bg-white border-b border-slate-200/80 py-5">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-brand-600 transition">Home</Link>
              <span>/</span>
              <Link to="/orders" className="hover:text-brand-600 transition">Orders</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">Track Shipment</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
              <Truck className="w-6 h-6 text-brand-600" /> Live Package Tracking
            </h1>
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Main Tracker Container (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Tracker Input Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Track Any Shipment
                </h2>
                <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter Order ID (e.g. VEL-89214) or AWB number..."
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200 focus:border-brand-600 outline-none uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm rounded-2xl transition shrink-0"
                  >
                    Track Package
                  </button>
                </form>

                {orders.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Recent Orders:</span>
                    {orders.slice(0, 3).map((ord) => (
                      <button
                        key={ord.id}
                        type="button"
                        onClick={() => {
                          setInputVal(ord.id);
                          setCurrentOrder(ord);
                        }}
                        className="font-bold text-brand-600 hover:underline bg-brand-50 px-2 py-0.5 rounded-md"
                      >
                        {ord.id}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Tracking Details */}
              {currentOrder && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-card relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ● {currentOrder.status}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black mt-2">
                          Order #{currentOrder.id}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
                          Carrier: <strong>{currentOrder.courier || 'Delhivery Express'}</strong> • AWB:{' '}
                          <span className="font-mono">{currentOrder.trackingNumber}</span>
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md text-right sm:text-right shrink-0">
                        <span className="text-[10px] text-slate-300 uppercase block font-semibold">
                          Expected Delivery
                        </span>
                        <strong className="text-base sm:text-lg font-black text-emerald-300">
                          {currentOrder.estDelivery}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                      <button
                        type="button"
                        onClick={copyAWB}
                        className="inline-flex items-center gap-1.5 hover:text-white transition font-semibold"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy AWB Tracking Code
                      </button>
                      <span>Delivery OTP will be shared on SMS upon dispatch</span>
                    </div>
                  </div>

                  {/* Delivery Agent Card */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Assigned Delivery Executive
                        </span>
                        <h4 className="font-black text-sm text-slate-900">Rajesh K. (Velvora Express)</h4>
                        <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                          ✓ Verified &amp; Vaccinated Courier Agent
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:18004190000"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Agent
                      </a>
                    </div>
                  </div>

                  {/* Shipment Milestones */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h4 className="font-black text-base text-slate-900 mb-6">
                      Detailed Journey Milestones
                    </h4>

                    <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {currentOrder.timeline?.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-3 text-xs">
                          <div
                            className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              step.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                          </div>
                          <div>
                            <strong className={`block text-xs ${step.done ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                              {step.title}
                            </strong>
                            <span className="text-[11px] text-slate-400">{step.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination Address Preview */}
                  {currentOrder.shippingAddress && (
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-3 text-xs">
                      <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block text-sm">Delivering to:</strong>
                        <p className="text-slate-700 font-semibold mt-1">
                          {currentOrder.shippingAddress.name} • +91 {currentOrder.shippingAddress.phone}
                        </p>
                        <p className="text-slate-500 mt-0.5">
                          {currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} — {currentOrder.shippingAddress.pincode}
                        </p>
                      </div>
                    </div>
                  )}
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

export default TrackOrderPage;
