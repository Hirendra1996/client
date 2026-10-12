import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Mail,
  Truck,
  RefreshCw,
  CreditCard,
  ShieldCheck,
  User,
  ArrowRight
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

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    question: 'How do I track my order status in real time?',
    answer:
      'You can track your order at any time by heading to the Track Order page or entering your Order ID on your Account Dashboard. Once dispatched, live GPS milestones and courier tracking numbers (AWB) are provided.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What are the shipping charges and delivery timeframes?',
    answer:
      'Shipping is 100% FREE on all orders of ₹999 or higher. Orders below ₹999 incur a standard ₹99 shipping fee. Delivery takes 2 to 4 business days in tier-1 metro cities and 3 to 6 days across other Indian pincodes.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I change my delivery address after placing an order?',
    answer:
      'If your order has not yet been packed or dispatched, you can update your delivery address immediately by contacting our 24/7 helpline at 1800-419-0000 or using live chat support.'
  },
  {
    category: 'Returns & Refunds',
    question: 'What is Velvora’s 7-Day return policy?',
    answer:
      'We offer an unconditional 7-day return and exchange policy from the date of confirmed delivery. Products must be unused, in their original packaging, and with all brand tags intact. Doorstep pickup is completely free.'
  },
  {
    category: 'Returns & Refunds',
    question: 'How and when will I receive my refund?',
    answer:
      'Once the courier agent collects and inspects your returned package at your doorstep, the refund is initiated instantly. UPI and Velvora Wallet refunds reflect within 2 to 24 hours; credit/debit card refunds reflect in 2 to 4 business days.'
  },
  {
    category: 'Returns & Refunds',
    question: 'What if I received a damaged, defective, or incorrect product?',
    answer:
      'If you receive an item with transit damage or manufacturing defect, please report it within 48 hours with a photo through our Contact Us page. We provide immediate priority replacement at zero additional cost.'
  },
  {
    category: 'Payments & Discounts',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit cards (Visa, MasterCard, RuPay, Amex), Net Banking across 50+ banks, card EMI options, and Cash on Delivery (COD).'
  },
  {
    category: 'Payments & Discounts',
    question: 'Is online payment secure on Velvora?',
    answer:
      'Yes, 100%. All transactions are processed through RBI-authorized payment aggregators utilizing bank-grade 256-bit SSL encryption and strict PCI-DSS Level 1 compliance. We never store raw credit/debit card numbers or CVVs.'
  },
  {
    category: 'Payments & Discounts',
    question: 'How do I apply a discount coupon code?',
    answer:
      'In your Shopping Cart or on the Checkout screen, locate the "Apply Promo Coupon" box. Enter a valid promotional code (e.g. VELVORA10, FESTIVE500) and click Apply to see your total bill discounted instantly.'
  },
  {
    category: 'Account & Security',
    question: 'How do I reset my password if I forgot it?',
    answer:
      'Click "Forgot Password" on the login screen, enter your registered email or phone number, and a 6-digit verification code will be sent to help you create a new secure password immediately.'
  },
  {
    category: 'Account & Security',
    question: 'How is my personal information protected?',
    answer:
      'In compliance with the Digital Personal Data Protection (DPDP) Act 2023, your personal details are strictly encrypted and never shared or sold to third-party marketing brokers. Learn more in our Privacy Policy.'
  },
  {
    category: 'Account & Security',
    question: 'Can I delete or close my Velvora account?',
    answer:
      'Yes. Navigate to Profile Settings in your Account menu and scroll down to the "Danger Zone" to request permanent account deletion and data anonymization.'
  }
];

const CATEGORIES = [
  'All',
  'Orders & Shipping',
  'Returns & Refunds',
  'Payments & Discounts',
  'Account & Security'
];

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesTab = activeTab === 'All' || faq.category === activeTab;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-14 md:py-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <nav className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Help &amp; FAQs</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 border border-white/15 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> 24/7 SELF-SERVICE ASSISTANCE
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Find instant answers to questions regarding your orders, doorstep deliveries, 7-day returns, payments,
              and account safety.
            </p>

            {/* Instant Search Bar */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g., refund, return, pincode, tracking)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full text-slate-900 text-sm font-medium outline-none bg-white shadow-lg"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="max-w-7xl mx-auto px-4 -mt-5 relative z-20">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition shadow-sm ${
                  activeTab === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Accordion Container */}
        <section className="max-w-4xl mx-auto px-4 mt-12">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No matching questions found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try using different keywords or talk to our live support team directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveTab('All');
                }}
                className="mt-4 text-xs font-bold text-brand-600 hover:underline"
              >
                Reset search filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition hover:border-slate-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-brand-600 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0"></span>
                        {faq.question}
                      </span>
                      <span className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5 text-brand-600" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Contact CTA Strip */}
        <section className="max-w-4xl mx-auto px-4 mt-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-black">Still have questions?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Our support specialists and AI assistants are active 24/7.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Submit Support Ticket
              </Link>
              <a
                href="tel:18004190000"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition border border-white/15 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Toll-Free 1800-419-0000
              </a>
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

export default FAQPage;
