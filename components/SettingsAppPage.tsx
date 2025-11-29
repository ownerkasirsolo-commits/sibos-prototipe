
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Settings, Store, Users, CreditCard, 
  Database, Shield, Printer, Save, CheckCircle,
  Upload, Image as ImageIcon, Monitor, Tv, ChefHat, Users as UsersIcon,
  Tablet, AlertTriangle, Receipt, Percent, Mail, MapPin, Phone, Globe, FileText,
  ExternalLink, File, X, LayoutGrid, ShoppingBag, Coffee, Calendar, Factory, Wrench, Plus,
  Building2, Trash2, Edit3, ToggleLeft, ToggleRight, Lock, ChevronRight, Map,
  Briefcase, ChevronDown, ChevronUp, Key, CheckSquare, Crown, BadgeCheck,
  Clock, Wallet
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

export const SettingsAppPage: React.FC<SettingsAppPageProps> = ({ 
    onNavigate, 
    activeHardware = [], 
    onToggleHardware = (_: HardwareModule) => {}, 
    activeModules = [],
    onToggleModule = (_: AppModule) => {},
    currentCategory = 'retail'
}) => {
  const { outlets, selectedOutlet, setSelectedOutletId, updateOutletModules, addOutlet, deleteOutlet, deleteBrand, updateOutlet } = useSibos();
  
  // GLOBAL TABS (Main Navigation Sidebar)
  const [globalTab, setGlobalTab] = useState<'operational' | 'billing' | 'security'>('operational');

  // --- LOCAL STATES FOR BRAND & OUTLET LOGIC ---
  
  // 1. Extract Unique Brands (Memoized)
  const brands = useMemo(() => {
      const unique = Array.from(new Set(outlets.map(o => o.brand)));
      return unique;
  }, [outlets]);

  // 2. Selected Brand State
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  // SAFETY SYNC: Update selectedBrand if outlets change (e.g., deletion)
  useEffect(() => {
      if (brands.length > 0) {
          // If currently selected brand no longer exists (deleted), or none selected yet
          if (!selectedBrand || !brands.includes(selectedBrand)) {
              setSelectedBrand(brands[0]);
          }
      } else {
          setSelectedBrand('');
      }
  }, [brands, selectedBrand, outlets]); 

  // 3. Filter Outlets based on Selected Brand
  const brandOutlets = useMemo(() => {
      if (!selectedBrand) return [];
      return outlets.filter(o => o.brand === selectedBrand);
  }, [outlets, selectedBrand]);

  // 4. Active Outlet Tab State
  const [activeOutletTabId, setActiveOutletTabId] = useState<number>(0);

  // SAFETY SYNC: Update active outlet tab if filtered outlets change
  useEffect(() => {
      if (brandOutlets.length > 0) {
          // Check if currently selected tab ID still exists in the filtered list
          const currentExists = brandOutlets.find(o => o.id === activeOutletTabId);
          
          if (!currentExists) {
              // If not, switch to the first available one in this brand
              setActiveOutletTabId(brandOutlets[0].id);
          }
      } else {
          setActiveOutletTabId(0);
      }
  }, [brandOutlets, activeOutletTabId, outlets]); 

  // Get Data safely
  const activeOutletData = outlets.find(o => o.id === activeOutletTabId);

  // Inner Outlet Config Section Tab
  const [configTab, setConfigTab] = useState<'profile' | 'schedule' | 'payments' | 'features' | 'hardware' | 'receipt' | 'users'>('profile');
  
  // --- ADD MODALS STATE ---
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCategory, setNewBrandCategory] = useState<BusinessCategory>('retail');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');

  // --- HANDLERS ---

  const handleCreateBrand = () => {
      if (!newBrandName) return;
      
      let defaultModules: string[] = [];
      if (newBrandCategory === 'fnb') defaultModules = ['pos_fnb', 'production'];
      else if (newBrandCategory === 'retail') defaultModules = ['pos_retail'];
      else if (newBrandCategory === 'service') defaultModules = ['pos_retail', 'booking'];
      else if (newBrandCategory === 'hospitality') defaultModules = ['pos_retail', 'booking'];
      else if (newBrandCategory === 'manufacturing') defaultModules = ['pos_retail', 'production'];
      else defaultModules = ['pos_retail'];

      // Activate Global License if not present
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
          assignedModules: defaultModules
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
          assignedModules: parent.assignedModules
      };

      addOutlet(newOutlet);
      setShowAddBranchModal(false);
      setNewBranchLocation('');
      setNewBranchAddress('');
  };

  const handleRemoveBranch = (id: number) => {
      if (window.confirm('Yakin ingin menghapus cabang ini? Data transaksi terkait mungkin akan terpengaruh.')) {
          deleteOutlet(id);
      }
  };

  const handleRemoveBrand = () => {
      if (window.confirm(`PERINGATAN: Anda akan menghapus brand "${selectedBrand}" beserta SELURUH cabang di dalamnya.\n\nTindakan ini tidak dapat dibatalkan. Lanjutkan?`)) {
          deleteBrand(selectedBrand);
      }
  };

  // --- PERSISTED DATA HANDLERS ---

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

  const togglePayment = (id: string) => {
      if (!activeOutletData?.paymentMethods) return;
      const newPayments = activeOutletData.paymentMethods.map(p => 
          p.id === id ? { ...p, active: !p.active } : p
      );
      updateOutlet(activeOutletData.id, { paymentMethods: newPayments });
  };

  // --- DYNAMIC ROLE CONFIGURATION STATE ---
  const [outletRoles, setOutletRoles] = useState([
      { id: 'mgr', name: 'Store Manager', level: 'high' },
      { id: 'spv', name: 'Supervisor', level: 'high' },
      { id: 'csh', name: 'Cashier', level: 'mid' },
      { id: 'wtr', name: 'Waiter', level: 'low' },
      { id: 'ktc', name: 'Kitchen', level: 'low' }
  ]);
  const [selectedRoleConfigId, setSelectedRoleConfigId] = useState('csh');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleLevel, setNewRoleLevel] = useState('low');

  const handleAddRole = () => {
      if (!newRoleName) return;
      const newId = newRoleName.toLowerCase().replace(/\s/g, '_') + Math.floor(Math.random() * 1000);
      setOutletRoles([...outletRoles, { id: newId, name: newRoleName, level: newRoleLevel }]);
      setNewRoleName('');
      setSelectedRoleConfigId(newId);
  };

  const handleDeleteRole = (id: string) => {
      setOutletRoles(outletRoles.filter(r => r.id !== id));
      if (selectedRoleConfigId === id) setSelectedRoleConfigId(outletRoles[0].id);
  };

  const activeRole = outletRoles.find(r => r.id === selectedRoleConfigId) || outletRoles[0];

  const availableGlobalModules: AppModule[] = ['pos_retail', 'pos_fnb', 'booking', 'production', 'crm', 'accounting'];

  // Default fallbacks for display
  const displaySchedule = activeOutletData?.schedule || [];
  const displayPayments = activeOutletData?.paymentMethods || [];

  return (
    <BackofficeLayout
        title="Pengaturan Pusat"
        icon={<Settings className="text-gray-400" size={20} />}
        onNavigate={onNavigate}
        hideSidebar={true}
        actions={
            <button className="flex items-center gap-2 px-6 py-2 bg-sibos-orange hover:bg-orange-600 rounded-lg text-sm font-bold shadow-lg shadow-orange-900/40">
               <Save size={16} /> Simpan Perubahan
            </button>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
         
         {/* --- MODAL: ADD BRAND --- */}
         {showAddBrandModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                 <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                     <h3 className="text-xl font-bold text-white mb-4">Buat Unit Bisnis Baru</h3>
                     <div className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Brand / Usaha</label>
                             <input 
                                type="text" 
                                value={newBrandName}
                                onChange={e => setNewBrandName(e.target.value)}
                                placeholder="Contoh: Senja Clothing" 
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none"
                             />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori Bisnis</label>
                             <select 
                                value={newBrandCategory}
                                onChange={e => setNewBrandCategory(e.target.value as BusinessCategory)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none"
                             >
                                 <option value="retail">Ritel (Toko)</option>
                                 <option value="fnb">F&B (Resto/Kafe)</option>
                                 <option value="service">Jasa</option>
                                 <option value="hospitality">Hospitality</option>
                                 <option value="manufacturing">Manufaktur</option>
                             </select>
                         </div>
                         <div className="pt-4 flex gap-3">
                             <button onClick={() => setShowAddBrandModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700">Batal</button>
                             <button onClick={handleCreateBrand} className="flex-1 py-3 bg-sibos-orange rounded-xl text-white font-bold hover:bg-orange-600">Simpan</button>
                         </div>
                     </div>
                 </div>
             </div>
         )}

         {/* --- MODAL: ADD BRANCH --- */}
         {showAddBranchModal && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                 <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                     <h3 className="text-xl font-bold text-white mb-4">Tambah Cabang Baru</h3>
                     <div className="text-xs text-gray-400 mb-4">
                         Menambahkan cabang untuk brand: <strong className="text-white">{selectedBrand}</strong>
                     </div>
                     <div className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lokasi</label>
                             <input 
                                type="text" 
                                value={newBranchLocation}
                                onChange={e => setNewBranchLocation(e.target.value)}
                                placeholder="Contoh: Cabang Jakarta Selatan" 
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none"
                             />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat</label>
                             <textarea 
                                value={newBranchAddress}
                                onChange={e => setNewBranchAddress(e.target.value)}
                                rows={3}
                                placeholder="Alamat lengkap..." 
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-sibos-orange outline-none resize-none"
                             />
                         </div>
                         <div className="pt-4 flex gap-3">
                             <button onClick={() => setShowAddBranchModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700">Batal</button>
                             <button onClick={handleCreateBranch} className="flex-1 py-3 bg-sibos-orange rounded-xl text-white font-bold hover:bg-orange-600">Simpan</button>
                         </div>
                     </div>
                 </div>
             </div>
         )}

         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* === SIDEBAR: DAFTAR UNIT BISNIS (BRAND) === */}
            <div className="w-full lg:w-64 space-y-6 flex-shrink-0">
                
                {/* Operational (Brands) */}
                <div>
                    <div className="px-4 mb-3 flex items-center justify-between">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unit Bisnis (Brand)</h3>
                        <button 
                            onClick={() => setShowAddBrandModal(true)}
                            className="p-1 hover:bg-white/10 rounded text-blue-400 transition-colors" 
                            title="Buat Brand Baru"
                        >
                            <Plus size={16}/>
                        </button>
                    </div>
                    
                    <div className="space-y-1">
                        {brands.map((brand) => (
                            <button 
                                key={brand}
                                onClick={() => {
                                    setSelectedBrand(brand);
                                    setGlobalTab('operational');
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                                    selectedBrand === brand && globalTab === 'operational'
                                    ? 'bg-white/10 text-white border border-white/5 shadow-lg' 
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                            >
                                <Briefcase size={18} className={selectedBrand === brand && globalTab === 'operational' ? 'text-sibos-orange' : 'text-gray-500'} />
                                <span className="truncate">{brand}</span>
                                {selectedBrand === brand && globalTab === 'operational' && <ChevronRight size={14} className="ml-auto text-gray-500"/>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Global Settings */}
                <div className="border-t border-white/5 pt-6">
                    <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Pusat</h3>
                    <div className="space-y-1">
                        <button 
                            onClick={() => setGlobalTab('billing')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                                globalTab === 'billing' ? 'bg-green-600 text-white shadow-lg shadow-green-900/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <CreditCard size={18} /> Billing & Lisensi
                        </button>
                        <button 
                            onClick={() => setGlobalTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                                globalTab === 'security' ? 'bg-slate-700 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Shield size={18} /> Keamanan
                        </button>
                    </div>
                </div>
            </div>

            {/* === MAIN CONTENT AREA === */}
            <div className="flex-1 min-w-0 space-y-6">
                
                {/* 1. OPERATIONAL VIEW (BRAND & BRANCHES) */}
                {globalTab === 'operational' && (
                    <>
                        {selectedBrand && brandOutlets.length > 0 ? (
                            <>
                            {/* A. GLOBAL BRAND IDENTITY (Top Panel) */}
                            <GlassCard className="bg-slate-900 border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Store size={150} />
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    {/* Brand Logo */}
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 bg-slate-800 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:border-sibos-orange hover:text-sibos-orange transition-colors cursor-pointer group relative overflow-hidden shadow-xl">
                                            <ImageIcon size={28} className="mb-1" />
                                            <span className="text-[10px] font-bold text-center px-2">Logo Brand</span>
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload size={20} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-gray-500 text-center mt-2">Identitas Global</div>
                                    </div>

                                    {/* Brand Info Form */}
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-xl font-bold text-white">Identitas Unit Bisnis</h2>
                                                <p className="text-xs text-gray-400">Pengaturan ini berlaku untuk branding utama usaha.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">
                                                    {brandOutlets.length} Cabang
                                                </div>
                                                <button onClick={handleRemoveBrand} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors">
                                                    Hapus Brand
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Nama Brand / Usaha</label>
                                                <input type="text" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none font-bold" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Kategori Utama</label>
                                                <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none appearance-none">
                                                    <option value="fnb">F&B (Restoran/Kafe)</option>
                                                    <option value="retail">Retail (Toko/Minimarket)</option>
                                                    <option value="service">Jasa & Layanan</option>
                                                    <option value="hospitality">Hospitality</option>
                                                    <option value="manufacturing">Manufaktur</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><FileText size={12}/> NPWP Brand (Tax ID)</label>
                                                <input type="text" placeholder="00.000.000.0-000.000" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Slogan / Tagline</label>
                                                <input type="text" placeholder="Contoh: Nikmatnya Kopi Asli" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-sibos-orange outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* B. BRANCH MANAGEMENT (Bottom Panel) */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[600px]">
                                
                                {/* Branch Selector Tabs (Horizontal) */}
                                <div className="flex items-center bg-slate-950 border-b border-white/5 px-2 overflow-x-auto no-scrollbar">
                                    <div className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-2 border-r border-white/5 mr-2">
                                        <Building2 size={14} /> Pilih Cabang:
                                    </div>
                                    {brandOutlets.map(outlet => (
                                        <button
                                            key={outlet.id}
                                            onClick={() => setActiveOutletTabId(outlet.id)}
                                            className={`
                                                flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap relative group
                                                ${activeOutletTabId === outlet.id ? 'border-blue-500 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}
                                            `}
                                        >
                                            {outlet.type === 'Pusat' && <Store size={12} className="text-yellow-500"/>}
                                            {outlet.location || outlet.name}
                                            {/* Set Active Context Button */}
                                            {selectedOutlet.id !== outlet.id && activeOutletTabId === outlet.id && (
                                                <span 
                                                    onClick={(e) => { e.stopPropagation(); setSelectedOutletId(outlet.id); }}
                                                    title="Set sebagai Outlet Aktif di Backoffice"
                                                    className="ml-2 p-1 bg-slate-800 rounded-full text-gray-500 hover:text-green-400 hover:bg-slate-700"
                                                >
                                                    <CheckCircle size={12} />
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                    <button 
                                        onClick={() => setShowAddBranchModal(true)}
                                        className="flex items-center gap-1 px-5 py-4 text-sm font-bold text-blue-500 hover:text-white transition-colors whitespace-nowrap ml-auto"
                                    >
                                        <Plus size={14} /> Tambah
                                    </button>
                                </div>

                                {/* Branch Detail Config */}
                                {activeOutletData ? (
                                    <div className="flex flex-col md:flex-row flex-1">
                                        
                                        {/* Vertical Menu for Branch Config */}
                                        <div className="w-full md:w-56 bg-slate-950 border-r border-white/5 p-2">
                                            <div className="px-3 py-2 mb-2">
                                                <div className="text-[10px] text-gray-500 font-bold uppercase">Konfigurasi Outlet</div>
                                                <div className="text-sm font-bold text-white truncate">{activeOutletData.location || activeOutletData.name}</div>
                                            </div>
                                            {[
                                                { id: 'profile', label: 'Alamat & Kontak', icon: MapPin },
                                                { id: 'schedule', label: 'Jam Operasional', icon: Clock },
                                                { id: 'payments', label: 'Metode Bayar', icon: Wallet },
                                                { id: 'features', label: 'Fitur & Modul', icon: LayoutGrid },
                                                { id: 'users', label: 'Role & Akses', icon: Users },
                                                { id: 'hardware', label: 'Hardware', icon: Printer },
                                                { id: 'receipt', label: 'Struk & Pajak', icon: Receipt },
                                            ].map(tab => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setConfigTab(tab.id as any)}
                                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold mb-1 text-left transition-all ${
                                                        configTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                                >
                                                    <tab.icon size={16} /> {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Config Content */}
                                        <div className="flex-1 p-6 bg-slate-900 overflow-y-auto">
                                            
                                            {/* 1. ADDRESS & CONTACT */}
                                            {configTab === 'profile' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                        <div>
                                                            <h3 className="font-bold text-white">Detail Lokasi</h3>
                                                            <p className="text-xs text-gray-500">Informasi ini akan dicetak pada struk transaksi.</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleRemoveBranch(activeOutletData.id)}
                                                            className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 px-3 py-1.5 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
                                                        >
                                                            <Trash2 size={14} /> Hapus Cabang
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lokasi (Internal)</label>
                                                            <input type="text" defaultValue={activeOutletData.location} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none" placeholder="Misal: Cabang Mall Paragon"/>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat Lengkap</label>
                                                            <textarea defaultValue={activeOutletData.address} rows={3} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none resize-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kota / Area</label>
                                                            <input type="text" defaultValue="Surakarta" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telepon Outlet</label>
                                                            <input type="text" defaultValue={activeOutletData.phone} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipe Outlet</label>
                                                            <select defaultValue={activeOutletData.type} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none">
                                                                <option>Pusat</option>
                                                                <option>Cabang</option>
                                                                <option>Gudang</option>
                                                                <option>Pop-up Store</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* NEW: STORE HOURS (PERSISTED) */}
                                            {configTab === 'schedule' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="pb-4 border-b border-white/5">
                                                        <h3 className="font-bold text-white">Jam Operasional</h3>
                                                        <p className="text-xs text-gray-500">
                                                            Tentukan kapan outlet ini buka. Pesanan online akan otomatis ditolak di luar jam ini.
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <div className="grid grid-cols-4 gap-4 text-xs font-bold text-gray-500 uppercase px-4 pb-2 border-b border-white/5">
                                                            <div>Hari</div>
                                                            <div>Status</div>
                                                            <div>Buka</div>
                                                            <div>Tutup</div>
                                                        </div>
                                                        {displaySchedule.map((sch, idx) => (
                                                            <div key={idx} className={`grid grid-cols-4 gap-4 items-center p-3 rounded-lg border ${sch.active ? 'bg-slate-950 border-white/5' : 'bg-slate-950/50 border-transparent opacity-50'}`}>
                                                                <div className="text-sm font-bold text-white">{sch.day}</div>
                                                                <div>
                                                                    <button 
                                                                        onClick={() => toggleDay(idx)}
                                                                        className={`px-3 py-1 rounded text-xs font-bold ${sch.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                                                                    >
                                                                        {sch.active ? 'BUKA' : 'TUTUP'}
                                                                    </button>
                                                                </div>
                                                                <input 
                                                                    type="time" 
                                                                    value={sch.open}
                                                                    onChange={(e) => updateScheduleTime(idx, 'open', e.target.value)}
                                                                    disabled={!sch.active}
                                                                    className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-50" 
                                                                />
                                                                <input 
                                                                    type="time" 
                                                                    value={sch.close}
                                                                    onChange={(e) => updateScheduleTime(idx, 'close', e.target.value)}
                                                                    disabled={!sch.active}
                                                                    className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white disabled:opacity-50" 
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* NEW: PAYMENTS (PERSISTED) */}
                                            {configTab === 'payments' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="pb-4 border-b border-white/5">
                                                        <h3 className="font-bold text-white">Metode Pembayaran</h3>
                                                        <p className="text-xs text-gray-500">
                                                            Aktifkan opsi pembayaran yang tersedia di outlet <strong>{activeOutletData.location}</strong>.
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {displayPayments.map(method => (
                                                            <div 
                                                                key={method.id}
                                                                onClick={() => togglePayment(method.id)}
                                                                className={`
                                                                    p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all
                                                                    ${method.active ? 'bg-slate-800 border-green-500/30' : 'bg-slate-950 border-white/5 opacity-70'}
                                                                `}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-lg ${method.active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                                                                        <Wallet size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-white">{method.name}</div>
                                                                        <div className="text-[10px] text-gray-500">{method.type}</div>
                                                                    </div>
                                                                </div>
                                                                {method.active ? <ToggleRight size={28} className="text-green-500" /> : <ToggleLeft size={28} className="text-gray-600" />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 2. FEATURES / MODULES */}
                                            {configTab === 'features' && (
                                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex gap-3 mb-6">
                                                        <LayoutGrid className="text-indigo-400 flex-shrink-0" size={20} />
                                                        <div>
                                                            <h4 className="font-bold text-indigo-400 text-sm">Konfigurasi Modul Operasional</h4>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Pilih modul yang aktif untuk <strong>{activeOutletData.location}</strong>. 
                                                                Hanya modul yang sudah dibeli (Global) yang bisa diaktifkan.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {[
                                                        { id: 'pos_retail', label: 'Kasir Retail', desc: 'Scan barcode, rak, harga grosir.', icon: ShoppingBag },
                                                        { id: 'pos_fnb', label: 'Kasir F&B', desc: 'Meja, resep, varian rasa.', icon: Coffee },
                                                        { id: 'booking', label: 'Sistem Booking', desc: 'Reservasi tempat/jasa.', icon: Calendar },
                                                        { id: 'production', label: 'Produksi', desc: 'Manufaktur & dapur pusat.', icon: Factory },
                                                    ].map((mod) => {
                                                        const isAssigned = activeOutletData.assignedModules?.includes(mod.id);
                                                        const isAvailable = availableGlobalModules.includes(mod.id as AppModule);

                                                        return (
                                                            <div key={mod.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isAssigned ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-950 border-white/5'}`}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-lg ${isAssigned ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500'}`}>
                                                                        <mod.icon size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <div className={`font-bold text-sm ${isAssigned ? 'text-white' : 'text-gray-400'}`}>{mod.label}</div>
                                                                        <div className="text-[10px] text-gray-500">{mod.desc}</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                {isAvailable ? (
                                                                    <button 
                                                                        onClick={() => updateOutletModules(activeOutletData.id, mod.id)}
                                                                        className={`p-1.5 rounded-full transition-colors ${isAssigned ? 'text-blue-500 hover:bg-blue-500/10' : 'text-gray-600 hover:text-white hover:bg-white/10'}`}
                                                                    >
                                                                        {isAssigned ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-[10px] text-amber-500 border border-amber-500/20 bg-amber-500/10 px-2 py-1 rounded">No License</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* 3. USERS & ROLES (NEW DYNAMIC CONFIG) */}
                                            {configTab === 'users' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    
                                                    <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl flex gap-3 mb-4">
                                                        <Key className="text-purple-400 flex-shrink-0" size={20} />
                                                        <div>
                                                            <h4 className="font-bold text-purple-400 text-sm">Struktur Organisasi & Akses</h4>
                                                            <p className="text-xs text-gray-400 mt-1 mb-2">
                                                                Sesuaikan nama jabatan/role di outlet ini dan tentukan kewenangannya.
                                                                Untuk menambah karyawan (orangnya), gunakan modul HRM.
                                                            </p>
                                                            <button onClick={() => onNavigate('hrm-app')} className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg">
                                                                <UsersIcon size={12} /> Kelola Karyawan di HRM
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col md:flex-row gap-6">
                                                        {/* Role List (Editable) */}
                                                        <div className="w-full md:w-52 space-y-3 flex-shrink-0">
                                                            <div className="space-y-1">
                                                                {outletRoles.map(role => (
                                                                    <div key={role.id} className="flex items-center gap-2 group">
                                                                        <button
                                                                            onClick={() => setSelectedRoleConfigId(role.id)}
                                                                            className={`flex-1 text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-2 ${
                                                                                selectedRoleConfigId === role.id 
                                                                                ? 'bg-white/10 text-white border-white/10 shadow' 
                                                                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-transparent'
                                                                            }`}
                                                                        >
                                                                            {role.level === 'high' && <Crown size={12} className="text-yellow-500" />}
                                                                            {role.level === 'mid' && <BadgeCheck size={12} className="text-blue-500" />}
                                                                            {role.name}
                                                                        </button>
                                                                        {/* Delete Button (Hidden for Manager to prevent lockout simulation) */}
                                                                        {role.id !== 'mgr' && (
                                                                            <button 
                                                                                onClick={() => handleDeleteRole(role.id)}
                                                                                className="p-1.5 rounded hover:bg-red-500/20 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                                            >
                                                                                <Trash2 size={12} />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Add New Role */}
                                                            <div className="pt-3 border-t border-white/5">
                                                                <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Tambah Jabatan Baru</div>
                                                                <input 
                                                                    type="text" 
                                                                    placeholder="Nama Role (ex: Head Bar)" 
                                                                    value={newRoleName}
                                                                    onChange={(e) => setNewRoleName(e.target.value)}
                                                                    className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:border-purple-500 outline-none mb-2"
                                                                />
                                                                <div className="flex gap-1 mb-2">
                                                                    <button 
                                                                        onClick={() => setNewRoleLevel('high')}
                                                                        className={`flex-1 py-1 text-[10px] font-bold rounded border ${newRoleLevel === 'high' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : 'bg-slate-800 text-gray-500 border-transparent'}`}
                                                                    >
                                                                        Mgr
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => setNewRoleLevel('mid')}
                                                                        className={`flex-1 py-1 text-[10px] font-bold rounded border ${newRoleLevel === 'mid' ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' : 'bg-slate-800 text-gray-500 border-transparent'}`}
                                                                    >
                                                                        Spv
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => setNewRoleLevel('low')}
                                                                        className={`flex-1 py-1 text-[10px] font-bold rounded border ${newRoleLevel === 'low' ? 'bg-gray-500/20 text-gray-300 border-gray-500/50' : 'bg-slate-800 text-gray-500 border-transparent'}`}
                                                                    >
                                                                        Staf
                                                                    </button>
                                                                </div>
                                                                <button 
                                                                    onClick={handleAddRole}
                                                                    disabled={!newRoleName}
                                                                    className="w-full py-1.5 bg-white/10 hover:bg-purple-600 text-gray-300 hover:text-white rounded text-xs font-bold transition-colors disabled:opacity-50"
                                                                >
                                                                    + Simpan Role
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Permission Matrix (Visual Placeholder for now) */}
                                                        <div className="flex-1 bg-slate-950 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                                                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2 relative z-10">
                                                                <h4 className="font-bold text-white text-sm">Izin Akses: <span className="text-purple-400">{activeRole?.name}</span></h4>
                                                                <div className="text-[10px] text-gray-500">Level: {activeRole?.level.toUpperCase()}</div>
                                                            </div>
                                                            
                                                            <div className="space-y-4 relative z-10">
                                                                {/* POS Permissions */}
                                                                <div>
                                                                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Point of Sales</h5>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        {['Void Transaksi', 'Berikan Diskon Manual', 'Refund / Retur', 'Buka Laci (No Sale)', 'Reprint Struk'].map((perm, idx) => (
                                                                            <div key={idx} className="flex items-center gap-2 cursor-not-allowed opacity-80">
                                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${activeRole.level === 'high' || (activeRole.level === 'mid' && idx > 1) ? 'bg-green-500 border-green-500' : 'border-gray-600 bg-transparent'}`}>
                                                                                    {(activeRole.level === 'high' || (activeRole.level === 'mid' && idx > 1)) && <CheckCircle size={10} className="text-black" />}
                                                                                </div>
                                                                                <span className="text-xs text-gray-300">{perm}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Backoffice Permissions */}
                                                                <div>
                                                                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Backoffice Access</h5>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        {['Lihat Laporan Omzet', 'Edit Stok Barang', 'Lihat Data Pelanggan', 'Ubah Harga Produk'].map((perm, idx) => (
                                                                            <div key={idx} className="flex items-center gap-2 cursor-not-allowed opacity-80">
                                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${activeRole.level === 'high' ? 'bg-green-500 border-green-500' : 'border-gray-600 bg-transparent'}`}>
                                                                                    {activeRole.level === 'high' && <CheckCircle size={10} className="text-black" />}
                                                                                </div>
                                                                                <span className="text-xs text-gray-300">{perm}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Info Overlay */}
                                                            <div className="absolute bottom-4 right-4 p-2 bg-slate-800/80 backdrop-blur rounded border border-white/10 max-w-xs">
                                                                <p className="text-[10px] text-gray-400 text-right">
                                                                    *Detail checkbox izin akses akan tersedia setelah modul sistem inti selesai diupdate.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* 4. HARDWARE */}
                                            {configTab === 'hardware' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                                                        <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2"><Printer size={16}/> Printer Konfigurasi</h4>
                                                        <div className="space-y-3">
                                                            {['Printer Struk (Kasir)', 'Printer Dapur', 'Printer Label'].map((p, i) => (
                                                                <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded border border-white/5">
                                                                    <span className="text-sm text-gray-300">{p}</span>
                                                                    <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Not Connected</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                                                        <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2"><Monitor size={16}/> Layar Display</h4>
                                                        <div className="space-y-3">
                                                            {[
                                                                { label: 'Customer Display', hw: 'customer_display' },
                                                                { label: 'Kitchen Display (KDS)', hw: 'kds_tablet' },
                                                                { label: 'Queue Display', hw: 'queue_display' }
                                                            ].map((dev, idx) => (
                                                                <div key={idx} className="flex items-center justify-between p-2 bg-slate-900 rounded border border-white/5">
                                                                    <span className="text-sm text-gray-300">{dev.label}</span>
                                                                    <button 
                                                                        onClick={() => onToggleHardware && onToggleHardware(dev.hw as HardwareModule)}
                                                                        className={`w-8 h-4 rounded-full relative transition-colors ${activeHardware.includes(dev.hw as HardwareModule) ? 'bg-green-500' : 'bg-slate-700'}`}
                                                                    >
                                                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeHardware.includes(dev.hw as HardwareModule) ? 'left-4.5' : 'left-0.5'}`}></div>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* 5. RECEIPT */}
                                            {configTab === 'receipt' && (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="space-y-4">
                                                        <h4 className="font-bold text-white text-sm border-b border-white/5 pb-2">Pajak & Biaya</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs text-gray-500 font-bold block mb-1">Pajak Resto / PPN (%)</label>
                                                                <input type="number" defaultValue="10" className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm text-white" />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs text-gray-500 font-bold block mb-1">Service Charge (%)</label>
                                                                <input type="number" defaultValue="5" className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h4 className="font-bold text-white text-sm border-b border-white/5 pb-2">Tampilan Struk</h4>
                                                        <div>
                                                            <label className="text-xs text-gray-500 font-bold block mb-1">Header Text</label>
                                                            <input type="text" defaultValue={`Selamat Datang di ${activeOutletData.name}`} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm text-white" />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-gray-500 font-bold block mb-1">Footer Text</label>
                                                            <textarea rows={3} defaultValue="Terima kasih atas kunjungan Anda." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-sm text-white resize-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-gray-500 h-full">
                                        {selectedBrand && outlets.length > 0 ? (
                                             <div className="text-center">
                                                 <Store size={48} className="mx-auto mb-4 opacity-20" />
                                                 <p>Tidak ada cabang di brand ini.</p>
                                                 <button 
                                                    onClick={() => setShowAddBranchModal(true)}
                                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-sm"
                                                 >
                                                     + Tambah Cabang
                                                 </button>
                                             </div>
                                        ) : (
                                             <div className="text-center">
                                                 <Store size={48} className="mx-auto mb-4 opacity-20" />
                                                 <p>Pilih atau buat unit bisnis baru.</p>
                                             </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                        ) : (
                             <div className="flex-1 flex items-center justify-center text-gray-500 h-full">
                                <div className="text-center">
                                    <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                                    <h3 className="text-xl font-bold text-white mb-2">Belum Ada Unit Bisnis</h3>
                                    <p className="max-w-md mx-auto mb-6">Mulai dengan membuat Brand pertama Anda untuk mengelola outlet dan konfigurasi sistem.</p>
                                    <button 
                                        onClick={() => setShowAddBrandModal(true)}
                                        className="px-6 py-3 bg-sibos-orange hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg"
                                    >
                                        + Buat Unit Bisnis Baru
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* 2. BILLING (GLOBAL) */}
                {globalTab === 'billing' && (
                    <GlassCard className="bg-slate-900/50">
                        <div className="text-center py-12">
                            <CreditCard size={48} className="mx-auto text-green-500 mb-4" />
                            <h2 className="text-xl font-bold text-white">Billing & Lisensi</h2>
                            <p className="text-gray-400">Kelola paket langganan Enterprise Anda di sini.</p>
                        </div>
                    </GlassCard>
                )}

                {/* 4. SECURITY (GLOBAL) */}
                {globalTab === 'security' && (
                    <GlassCard className="bg-slate-900/50">
                        <h2 className="text-xl font-bold text-white mb-6">Keamanan & Data</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5">
                                <div>
                                    <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
                                    <div className="text-xs text-gray-400">Wajibkan OTP saat login.</div>
                                </div>
                                <ToggleLeft size={32} className="text-gray-600 cursor-pointer" />
                            </div>
                        </div>
                    </GlassCard>
                )}

            </div>
         </div>
      </div>
    </BackofficeLayout>
  );
};
