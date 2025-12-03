
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Globe } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-6 cursor-pointer w-fit group"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded flex items-center justify-center text-white shadow-lg shadow-orange-900/50 group-hover:scale-110 transition-transform">S</div>
              <span className="text-white group-hover:text-sibos-orange transition-colors">SIBOS</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Smart Integrated Back Office System. Ekosistem bisnis digital modern yang dikembangkan dengan semangat komunitas sejak 2021.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-sibos-orange transition-all shadow-lg hover:shadow-orange-900/50">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Produk</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-sibos-orange transition-colors">Aplikasi Kasir (POS)</a></li>
              <li><a href="#" className="hover:text-sibos-orange transition-colors">Accounting System</a></li>
              <li><a href="#" className="hover:text-sibos-orange transition-colors">HRM & Payroll</a></li>
              <li><a href="#" className="hover:text-sibos-orange transition-colors">CRM & Loyalty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-sibos-orange shrink-0" />
                <span>PT Mesin Kasir Solo<br/>Solo, Jawa Tengah, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-sibos-orange shrink-0" />
                <span>info@sibos.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-sibos-orange shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2015-2025 PT Mesin Kasir Solo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">Founder: Amin Maghfuri</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
