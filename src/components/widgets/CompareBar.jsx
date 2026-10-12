import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getProductById } from '../../dummy data';

const CompareBar = () => {
  const navigate = useNavigate();
  const { compare, clearCompare, addToast } = useApp();

  if (compare.length === 0) return null;

  const handleCompareNow = () => {
    navigate('/compare');
  };

  return (
    <div
      id="compareBar"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white rounded-full pl-5 pr-2 py-2 shadow-pop flex items-center gap-4 text-sm font-bold"
    >
      <span id="cmpLabel">Compare ({compare.length}/3)</span>
      <button
        onClick={handleCompareNow}
        className="bg-brand-600 px-5 py-2 rounded-full hover:bg-brand-500 transition"
      >
        Compare Now
      </button>
      <button
        onClick={clearCompare}
        className="text-slate-400 hover:text-white px-2 font-bold"
        aria-label="Clear compare"
      >
        ✕
      </button>
    </div>
  );
};

export default CompareBar;
