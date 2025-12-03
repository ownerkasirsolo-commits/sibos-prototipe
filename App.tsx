
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CommunityPage } from './components/CommunityPage'; 
import { CommunityInvestorPage } from './components/CommunityInvestorPage';
import { CommunityDeveloperPage } from './components/CommunityDeveloperPage';
import { CommunityPartnerPage } from './components/CommunityPartnerPage';
import { CommunityUserPage } from './components/CommunityUserPage';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { ArticlesPage } from './components/ArticlesPage';
import { RoadmapPage } from './components/RoadmapPage';
import { POSPage } from './components/POSPage';
import { CRMPage } from './components/CRMPage';
import { IRMPage } from './components/IRMPage';
import { HRMPage } from './components/HRMPage';
import { AccountingPage } from './components/AccountingPage';
import { AIPage } from './components/AIPage';
import { MarketplacePage } from './components/MarketplacePage'; 
import { SocialMediaPage } from './components/SocialMediaPage'; 
import { WebstorePage } from './components/WebstorePage';
import { SolutionFnbPage } from './components/SolutionFnbPage'; 
import { SolutionRetailPage } from './components/SolutionRetailPage';
import { SolutionServicePage } from './components/SolutionServicePage';
import { SolutionFashionPage } from './components/SolutionFashionPage';
import { SolutionPharmacyPage } from './components/SolutionPharmacyPage';
import { SolutionManufacturingPage } from './components/SolutionManufacturingPage';
import { SolutionUMKMPage } from './components/SolutionUMKMPage';
import { SolutionEnterprisePage } from './components/SolutionEnterprisePage';
import { SolutionMultiOutletPage } from './components/SolutionMultiOutletPage';
import { SolutionFranchisePage } from './components/SolutionFranchisePage';
import { SolutionMultiBusinessPage } from './components/SolutionMultiBusinessPage';
import { LoginPage } from './components/LoginPage';
import { BackofficePage } from './components/BackofficePage';
import { POSTransactionPage } from './components/POSTransactionPage';
import { IRMAppPage } from './components/IRMAppPage';
import { CRMAppPage } from './components/CRMAppPage';
import { AccountingAppPage } from './components/AccountingAppPage';
import { MarketingAppPage } from './components/MarketingAppPage';
import { SettingsAppPage } from './components/SettingsAppPage';
import { HRMAppPage } from './components/HRMAppPage';
import { BookingAppPage } from './components/BookingAppPage'; 
import { KDSAppPage } from './components/KDSAppPage'; 
import { ProductionAppPage } from './components/ProductionAppPage'; 
import { PurchaseAppPage } from './components/PurchaseAppPage';
import { CustomerDisplayPage } from './components/CustomerDisplayPage'; 
import { QueueDisplayPage } from './components/QueueDisplayPage'; 
import { KitchenDisplayPage } from './components/KitchenDisplayPage'; 
import { MobileStaffPage } from './components/MobileStaffPage';
import { MobileSupervisorPage } from './components/MobileSupervisorPage';
import { MobileOwnerPage } from './components/MobileOwnerPage';
import { MobileAdminPage } from './components/MobileAdminPage';
import { ChevronUp } from 'lucide-react';
import { Page, UserRole, BusinessCategory, HardwareModule, AppModule } from './types';
import { SibosProvider } from './contexts/SibosContext';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- PERSISTENT STATE INITIALIZATION ---
  const [activePage, setActivePage] = useState<Page>(() => {
      const saved = localStorage.getItem('sibos_active_page');
      return (saved as Page) || 'home';
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
      const saved = localStorage.getItem('sibos_user_role');
      return (saved as UserRole) || null;
  });

  const [businessCategory, setBusinessCategory] = useState<BusinessCategory | undefined>(() => {
      const saved = localStorage.getItem('sibos_business_category');
      return (saved as BusinessCategory) || undefined;
  });
  
  const [activeHardware, setActiveHardware] = useState<HardwareModule[]>(() => {
      const saved = localStorage.getItem('sibos_active_hardware');
      return saved ? JSON.parse(saved) : [];
  });
  
  const [activeModules, setActiveModules] = useState<AppModule[]>(() => {
      const saved = localStorage.getItem('sibos_active_modules');
      return saved ? JSON.parse(saved) : [];
  });

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
      localStorage.setItem('sibos_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
      if (userRole) localStorage.setItem('sibos_user_role', userRole);
      else localStorage.removeItem('sibos_user_role');
  }, [userRole]);

  useEffect(() => {
      if (businessCategory) localStorage.setItem('sibos_business_category', businessCategory);
      else localStorage.removeItem('sibos_business_category');
  }, [businessCategory]);

  useEffect(() => {
      localStorage.setItem('sibos_active_hardware', JSON.stringify(activeHardware));
  }, [activeHardware]);

  useEffect(() => {
      localStorage.setItem('sibos_active_modules', JSON.stringify(activeModules));
  }, [activeModules]);


  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const threshold = totalHeight / 2;

      if (window.scrollY > threshold) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: UserRole, category: BusinessCategory, targetPage?: Page) => {
    setUserRole(role);
    setBusinessCategory(category);
    
    // 1. Initialize Default Hardware (Only if empty)
    if (activeHardware.length === 0) {
        let defaultHardware: HardwareModule[] = ['printer', 'scanner'];
        if (category === 'fnb') {
            defaultHardware = ['printer', 'kitchen_display', 'customer_display', 'kds_tablet'];
        } else if (category === 'retail') {
            defaultHardware = ['printer', 'scanner', 'customer_display'];
        }
        setActiveHardware(defaultHardware);
    }

    // 2. Initialize Default Modules (Only if empty)
    if (activeModules.length === 0) {
        let modules: AppModule[] = ['accounting', 'crm', 'hrm', 'marketing']; // Base modules
        
        switch (category) {
            case 'fnb':
                modules.push('pos_fnb', 'production', 'booking');
                break;
            case 'retail':
            case 'fashion':
            case 'health':
                modules.push('pos_retail');
                break;
            case 'service':
                modules.push('pos_retail', 'booking');
                break;
            case 'manufacturing':
            case 'agri':
                modules.push('production', 'pos_retail');
                break;
            case 'hospitality':
            case 'education':
            case 'entertainment':
                modules.push('booking', 'pos_retail');
                break;
            default:
                modules.push('pos_retail');
        }
        setActiveModules(modules);
    }

    if (targetPage) {
        setActivePage(targetPage);
    } else {
        setActivePage('backoffice');
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUserRole(null);
    setBusinessCategory(undefined);
    // Clear persistent storage for session
    localStorage.removeItem('sibos_user_role');
    localStorage.removeItem('sibos_business_category');
    localStorage.removeItem('sibos_active_page');
    // Note: We keep modules/hardware config for UX convenience unless hard reset
    
    setActivePage('home'); 
    window.scrollTo(0, 0);
  };

  // Hardware Toggler
  const toggleHardware = (hw: HardwareModule) => {
      setActiveHardware(prev => 
        prev.includes(hw) ? prev.filter(h => h !== hw) : [...prev, hw]
      );
  };

  // Module Toggler (For Hybrid Settings)
  const toggleModule = (mod: AppModule) => {
      setActiveModules(prev => 
        prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
      );
  };

  const renderContent = () => {
    // Backoffice rendering
    if (activePage === 'backoffice' && userRole) {
      return (
        <BackofficePage 
            userRole={userRole} 
            businessCategory={businessCategory}
            activeHardware={activeHardware}
            activeModules={activeModules}
            onLogout={handleLogout} 
            onNavigate={handleNavigation} 
        />
      );
    }

    // Settings page needs access to hardware & modules
    if (activePage === 'settings-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return (
            <SettingsAppPage 
                onNavigate={handleNavigation} 
                activeHardware={activeHardware}
                onToggleHardware={toggleHardware}
                activeModules={activeModules}
                onToggleModule={toggleModule}
                currentCategory={businessCategory}
            />
        );
    }

    // App Pages (Standalone)
    if (activePage === 'pos-app') {
       if (!userRole) return <LoginPage onLogin={handleLogin} />;
       return <POSTransactionPage onNavigate={handleNavigation} />;
    }
    if (activePage === 'irm-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <IRMAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} userRole={userRole} />;
    }
    if (activePage === 'crm-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <CRMAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'accounting-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <AccountingAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'marketing-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <MarketingAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'hrm-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <HRMAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'booking-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <BookingAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'kds-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <KDSAppPage onNavigate={handleNavigation} />;
    }
    if (activePage === 'production-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <ProductionAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }
    if (activePage === 'purchase-app') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <PurchaseAppPage onNavigate={handleNavigation} activeHardware={activeHardware} activeModules={activeModules} />;
    }

    // Display Screens
    if (activePage === 'customer-display') return <CustomerDisplayPage onNavigate={handleNavigation} />;
    if (activePage === 'queue-display') return <QueueDisplayPage onNavigate={handleNavigation} />;
    if (activePage === 'kitchen-display') return <KitchenDisplayPage onNavigate={handleNavigation} />;

    // Mobile App Pages
    if (activePage === 'mobile-staff') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <MobileStaffPage onNavigate={handleNavigation} onLogout={handleLogout} userRole={userRole} />;
    }
    if (activePage === 'mobile-supervisor') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <MobileSupervisorPage onNavigate={handleNavigation} onLogout={handleLogout} userRole={userRole} />;
    }
    if (activePage === 'mobile-owner') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <MobileOwnerPage onNavigate={handleNavigation} onLogout={handleLogout} userRole={userRole} />;
    }
    if (activePage === 'mobile-admin') {
        if (!userRole) return <LoginPage onLogin={handleLogin} />;
        return <MobileAdminPage onNavigate={handleNavigation} onLogout={handleLogout} userRole={userRole} />;
    }

    // Standard Layout Pages
    switch(activePage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'community':
        return <CommunityPage />;
      case 'community-investor':
        return <CommunityInvestorPage />;
      case 'community-developer':
        return <CommunityDeveloperPage />;
      case 'community-partner':
        return <CommunityPartnerPage />;
      case 'community-user': 
        return <CommunityUserPage />;
      case 'about':
        return <About onNavigate={handleNavigation} />;
      case 'articles':
        return <ArticlesPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'pos':
        return <POSPage />;
      case 'crm':
        return <CRMPage />;
      case 'irm':
        return <IRMPage />;
      case 'hrm':
        return <HRMPage />;
      case 'accounting':
        return <AccountingPage />;
      case 'ai':
        return <AIPage />;
      case 'marketplace': 
        return <MarketplacePage onNavigate={handleNavigation} />;
      case 'social-media': 
        return <SocialMediaPage onNavigate={handleNavigation} />;
      case 'webstore':
        return <WebstorePage onNavigate={handleNavigation} />;
      case 'solution-fnb':
        return <SolutionFnbPage onNavigate={handleNavigation} />;
      case 'solution-retail':
        return <SolutionRetailPage onNavigate={handleNavigation} />;
      case 'solution-service':
        return <SolutionServicePage onNavigate={handleNavigation} />;
      case 'solution-fashion':
        return <SolutionFashionPage onNavigate={handleNavigation} />;
      case 'solution-pharmacy':
        return <SolutionPharmacyPage onNavigate={handleNavigation} />;
      case 'solution-manufacturing':
        return <SolutionManufacturingPage onNavigate={handleNavigation} />;
      case 'solution-umkm':
        return <SolutionUMKMPage onNavigate={handleNavigation} />;
      case 'solution-enterprise':
        return <SolutionEnterprisePage onNavigate={handleNavigation} />;
      case 'solution-multioutlet':
        return <SolutionMultiOutletPage onNavigate={handleNavigation} />;
      case 'solution-franchise':
        return <SolutionFranchisePage onNavigate={handleNavigation} />;
      case 'solution-multibusiness':
        return <SolutionMultiBusinessPage onNavigate={handleNavigation} />;
      case 'backoffice':
        return <LoginPage onLogin={handleLogin} />; 
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <Features />
            <Pricing />
          </>
        );
    }
  };

  const isStandalonePage = 
    activePage === 'backoffice' || 
    activePage === 'pos-app' || 
    activePage === 'irm-app' || 
    activePage === 'crm-app' || 
    activePage === 'accounting-app' || 
    activePage === 'marketing-app' ||
    activePage === 'settings-app' ||
    activePage === 'hrm-app' ||
    activePage === 'booking-app' || 
    activePage === 'kds-app' || 
    activePage === 'production-app' || 
    activePage === 'purchase-app' || 
    activePage === 'customer-display' || 
    activePage === 'queue-display' || 
    activePage === 'kitchen-display' || 
    activePage === 'mobile-staff' || 
    activePage === 'mobile-supervisor' || 
    activePage === 'mobile-owner' || 
    activePage === 'mobile-admin';

  const isLoginPage = activePage === 'login';

  return (
    <SibosProvider>
        <div className="min-h-screen bg-slate-950 text-white selection:bg-sibos-orange selection:text-white relative">
        {!isStandalonePage && !isLoginPage && (
            <Navbar onNavigate={handleNavigation} currentPage={activePage} />
        )}
        <main>
            {renderContent()}
        </main>
        {!isStandalonePage && !isLoginPage && (
            <Footer onNavigate={handleNavigation} />
        )}
        {!isStandalonePage && (
            <button
                onClick={scrollToTop}
                className={`
                fixed bottom-8 right-8 z-50 p-3 rounded-full 
                bg-sibos-orange/80 backdrop-blur-md border border-white/20
                text-white shadow-lg shadow-orange-900/50 
                transition-all duration-500 ease-in-out
                hover:bg-sibos-orange hover:shadow-orange-700/60 hover:-translate-y-1 hover:scale-110
                ${showBackToTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'}
                `}
                aria-label="Kembali ke atas"
            >
                <ChevronUp size={24} strokeWidth={3} />
            </button>
        )}
        </div>
    </SibosProvider>
  );
}

export default App;
