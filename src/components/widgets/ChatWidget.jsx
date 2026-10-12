import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! 👋 How can I help you today? Ask about orders, returns, or products.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const msgsEndRef = useRef(null);

  const scrollToBottom = () => {
    if (msgsEndRef.current) {
      msgsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: query }]);
    setInputText('');

    // Determine smart automated reply
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = 'Thanks! An agent will join shortly. Meanwhile, you can track orders under "Track Order". 😊';
      if (q.includes('return')) {
        reply = 'Easy! You have 7-day free returns. Go to Orders → Return → pickup scheduled in 24h. ↩️';
      } else if (q.includes('order') || q.includes('deliver') || q.includes('track')) {
        reply = 'Your latest order is out for delivery and arriving today by 9 PM. 📦';
      } else if (q.includes('offer') || q.includes('coupon') || q.includes('discount')) {
        reply = "Today's top code: VELVORA10 for extra 10% off above ₹1,499. Hurry! ⚡";
      } else if (q.includes('hi') || q.includes('hello')) {
        reply = 'Hello! 👋 Great to see you. Are you looking for electronics, fashion or beauty today?';
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: reply }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-brand-600 text-white shadow-lift grid place-items-center hover:bg-brand-700 hover:scale-105 transition text-2xl"
        aria-label="Customer support"
      >
        💬
      </button>

      {/* Chat Popover */}
      {isOpen && (
        <div
          id="chatBox"
          className="fixed bottom-36 md:bottom-24 right-4 z-50 w-[320px] bg-white border border-slate-200 rounded-2xl shadow-pop overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-brand-600 grid place-items-center font-bold">
              V
            </span>
            <div className="flex-1">
              <p className="font-bold text-sm">Velvora Support</p>
              <p className="text-xs text-emerald-400">● Online — replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>

          {/* Messages List */}
          <div
            id="chatMsgs"
            className="p-4 space-y-3 h-56 overflow-y-auto text-sm bg-slate-50"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-2xl rounded-tr-sm p-3 ml-8 text-sm'
                    : 'bg-white border rounded-2xl rounded-tl-sm p-3 shadow-sm mr-6 text-sm text-slate-800'
                }
              >
                {m.text}
              </div>
            ))}
            <div ref={msgsEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white w-9 h-9 rounded-full grid place-items-center shrink-0 transition"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
