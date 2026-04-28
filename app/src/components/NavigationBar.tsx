import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, cartItemCount, setCartOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const navLinks = [
    { label: 'SHOP', to: '/shop' },
    { label: 'LOOKBOOK', to: '/lookbook' },
    { label: 'COLLECTIONS', to: '/shop' },
    { label: 'ABOUT', to: '/shop' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.92)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-5 md:px-10 lg:px-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-archivo-black text-xl text-white tracking-tight">
              GRIDIRON <span className="text-neon">GEAR</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="font-archivo font-semibold text-sm text-white tracking-[0.04em] hover:text-neon transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-white hover:text-neon transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/shop" className="hidden md:block text-white hover:text-neon transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-white hover:text-neon transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-neon rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-archivo font-bold text-void">
                    {cartItemCount()}
                  </span>
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#0A0A0A] transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex flex-col items-start justify-center h-full px-10 gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-archivo font-bold text-3xl text-white hover:text-neon transition-colors"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
