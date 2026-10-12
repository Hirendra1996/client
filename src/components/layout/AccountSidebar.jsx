import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  Truck,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { path: '/account', label: 'Dashboard Overview', icon: User },
  { path: '/orders', label: 'My Orders & History', icon: Package },
  { path: '/track-order', label: 'Track Shipment', icon: Truck },
  { path: '/wishlist', label: 'Saved Wishlist', icon: Heart },
  { path: '/addresses', label: 'Delivery Addresses', icon: MapPin },
  { path: '/profile', label: 'Profile Settings', icon: Settings }
];

const AccountSidebar = () => {
  const location = useLocation();
  const { user, logout, orders, wishlistCount } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* User Mini Profile Header */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white font-black text-lg flex items-center justify-center shadow-md">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Velvora Member
          </span>
          <h3 className="font-extrabold text-sm text-slate-900 truncate">
            {user?.name || 'Velvora Shopper'}
          </h3>
          <p className="text-xs text-slate-500 truncate">{user?.email || user?.phone || 'user@velvora.com'}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const IconComp = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                isActive
                  ? 'bg-brand-50 text-brand-600 ring-1 ring-brand-600/30'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <IconComp className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                {item.label}
              </span>
              {item.path === '/orders' && orders.length > 0 && (
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                  {orders.length}
                </span>
              )}
              {item.path === '/wishlist' && wishlistCount > 0 && (
                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition text-left mt-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </nav>

      {/* Security note */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>RBI Compliant Data Privacy &amp; 256-Bit Protection</span>
      </div>
    </div>
  );
};

export default AccountSidebar;
