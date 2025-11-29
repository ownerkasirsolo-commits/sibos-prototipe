
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  Settings, LogOut, Menu, DollarSign, Globe, Briefcase,
  Calendar, Factory, Tablet, Tv, Monitor, Users as UsersIcon,
  Store, ChevronDown, Search, Bell, ChevronLeft, ChevronRight,
  Command, X, AlertTriangle, CheckCircle, Info, ClipboardList, PieChart
} from 'lucide-react';
import { Page, UserRole, HardwareModule, AppModule, AppNotification } from '../types';
import { useSibos } from '../contexts/SibosContext';
import { DraggableAI } from './ui/DraggableAI';

interface BackofficeLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  onNavigate: (page: Page) => void;
  userRole?: UserRole;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
  actions?: React.ReactNode; 
  hideSidebar?: boolean; 
}

// Define explicit types for Menu Configuration
interface MenuItem {
    icon: React.ElementType;
    label: string;
    page: Page;
    allowedRoles?: UserRole[];
    reqMod?: AppModule;
    reqHw?: HardwareModule;
}

interface MenuGroup {
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
    actions,
    hideSidebar = false
}) => {
  const { outlets, selectedOutlet, setSelectedOutletId, notifications, markNotificationsRead } = useSibos();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [outletMenuOpen, setOutletMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard shortcut for Command Palette
  useEffect(() => {
      const down = (e: KeyboardEvent) => {
          if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              setCommandOpen((open) => !open);
          }
      };
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
      if (commandOpen) {
          setTimeout(() => searchInputRef.current?.focus(), 100);
      } else {
          setSearchQuery('');
      }
  }, [commandOpen]);

  // --- MENU CONFIGURATION & LOGIC ---

  // 1. Role Access Helper
  const hasAccess = (allowedRoles: UserRole[] | undefined): boolean => {
      if (!allowedRoles) return true; // No restriction
      
      // Owner/Admin/Director has god mode
      const godRoles: UserRole[] = ['owner', 'admin', 'director', 'general_manager'];
      if (userRole && godRoles.includes(userRole as UserRole)) return true;
      
      if (!userRole) return false;
      return allowedRoles.includes(userRole as UserRole);
  };

  // 2. Hardware/Module Access Helper
  const isFeatureEnabled = (reqHw?: HardwareModule, reqMod?: AppModule): boolean => {
      // Hardware check
      if (reqHw && !activeHardware.includes(reqHw)) return false;
      
      // Module check
      if (reqMod) {
          // A. Global Check (Must be active in subscription)
          if (!activeModules.includes(reqMod)) return false;

          // B. Outlet Specific Check
          // Only force outlet assignment check for "Operational Modules".
          // Management modules (Accounting, HRM, Marketing) should be available globally for the outlet if subscribed.
          const operationalModules: AppModule[] = ['pos_retail', 'pos_fnb', 'booking', 'production'];
          
          if (operationalModules.includes(reqMod)) {
              // If this module is strictly operational, check if the current outlet has it assigned
              if (selectedOutlet.assignedModules && selectedOutlet.assignedModules.length > 0) {
                  if (!selectedOutlet.assignedModules.includes(reqMod)) return false;
              }
          }
      }
      return true;
  };

  // 3. Menu Structure (Typed)
  const menuGroups: MenuGroup[] = [
      {
          title: "Inti Bisnis",
          items: [
              { icon: LayoutDashboard, label: 'Dashboard', page: 'backoffice' },
              { 
                  icon: ShoppingCart, 
                  label: 'Penjualan (POS)', 
                  page: 'pos-app', 
                  allowedRoles: ['supervisor', 'store_manager', 'cashier', 'staff', 'waiter'],
                  reqMod: selectedOutlet.category.toLowerCase().includes('retail') ? 'pos_retail' : 'pos_fnb'
              },
              { 
                  icon: Calendar, 
                  label: 'Booking & Reservasi', 
                  page: 'booking-app', 
                  reqMod: 'booking',
                  allowedRoles: ['supervisor', 'store_manager', 'staff']
              },
              { 
                  icon: Tablet, 
                  label: 'KDS Dapur', 
                  page: 'kds-app', 
                  reqMod: 'pos_fnb', 
                  reqHw: 'kds_tablet',
                  allowedRoles: ['kitchen_staff', 'supervisor', 'store_manager']
              },
          ]
      },
      {
          title: "Operasional",
          items: [
              { 
                  icon: Package, 
                  label: 'Inventori (IRM)', 
                  page: 'irm-app',
                  allowedRoles: ['supervisor', 'store_manager', 'warehouse_staff', 'auditor'] 
              },
              { 
                  icon: Factory, 
                  label: 'Produksi', 
                  page: 'production-app', 
                  reqMod: 'production',
                  allowedRoles: ['production_staff', 'supervisor', 'store_manager']
              },
              { 
                  icon: Users, 
                  label: 'Pelanggan (CRM)', 
                  page: 'crm-app', 
                  reqMod: 'crm',
                  allowedRoles: ['supervisor', 'store_manager', 'sales']
              },
          ]
      },
      {
          title: "Manajemen",
          items: [
              { 
                  icon: DollarSign, 
                  label: 'Keuangan', 
                  page: 'accounting-app', 
                  reqMod: 'accounting',
                  allowedRoles: ['finance_manager', 'auditor']
              },
              { 
                  icon: Briefcase, 
                  label: 'HRM & Payroll', 
                  page: 'hrm-app', 
                  reqMod: 'hrm',
                  allowedRoles: ['hr_manager', 'store_manager']
              },
              { 
                  icon: Globe, 
                  label: 'Pemasaran', 
                  page: 'marketing-app', 
                  reqMod: 'marketing',
                  allowedRoles: ['store_manager', 'sales']
              },
          ]
      },
      {
          title: "Sistem",
          items: [
              { 
                  icon: Settings, 
                  label: 'Pengaturan Usaha', 
                  page: 'settings-app',
                  allowedRoles: ['owner', 'director', 'admin']
              }
          ]
      }
  ];

  // Flatten for Command Palette
  const allCommands = menuGroups.flatMap(g => g.items.filter(i => hasAccess(i.allowedRoles) && isFeatureEnabled(i.reqHw, i.reqMod)));
  
  const filteredCommands = allCommands.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasActiveHardwareDisplays = activeHardware.some(hw => 
      ['customer_display', 'queue_display', 'kitchen_display'].includes(hw)
  );

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden font-sans">
      
      {/* COMMAND PALETTE MODAL */}
      {commandOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200" onClick={() => setCommandOpen(false)}>
              <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                      <Search size={20} className="text-gray-500" />
                      <input 
                          ref={searchInputRef}
                          type="text" 
                          placeholder="Navigasi cepat (Ketik nama menu)..." 
                          className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-lg"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">ESC</div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto p-2">
                      {filteredCommands.length > 0 ? (
                          <>
                            <div className="text-[10px] text-gray-500 font-bold uppercase px-2 py-1 mb-1">Menu Tersedia</div>
                            {filteredCommands.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (item.page) onNavigate(item.page);
                                        setCommandOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors group"
                                >
                                    <item.icon size={18} className="text-gray-500 group-hover:text-sibos-orange" />
                                    <span>{item.label}</span>
                                    <span className="ml-auto text-xs text-gray-600 opacity-0 group-hover:opacity-100">Buka</span>
                                </button>
                            ))}
                          </>
                      ) : (
                          <div className="text-center py-8 text-gray-500">
                              Tidak ada hasil untuk "{searchQuery}"
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* GLOBAL SIDEBAR (Conditionally Rendered) */}
      {!hideSidebar && (
          <aside 
            className={`
                fixed md:relative z-40 h-full bg-slate-900 border-r border-white/5 transition-all duration-300 flex flex-col
                ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
            `}
          >
             {/* Brand Logo */}
             <div className="h-16 flex items-center justify-center border-b border-white/5 relative bg-slate-900">
                <div className={`flex items-center gap-2 font-bold text-xl tracking-tighter ${!sidebarOpen && 'md:hidden'}`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded flex items-center justify-center text-white">S</div>
                    <span className="text-white">SIBOS</span>
                </div>
                 <div className={`hidden ${!sidebarOpen && 'md:flex'} w-8 h-8 bg-gradient-to-br from-sibos-orange to-red-600 rounded items-center justify-center text-white font-bold`}>S</div>
                 
                 {/* Collapse Toggle (Desktop only) */}
                 <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 z-50 hidden md:flex"
                 >
                     {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                 </button>
             </div>

             {/* OUTLET SWITCHER */}
             <div className={`px-3 py-4 border-b border-white/5 ${!sidebarOpen && 'hidden'}`}>
                 <div className="relative">
                     <button 
                        onClick={() => setOutletMenuOpen(!outletMenuOpen)}
                        className="w-full bg-slate-800 hover:bg-slate-700 p-3 rounded-xl flex items-center justify-between transition-colors border border-white/5"
                     >
                         <div className="flex items-center gap-3 overflow-hidden">
                             <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white shrink-0">
                                 <Store size={16} />
                             </div>
                             <div className="text-left overflow-hidden">
                                 <div className="text-[10px] text-gray-400 font-bold uppercase">Outlet Aktif</div>
                                 <div className="text-sm font-bold text-white truncate w-32">{selectedOutlet.name}</div>
                             </div>
                         </div>
                         <ChevronDown size={16} className="text-gray-500" />
                     </button>

                     {/* Dropdown */}
                     {outletMenuOpen && (
                         <div className="absolute top-full left-0 w-full bg-slate-800 border border-white/10 rounded-xl mt-2 shadow-xl z-50 overflow-hidden">
                             <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                {outlets.map(outlet => (
                                    <button 
                                        key={outlet.id}
                                        onClick={() => {
                                            setSelectedOutletId(outlet.id);
                                            setOutletMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center justify-between ${selectedOutlet.id === outlet.id ? 'text-sibos-orange font-bold bg-white/5' : 'text-gray-300'}`}
                                    >
                                        <div className="truncate pr-2">{outlet.name}</div>
                                        <span className="text-[10px] px-1.5 py-0.5 bg-black/30 rounded text-gray-500 capitalize shrink-0">{outlet.category}</span>
                                    </button>
                                ))}
                             </div>
                             {hasAccess(['owner', 'admin']) && (
                                 <div className="border-t border-white/5 p-2">
                                     <button onClick={() => onNavigate('settings-app')} className="w-full py-2 text-xs text-center text-blue-400 hover:text-white font-bold">+ Kelola Outlet</button>
                                 </div>
                             )}
                         </div>
                     )}
                 </div>
             </div>

             {/* NAVIGATION ITEMS (GROUPED) */}
             <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto custom-scrollbar">
                {menuGroups.map((group, gIdx) => {
                    // Filter items in this group based on RBAC and Feature Checks
                    const validItems = group.items.filter(item => 
                        hasAccess(item.allowedRoles) && 
                        isFeatureEnabled(item.reqHw, item.reqMod)
                    );

                    if (validItems.length === 0) return null;

                    return (
                        <div key={gIdx}>
                            {sidebarOpen && (
                                <h3 className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                    {group.title}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {validItems.map((item, iIdx) => (
                                    <button 
                                        key={iIdx}
                                        onClick={() => item.page && onNavigate(item.page)}
                                        className={`
                                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group
                                            ${title === item.label || (title.includes('Pengaturan') && item.label === 'Pengaturan Usaha')
                                                ? 'bg-sibos-orange text-white shadow-lg shadow-orange-900/40' 
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                            ${!sidebarOpen && 'justify-center px-0'}
                                        `}
                                        title={!sidebarOpen ? item.label : ''}
                                    >
                                        <item.icon size={20} className={!sidebarOpen && title === item.label ? 'text-white' : ''} />
                                        {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                                        
                                        {/* Notification Dot (Mock) */}
                                        {item.label.includes('KDS') && activeModules?.includes('pos_fnb') && (
                                            <span className="absolute right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Launcher Hardware (Separate Group) */}
                {hasActiveHardwareDisplays && sidebarOpen && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Launcher Layar</div>
                        <div className="space-y-1">
                            {activeHardware.includes('customer_display') && (
                                <button onClick={() => onNavigate('customer-display')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                                    <Monitor size={18} className="text-purple-400" /> Layar Pelanggan
                                </button>
                            )}
                            {activeHardware.includes('queue_display') && (
                                <button onClick={() => onNavigate('queue-display')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                                    <UsersIcon size={18} className="text-teal-400" /> Layar Antrian
                                </button>
                            )}
                            {activeHardware.includes('kitchen_display') && (
                                <button onClick={() => onNavigate('kitchen-display')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                                    <Tv size={18} className="text-red-400" /> Monitor Dapur (Wall)
                                </button>
                            )}
                        </div>
                    </div>
                )}
             </nav>

             <div className="p-4 border-t border-white/5 bg-slate-900">
                <button 
                    onClick={() => onNavigate('home')} 
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all ${!sidebarOpen && 'justify-center'}`}
                >
                    <LogOut size={20} />
                    <span className={`${!sidebarOpen && 'hidden'} text-sm font-medium`}>Keluar</span>
                </button>
             </div>
          </aside>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-950">
         
         {/* Header */}
         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-4">
                {!hideSidebar && (
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
                    >
                        <Menu size={20} />
                    </button>
                )}
                {hideSidebar && (
                    <button 
                        onClick={() => onNavigate('backoffice')}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                
                {/* Title & Icon */}
                <div className="flex items-center gap-3">
                    {icon && <div className="p-1.5 bg-white/5 rounded-lg text-gray-300">{icon}</div>}
                    <h1 className="font-bold text-lg text-white truncate">{title}</h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Dynamic Actions from Page */}
                {actions && <div className="flex items-center gap-2 mr-4 border-r border-white/10 pr-4">{actions}</div>}

                {/* Global Search Button */}
                <button 
                    onClick={() => setCommandOpen(true)}
                    className="hidden lg:flex items-center bg-slate-800 rounded-full px-3 py-1.5 border border-white/5 hover:bg-slate-700 transition-colors group cursor-text"
                >
                    <Search size={14} className="text-gray-500 mr-2 group-hover:text-white" />
                    <span className="text-xs text-gray-400 group-hover:text-white mr-2">Cari (Ctrl+K)...</span>
                </button>
                
                {/* Notification Bell */}
                <div className="relative">
                    <button 
                        onClick={() => {
                            setNotifOpen(!notifOpen);
                            if (!notifOpen) markNotificationsRead();
                        }}
                        className="p-2 rounded-full hover:bg-white/5 relative"
                    >
                        <Bell size={20} className="text-gray-400 hover:text-white" />
                        {unreadCount > 0 && (
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900 animate-pulse"></div>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {notifOpen && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                                <span className="font-bold text-white text-sm">Notifikasi</span>
                                <span className="text-[10px] text-gray-500">Terbaru</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 ${!notif.read ? 'bg-blue-500/5' : ''}`}>
                                            <div className="flex gap-3">
                                                <div className={`mt-1 p-1.5 rounded-full h-fit flex-shrink-0
                                                    ${notif.type === 'success' ? 'bg-green-500/20 text-green-400' : 
                                                      notif.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                                                      notif.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                                                      'bg-blue-500/20 text-blue-400'}
                                                `}>
                                                    {notif.type === 'success' ? <CheckCircle size={14} /> : 
                                                     notif.type === 'warning' ? <AlertTriangle size={14} /> : 
                                                     <Info size={14} />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white leading-tight mb-1">{notif.title}</h4>
                                                    <p className="text-xs text-gray-400 leading-snug">{notif.message}</p>
                                                    <span className="text-[10px] text-gray-600 mt-2 block">{new Date(notif.time).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500 text-xs">Tidak ada notifikasi baru</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-white">{userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}</div>
                        <div className="text-[10px] text-gray-500">Online</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:border-sibos-orange transition-colors">
                        AM
                    </div>
                </div>
            </div>
         </header>

         {/* Page Content */}
         <main className="flex-1 overflow-y-auto relative custom-scrollbar">
            {children}
         </main>

         {/* Draggable AI */}
         <DraggableAI />
      </div>
    </div>
  );
};
