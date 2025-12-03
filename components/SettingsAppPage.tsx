
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Settings, Store, Users, CreditCard, 
  Printer, Save, CheckCircle,
  Image as ImageIcon,
  Receipt, MapPin, FileText,
  Wallet, ChevronRight, Briefcase, Plus, Trash2, Clock, LayoutGrid, X,
  ToggleLeft, ToggleRight, ChevronDown, Check, Shield, User, Lock, Mail, Phone
} from 'lucide-react';
import { Page, HardwareModule, BusinessCategory, AppModule, Outlet } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface SettingsAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  onToggleHardware?: (hw: HardwareModule) => void;
  activeModules?: AppModule[];
  onToggleModule?: (mod: AppModule) => void;
  currentCategory?: BusinessCategory;
}

// Define available permissions explicitly
const AVAILABLE_PERMISSIONS = [
    'Void Transaksi', 
    'Diskon Manual', 
    'Refund / Retur', 
    'Laporan Laba Rugi', 
    'Edit Stok', 
    'Tutup Kasir (Closing)', 
    'Kelola User & Role', 
    'Setting Hardware',
    'Edit Produk',
    'Akses CRM Member',
    'Input Pengeluaran',
    'Purchase Order'
];

interface RoleConfig {
    id: string;
    name: string;
    permissions: string[]; // List of enabled permissions
}

