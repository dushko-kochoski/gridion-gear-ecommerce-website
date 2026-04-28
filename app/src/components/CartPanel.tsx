import { useRef, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import gsap from 'gsap';

export default function CartPanel() {
  const { cartOpen, setCartOpen, cartItems, cartSubtotal, updateQuantity, removeFromCart } = useStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    }
  }, [cartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm ${cartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ opacity: 0 }}
        onClick={() => setCartOpen(false)}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-[1002] w-full max-w-[420px] h-full bg-pitch border-l border-[rgba(255,255,255,0.06)] flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <h3 className="font-archivo font-bold text-lg text-white">YOUR CART</h3>
            <span className="text-sm text-gray-400">({cartItems.length})</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-10 h-10 rounded-full bg-pitch border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:border-neon hover:text-neon transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBagIcon />
              <p className="mt-4 text-sm">Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 text-neon text-sm font-archivo font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className={`flex gap-4 p-4 ${idx !== cartItems.length - 1 ? 'border-b border-[rgba(255,255,255,0.06)]' : ''}`}
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover bg-pitch" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-archivo font-semibold text-sm text-white truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{item.color} / {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[rgba(255,255,255,0.15)] rounded-l text-white hover:border-neon"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border-t border-b border-[rgba(255,255,255,0.15)] font-archivo font-bold text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[rgba(255,255,255,0.15)] rounded-r text-white hover:border-neon"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-archivo font-bold text-sm text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId, item.color, item.size)}
                  className="text-gray-600 hover:text-magenta transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.06)] bg-pitch">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 tracking-[0.05em] uppercase">Subtotal</span>
              <span className="font-archivo font-bold text-xl text-white">${cartSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">Shipping calculated at checkout</p>
            <button className="w-full py-4 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px transition-all duration-200">
              CHECKOUT
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full py-3 mt-2 text-sm font-archivo font-bold text-white hover:bg-[rgba(255,255,255,0.06)] rounded-3xl transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-600">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
