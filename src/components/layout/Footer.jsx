import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2"
          >
            <span className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center font-black text-xl">
              V
            </span>
            <span className="font-extrabold text-xl text-white">VELVORA</span>
          </Link>
          <p className="text-sm mt-3 leading-relaxed">
            India's most trusted premium shopping destination. 50,000+ products, 2M+ customers, 19,000+ pincodes served.
          </p>
          <div className="flex gap-2 mt-4">
            <a
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-brand-600 hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 00-3.9 19.2c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0012 2z" />
              </svg>
            </a>
            <a
              href="#facebook"
              onClick={(e) => e.preventDefault()}
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-brand-600 transition font-bold text-sm"
            >
              f
            </a>
            <a
              href="#youtube"
              onClick={(e) => e.preventDefault()}
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-brand-600 transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 7s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.7.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 8.9.8 10.8v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.7c0-1.9-.2-3.8-.2-3.8zM9.8 15V8.4l6.2 3.3L9.8 15z" />
              </svg>
            </a>
            <a
              href="#linkedin"
              onClick={(e) => e.preventDefault()}
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-brand-600 transition font-bold text-sm"
            >
              in
            </a>
            <a
              href="#x"
              onClick={(e) => e.preventDefault()}
              aria-label="X"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-brand-600 transition font-bold text-sm"
            >
              𝕏
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm tracking-wider">SHOP</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/products" className="hover:text-white transition">All Products</Link>
            </li>
            <li>
              <Link to="/products?filter=new" className="hover:text-white transition">New Arrivals</Link>
            </li>
            <li>
              <Link to="/products?sort=bestselling" className="hover:text-white transition">Best Sellers</Link>
            </li>
            <li>
              <Link to="/offers" className="hover:text-white transition">Offers &amp; Deals</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">Categories</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm tracking-wider">CUSTOMER SERVICE</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/contact" className="hover:text-white transition text-indigo-300 font-semibold">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Shipping</Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-white transition">Returns &amp; Refunds</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">FAQs</Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-white transition">Order Tracking</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm tracking-wider">COMPANY</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Careers</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white transition">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm tracking-wider">CONTACT</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">📧 care@velvora.in</li>
            <li className="flex gap-2">📞 1800-419-0000 (Toll Free)</li>
            <li className="flex gap-2">
              📍 4th Floor, Cyber Hub,
              <br />
              Gurugram, Haryana 122002
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-slate-400">© 2026 Velvora Retail Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-md">UPI</span>
            <span className="bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-md italic">VISA</span>
            <span className="bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-md">Mastercard</span>
            <span className="bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-md">RuPay</span>
            <span className="bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-md">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
