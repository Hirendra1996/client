import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-pop grid place-items-center hover:bg-slate-900 hover:text-white transition"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default BackToTop;
