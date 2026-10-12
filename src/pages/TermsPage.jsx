import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  Scale,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  AlertTriangle,
  Mail,
  Phone,
  Building,
  Gavel
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

const TERMS_SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'eligibility', title: '2. Eligibility & Account Security' },
  { id: 'pricing', title: '3. Product Catalog, Accuracy & Pricing' },
  { id: 'orders', title: '4. Order Placement, Payment & Taxes' },
  { id: 'shipping', title: '5. Dispatch, Delivery & Inspection' },
  { id: 'cancellation', title: '6. Cancellations, Returns & Refunds' },
  { id: 'ip', title: '7. Intellectual Property & Trademarks' },
  { id: 'conduct', title: '8. User Conduct & Prohibited Uses' },
  { id: 'liability', title: '9. Limitation of Liability & Disclaimers' },
  { id: 'law', title: '10. Governing Law & Dispute Resolution' },
  { id: 'amendments', title: '11. Modifications to Platform & Terms' },
  { id: 'contact', title: '12. Grievance Redressal & Notices' }
];

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-14 md:py-20">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Terms &amp; Conditions</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-300 mb-4">
                <Scale className="w-3.5 h-3.5 text-indigo-400" />
                USER AGREEMENT • VERSION 4.2 • EFFECTIVE 2026
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Terms and Conditions of Use
              </h1>

              <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                Please review these Terms carefully before accessing or purchasing through the Velvora website or
                mobile applications. These Terms govern your legal relationship with Velvora Retail Pvt. Ltd.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Key Summary Notice */}
        <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Key Summary for Velvora Shoppers</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                    By placing an order on Velvora, you agree to our 7-day return policy terms, acknowledge that prices
                    displayed include applicable Goods and Services Tax (GST), and agree to provide accurate shipping
                    information for safe courier delivery.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  to="/privacy-policy"
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Privacy Policy →
                </Link>
                <Link
                  to="/refund-policy"
                  className="px-3.5 py-2 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition"
                >
                  Refund Policy →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Policy Content & Table of Contents */}
        <section className="max-w-7xl mx-auto px-4 mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Sticky TOC */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                  Terms Sections
                </h2>
                <nav className="space-y-1 text-xs font-semibold">
                  {TERMS_SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                        activeSection === sec.id
                          ? 'bg-brand-50 text-brand-600 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 mb-2">Legal or compliance inquiries?</p>
                  <a
                    href="mailto:legal@velvora.in"
                    className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> legal@velvora.in
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Terms Clauses */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm">
              {/* Clause 1 */}
              <div id="acceptance" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-3">
                  This document is an electronic record generated by a computer system under the Information Technology
                  Act, 2000, and the rules framed thereunder. It does not require physical or digital signatures.
                </p>
                <p className="mt-3">
                  By accessing, browsing, registering an account, or placing an order on <strong>velvora.in</strong> (the
                  "Platform"), operated by <strong>Velvora Retail Pvt. Ltd.</strong>, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and Conditions together with our{' '}
                  <Link to="/privacy-policy" className="text-brand-600 font-bold hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/refund-policy" className="text-brand-600 font-bold hover:underline">
                    Refund &amp; Return Policy
                  </Link>.
                </p>
              </div>

              {/* Clause 2 */}
              <div id="eligibility" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  2. Eligibility &amp; Account Security
                </h2>
                <p className="mt-3">
                  You represent that you are at least 18 years of age and competent to enter into a legally binding contract
                  under the Indian Contract Act, 1872. Minors may transact on the platform only under the supervision of a
                  parent or legal guardian.
                </p>
                <p className="mt-3">
                  You are solely responsible for maintaining the confidentiality of your login credentials (username,
                  password, and OTPs). Any activity executed through your verified account credentials will be deemed to be
                  authorized by you.
                </p>
              </div>

              {/* Clause 3 */}
              <div id="pricing" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  3. Product Catalog, Accuracy &amp; Pricing
                </h2>
                <p className="mt-3">
                  While Velvora makes every effort to accurately display product imagery, specifications, dimensions, and
                  colors, slight technical variations may occur due to device display configurations.
                </p>
                <p className="mt-3">
                  All prices listed on the platform are in Indian Rupees (INR) and are <strong>inclusive of applicable Goods
                  and Services Tax (GST)</strong>. In the unlikely event of an obvious typographical or computational pricing
                  error, Velvora reserves the right to cancel affected orders and issue a full refund.
                </p>
              </div>

              {/* Clause 4 */}
              <div id="orders" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  4. Order Placement, Payment &amp; Taxes
                </h2>
                <p className="mt-3">
                  An order placed on Velvora constitutes an offer to purchase. Acceptance occurs when you receive an
                  official Order Confirmation Email with a generated Order Reference ID.
                </p>
                <p className="mt-3">
                  We support payments through authorized gateways via UPI (Google Pay, PhonePe, Paytm), Credit and Debit
                  Cards (Visa, MasterCard, RuPay, Amex), Net Banking, EMI, and Cash on Delivery (COD). All online payments
                  must be successfully authorized by your issuing bank before order processing commences.
                </p>
              </div>

              {/* Clause 5 */}
              <div id="shipping" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  5. Dispatch, Delivery &amp; Inspection
                </h2>
                <p className="mt-3">
                  Velvora offers free delivery on orders exceeding ₹999. Orders below this threshold may incur a nominal
                  shipping charge displayed clearly during checkout.
                </p>
                <p className="mt-3">
                  Delivery timelines are estimates. Standard shipping takes 2 to 4 business days in major metros and 3 to 6
                  days elsewhere. Customers are strongly encouraged to inspect the outer packaging before accepting the
                  parcel and reject any visibly tampered or damaged packages.
                </p>
              </div>

              {/* Clause 6 */}
              <div id="cancellation" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  6. Cancellations, Returns &amp; Refunds
                </h2>
                <p className="mt-3">
                  You may cancel an order free of cost at any time prior to shipment dispatch. Once dispatched, orders must
                  be received and returned through our official 7-Day Return Process.
                </p>
                <p className="mt-3">
                  Detailed guidelines regarding return eligibility, doorstep verification, non-returnable categories, and
                  refund settlement timelines are set out in our dedicated{' '}
                  <Link to="/refund-policy" className="text-brand-600 font-bold hover:underline">
                    Refund &amp; Return Policy
                  </Link>.
                </p>
              </div>

              {/* Clause 7 */}
              <div id="ip" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  7. Intellectual Property &amp; Trademarks
                </h2>
                <p className="mt-3">
                  All trademarks, logos, service marks, graphics, page headers, scripts, and product content featured on
                  Velvora are the property of Velvora Retail Pvt. Ltd. or its respective brand principals. Reproduction,
                  scraping, or redistribution without express written authorization is strictly prohibited.
                </p>
              </div>

              {/* Clause 8 */}
              <div id="conduct" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  8. User Conduct &amp; Prohibited Uses
                </h2>
                <p className="mt-3">When utilizing the Platform, you agree not to:</p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Use bots, spiders, or automated scripts to harvest catalog pricing or user data.</li>
                  <li>Engage in fraudulent transactions, fictitious orders, or deliberate chargeback fraud.</li>
                  <li>Post abusive, defamatory, or unlawful reviews or ratings.</li>
                  <li>Attempt to bypass platform firewalls, encryption keys, or API rate limiters.</li>
                </ul>
              </div>

              {/* Clause 9 */}
              <div id="liability" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  9. Limitation of Liability &amp; Disclaimers
                </h2>
                <p className="mt-3">
                  To the fullest extent permissible by law, Velvora’s aggregate liability for any claim arising from or
                  related to a transaction on the Platform shall not exceed the total price paid by you for the specific
                  product giving rise to such claim.
                </p>
              </div>

              {/* Clause 10 */}
              <div id="law" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  10. Governing Law &amp; Dispute Resolution
                </h2>
                <p className="mt-3">
                  These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out
                  of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent
                  courts in <strong>New Delhi / Gurugram</strong>, Haryana, India.
                </p>
              </div>

              {/* Clause 11 */}
              <div id="amendments" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  11. Modifications to Platform &amp; Terms
                </h2>
                <p className="mt-3">
                  Velvora reserves the right to revise these Terms from time to time. Updated terms will take effect
                  immediately upon publication on this page. Your continued use of the platform constitutes acceptance of
                  the revised terms.
                </p>
              </div>

              {/* Clause 12 */}
              <div id="contact" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  12. Grievance Redressal &amp; Notices
                </h2>
                <p className="mt-3">
                  For legal notices or queries regarding these Terms, contact our legal counsel and compliance officer:
                </p>

                <div className="mt-4 bg-slate-900 text-white p-6 rounded-2xl space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Company Name:</span>
                    <strong className="text-white text-sm">Velvora Retail Pvt. Ltd.</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Registered Office:</span>
                    <span>4th Floor, DLF Cyber Hub, Sector 24, Gurugram, Haryana 122002, India</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Legal Contact Email:</span>
                    <a href="mailto:legal@velvora.in" className="text-indigo-300 font-bold underline">
                      legal@velvora.in
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Customer Helpline:</span>
                    <span className="text-white font-bold">1800-419-0000 (Toll Free, 24x7)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer & Modals */}
      <Footer />
      <MobileBottomNav />

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

export default TermsPage;
