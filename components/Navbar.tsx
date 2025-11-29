
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Rocket, LogIn } from 'lucide-react';
import { NavItem, Page } from '../types';

const navItems: NavItem[] = [
  {
    label: 'Ekosistem',
    id: 'ecosystem',
    columns: [
      {
        title: 'Modul Utama',
        items: ['Point of Sales (POS)', 'CRM & Loyalty', 'Inventory (IRM)', 'HRM & Payroll', 'Accounting', 'AI Assistant']
      },
      {
        title: 'Omnichannel',
        items: ['Integrasi Marketplace', 'Media Sosial', 'Website Toko Online', 'WhatsApp Commerce']
      }
    ]
  },
  {
    label: 'Solusi Bisnis',
    id: 'solutions',
    columns: [
      {
        title: 'Industri',
        items: ['F&B / Kuliner', 'Ritel & Grosir', 'Jasa & Bengkel', 'Fashion & Apparel', 'Farmasi & Apotek', 'Manufaktur']
      },
      {
        title: 'Skala Usaha',
        items: ['UMKM', 'Enterprise', 'Multi-Outlet / Chain', 'Franchise']
      }
    ]
  },
  {
    label: 'Komunitas',
    id: 'community',
    columns: [
      {
        title: 'Bergabung',
        items: ['Sebagai Investor', 'Sebagai Developer', 'Sebagai Partner', 'Sebagai User']
      },
      {
        title: 'Tentang Kami',
        items: ['Sejarah (Est. 2015)', 'Visi Komunitas', 'Founder: Amin Maghfuri']
      }
    ]
  }
];

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null); // State for mobile accordion
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id: string) => {
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setActiveMenu(null);
    setMobileMenuOpen(false);

    // Logic routing sederhana
    if (item.includes('Point of Sales')) { onNavigate('pos'); return; }
    if (item.includes('CRM') || item.includes('Loyalty')) { onNavigate('crm'); return; }
    if (item.includes('Inventory') || item.includes('IRM')) { onNavigate('irm'); return; }
    if (item.includes('HRM') || item.includes('Payroll')) { onNavigate('hrm'); return; }
    if (item.includes('Accounting')) { onNavigate('accounting'); return; }
    if (item.includes('AI Assistant')) { onNavigate('ai'); return; }
    if (item.includes('Integrasi Marketplace')) { onNavigate('marketplace'); return; }

    // Community Routing
    if (item.includes('Investor')) { onNavigate('community-investor'); return; }
    if (item.includes('Developer')) { onNavigate('community-developer'); return; }
    if (item.includes('Partner')) { onNavigate('community-partner'); return; }
    if (item.includes('User')) { onNavigate('community-user'); return; } // New User Route

    if (item.includes('Sejarah') || item.includes('Tentang') || item.includes('Founder') || item.includes('Visi')) {
      onNavigate('about');
      return;
    }

    if (currentPage !== 'home') {
      onNavigate('home');
      // Tunggu render home baru scroll
      setTimeout(() => {
        handleScrollToSection(item);
      }, 100);
    } else {
      handleScrollToSection(item);
    }
  };

  const handleScrollToSection = (item: string) => {
    let sectionId = '';
    if (item.includes('Fitur')) sectionId = 'features';
    else if (item.includes('Harga')) sectionId = 'pricing';

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (currentPage !== 'home') {
        onNavigate('home');
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar - Solid Dark Color */}
      <div className="bg-slate-900 border-b border-white/10 relative z-50 h-20 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer" onClick={handleLogoClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-sibos-orange to-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-900/50">
              S
            </div>
            <span className="text-white">SIBOS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 h-full items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleMenu(item.id)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors h-full border-b-2 
                  ${activeMenu === item.id 
                    ? 'text-sibos-orange border-sibos-orange' 
                    : 'text-gray-300 border-transparent hover:text-white'}
                  ${(item.id === 'community' && (currentPage === 'community' || currentPage === 'about' || currentPage.includes('community-'))) ? 'text-sibos-orange' : ''}  
                  ${(item.id === 'ecosystem' && (currentPage === 'pos' || currentPage === 'crm' || currentPage === 'irm' || currentPage === 'hrm' || currentPage === 'accounting' || currentPage === 'ai' || currentPage === 'marketplace')) ? 'text-sibos-orange' : ''}
                `}
              >
                {item.label}
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
              </button>
            ))}
            
            <button 
                onClick={() => onNavigate('articles')}
                className={`text-sm font-semibold transition-colors h-full border-b-2 flex items-center
                    ${currentPage === 'articles' ? 'text-sibos-orange border-sibos-orange' : 'text-gray-300 border-transparent hover:text-white'}
                `}
            >
                Artikel
            </button>

            <button 
                onClick={() => handleLinkClick({ preventDefault: () => {} } as React.MouseEvent, 'Harga')}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
            >
                Harga
            </button>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
                onClick={() => onNavigate('login')}
                className="hidden md:flex px-6 py-2 bg-sibos-orange hover:bg-orange-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-orange-900/40 text-sm items-center gap-2"
            >
              <LogIn size={16} />
              Login / Masuk
            </button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeMenu && (
        <div className="hidden md:block absolute top-20 left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200 z-40">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-4 gap-8">
              {/* Highlight Column */}
              <div className="col-span-1 bg-white/5 rounded-xl p-6 border border-white/5">
                <h4 className="text-sibos-orange font-bold text-lg mb-2">Mengapa SIBOS?</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Sistem terintegrasi yang dibangun oleh komunitas, untuk kemakmuran komunitas.
                </p>
                <div className="flex items-center gap-2 text-xs text-white font-mono bg-black/30 p-2 rounded">
                  <Rocket size={14} className="text-green-400" />
                  <span>v2025.1.0 (Stable)</span>
                </div>
              </div>

              {/* Menu Columns */}
              {navItems.find(i => i.id === activeMenu)?.columns?.map((col, idx) => (
                <div key={idx} className="col-span-1">
                  <h5 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider border-b border-white/10 pb-2 inline-block">
                    {col.title}
                  </h5>
                  <ul className="space-y-3">
                    {col.items.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <a 
                            href="#" 
                            onClick={(e) => handleLinkClick(e, subItem)}
                            className="text-gray-400 hover:text-sibos-orange transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-sibos-orange transition-colors"></span>
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu (Accordion Style) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-white/10 h-[calc(100vh-80px)] overflow-y-auto z-40 animate-in slide-in-from-right duration-300">
          <div className="p-6 space-y-2">
            
            {navItems.map((item) => (
              <div key={item.id} className="border-b border-white/5">
                {/* Accordion Header - Large Touch Target */}
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-5 px-2 text-left"
                >
                  <span className={`text-xl font-bold transition-colors ${mobileExpanded === item.id ? 'text-sibos-orange' : 'text-white'}`}>
                    {item.label}
                  </span>
                  <ChevronDown 
                    size={24} 
                    className={`transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180 text-sibos-orange' : 'text-gray-500'}`} 
                  />
                </button>

                {/* Accordion Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === item.id ? 'max-h-[1000px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                   <div className="bg-white/5 rounded-2xl p-4 space-y-6 mx-2 border border-white/5">
                      {item.columns?.map((col, idx) => (
                        <div key={idx}>
                          <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3 pl-2 border-l-2 border-sibos-orange">
                            {col.title}
                          </h4>
                          <ul className="space-y-1">
                            {col.items.map((subItem, sIdx) => (
                              <li key={sIdx}>
                                 <a 
                                    href="#"
                                    onClick={(e) => handleLinkClick(e, subItem)}
                                    className="block py-3 px-2 text-gray-300 hover:text-white text-base font-medium active:bg-white/5 rounded-lg transition-colors"
                                 >
                                   {subItem}
                                 </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ))}

             {/* Static Links */}
             <div className="border-b border-white/5">
                <button 
                    onClick={() => {
                        onNavigate('articles');
                        setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-5 px-2 text-white font-bold text-xl flex justify-between items-center"
                >
                    Artikel (Blog)
                </button>
             </div>

             <div className="border-b border-white/5">
                 <button 
                    onClick={() => handleLinkClick({ preventDefault: () => {} } as React.MouseEvent, 'Harga')}
                    className="w-full text-left py-5 px-2 text-white font-bold text-xl flex justify-between items-center"
                 >
                    Harga & Paket
                 </button>
             </div>

            {/* Login Button Mobile */}
            <div className="pt-8 pb-10">
              <button 
                onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                }}
                className="w-full py-4 bg-sibos-orange text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-orange-900/40 active:scale-95 transition-transform"
              >
                <LogIn size={20} />
                Login / Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
