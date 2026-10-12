import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Building,
  Home,
  Check
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

const AddressesPage = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, addToast } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    type: 'Home',
    isDefault: false
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: 'Karnataka',
      pincode: '',
      type: 'Home',
      isDefault: addresses.length === 0
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingId(addr.id);
    setFormData({ ...addr });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street || !formData.pincode) {
      addToast('Missing Required Fields', 'Please fill in name, phone, address, and pincode.');
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }

    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
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
                <Link to="/account" className="hover:text-brand-600 transition">My Account</Link>
                <span>/</span>
                <span className="text-slate-900 font-bold">Addresses</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                Manage Delivery Addresses
              </h1>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Address List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Form Modal / Inline Box */}
              {isFormOpen && (
                <div className="bg-white rounded-3xl p-6 border border-brand-200 shadow-md">
                  <h3 className="font-black text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
                    {editingId ? 'Edit Address' : 'Add New Delivery Address'}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mobile Number (+91) *</label>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Flat, House no., Building, Apartment *</label>
                        <input
                          type="text"
                          required
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">6-Digit Pincode *</label>
                        <input
                          type="text"
                          required
                          maxLength="6"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Address Label</label>
                        <div className="flex gap-2">
                          {['Home', 'Work', 'Other'].map((label) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setFormData({ ...formData, type: label })}
                              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                                formData.type === label
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4">
                        <input
                          type="checkbox"
                          id="makeDefault"
                          checked={formData.isDefault}
                          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                          className="rounded text-brand-600"
                        />
                        <label htmlFor="makeDefault" className="text-slate-700 font-semibold cursor-pointer">
                          Make this my default shipping address
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700"
                      >
                        {editingId ? 'Save Changes' : 'Save Address'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Addresses List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white rounded-3xl p-6 border transition shadow-sm relative flex flex-col justify-between ${
                      addr.isDefault ? 'border-brand-600 ring-1 ring-brand-600/30' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> Default
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900">{addr.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} — {addr.pincode}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-2">
                        Mobile: +91 {addr.phone}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(addr.id)}
                          className="font-bold text-brand-600 hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(addr)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                          title="Edit Address"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(addr.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                          title="Delete Address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

export default AddressesPage;