export const SettingsAppPage: React.FC<SettingsAppPageProps> = ({ 
    onNavigate, 
    activeHardware = [], 
    onToggleHardware = (_: HardwareModule) => {}, 
    activeModules = [],
    onToggleModule = (_: AppModule) => {},
    currentCategory = 'retail'
}) => {
  const { outlets, selectedOutlet, setSelectedOutletId, updateOutletModules, addOutlet, deleteOutlet, deleteBrand, updateOutlet } = useSibos();
  
  // GLOBAL TABS
  const [globalTab, setGlobalTab] = useState<'operational' | 'profile' | 'billing'>('operational');

  // --- LOCAL STATES FOR BRAND & OUTLET LOGIC ---
  const brands = useMemo(() => {
      const unique = Array.from(new Set(outlets.map(o => o.brand)));
      return unique;
  }, [outlets]);

  const [selectedBrand, setSelectedBrand] = useState<string>('');

  useEffect(() => {
      if (brands.length > 0) {
          if (!selectedBrand || !brands.includes(selectedBrand)) {
              setSelectedBrand(brands[0]);
          }
      } else {
          setSelectedBrand('');
      }
  }, [brands, selectedBrand, outlets]); 

  const brandOutlets = useMemo(() => {
      if (!selectedBrand) return [];
      return outlets.filter(o => o.brand === selectedBrand);
  }, [outlets, selectedBrand]);

  const [activeOutletTabId, setActiveOutletTabId] = useState<number>(0);

  useEffect(() => {
      if (brandOutlets.length > 0) {
          const currentExists = brandOutlets.find(o => o.id === activeOutletTabId);
          if (!currentExists) setActiveOutletTabId(brandOutlets[0].id);
      } else {
          setActiveOutletTabId(0);
      }
  }, [brandOutlets, activeOutletTabId, outlets]); 

  const activeOutletData = outlets.find(o => o.id === activeOutletTabId) || (brandOutlets.length > 0 ? brandOutlets[0] : undefined);

  // Tab Configuration for Outlet Level
  const [configTab, setConfigTab] = useState<'info' | 'schedule' | 'payments' | 'features' | 'hardware' | 'receipt'>('info');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-center selected tab on mobile
  useEffect(() => {
    if (tabsContainerRef.current) {
        const activeTabElement = document.getElementById(`config-tab-${configTab}`);
        if (activeTabElement) {
            const container = tabsContainerRef.current;
            const scrollLeft = activeTabElement.offsetLeft - (container.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
  }, [configTab]);

  // --- USER PROFILE STATE ---
  const [userProfile, setUserProfile] = useState({
      name: 'Amin Maghfuri',
      email: 'owner@sibos.id',
      phone: '081234567890',
      role: 'Owner (Pemilik)',
      password: '',
      newPassword: ''
  });

  // --- ADD MODALS STATE ---
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCategory, setNewBrandCategory] = useState<BusinessCategory>('retail');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');

  // Bulk Schedule State
  const [bulkOpenTime, setBulkOpenTime] = useState('08:00');
  const [bulkCloseTime, setBulkCloseTime] = useState('22:00');

  // --- HANDLERS (Same as before) ---
  const handleCreateBrand = () => {
      if (!newBrandName) return;
      
      let defaultModules: string[] = [];
      if (newBrandCategory === 'fnb') defaultModules = ['pos_fnb', 'production'];
      else if (newBrandCategory === 'retail') defaultModules = ['pos_retail'];
      else defaultModules = ['pos_retail'];

      defaultModules.forEach(mod => {
          if (!activeModules.includes(mod as AppModule)) {
              onToggleModule(mod as AppModule);
          }
      });

      const newOutlet: Outlet = {
          id: Date.now(),
          brand: newBrandName,
          name: `${newBrandName} - Pusat`,
          location: 'Kantor Pusat',
          category: newBrandCategory,
          type: 'Pusat',
          address: 'Alamat belum diatur',
          phone: '-',
          assignedModules: defaultModules,
          allowDebt: true
      };

      addOutlet(newOutlet);
      setSelectedBrand(newBrandName);
      setShowAddBrandModal(false);
      setNewBrandName('');
  };

  const handleCreateBranch = () => {
      if (!newBranchLocation) return;
      const parent = brandOutlets[0];
      if (!parent) return;

      const newOutlet: Outlet = {
          id: Date.now(),
          brand: parent.brand,
          name: `${parent.brand} - ${newBranchLocation}`,
          location: newBranchLocation,
          category: parent.category,
          type: 'Cabang',
          address: newBranchAddress || 'Alamat belum diatur',
          phone: '-',
          assignedModules: parent.assignedModules,
          allowDebt: parent.allowDebt
      };

      addOutlet(newOutlet);
      setShowAddBranchModal(false);
      setNewBranchLocation('');
      setNewBranchAddress('');
  };

  const handleRemoveBranch = (id: number) => {
      if (window.confirm('Yakin ingin menghapus cabang ini?')) {
          deleteOutlet(id);
      }
  };

  const handleRemoveBrand = () => {
      if (window.confirm(`PERINGATAN: Hapus brand "${selectedBrand}"?`)) {
          deleteBrand(selectedBrand);
      }
  };

  const toggleDay = (idx: number) => {
      if (!activeOutletData?.schedule) return;
      const newSchedule = [...activeOutletData.schedule];
      newSchedule[idx].active = !newSchedule[idx].active;
      updateOutlet(activeOutletData.id, { schedule: newSchedule });
  };

  const updateScheduleTime = (idx: number, field: 'open' | 'close', value: string) => {
      if (!activeOutletData?.schedule) return;
      const newSchedule = [...activeOutletData.schedule];
      newSchedule[idx] = { ...newSchedule[idx], [field]: value };
      updateOutlet(activeOutletData.id, { schedule: newSchedule });
  };

  const applyBulkSchedule = (target: 'all' | 'weekdays') => {
      if (!activeOutletData?.schedule) return;
      const newSchedule = activeOutletData.schedule.map(s => {
          if (target === 'weekdays') {
              if (s.day === 'Sabtu' || s.day === 'Minggu') return s;
          }
          return { ...s, active: true, open: bulkOpenTime, close: bulkCloseTime };
      });
      updateOutlet(activeOutletData.id, { schedule: newSchedule });
  };

  const togglePayment = (id: string) => {
      if (!activeOutletData?.paymentMethods) return;
      const newPayments = activeOutletData.paymentMethods.map(p => 
          p.id === id ? { ...p, active: !p.active } : p
      );
      updateOutlet(activeOutletData.id, { paymentMethods: newPayments });
  };

  const [outletRoles, setOutletRoles] = useState<RoleConfig[]>([
      { id: 'mgr', name: 'Store Manager', permissions: AVAILABLE_PERMISSIONS }, 
      { id: 'spv', name: 'Supervisor', permissions: ['Void Transaksi', 'Diskon Manual', 'Tutup Kasir (Closing)', 'Refund / Retur', 'Edit Stok'] },
      { id: 'csh', name: 'Cashier', permissions: ['Tutup Kasir (Closing)'] },
      { id: 'wtr', name: 'Waiter', permissions: [] },
  ]);
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>('csh'); 
  const [newRoleName, setNewRoleName] = useState('');

  const handleAddRole = () => {
      if (!newRoleName) return;
      const newId = newRoleName.toLowerCase().replace(/\s/g, '_') + Math.floor(Math.random() * 1000);
      setOutletRoles([...outletRoles, { id: newId, name: newRoleName, permissions: [] }]);
      setNewRoleName('');
      setExpandedRoleId(newId);
  };

  const handleDeleteRole = (id: string) => {
      if (window.confirm('Hapus jabatan ini?')) {
          setOutletRoles(outletRoles.filter(r => r.id !== id));
          if (expandedRoleId === id) setExpandedRoleId(null);
      }
  };

  const togglePermission = (roleId: string, perm: string) => {
      setOutletRoles(prev => prev.map(r => {
          if (r.id === roleId) {
              const hasPerm = r.permissions.includes(perm);
              const newPerms = hasPerm ? r.permissions.filter(p => p !== perm) : [...r.permissions, perm];
              return { ...r, permissions: newPerms };
          }
          return r;
      }));
  };

  const displaySchedule = activeOutletData?.schedule || [];
  const displayPayments = activeOutletData?.paymentMethods || [];

  return (
    <BackofficeLayout
        title="Pengaturan"
        icon={<Settings className="text-gray-400" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="settings-app" 
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-32 md:pb-24">
         
         {/* Top Actions */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <button onClick={() => onNavigate('backoffice')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm bg-white/5 w-fit px-4 py-2 rounded-lg hover:bg-white/10">
                <ArrowLeft size={18} /> Kembali ke Dashboard
            </button>
            <button className="flex w-full md:w-auto items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg text-sm font-bold text-white shadow-lg shadow-orange-900/40 active:scale-95 transition-transform">
               <Save size={16} /> Simpan Perubahan
            </button>
         </div>

         {/* --- MODALS --- */}
         {showAddBrandModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                 <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                     <h3 className="text-xl font-bold text-white mb-4">Buat Unit Bisnis Baru</h3>
                     <div className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Brand</label>
                             <input type="text" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} placeholder="Contoh: Senja Clothing" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none"/>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                             <select value={newBrandCategory} onChange={e => setNewBrandCategory(e.target.value as BusinessCategory)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none">
                                 <option value="retail">Ritel (Toko)</option>
                                 <option value="fnb">F&B (Resto/Kafe)</option>
                                 <option value="service">Jasa</option>
                                 <option value="manufacturing">Manufaktur</option>
                             </select>
                         </div>
                         <div className="pt-4 flex gap-3">
                             <button onClick={() => setShowAddBrandModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700">Batal</button>
                             <button onClick={handleCreateBrand} className="flex-1 py-3 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-white font-bold shadow-lg">Simpan</button>
                         </div>
                     </div>
                 </div>
             </div>
         )}

         {showAddBranchModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                 <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                     <h3 className="text-xl font-bold text-white mb-4">Tambah Cabang Baru</h3>
                     <div className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lokasi</label>
                             <input type="text" value={newBranchLocation} onChange={e => setNewBranchLocation(e.target.value)} placeholder="Contoh: Cabang Selatan" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none"/>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat</label>
                             <textarea value={newBranchAddress} onChange={e => setNewBranchAddress(e.target.value)} rows={3} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none resize-none"/>
                         </div>
                         <div className="pt-4 flex gap-3">
                             <button onClick={() => setShowAddBranchModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700">Batal</button>
                             <button onClick={handleCreateBranch} className="flex-1 py-3 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-white font-bold shadow-lg">Simpan</button>
                         </div>
                     </div>
                 </div>
             </div>
         )}

         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* === SIDEBAR: MENU PENGATURAN === */}
            <div className="w-full lg:w-64 space-y-6 flex-shrink-0">
                
                {/* 1. SETUP TOKO (OPERASIONAL) */}
                <div>
                    <div className="px-1 mb-3 flex items-center justify-between">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Setup Toko</h3>
                    </div>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <button 
                                key={brand}
                                onClick={() => { setSelectedBrand(brand); setGlobalTab('operational'); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${selectedBrand === brand && globalTab === 'operational' ? 'bg-white/10 text-white border border-white/5 shadow-lg' : 'bg-slate-900 lg:bg-transparent text-gray-400 hover:bg-orange-500/10 hover:text-sibos-orange border border-white/5 lg:border-transparent'}`}
                            >
                                <Store size={18} className={selectedBrand === brand ? 'text-sibos-orange' : 'text-gray-500'} />
                                <span className="truncate flex-1">{brand}</span>
                                {selectedBrand === brand && <ChevronRight size={14} className="ml-auto text-gray-500 hidden lg:block"/>}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowAddBrandModal(true)} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-sibos-orange hover:bg-orange-500/10 hover:border-sibos-orange transition-all group">
                        <Plus size={18} className="text-gray-500 group-hover:text-sibos-orange"/>
                        <span className="text-sm font-bold">Buat Brand Baru</span>
                    </button>
                </div>

                {/* 2. AKUN & USER */}
                <div className="border-t border-white/5 pt-6">
                    <h3 className="px-1 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Akun Saya</h3>
                    <div className="space-y-1">
                        <button 
                            onClick={() => setGlobalTab('profile')} 
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${globalTab === 'profile' ? 'bg-sibos-orange text-white shadow-lg' : 'bg-slate-900 lg:bg-transparent text-gray-400 hover:bg-orange-500/10 hover:text-sibos-orange border border-white/5 lg:border-transparent'}`}
                        >
                            <User size={18} /> Profil Akun
                        </button>
                    </div>
                </div>

                {/* 3. BILLING */}
                <div className="border-t border-white/5 pt-6 hidden lg:block">
                    <h3 className="px-1 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Pusat</h3>
                    <div className="space-y-1">
                        <button onClick={() => setGlobalTab('billing')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${globalTab === 'billing' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>
                            <CreditCard size={18} /> Billing & Lisensi
                        </button>
                    </div>
                </div>
            </div>

            {/* === MAIN CONTENT AREA === */}
            <div className="flex-1 min-w-0 space-y-6">
                
                {/* === TAB: OPERATIONAL (BRAND & OUTLET SETUP) === */}
                {globalTab === 'operational' && (
                    <>
                        {selectedBrand && brandOutlets.length > 0 ? (
                            <>
                            {/* BRAND IDENTITY */}
                            <GlassCard className="bg-slate-900 border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Briefcase size={150} /></div>
                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    <div className="flex-shrink-0 flex items-center gap-4 md:block">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:border-sibos-orange hover:text-sibos-orange transition-colors cursor-pointer group relative overflow-hidden shadow-xl">
                                            <ImageIcon size={28} className="mb-1" />
                                            <span className="text-[10px] font-bold text-center px-2 hidden md:block">Logo Brand</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Identitas Unit Bisnis</h2>
                                                <p className="text-xs text-gray-400">Pengaturan ini berlaku global untuk brand ini.</p>
                                            </div>
                                            <button onClick={handleRemoveBrand} className="flex items-center gap-2 px-4 py-2 bg-red-900/10 text-red-500 rounded-lg text-xs font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg group">
                                                <Trash2 size={16} /> <span className="hidden md:inline">Hapus Brand</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Nama Brand</label>
                                                <input type="text" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none font-bold" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Kategori</label>
                                                <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none appearance-none">
                                                    <option value="fnb">F&B</option>
                                                    <option value="retail">Retail</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><FileText size={12}/> NPWP</label>
                                                <input type="text" defaultValue={activeOutletData?.npwp || ''} placeholder="00.000.000.0-000.000" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Slogan</label>
                                                <input type="text" defaultValue={activeOutletData?.slogan || ''} placeholder="Contoh: Nikmatnya Kopi Asli" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* ROLE CONFIG */}
                            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mt-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Struktur Jabatan (Role)</h2>
                                        <p className="text-xs text-gray-400">Atur hak akses untuk setiap jabatan.</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {outletRoles.map((role) => {
                                        const isExpanded = expandedRoleId === role.id;
                                        return (
                                            <div key={role.id} className={`rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-slate-950 border-orange-500/50 shadow-lg' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}>
                                                <div onClick={() => setExpandedRoleId(isExpanded ? null : role.id)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${isExpanded ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-800 text-gray-400 border-white/10'}`}>{role.name.charAt(0)}</div>
                                                        <div>
                                                            <div className={`font-bold text-sm ${isExpanded ? 'text-white' : 'text-gray-300'}`}>{role.name}</div>
                                                            <div className="text-[10px] text-gray-500 uppercase">{role.permissions.length} Permissions</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id); }} className="p-2 hover:bg-red-500/10 hover:text-red-500 text-gray-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </div>
                                                {isExpanded && (
                                                    <div className="p-4 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2">
                                                        <div className="mb-4">
                                                            <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Nama Jabatan</label>
                                                            <input type="text" value={role.name} onChange={(e) => { const newName = e.target.value; setOutletRoles(prev => prev.map(r => r.id === role.id ? {...r, name: newName} : r)); }} className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-purple-500 outline-none" />
                                                        </div>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            {AVAILABLE_PERMISSIONS.map((perm, i) => {
                                                                const isChecked = role.permissions.includes(perm);
                                                                return (
                                                                    <div key={i} onClick={() => togglePermission(role.id, perm)} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? 'bg-orange-500/10 border-orange-500/30' : 'bg-slate-900 border-white/5 opacity-60 hover:opacity-100'}`}>
                                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-sibos-orange border-sibos-orange' : 'border-gray-600'}`}>{isChecked && <Check size={10} className="text-white" />}</div>
                                                                        <span className={`text-xs ${isChecked ? 'text-white font-medium' : 'text-gray-400'}`}>{perm}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                                    <input type="text" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} placeholder="Jabatan Baru..." className="flex-1 bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none"/>
                                    <button onClick={handleAddRole} className="px-4 bg-sibos-orange hover:bg-orange-500 text-white rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={16} /> Tambah</button>
                                </div>
                            </div>

                            {/* BRANCH MANAGEMENT */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[600px] mt-6">
                                <div className="flex items-center bg-slate-950 border-b border-white/5 px-2 overflow-x-auto no-scrollbar">
                                    <div className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex-shrink-0 border-r border-white/5 mr-2">Pilih Cabang:</div>
                                    {brandOutlets.map(outlet => (
                                        <button key={outlet.id} onClick={() => setActiveOutletTabId(outlet.id)} className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeOutletTabId === outlet.id ? 'border-sibos-orange text-white bg-white/5' : 'border-transparent text-gray-500'}`}>{outlet.location || outlet.name}</button>
                                    ))}
                                    <button onClick={() => setShowAddBranchModal(true)} className="ml-auto flex-shrink-0 flex items-center gap-2 px-5 py-2 my-2 mr-2 bg-sibos-orange hover:bg-orange-500 text-white rounded-lg text-xs font-bold shadow-lg"><Plus size={14} /> Tambah Cabang</button>
                                </div>

                                {activeOutletData ? (
                                    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                        <div ref={tabsContainerRef} className="w-full md:w-56 bg-slate-950 border-b md:border-b-0 md:border-r border-white/5 p-2 flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar">
                                            {[
                                                { id: 'info', label: 'Info Lokasi', icon: MapPin },
                                                { id: 'schedule', label: 'Jadwal', icon: Clock },
                                                { id: 'payments', label: 'Bayar', icon: Wallet },
                                                { id: 'features', label: 'Fitur', icon: LayoutGrid },
                                                { id: 'hardware', label: 'Alat', icon: Printer },
                                                { id: 'receipt', label: 'Struk', icon: Receipt },
                                            ].map(tab => (
                                                <button key={tab.id} id={`config-tab-${tab.id}`} onClick={() => setConfigTab(tab.id as any)} className={`flex-shrink-0 md:w-full flex flex-col md:flex-row items-center md:gap-3 gap-1 px-4 md:px-3 py-3 md:py-3 rounded-lg text-xs font-bold mb-0 md:mb-1 text-center md:text-left transition-all ${configTab === tab.id ? 'bg-sibos-orange text-white' : 'text-gray-400 hover:text-sibos-orange hover:bg-orange-500/10'}`}><tab.icon size={16} /> <span className="whitespace-nowrap">{tab.label}</span></button>
                                            ))}
                                        </div>

                                        <div className="flex-1 p-4 md:p-6 bg-slate-900 overflow-y-auto custom-scrollbar h-[500px] md:h-auto pb-24 md:pb-6">
                                            {configTab === 'info' && (
                                                <div className="space-y-6">
                                                    <h3 className="font-bold text-white border-b border-white/5 pb-2">Detail Lokasi</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="md:col-span-2">
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lokasi</label>
                                                            <input type="text" defaultValue={activeOutletData.location} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat</label>
                                                            <textarea defaultValue={activeOutletData.address} rows={3} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-sibos-orange outline-none resize-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kota</label>
                                                            <input type="text" defaultValue={activeOutletData.city || "Surakarta"} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telepon</label>
                                                            <input type="text" defaultValue={activeOutletData.phone} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleRemoveBranch(activeOutletData.id)} className="w-full md:w-auto mt-8 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow-lg flex items-center justify-center gap-2"><Trash2 size={16} /> Hapus Cabang Ini</button>
                                                </div>
                                            )}
                                            {configTab === 'schedule' && (
                                                <div className="space-y-6">
                                                    <div className="p-4 bg-slate-950 rounded-xl border border-white/10 flex flex-col md:flex-row items-end gap-3">
                                                        <div className="flex-1 w-full grid grid-cols-2 gap-3">
                                                            <div><label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Buka</label><input type="time" value={bulkOpenTime} onChange={e => setBulkOpenTime(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" /></div>
                                                            <div><label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Tutup</label><input type="time" value={bulkCloseTime} onChange={e => setBulkCloseTime(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" /></div>
                                                        </div>
                                                        <div className="flex gap-2 w-full md:w-auto">
                                                            <button onClick={() => applyBulkSchedule('all')} className="flex-1 md:flex-none px-3 py-2 bg-orange-600/20 text-sibos-orange hover:bg-sibos-orange hover:text-white rounded-lg text-xs font-bold border border-orange-500/30">Set Semua Hari</button>
                                                            <button onClick={() => applyBulkSchedule('weekdays')} className="flex-1 md:flex-none px-3 py-2 bg-slate-800 text-gray-300 hover:text-white rounded-lg text-xs font-bold border border-white/10">Set Senin-Jumat</button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {displaySchedule.map((sch, idx) => (
                                                            <div key={idx} className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl border border-white/5 bg-slate-950/50">
                                                                <div className="col-span-3 md:col-span-2 text-sm font-bold text-white">{sch.day}</div>
                                                                <div className="col-span-3 md:col-span-2"><button onClick={() => toggleDay(idx)} className={`relative w-12 h-6 rounded-full transition-colors ${sch.active ? 'bg-green-500' : 'bg-slate-700'}`}><div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${sch.active ? 'translate-x-6' : 'translate-x-0'}`}></div></button></div>
                                                                <div className="col-span-6 md:col-span-8 flex items-center gap-2">{sch.active ? <><input type="time" value={sch.open} onChange={(e) => updateScheduleTime(idx, 'open', e.target.value)} className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white w-full" /><span className="text-gray-500">-</span><input type="time" value={sch.close} onChange={(e) => updateScheduleTime(idx, 'close', e.target.value)} className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white w-full" /></> : <span className="text-xs text-gray-500 italic w-full text-center bg-slate-900/50 py-1.5 rounded">Tutup</span>}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {configTab === 'payments' && (
                                                <div className="space-y-6">
                                                    <div className="pb-4 border-b border-white/5"><h3 className="font-bold text-white">Metode Pembayaran</h3></div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {displayPayments.map(method => (
                                                            <div key={method.id} onClick={() => togglePayment(method.id)} className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${method.active ? 'bg-slate-800 border-green-500/30' : 'bg-slate-950 border-white/5 opacity-70'}`}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-lg ${method.active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}><Wallet size={18} /></div>
                                                                    <div><div className="text-sm font-bold text-white">{method.name}</div><div className="text-[10px] text-gray-500">{method.type}</div></div>
                                                                </div>
                                                                {method.active ? <ToggleRight size={28} className="text-green-500" /> : <ToggleLeft size={28} className="text-gray-600" />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {configTab === 'features' && (
                                                <div className="space-y-6">
                                                    <div className="pb-4 border-b border-white/5"><h3 className="font-bold text-white">Modul & Fitur</h3></div>
                                                    <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 mb-6">
                                                        <div className="flex items-center justify-between">
                                                            <div><div className="text-sm font-bold text-white">Izinkan Transaksi Hutang</div><div className="text-[10px] text-gray-500">Kasir dapat memproses bon.</div></div>
                                                            <button onClick={() => updateOutlet(activeOutletData.id, { allowDebt: !activeOutletData.allowDebt })} className={`p-1.5 rounded-full transition-colors ${activeOutletData.allowDebt ? 'text-green-500 bg-green-500/10' : 'text-gray-600 bg-white/5'}`}>{activeOutletData.allowDebt ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}</button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Modul Aplikasi</h4>
                                                        {[{ id: 'pos_retail', label: 'Kasir Retail' }, { id: 'pos_fnb', label: 'Kasir F&B' }, { id: 'booking', label: 'Booking' }, { id: 'production', label: 'Produksi' }].map((mod) => {
                                                            const isActive = activeOutletData.assignedModules?.includes(mod.id);
                                                            return <div key={mod.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isActive ? 'bg-slate-800 border-orange-500/50' : 'bg-slate-950 border-white/5'}`}><div><div className="font-bold text-sm text-white">{mod.label}</div></div><button onClick={() => updateOutletModules(activeOutletData.id, mod.id)} className={`p-1.5 rounded-full transition-colors ${isActive ? 'text-orange-500 bg-orange-500/10' : 'text-gray-600 bg-white/5'}`}>{isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}</button></div>;
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                            {configTab === 'hardware' && (
                                                <div className="space-y-6">
                                                    <div className="pb-4 border-b border-white/5"><h3 className="font-bold text-white">Perangkat Keras</h3></div>
                                                    <div className="space-y-3">{['Printer Kasir', 'Printer Dapur', 'Label Barcode'].map((dev, i) => <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5"><div className="flex items-center gap-3"><Printer size={18} className="text-gray-400" /><span className="text-sm font-bold text-white">{dev}</span></div><span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-1 rounded">Not Connected</span></div>)}</div>
                                                </div>
                                            )}
                                            {configTab === 'receipt' && (
                                                <div className="space-y-6">
                                                    <div className="pb-4 border-b border-white/5"><h3 className="font-bold text-white">Tampilan Struk</h3></div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Footer Struk</label><input type="text" defaultValue="Terima Kasih!" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white" /></div>
                                                        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pajak (%)</label><input type="number" defaultValue="10" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white" /></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </>
                        ) : (
                             <div className="flex-1 flex items-center justify-center text-gray-500 h-full p-8 text-center">
                                <p>Pilih atau buat unit bisnis baru.</p>
                            </div>
                        )}
                    </>
                )}

                {/* === TAB: USER PROFILE === */}
                {globalTab === 'profile' && (
                    <GlassCard className="bg-slate-900 border-white/10 p-8 animate-in fade-in">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0 flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-white text-4xl font-bold shadow-2xl relative overflow-hidden group cursor-pointer">
                                    {userProfile.name.charAt(0)}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ImageIcon size={24} className="text-white"/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-white text-lg">{userProfile.name}</h3>
                                    <p className="text-sm text-sibos-orange font-medium">{userProfile.role}</p>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="flex-1 w-full space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white border-b border-white/5 pb-2 mb-4">Informasi Pribadi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Nama Lengkap</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 text-gray-500" size={16} />
                                                <input type="text" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 text-gray-500" size={16} />
                                                <input type="email" value={userProfile.email} onChange={e => setUserProfile({...userProfile, email: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Nomor Telepon / WA</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 text-gray-500" size={16} />
                                                <input type="tel" value={userProfile.phone} onChange={e => setUserProfile({...userProfile, phone: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white border-b border-white/5 pb-2 mb-4">Keamanan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Password Baru</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 text-gray-500" size={16} />
                                                <input type="password" value={userProfile.newPassword} onChange={e => setUserProfile({...userProfile, newPassword: e.target.value})} placeholder="Biarkan kosong jika tidak diganti" className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                )}
                
                {/* Billing Tab Placeholder */}
                {globalTab === 'billing' && (
                    <GlassCard className="bg-slate-900/50 text-center py-12">
                        <CreditCard size={48} className="mx-auto text-green-500 mb-4" />
                        <h2 className="text-xl font-bold text-white">Billing & Lisensi</h2>
                    </GlassCard>
                )}
            </div>
         </div>
      </div>
    </BackofficeLayout>
  );
};
