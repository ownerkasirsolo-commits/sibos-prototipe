
import React, { useState } from 'react';
import { 
  User, Shield, Briefcase, Users, Lock, LogIn, Monitor, Smartphone, X,
  Crown, BarChart3, Calculator, Truck, Coffee, UserCog,
  Wrench, Bike, ClipboardCheck, Factory, Megaphone, Landmark,
  Utensils, ShoppingBag, Scissors, Building2, Sprout, GraduationCap,
  Stethoscope, Ticket, Shirt, ArrowLeft, CheckCircle2, Mail, Eye, EyeOff, Check, Zap
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { UserRole, Page, BusinessCategory } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface LoginPageProps {
  onLogin: (role: UserRole, category: BusinessCategory, targetPage?: Page) => void;
}

// Configuration for Business Categories
const businessCategories = [
    { id: 'fnb', label: 'F&B (Kuliner)', icon: Utensils, desc: 'Restoran, Kafe, Warung', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'retail', label: 'Ritel & Grosir', icon: ShoppingBag, desc: 'Minimarket, Toko Kelontong', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'service', label: 'Jasa & Servis', icon: Wrench, desc: 'Bengkel, Salon, Laundry', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'fashion', label: 'Fashion', icon: Shirt, desc: 'Butik, Distro, Apparel', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { id: 'manufacturing', label: 'Manufaktur', icon: Factory, desc: 'Pabrik, Produksi, Bakery', color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { id: 'agri', label: 'Agribisnis', icon: Sprout, desc: 'Pertanian, Peternakan', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'health', label: 'Kesehatan', icon: Stethoscope, desc: 'Apotek, Klinik', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { id: 'education', label: 'Pendidikan', icon: GraduationCap, desc: 'Sekolah, Kursus', color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { id: 'hospitality', label: 'Hospitaliti', icon: Building2, desc: 'Hotel, Kost, Sewa', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { id: 'entertainment', label: 'Hiburan', icon: Ticket, desc: 'Wahana, Event', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'corporate', label: 'Korporat', icon: Briefcase, desc: 'Kantor Umum', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { seedDatabase } = useSibos();
  // Steps: 0 = Auth (Login/Register), 1 = Category, 2 = Role, 3 = Mode
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [restrictedRole, setRestrictedRole] = useState<UserRole | null>(null); // New state for Quick Login
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // HELPER: Determine which roles to show based on Category
  const isRoleVisible = (role: UserRole): boolean => {
    if (!selectedCategory) return false;

    // Universal Roles (Show for everyone)
    const universalRoles = ['owner', 'director', 'general_manager', 'finance_manager', 'hr_manager', 'admin', 'area_manager', 'auditor', 'supervisor', 'staff', 'cashier', 'sales', 'courier', 'store_manager'];
    
    if (universalRoles.includes(role || '')) {
        return true;
    }

    // Industry Specific Roles
    switch (selectedCategory) {
        case 'fnb':
            return ['kitchen_staff', 'waiter'].includes(role || '');
        case 'retail':
        case 'fashion':
        case 'health':
            return ['warehouse_staff'].includes(role || ''); 
        case 'service':
            return ['technician'].includes(role || '');
        case 'manufacturing':
        case 'fnb': 
            return ['production_staff', 'warehouse_staff'].includes(role || '');
        case 'agri':
            return ['production_staff', 'warehouse_staff'].includes(role || '');
        default:
            return false;
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      
      // Simulate API Call
      setTimeout(() => {
          setIsLoading(false);
          setStep(1); // Move to Category Selection
      }, 800);
  };

  // --- QUICK LOGIN HANDLER ---
  const handleQuickLogin = (role: UserRole) => {
      setEmail('owner@sibos.id');
      setPassword('123456');
      setFullName('Amin Maghfuri');
      
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setRestrictedRole(role); // Set restriction
          setStep(1); // Jump to Category
      }, 500);
  };

  const handleCategorySelect = (catId: string) => {
      setSelectedCategory(catId as BusinessCategory);
      setStep(2);
  };

  const handleRoleSelect = (role: UserRole) => {
      if (restrictedRole && role !== restrictedRole) return; // Prevent selection if restricted
      setSelectedRole(role);
      setStep(3); // Go to Mode Selection
  };

  const confirmMode = (mode: 'desktop' | 'mobile') => {
    if (!selectedRole || !selectedCategory) return;

    // 1. Initialize Clean Database for this specific Category
    seedDatabase(selectedCategory);

    // 2. Determine Target Route
    if (mode === 'desktop') {
        onLogin(selectedRole, selectedCategory, 'backoffice');
    } else {
        // Intelligent routing based on role hierarchy
        let target: Page = 'mobile-staff'; // Default fallback
        
        switch (selectedRole) {
            // Executive & High Level Mgmt -> Owner View
            case 'owner':
            case 'director':
            case 'general_manager':
                target = 'mobile-owner';
                break;
            
            // Backoffice Mgmt -> Admin View
            case 'admin':
            case 'finance_manager':
            case 'hr_manager':
            case 'auditor':
                target = 'mobile-admin';
                break;
            
            // Field Mgmt -> Supervisor View
            case 'supervisor':
            case 'area_manager':
            case 'store_manager':
                target = 'mobile-supervisor';
                break;
            
            // Operational Staff -> Staff View
            case 'staff':
            case 'cashier':
            case 'warehouse_staff':
            case 'kitchen_staff':
            case 'waiter':
            case 'sales':
            case 'courier':
            case 'technician':
            case 'production_staff':
                target = 'mobile-staff';
                break;
        }
        
        onLogin(selectedRole, selectedCategory, target);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Elements - Reduced Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sibos-orange/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Contextual Text */}
        <div className="text-white hidden md:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sibos-orange text-xs font-bold tracking-wider mb-6">
            <Shield size={12} />
            SECURE ENTERPRISE GATEWAY
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            {step === 0 && authMode === 'login' && <>Selamat Datang <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Kembali</span></>}
            {step === 0 && authMode === 'register' && <>Bergabung dengan <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Ekosistem</span></>}
            {step === 1 && <>Pilih Kategori <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Bisnis Anda</span></>}
            {step === 2 && <>Siapa yang <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Login Saat Ini?</span></>}
            {step === 3 && <>Pilih Mode <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Akses Kerja</span></>}
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {step === 0 && authMode === 'login' && "Masuk untuk mengelola bisnis, memantau laporan real-time, dan terhubung dengan komunitas SIBOS."}
            {step === 0 && authMode === 'register' && "Daftarkan bisnis Anda sekarang. Satu akun untuk akses ke POS, Accounting, HRM, dan permodalan komunitas."}
            {step === 1 && "SIBOS akan menyesuaikan tampilan dan fitur dashboard berdasarkan jenis industri yang Anda pilih. Pengalaman yang personal untuk setiap bisnis."}
            {step === 2 && `Menampilkan struktur organisasi yang relevan untuk kategori ${businessCategories.find(c => c.id === selectedCategory)?.label}. Pilih peran Anda.`}
            {step === 3 && "Akses Backoffice lengkap untuk manajemen mendalam, atau Mobile App untuk operasional cepat di lapangan. Sistem akan otomatis dikonfigurasi."}
          </p>
          
          {/* Progress Steps (Hidden on step 0) */}
          {step > 0 && (
              <div className="flex items-center gap-4">
                  {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-sibos-orange' : 'bg-white/10'}`}></div>
                  ))}
              </div>
          )}
        </div>

        {/* Right Side: Interactive Card */}
        <GlassCard className="p-8 md:p-8 border-white/10 shadow-2xl backdrop-blur-xl bg-slate-900/60 relative overflow-hidden min-h-[600px] max-h-[90vh] flex flex-col">
          
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-6 shrink-0">
             {step > 0 ? (
                 <button onClick={() => setStep(step - 1 as 0 | 1 | 2)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                     <ArrowLeft size={20} />
                 </button>
             ) : (
                 <div className="w-9"></div> // Spacer
             )}
             
             <div className="text-center">
                {step === 0 ? (
                    <div className="flex items-center gap-2 justify-center">
                        <div className="w-8 h-8 bg-sibos-orange rounded flex items-center justify-center text-white font-bold">S</div>
                        <span className="font-bold text-white text-lg">SIBOS ID</span>
                    </div>
                ) : (
                    <>
                        <div className="w-8 h-8 bg-sibos-orange rounded flex items-center justify-center text-white font-bold text-sm mx-auto mb-1 shadow-lg shadow-orange-900/50">S</div>
                        <h2 className="text-base font-bold text-white">
                            {step === 1 ? 'Pilih Industri' : step === 2 ? 'Pilih Jabatan' : 'Mode Akses'}
                        </h2>
                    </>
                )}
             </div>

             <div className="w-9"></div> // Spacer
          </div>

          {/* STEP 0: AUTH FORM (LOGIN / REGISTER) */}
          {step === 0 && (
              <div className="flex-1 flex flex-col">
                  <div className="flex bg-slate-800 p-1 rounded-xl mb-6">
                      <button 
                        onClick={() => setAuthMode('login')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${authMode === 'login' ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                      >
                          Masuk
                      </button>
                      <button 
                        onClick={() => setAuthMode('register')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${authMode === 'register' ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                      >
                          Daftar
                      </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4 flex-1">
                      {authMode === 'register' && (
                          <div className="space-y-4">
                              <div className="relative">
                                  <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                  <input 
                                    type="text" 
                                    required
                                    placeholder="Nama Lengkap" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-sibos-orange outline-none"
                                  />
                              </div>
                              <div className="relative">
                                  <Smartphone className="absolute left-3 top-3 text-gray-500" size={18} />
                                  <input 
                                    type="tel" 
                                    required
                                    placeholder="Nomor WhatsApp" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-sibos-orange outline-none"
                                  />
                              </div>
                          </div>
                      )}

                      <div className="relative">
                          <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                          <input 
                            type="email" 
                            required
                            placeholder="Alamat Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-sibos-orange outline-none"
                          />
                      </div>

                      <div className="relative">
                          <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                          <input 
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Kata Sandi" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:border-sibos-orange outline-none"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-white"
                          >
                              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                          </button>
                      </div>

                      {authMode === 'login' && (
                          <div className="text-right">
                              <a href="#" className="text-xs text-sibos-orange hover:text-orange-400">Lupa Password?</a>
                          </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold shadow-lg shadow-orange-900/40 mt-4 flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                          {isLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                              <>
                                {authMode === 'login' ? 'Masuk Sekarang' : 'Buat Akun Gratis'}
                                <ArrowLeft className="rotate-180" size={18} />
                              </>
                          )}
                      </button>
                  </form>

                  {/* QUICK LOGIN OWNER BUTTON */}
                  {authMode === 'login' && !isLoading && (
                      <button 
                        onClick={() => handleQuickLogin('owner')}
                        className="w-full py-3 mt-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                          Quick Login: Owner
                      </button>
                  )}

                  <div className="mt-6">
                      <div className="relative flex justify-center text-xs">
                          <span className="bg-slate-900 px-2 text-gray-500 z-10">Atau masuk dengan</span>
                          <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-white/10"></div>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                          <button className="py-2.5 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                              Google
                          </button>
                          <button className="py-2.5 bg-black text-white border border-white/20 rounded-lg font-bold text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                              <div className="w-5 h-5 flex items-center justify-center"><CheckCircle2 size={18}/></div>
                              Apple
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
              <div className="overflow-y-auto custom-scrollbar pr-2 flex-1">
                  <div className="grid grid-cols-2 gap-3">
                      {businessCategories.map((cat) => (
                          <button 
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.id)}
                            className={`p-4 rounded-xl bg-slate-900 border ${cat.border} hover:bg-slate-800 transition-all text-left group flex flex-col gap-3 hover:scale-[1.02] hover:shadow-lg`}
                          >
                              <div className={`w-10 h-10 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center`}>
                                  <cat.icon size={20} />
                              </div>
                              <div>
                                  <div className="text-white font-bold text-sm">{cat.label}</div>
                                  <div className="text-[10px] text-gray-500 mt-1 leading-tight">{cat.desc}</div>
                              </div>
                          </button>
                      ))}
                  </div>
              </div>
          )}

          {/* STEP 2: ROLE SELECTION (FILTERED) */}
          {step === 2 && (
              <div className="overflow-y-auto custom-scrollbar pr-2 flex-1 space-y-6">
                {restrictedRole && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-3 rounded-lg text-xs flex items-center gap-2 mb-4">
                        <Lock size={14} /> Pilihan role dikunci karena Anda login sebagai {restrictedRole.toUpperCase()}.
                    </div>
                )}

                {/* LEVEL 1: EKSEKUTIF */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Eksekutif</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {['owner', 'director', 'general_manager'].filter(r => isRoleVisible(r as UserRole)).map(role => {
                            const isDisabled = restrictedRole && restrictedRole !== role;
                            return (
                                <button 
                                    key={role} 
                                    disabled={!!isDisabled}
                                    onClick={() => handleRoleSelect(role as UserRole)} 
                                    className={`p-3 rounded-lg border transition-all text-left flex flex-col gap-2 items-center text-center
                                        ${isDisabled 
                                            ? 'opacity-30 cursor-not-allowed bg-slate-900 border-white/5' 
                                            : 'bg-yellow-900/20 hover:bg-yellow-500/20 border-yellow-500/20 hover:border-yellow-500/50 cursor-pointer'}
                                    `}
                                >
                                    <Crown size={20} className={isDisabled ? 'text-gray-500' : 'text-yellow-500'} />
                                    <div>
                                        <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* LEVEL 2: MANAJERIAL */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Manajerial</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['finance_manager', 'hr_manager', 'area_manager', 'admin', 'store_manager'].filter(r => isRoleVisible(r as UserRole)).map(role => {
                            const isDisabled = restrictedRole && restrictedRole !== role;
                            return (
                                <button 
                                    key={role} 
                                    disabled={!!isDisabled}
                                    onClick={() => handleRoleSelect(role as UserRole)} 
                                    className={`p-3 rounded-lg border transition-all text-left flex items-center gap-3
                                        ${isDisabled 
                                            ? 'opacity-30 cursor-not-allowed bg-slate-900 border-white/5' 
                                            : 'bg-blue-900/20 hover:bg-blue-500/20 border-blue-500/20 hover:border-blue-500/50 cursor-pointer'}
                                    `}
                                >
                                    <Briefcase size={18} className={isDisabled ? 'text-gray-500' : 'text-blue-500'} />
                                    <div>
                                        <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* LEVEL 3: OPERASIONAL (Filtered by Industry) */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Operasional</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['supervisor', 'cashier', 'kitchen_staff', 'waiter', 'warehouse_staff', 'production_staff', 'technician', 'sales', 'courier'].filter(r => isRoleVisible(r as UserRole)).map(role => {
                            const isDisabled = restrictedRole && restrictedRole !== role;
                            return (
                                <button 
                                    key={role} 
                                    disabled={!!isDisabled}
                                    onClick={() => handleRoleSelect(role as UserRole)} 
                                    className={`p-3 rounded-lg border transition-all text-left flex items-center gap-3
                                        ${isDisabled 
                                            ? 'opacity-30 cursor-not-allowed bg-slate-900 border-white/5' 
                                            : 'bg-green-900/20 hover:bg-green-500/20 border-green-500/20 hover:border-green-500/50 cursor-pointer'}
                                    `}
                                >
                                    <User size={18} className={isDisabled ? 'text-gray-500' : 'text-green-500'} />
                                    <div>
                                        <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
              </div>
          )}

          {/* STEP 3: MODE SELECTION */}
          {step === 3 && (
              <div className="flex-1 flex flex-col justify-center">
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-sibos-orange mb-8 uppercase text-center mx-auto w-fit">
                    {selectedCategory?.toUpperCase()} • {selectedRole?.toUpperCase().replace('_', ' ')}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <button 
                        onClick={() => confirmMode('desktop')}
                        className="p-6 rounded-xl bg-slate-800 border border-white/10 hover:border-sibos-orange hover:bg-slate-700 transition-all group text-center"
                    >
                        <Monitor size={48} className="mx-auto mb-4 text-gray-400 group-hover:text-sibos-orange transition-colors" />
                        <div className="font-bold text-white">Desktop Mode</div>
                        <div className="text-xs text-gray-500 mt-1">Dashboard Backoffice Lengkap</div>
                    </button>

                    <button 
                        onClick={() => confirmMode('mobile')}
                        className="p-6 rounded-xl bg-slate-800 border border-white/10 hover:border-blue-500 hover:bg-slate-700 transition-all group text-center"
                    >
                        <Smartphone size={48} className="mx-auto mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <div className="font-bold text-white">Mobile App</div>
                        <div className="text-xs text-gray-500 mt-1">Aplikasi Ringkas & Cepat</div>
                    </button>
                </div>
              </div>
          )}

        </GlassCard>
      </div>
    </div>
  );
};
