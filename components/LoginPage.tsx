
import React, { useState } from 'react';
import { 
  User, Shield, Briefcase, Users, Lock, LogIn, Monitor, Smartphone, X,
  Crown, BarChart3, Calculator, Truck, Coffee, UserCog,
  Wrench, Bike, ClipboardCheck, Factory, Megaphone, Landmark,
  Utensils, ShoppingBag, Scissors, Building2, Sprout, GraduationCap,
  Stethoscope, Ticket, Shirt, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { UserRole, Page, BusinessCategory } from '../types';

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  // HELPER: Determine which roles to show based on Category
  const isRoleVisible = (role: UserRole): boolean => {
    if (!selectedCategory) return false;

    // Universal Roles (Show for everyone)
    const universalRoles = ['owner', 'director', 'general_manager', 'finance_manager', 'hr_manager', 'admin', 'area_manager', 'auditor', 'supervisor', 'staff', 'cashier', 'sales', 'courier', 'store_manager'];
    
    if (universalRoles.includes(role || '')) {
        // Fine-tune universal roles if necessary, but generally these exist everywhere
        return true;
    }

    // Industry Specific Roles
    switch (selectedCategory) {
        case 'fnb':
            return ['kitchen_staff', 'waiter'].includes(role || '');
        case 'retail':
        case 'fashion':
        case 'health':
            return ['warehouse_staff'].includes(role || ''); // Retail needs warehouse
        case 'service':
            return ['technician'].includes(role || '');
        case 'manufacturing':
        case 'fnb': // FnB also has production sometimes
            return ['production_staff', 'warehouse_staff'].includes(role || '');
        case 'agri':
            return ['production_staff', 'warehouse_staff'].includes(role || '');
        default:
            return false;
    }
  };

  const handleCategorySelect = (catId: string) => {
      setSelectedCategory(catId as BusinessCategory);
      setStep(2);
  };

  const handleRoleSelect = (role: UserRole) => {
      setSelectedRole(role);
      setStep(3); // Go to Mode Selection
  };

  const confirmMode = (mode: 'desktop' | 'mobile') => {
    if (!selectedRole || !selectedCategory) return;

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

  const resetLogin = () => {
      setStep(1);
      setSelectedCategory(null);
      setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sibos-orange/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Contextual Text */}
        <div className="text-white hidden md:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sibos-orange text-xs font-bold tracking-wider mb-6">
            <Shield size={12} />
            SECURE ENTERPRISE GATEWAY
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            {step === 1 && <>Pilih Kategori <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Bisnis Anda</span></>}
            {step === 2 && <>Siapa yang <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Login Saat Ini?</span></>}
            {step === 3 && <>Pilih Mode <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">Akses Kerja</span></>}
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {step === 1 && "SIBOS akan menyesuaikan tampilan dan fitur dashboard berdasarkan jenis industri yang Anda pilih. Pengalaman yang personal untuk setiap bisnis."}
            {step === 2 && `Menampilkan struktur organisasi yang relevan untuk kategori ${businessCategories.find(c => c.id === selectedCategory)?.label}. Pilih peran Anda.`}
            {step === 3 && "Akses Backoffice lengkap untuk manajemen mendalam, atau Mobile App untuk operasional cepat di lapangan."}
          </p>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4">
              {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-sibos-orange' : 'bg-white/10'}`}></div>
              ))}
          </div>
        </div>

        {/* Right Side: Interactive Card */}
        <GlassCard className="p-8 md:p-8 border-white/10 shadow-2xl backdrop-blur-xl bg-slate-900/60 relative overflow-hidden min-h-[600px] max-h-[90vh] flex flex-col">
          
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-6">
             {step > 1 ? (
                 <button onClick={() => setStep(step - 1 as 1 | 2)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                     <ArrowLeft size={20} />
                 </button>
             ) : (
                 <div className="w-9"></div> // Spacer
             )}
             
             <div className="text-center">
                <div className="w-10 h-10 bg-sibos-orange rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 shadow-lg shadow-orange-900/50">S</div>
                <h2 className="text-lg font-bold text-white">
                    {step === 1 ? 'Pilih Industri' : step === 2 ? 'Pilih Jabatan' : 'Mode Akses'}
                </h2>
             </div>

             <div className="w-9"></div> // Spacer
          </div>

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
                
                {/* LEVEL 1: EKSEKUTIF */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Eksekutif</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {['owner', 'director', 'general_manager'].filter(r => isRoleVisible(r as UserRole)).map(role => (
                            <button key={role} onClick={() => handleRoleSelect(role as UserRole)} className="p-3 rounded-lg bg-yellow-900/20 hover:bg-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/50 transition-all text-left flex flex-col gap-2 items-center text-center">
                                <Crown size={20} className="text-yellow-500" />
                                <div>
                                    <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LEVEL 2: MANAJERIAL */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Manajerial</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['finance_manager', 'hr_manager', 'area_manager', 'admin', 'store_manager'].filter(r => isRoleVisible(r as UserRole)).map(role => (
                            <button key={role} onClick={() => handleRoleSelect(role as UserRole)} className="p-3 rounded-lg bg-blue-900/20 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/50 transition-all text-left flex items-center gap-3">
                                <Briefcase size={18} className="text-blue-500" />
                                <div>
                                    <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LEVEL 3: OPERASIONAL (Filtered by Industry) */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Operasional</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['supervisor', 'cashier', 'kitchen_staff', 'waiter', 'warehouse_staff', 'production_staff', 'technician', 'sales', 'courier'].filter(r => isRoleVisible(r as UserRole)).map(role => (
                            <button key={role} onClick={() => handleRoleSelect(role as UserRole)} className="p-3 rounded-lg bg-green-900/20 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/50 transition-all text-left flex items-center gap-3">
                                <User size={18} className="text-green-500" />
                                <div>
                                    <div className="text-white font-bold text-xs capitalize">{role.replace('_', ' ')}</div>
                                </div>
                            </button>
                        ))}
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
