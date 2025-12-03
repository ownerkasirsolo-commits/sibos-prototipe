
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  Settings, LogOut, Menu, DollarSign, Globe, Briefcase,
  Calendar, Factory, Tablet,
  ChevronDown, Search, Bell, ChevronRight,
  ShoppingBag, Utensils,
  MapPin, X, ChevronsRight, ChevronsLeft, Command
} from 'lucide-react';
import { Page, UserRole, HardwareModule, AppModule } from '../types';
import { useSibos } from '../contexts/SibosContext';
import { AIAssistant } from './ui/DraggableAI';

interface BackofficeLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  onNavigate: (page: Page) => void;
  userRole?: UserRole;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
  actions?: React.ReactNode; // Deprecated but kept for type compatibility if needed, though ignored in render
  hideSidebar?: boolean;
  currentPage?: Page; 
}

interface MenuItem {
    icon: React.ElementType;
    label: string;
    page: Page;
    allowedRoles?: UserRole[];
    reqMod?: AppModule;
    reqHw?: HardwareModule;
    allowedCategories?: string[];
}

interface MenuGroup {
    id: string;
    title: string;
    items: MenuItem[];
}

export const BackofficeLayout: React.FC<BackofficeLayoutProps> = ({ 
    children, 
    title, 
    icon, 
    onNavigate,
    userRole = 'owner', 
    activeHardware = [],
    activeModules = [],
    hideSidebar = false,
    currentPage
}) => {
  const { outlets, selectedOutlet, setSelectedOutletId, notifications, markNotificationsRead, searchQuery, setSearchQuery } = useSibos();
  
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [outletDropdownOpen, setOutletDropdownOpen] = useState(false);
  
  // Mobile Search State
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  // Search Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard Shortcut Handler (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault(); 
            // If on mobile, expand search first
            if (window.innerWidth < 768) {
                setMobileSearchOpen(true);
                setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
            } else {
                searchInputRef.current?.focus();
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Unique Brands Logic
  const uniqueBrands = Array.from(new Set(outlets.map(o => o.brand)));
  
  // Filtered Outlets based on selected Brand
  const currentBrandOutlets = outlets.filter(o => o.brand === selectedOutlet.brand);

  // --- MENU STRUCTURE ---
  const menuGroups: MenuGroup[] = [
      {
          id: "dashboard",
          title: "Dashboard",
          items: [
              { icon: LayoutDashboard, label: 'Ringkasan', page: 'backoffice' },
          ]
      },
      {
          id: "ops",
          title: "Operasional",
          items: [
              { icon: Utensils, label: 'Kasir Resto', page: 'pos-app', reqMod: 'pos_fnb', allowedCategories: ['fnb'] },
              { icon: Calendar, label: 'Reservasi', page: 'booking-app', allowedCategories: ['fnb', 'service', 'hospitality', 'entertainment'] },
              { icon: Tablet, label: 'Kitchen Display', page: 'kds-app', reqMod: 'pos_fnb', allowedCategories: ['fnb'] },
              { icon: Factory, label: 'Dapur', page: 'production-app', reqMod: 'production', allowedCategories: ['fnb'] },
              { icon: ShoppingCart, label: 'Kasir Toko', page: 'pos-app', reqMod: 'pos_retail', allowedCategories: ['retail', 'fashion', 'health'] },
              { icon: Package, label: selectedOutlet.category === 'fnb' ? 'Menu & Bahan' : 'Stok Produk', page: 'irm-app', allowedCategories: ['fnb', 'retail', 'fashion', 'health', 'manufacturing', 'service', 'agri'] },
              { icon: ShoppingBag, label: 'Pembelian', page: 'purchase-app' }, 
          ]
      },
      {
          id: "mgmt",
          title: "Manajemen",
          items: [
              { icon: Users, label: 'Pelanggan', page: 'crm-app', reqMod: 'crm' },
              { icon: DollarSign, label: 'Keuangan', page: 'accounting-app', reqMod: 'accounting' },
              { icon: Briefcase, label: 'Karyawan', page: 'hrm-app', reqMod: 'hrm' },
              { icon: Globe, label: 'Omnichannel', page: 'marketing-app', reqMod: 'marketing' },
          ]
      }
  ];

  // --- ACCESS LOGIC ---
  const hasAccess = (allowedRoles: UserRole[] | undefined): boolean => {
      if (!allowedRoles) return true; 
      const godRoles: UserRole[] = ['owner', 'admin', 'director', 'general_manager'];
      if (userRole && godRoles.includes(userRole as UserRole)) return true;
      if (!userRole) return false;
      return allowedRoles.includes(userRole as UserRole);
  };

  const isFeatureEnabled = (reqHw?: HardwareModule, reqMod?: AppModule, allowedCats?: string[]): boolean => {
      if (reqHw && !activeHardware.includes(reqHw)) return false;
      if (allowedCats && selectedOutlet.category) {
          if (!allowedCats.includes('all') && !allowedCats.includes(selectedOutlet.category)) return false;
      }
      if (reqMod) {
          if (!activeModules.includes(reqMod)) return false;
          if (selectedOutlet.assignedModules && selectedOutlet.assignedModules.length > 0) {
              if (!selectedOutlet.assignedModules.includes(reqMod)) return false;
          }
      }
      return true;
  };

  // Filter Visible Groups
  const visibleGroups = menuGroups.map(group => ({
      ...group,
      items: group.items.filter(item => hasAccess(item.allowedRoles) && isFeatureEnabled(item.reqHw, item.reqMod, item.allowedCategories))
  })).filter(group => group.items.length > 0);

  // --- ACCORDION LOGIC ---
  const findActiveGroup = () => {
      for (const group of visibleGroups) {
          if (group.items.some(item => item.page === currentPage)) {
              return group.id;
          }
      }
      return 'dashboard'; 
  };

  const [activeGroupId, setActiveGroupId] = useState<string>(findActiveGroup());

  useEffect(() => {
      setActiveGroupId(findActiveGroup());
  }, [currentPage, selectedOutlet.category]); 

  const handleGroupClick = (groupId: string) => {
      if (isSidebarCollapsed) setIsSidebarCollapsed(false); // Auto expand if clicking group
      if (activeGroupId === groupId) {
          // setActiveGroupId(''); // Optional toggle
      } else {
          setActiveGroupId(groupId);
      }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden font-sans">
      
      {/* MOBILE BACKDROP */}
      {!hideSidebar && mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 1. MAIN CONTENT AREA (LEFT SIDE) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-950">
         
         {/* TOP NAVBAR (HEADER) */}
         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-4 flex-1">
                {/* Page Title (Hidden when Mobile Search Active) */}
                <div className={`flex items-center gap-2 mr-4 flex-shrink-0 ${mobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
                    {icon && <div className="text-gray-400 hidden sm:block">{icon}</div>}
                    <h1 className="font-bold text-lg text-white truncate">{title}</h1>
                </div>

                {/* DESKTOP SEARCH BAR (Always Visible on MD+) */}
                <div className="hidden md:block flex-1 max-w-xl relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-sibos-orange transition-colors" size={16} />
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Cari data, menu, atau transaksi..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-10 pr-12 text-sm text-white focus:border-sibos-orange/50 outline-none transition-all focus:bg-slate-900 focus:shadow-lg focus:shadow-orange-900/10"
                    />
                    {/* Shortcut Hint */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1 opacity-50">
                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                {/* MOBILE SEARCH BAR (Visible Only When Expanded) */}
                {mobileSearchOpen && (
                    <div className="flex-1 md:hidden relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sibos-orange" size={16} />
                        <input 
                            ref={mobileSearchInputRef}
                            type="text" 
                            placeholder="Cari..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-sibos-orange/50 rounded-xl py-2 pl-9 pr-10 text-sm text-white outline-none shadow-lg"
                            autoFocus
                        />
                        <button 
                            onClick={() => { setMobileSearchOpen(false); setSearchQuery(''); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                {/* Mobile Search Toggle (Only when closed) */}
                {!mobileSearchOpen && (
                    <button 
                        onClick={() => setMobileSearchOpen(true)}
                        className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5"
                    >
                        <Search size={20} />
                    </button>
                )}

                {/* AI Assistant Button */}
                <AIAssistant />

                {/* Notification */}
                <div className="relative">
                    <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markNotificationsRead(); }} className="p-2 rounded-full hover:bg-white/5 relative transition-colors group">
                        <Bell size={20} className="text-gray-400 group-hover:text-sibos-orange transition-colors" />
                        {unreadCount > 0 && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-sibos-orange rounded-full animate-pulse"></div>}
                    </button>
                    {notifOpen && (
                        <>
                            {/* Backdrop for closing */}
                            <div className="fixed inset-0 z-[80] bg-transparent" onClick={() => setNotifOpen(false)}></div>
                            {/* Fixed Modal to ensure top layer */}
                            <div className="fixed top-16 right-4 sm:right-20 mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-[90] overflow-hidden origin-top-right">
                                <div className="px-4 py-3 border-b border-white/5 font-bold text-white text-sm bg-slate-950 flex justify-between items-center">
                                    <span>Notifikasi</span>
                                    <button onClick={() => setNotifOpen(false)} className="text-gray-500 hover:text-white"><X size={14}/></button>
                                </div>
                                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                    {notifications.length > 0 ? notifications.map(notif => (
                                        <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!notif.read ? 'bg-orange-500/5' : ''}`}>
                                            <h4 className="text-sm font-bold text-white mb-1">{notif.title}</h4>
                                            <p className="text-xs text-gray-400">{notif.message}</p>
                                        </div>
                                    )) : <div className="p-8 text-center text-gray-500 text-xs">Tidak ada notifikasi baru</div>}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Profile Info */}
                <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-4">
                    <div className="text-right">
                        <div className="text-xs font-bold text-white capitalize">{userRole?.replace('_', ' ')}</div>
                        <div className="text-[10px] text-green-400">● Online</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold text-xs border border-white/10 shadow-inner">AM</div>
                </div>

                {/* Mobile Menu Toggle */}
                {!hideSidebar && (
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 border-l border-white/10 pl-4 ml-2">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
            </div>
         </header>

         {/* Page Content */}
         <main className="flex-1 overflow-y-auto relative custom-scrollbar">
            {children}
         </main>
      </div>

      {/* 2. SIDEBAR (RIGHT SIDE) */}
      {!hideSidebar && (
          <aside className={`
            fixed md:relative right-0 z-50 h-full bg-slate-900 border-l border-white/5 transition-all duration-300 flex flex-col shadow-2xl md:shadow-none
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            ${isSidebarCollapsed ? 'w-20' : 'w-72'}
          `}>
             
             {/* 0. LOGO & HEADER OF SIDEBAR */}
             <div className={`h-16 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-4'} border-b border-white/5 shrink-0 transition-all`}>
                {!isSidebarCollapsed && (
                    <div 
                        className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white cursor-pointer group" 
                        onClick={() => onNavigate('home')}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-900/50 group-hover:scale-105 transition-transform">
                            S
                        </div>
                        <span className="group-hover:text-sibos-orange transition-colors">SIBOS</span>
                    </div>
                )}
                {isSidebarCollapsed && (
                    <div className="w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => onNavigate('home')}>S</div>
                )}
                
                {/* HEADER ACTIONS */}
                <div className="flex items-center gap-1">
                    {/* MOBILE ACTIONS (Settings & Logout) - Visible only on Mobile */}
                    <div className="flex items-center gap-1 md:hidden">
                        <button 
                            onClick={() => { onNavigate('settings-app'); setMobileMenuOpen(false); }}
                            className={`p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${currentPage === 'settings-app' ? 'text-sibos-orange' : ''}`}
                            title="Pengaturan"
                        >
                            <Settings size={18} />
                        </button>
                        <button 
                            onClick={() => onNavigate('home')}
                            className="p-2 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Keluar"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>

                    {/* COLLAPSE/EXPAND BUTTON (Desktop Only) */}
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-sibos-orange hover:bg-orange-500/10 hidden md:block transition-colors"
                        title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isSidebarCollapsed ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
                    </button>
                </div>
             </div>

             {/* 1. BRAND HEADER (Hierarki 1) */}
             <div className={`p-4 pb-2 border-b border-white/5 bg-slate-950/50 ${isSidebarCollapsed ? 'px-2' : ''}`}>
                 {!isSidebarCollapsed && <div className="mb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Bisnis</div>}
                 <div className="relative">
                     <button 
                        onClick={() => { if(!isSidebarCollapsed) setBrandDropdownOpen(!brandDropdownOpen); else setIsSidebarCollapsed(false); setOutletDropdownOpen(false); }}
                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} bg-slate-800 hover:bg-slate-700 p-3 rounded-xl transition-colors group border border-white/5 hover:border-sibos-orange/30`}
                     >
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0">
                                 {selectedOutlet.brand.charAt(0)}
                             </div>
                             {!isSidebarCollapsed && (
                                 <div className="text-left overflow-hidden">
                                     <div className="font-bold text-white text-sm truncate w-32 group-hover:text-sibos-orange transition-colors">{selectedOutlet.brand}</div>
                                 </div>
                             )}
                         </div>
                         {!isSidebarCollapsed && <ChevronDown size={16} className={`text-gray-500 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />}
                     </button>

                     {/* Brand Dropdown (Only when expanded) */}
                     {!isSidebarCollapsed && brandDropdownOpen && (
                         <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                             {uniqueBrands.map((brand, idx) => (
                                 <button
                                     key={idx}
                                     onClick={() => {
                                         const targetOutlet = outlets.find(o => o.brand === brand);
                                         if (targetOutlet) setSelectedOutletId(targetOutlet.id);
                                         setBrandDropdownOpen(false);
                                     }}
                                     className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 ${selectedOutlet.brand === brand ? 'text-sibos-orange font-bold' : 'text-gray-300'}`}
                                 >
                                     {brand}
                                 </button>
                             ))}
                         </div>
                     )}
                 </div>
             </div>

             {/* 2. OUTLET SELECTOR (Hierarki 2) */}
             <div className={`px-4 pb-4 pt-2 border-b border-white/5 ${isSidebarCollapsed ? 'px-2' : ''}`}>
                 {!isSidebarCollapsed && <div className="mb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">Outlet</div>}
                 <div className="relative">
                     <button 
                        onClick={() => { if(!isSidebarCollapsed) setOutletDropdownOpen(!outletDropdownOpen); else setIsSidebarCollapsed(false); setBrandDropdownOpen(false); }}
                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between text-left'} px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5`}
                     >
                         <div className="flex items-center gap-2 text-gray-300 group-hover:text-white">
                             <MapPin size={18} className="text-gray-500 group-hover:text-sibos-orange shrink-0" />
                             {!isSidebarCollapsed && <span className="text-sm font-medium truncate w-40">{selectedOutlet.location || selectedOutlet.name}</span>}
                         </div>
                         {!isSidebarCollapsed && <ChevronDown size={14} className={`text-gray-600 transition-transform ${outletDropdownOpen ? 'rotate-180' : ''}`} />}
                     </button>

                     {/* Outlet Dropdown */}
                     {!isSidebarCollapsed && outletDropdownOpen && (
                         <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                             {currentBrandOutlets.map((outlet) => (
                                 <button
                                     key={outlet.id}
                                     onClick={() => {
                                         setSelectedOutletId(outlet.id);
                                         setOutletDropdownOpen(false);
                                     }}
                                     className={`w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 flex items-center gap-2 ${selectedOutlet.id === outlet.id ? 'text-green-400 font-bold' : 'text-gray-400'}`}
                                 >
                                     <div className={`w-1.5 h-1.5 rounded-full ${selectedOutlet.id === outlet.id ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                                     {outlet.location || outlet.name}
                                 </button>
                             ))}
                         </div>
                     )}
                 </div>
             </div>

             {/* 3. MENU NAVIGATION (ACCORDION) */}
             <div className={`flex-1 overflow-y-auto custom-scrollbar py-4 space-y-1 ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}>
                {visibleGroups.map((group) => {
                    const isOpen = activeGroupId === group.id && !isSidebarCollapsed;
                    const GroupIcon = group.items[0].icon;
                    
                    if (group.id === 'dashboard') {
                        return group.items.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); setActiveGroupId('dashboard'); }}
                                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start gap-3 px-3'} py-2.5 rounded-xl transition-all mb-4 group relative ${currentPage === item.page ? 'bg-sibos-orange text-white shadow-lg font-bold' : 'text-gray-400 hover:bg-orange-500/10 hover:text-sibos-orange'}`}
                                title={isSidebarCollapsed ? item.label : ''}
                            >
                                <item.icon size={20} />
                                {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                            </button>
                        ));
                    }

                    return (
                        <div key={group.id} className="mb-2">
                            {/* Group Header */}
                            <button 
                                onClick={() => handleGroupClick(group.id)}
                                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl transition-colors select-none group ${isOpen ? 'text-sibos-orange bg-orange-500/5' : 'text-gray-500 hover:bg-orange-500/5 hover:text-sibos-orange'}`}
                                title={isSidebarCollapsed ? group.title : ''}
                            >
                                {isSidebarCollapsed ? (
                                    // Show first item icon as group icon when collapsed
                                    <GroupIcon size={20} className="opacity-70 group-hover:text-sibos-orange" />
                                ) : (
                                    <>
                                        <span className="text-xs font-bold uppercase tracking-wider group-hover:text-sibos-orange transition-colors">{group.title}</span>
                                        <ChevronRight size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-90 text-sibos-orange' : 'rotate-0'}`} />
                                    </>
                                )}
                            </button>

                            {/* Group Items (Accordion Body) - Only when expanded */}
                            {!isSidebarCollapsed && (
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-2 space-y-1 border-l border-white/5 ml-3">
                                        {group.items.map((item, idx) => {
                                            const isActive = currentPage === item.page;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); }}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm relative ${isActive ? 'text-sibos-orange bg-sibos-orange/10 font-bold' : 'text-gray-400 hover:text-sibos-orange hover:bg-orange-500/5'}`}
                                                >
                                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-sibos-orange rounded-r-full"></div>}
                                                    <item.icon size={16} className={isActive ? 'text-sibos-orange' : 'text-gray-500 group-hover:text-sibos-orange'} />
                                                    <span>{item.label}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
             </div>

             {/* 4. FOOTER (Settings & Logout) - Hidden on Mobile */}
             <div className={`bg-slate-900 border-t border-white/5 space-y-1 ${isSidebarCollapsed ? 'p-2' : 'p-3'} hidden md:block`}>
                <button 
                    onClick={() => { onNavigate('settings-app'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start gap-3 px-3'} py-2.5 rounded-xl transition-all ${currentPage === 'settings-app' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-sibos-orange hover:bg-orange-500/10'}`}
                    title={isSidebarCollapsed ? "Pengaturan" : ""}
                >
                    <Settings size={20} className={currentPage === 'settings-app' ? 'text-sibos-orange' : ''} />
                    {!isSidebarCollapsed && <span className="text-sm">Pengaturan</span>}
                </button>
                <button 
                    onClick={() => onNavigate('home')} 
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start gap-3 px-3'} py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all`}
                    title={isSidebarCollapsed ? "Keluar" : ""}
                >
                    <LogOut size={20} />
                    {!isSidebarCollapsed && <span className="text-sm font-medium">Keluar</span>}
                </button>
             </div>
          </aside>
      )}
    </div>
  );
};
