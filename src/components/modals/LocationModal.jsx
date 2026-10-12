import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const LocationModal = () => {
  const { isLocationOpen, setIsLocationOpen, updateLocation } = useApp();
  const [pincode, setPincode] = useState('');

  if (!isLocationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pincode) return;
    updateLocation(pincode);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsLocationOpen(false)}
      />

      {/* Modal panel */}
      <div className="relative bg-white rounded-3xl w-full max-w-sm p-7 shadow-pop z-10">
        <button
          onClick={() => setIsLocationOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-slate-100 grid place-items-center transition text-slate-500 font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="font-extrabold text-lg text-slate-900">
          Choose delivery location
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Enter pincode to see delivery options.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            required
            pattern="[0-9]{6}"
            maxLength={6}
            inputMode="numeric"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="e.g. 400001"
            className="flex-1 border-2 border-slate-200 focus:border-brand-600 rounded-xl px-4 py-3 text-sm outline-none transition"
          />
          <button
            type="submit"
            className="bg-slate-900 hover:bg-brand-600 text-white font-bold px-5 rounded-xl text-sm transition"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
