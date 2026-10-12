import React from 'react';
import { useApp } from '../../context/AppContext';

const ToastContainer = () => {
  const { toasts } = useApp();

  return (
    <div id="toasts" className="fixed top-20 right-4 z-[90] space-y-3 w-[min(340px,90vw)] pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-in bg-slate-900 text-white rounded-2xl p-4 shadow-pop flex gap-3 items-start pointer-events-auto"
        >
          <span className="w-8 h-8 rounded-full bg-emerald-500 grid place-items-center shrink-0 text-white font-bold">
            ✓
          </span>
          <div className="text-sm">
            <p className="font-bold">{t.title}</p>
            {t.subtitle && <p className="text-slate-300 text-xs mt-0.5">{t.subtitle}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
