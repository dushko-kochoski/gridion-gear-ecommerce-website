import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="font-archivo-black text-xl text-white tracking-tight">
              GRIDIRON <span className="text-neon">GEAR</span>
            </span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium football gear for athletes who demand more.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs text-white tracking-[0.05em] uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              {['Gloves', 'Cleats', 'Arm Sleeves', 'Mouthguards', 'Training', 'Accessories'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs text-white tracking-[0.05em] uppercase mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press', 'Contact', 'Shipping & Returns'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs text-white tracking-[0.05em] uppercase mb-4">Stay In The Game</h4>
            <p className="text-sm text-gray-400 mb-4">Get exclusive drops, early access, and training tips.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-pitch border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/20 transition-colors"
              />
              <button className="bg-neon text-void font-archivo font-bold text-xs px-5 py-3 rounded-lg hover:brightness-110 transition-all whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xs text-gray-600">&copy; 2025 GRIDIRON GEAR. All rights reserved.</span>
          <div className="flex gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
