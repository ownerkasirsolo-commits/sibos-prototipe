
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, Transaction, CartItem, Outlet, BusinessCategory, 
  Shift, Order, OrderStatus, Supplier, PurchaseOrder, 
  AppNotification, JournalEntry, PurchaseOrderItem, POStatus,
  WasteRecord, Promotion // Imported Promotion
} from '../types';

// Dummy Data
const FNB_SEED_PRODUCTS: Product[] = [
  { id: 1, name: 'Nasi Goreng Spesial', category: 'Makanan', price: 25000, stock: null, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80', barcode: 'MNU001', sku: 'NASGOR-SP', type: 'menu', printerTarget: 'kitchen' },
  { id: 2, name: 'Es Teh Manis', category: 'Minuman', price: 5000, stock: null, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&q=80', barcode: 'MNU002', sku: 'ESTEH', type: 'menu', printerTarget: 'bar' },
  { id: 3, name: 'Ayam Bakar Madu', category: 'Makanan', price: 30000, stock: null, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=200&q=80', barcode: 'MNU003', sku: 'AYAM-BKR', type: 'menu', printerTarget: 'kitchen' },
  { id: 101, name: 'Beras Pandan Wangi', category: 'Bahan Baku', price: 12000, stock: 50, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80', barcode: 'ING001', sku: 'BERAS-PW', type: 'ingredient', unit: 'kg' },
  { id: 102, name: 'Telur Ayam', category: 'Bahan Baku', price: 2000, stock: 100, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=200&q=80', barcode: 'ING002', sku: 'TELUR', type: 'ingredient', unit: 'butir' },
];

const RETAIL_SEED_PRODUCTS: Product[] = [
  { id: 1, name: 'Kopi Kapal Api 65gr', category: 'Minuman', price: 2500, stock: 45, minStock: 10, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=200&q=80', barcode: '8991002101', sku: 'KPI-KA-65', type: 'goods', unit: 'sachet' },
  { id: 2, name: 'Indomie Goreng', category: 'Makanan', price: 3500, stock: 120, minStock: 24, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=200&q=80', barcode: '89988662001', sku: 'IND-GOR', type: 'goods', unit: 'pcs' },
  { id: 3, name: 'Aqua 600ml', category: 'Minuman', price: 4000, stock: 24, minStock: 12, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=200&q=80', barcode: '8886008101', sku: 'AQ-600', type: 'goods', unit: 'botol' },
];

// MOCK PROMOTIONS
const MOCK_PROMOTIONS: Promotion[] = [
    // General Promos (Marketing)
    { id: 'PRM-001', name: 'Grand Opening Sale', description: 'Diskon semua item untuk pembukaan', type: 'percentage', value: 20, scope: 'general', active: true, minPurchase: 0 },
    { id: 'PRM-002', name: 'Jumat Berkah', description: 'Potongan harga setiap hari Jumat', type: 'fixed_amount', value: 5000, scope: 'general', active: true, daysActive: ['Fri'] },
    { id: 'PRM-003', name: 'Happy Hour Siang', description: 'Diskon jam 14.00 - 17.00', type: 'percentage', value: 10, scope: 'general', active: false, startHour: '14:00', endHour: '17:00' },
    
    // Member Promos (CRM)
    { id: 'MEM-001', name: 'Diskon Member Silver', description: 'Benefit dasar member', type: 'percentage', value: 2, scope: 'member_only', active: true, targetTier: ['Silver'] },
    { id: 'MEM-002', name: 'Privilege Gold', description: 'Diskon eksklusif Gold', type: 'percentage', value: 5, scope: 'member_only', active: true, targetTier: ['Gold'] },
    { id: 'MEM-003', name: 'Platinum VIP', description: 'Diskon sultan', type: 'percentage', value: 10, scope: 'member_only', active: true, targetTier: ['Platinum'] },
    { id: 'MEM-004', name: 'Birthday Treat', description: 'Gratis 1 produk saat ultah', type: 'fixed_amount', value: 25000, scope: 'member_only', active: true },
];

interface SibosContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  seedDatabase: (category: BusinessCategory) => void;
  
  // Transactions & Cart
  transactions: Transaction[];
  processTransaction: (cart: CartItem[], type: 'tunai' | 'hutang') => void;
  updateLiveCart: (cart: CartItem[]) => void;
  liveCart: CartItem[];
  
  // Dashboard Stats
  stats: {
    todayRevenue: number;
    todayTransactions: number;
    lowStockCount: number;
  };
  
  // Outlets
  outlets: Outlet[];
  selectedOutlet: Outlet;
  setSelectedOutletId: (id: number) => void;
  addOutlet: (outlet: Outlet) => void;
  updateOutlet: (id: number, data: Partial<Outlet>) => void;
  deleteOutlet: (id: number) => void;
  deleteBrand: (brandName: string) => void;
  updateOutletModules: (id: number, module: string) => void;
  
  // Shifts
  activeShift: Shift | null;
  openShift: (startCash: number) => void;
  closeShift: (endCash: number) => void;
  
  // KDS
  activeOrders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  
  // Procurement
  suppliers: Supplier[];
  addSupplier: (s: Supplier) => void;
  updateSupplier: (id: number, s: Partial<Supplier>) => void;
  deleteSupplier: (id: number) => void;
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (po: PurchaseOrder) => void;
  updatePOStatus: (id: string, status: POStatus) => void;
  
  // Misc
  notifications: AppNotification[];
  addNotification: (n: AppNotification) => void;
  markNotificationsRead: () => void;
  journals: JournalEntry[];
  recordWaste: (productId: number, qty: number, reason: string) => void;
  resetSimulation: () => void;
  
  // Promotions
  promotions: Promotion[];
  addPromotion: (p: Promotion) => void;
  togglePromotion: (id: string) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SibosContext = createContext<SibosContextType | undefined>(undefined);

export const SibosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State Initialization
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [liveCart, setLiveCart] = useState<CartItem[]>([]);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<number>(0);
  const [activeShift, setActiveShift] = useState<Shift | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>(MOCK_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Derived State
  const selectedOutlet = outlets.find(o => o.id === selectedOutletId) || outlets[0] || {
      id: 0,
      brand: 'Setup',
      name: 'Pilih Outlet',
      location: '-',
      category: 'retail',
      type: 'Pusat',
      address: '-',
      phone: '-'
  };

  const stats = {
    todayRevenue: transactions
        .filter(t => new Date(t.date).toDateString() === new Date().toDateString())
        .reduce((acc, t) => acc + t.total, 0),
    todayTransactions: transactions
        .filter(t => new Date(t.date).toDateString() === new Date().toDateString())
        .length,
    lowStockCount: products.filter(p => p.stock !== null && p.stock <= (p.minStock || 5)).length
  };

  // Actions
  const seedDatabase = (category: BusinessCategory) => {
      let brandName = 'Bisnis Saya';
      let outletName = 'Outlet Pusat';
      let initialModules: string[] = ['pos_retail'];
      let seedProducts: Product[] = [];

      if (category === 'fnb') {
          brandName = 'Resto Nusantara';
          outletName = 'Cabang Utama';
          initialModules = ['pos_fnb', 'production', 'crm', 'accounting', 'booking', 'hrm', 'marketing'];
          seedProducts = FNB_SEED_PRODUCTS;
      } else if (category === 'retail' || category === 'fashion') {
          brandName = 'Toko Serba Ada';
          outletName = 'Toko Pusat';
          initialModules = ['pos_retail', 'irm', 'crm', 'accounting', 'hrm', 'marketing'];
          seedProducts = RETAIL_SEED_PRODUCTS;
      } else {
          // Default others
          brandName = 'Usaha ' + category.charAt(0).toUpperCase() + category.slice(1);
          initialModules = ['pos_retail', 'accounting', 'hrm'];
          seedProducts = [];
      }

      const newOutlet: Outlet = {
          id: Date.now(),
          brand: brandName,
          name: outletName,
          location: 'Pusat',
          category: category,
          type: 'Pusat',
          address: 'Jl. Contoh No. 1',
          phone: '08123456789',
          assignedModules: initialModules,
          allowDebt: true // Default enabled
      };

      setOutlets([newOutlet]);
      setSelectedOutletId(newOutlet.id);
      setProducts(seedProducts);
      setTransactions([]);
      setLiveCart([]);
      setActiveShift(null);
      setActiveOrders([]);
      setSuppliers([]);
      setPurchaseOrders([]);
      setNotifications([]);
      setJournals([]);
      setPromotions(MOCK_PROMOTIONS); // Reset promos
      setSearchQuery('');
  };

  const addProduct = (product: Product) => {
      setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: number, data: Partial<Product>) => {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const processTransaction = (cart: CartItem[], type: 'tunai' | 'hutang') => {
      const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const tax = total * 0.1; // Simple tax
      
      const newTransaction: Transaction = {
          id: `TRX-${Date.now()}`,
          date: new Date().toISOString(),
          items: cart,
          subtotal: total,
          tax: tax,
          total: total + tax,
          paymentMethod: type,
          staff: 'Kasir 1',
          shiftId: activeShift?.id
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Update Shift Data (if active)
      if (activeShift) {
          const isCash = type === 'tunai';
          setActiveShift(prev => prev ? {
              ...prev,
              totalCashSales: prev.totalCashSales + (isCash ? newTransaction.total : 0),
              totalNonCashSales: prev.totalNonCashSales + (!isCash ? newTransaction.total : 0)
          } : null);
      }

      // Update Stock
      cart.forEach(item => {
          if (item.type === 'menu' && item.recipe) {
              // Deduct ingredients for F&B
              item.recipe.forEach(ing => {
                  setProducts(prev => prev.map(p => {
                      if (p.id === ing.ingredientId && p.stock !== null) {
                          return { ...p, stock: p.stock - (ing.qty * item.qty) };
                      }
                      return p;
                  }));
              });
          } else {
              // Deduct product stock directly
              setProducts(prev => prev.map(p => {
                  if (p.id === item.id && p.stock !== null) {
                      return { ...p, stock: p.stock - item.qty };
                  }
                  return p;
              }));
          }
      });

      // Add Journal Entry
      const journal: JournalEntry = {
          id: `JRN-${Date.now()}`,
          date: new Date().toISOString(),
          description: `Penjualan ${newTransaction.id}`,
          reference: newTransaction.id,
          account: 'Pendapatan Penjualan',
          debit: 0,
          credit: newTransaction.total,
          type: 'sales'
      };
      setJournals(prev => [journal, ...prev]);

      // If F&B, send to KDS
      if (selectedOutlet.category === 'fnb') {
          const newOrder: Order = {
              id: `ORD-${Date.now().toString().slice(-4)}`,
              table: 'Meja 1', // Simplified
              time: new Date().toLocaleTimeString(),
              status: 'queue',
              items: cart.map(c => ({ name: c.name, qty: c.qty, note: c.note })),
              startTime: Date.now()
          };
          setActiveOrders(prev => [...prev, newOrder]);
      }
      
      setLiveCart([]);
  };

  const updateLiveCart = (cart: CartItem[]) => {
      setLiveCart(cart);
  };

  const addOutlet = (outlet: Outlet) => {
      setOutlets(prev => [...prev, outlet]);
  };

  const updateOutlet = (id: number, data: Partial<Outlet>) => {
      setOutlets(prev => prev.map(o => o.id === id ? { ...o, ...data } : o));
  };

  const deleteOutlet = (id: number) => {
      setOutlets(prev => prev.filter(o => o.id !== id));
      if (selectedOutletId === id) setSelectedOutletId(outlets[0]?.id || 0);
  };

  const deleteBrand = (brandName: string) => {
      setOutlets(prev => prev.filter(o => o.brand !== brandName));
      // logic to reset selectedOutletId if needed
  };

  const updateOutletModules = (id: number, module: string) => {
      setOutlets(prev => prev.map(o => {
          if (o.id === id) {
              const current = o.assignedModules || [];
              const updated = current.includes(module) 
                  ? current.filter(m => m !== module) 
                  : [...current, module];
              return { ...o, assignedModules: updated };
          }
          return o;
      }));
  };

  const openShift = (startCash: number) => {
      setActiveShift({
          id: `SHF-${Date.now()}`,
          staffName: 'User',
          startTime: new Date().toISOString(),
          endTime: null,
          startCash,
          expectedCash: startCash,
          actualCash: null,
          variance: null,
          status: 'open',
          totalCashSales: 0,
          totalNonCashSales: 0
      });
  };

  const closeShift = (endCash: number) => {
      if (!activeShift) return;
      // Calculate totals
      const systemTotal = activeShift.startCash + activeShift.totalCashSales;
      const variance = endCash - systemTotal;

      setActiveShift(null); // Just clear for now, in real app save to DB

      // Record Journal for Variance (if any)
      if (variance !== 0) {
          setJournals(prev => [{
              id: `JRN-SHF-${Date.now()}`,
              date: new Date().toISOString(),
              description: `Selisih Kas Shift (System: ${systemTotal}, Actual: ${endCash})`,
              reference: activeShift.id,
              account: 'Selisih Kas',
              debit: variance < 0 ? Math.abs(variance) : 0,
              credit: variance > 0 ? variance : 0,
              type: 'adjustment'
          }, ...prev]);
      }
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
      setActiveOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addSupplier = (s: Supplier) => setSuppliers(prev => [...prev, s]);
  const updateSupplier = (id: number, s: Partial<Supplier>) => setSuppliers(prev => prev.map(sup => sup.id === id ? { ...sup, ...s } : sup));
  const deleteSupplier = (id: number) => setSuppliers(prev => prev.filter(s => s.id !== id));

  const addPurchaseOrder = (po: PurchaseOrder) => setPurchaseOrders(prev => [po, ...prev]);
  
  const updatePOStatus = (id: string, status: POStatus) => {
      setPurchaseOrders(prev => prev.map(po => {
          if (po.id === id) {
              if (status === 'received' && po.status !== 'received') {
                  // Add stock
                  po.items.forEach(item => {
                      const prod = products.find(p => p.id === item.productId);
                      if (prod && prod.stock !== null) {
                          updateProduct(prod.id, { stock: prod.stock + item.qty });
                      }
                  });
              }
              return { ...po, status };
          }
          return po;
      }));
  };

  const addNotification = (n: AppNotification) => setNotifications(prev => [n, ...prev]);
  const markNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const recordWaste = (productId: number, qty: number, reason: string) => {
      setProducts(prev => prev.map(p => {
          if (p.id === productId && p.stock !== null) {
              return { ...p, stock: Math.max(0, p.stock - qty) };
          }
          return p;
      }));
      // Add journal for loss
      const prod = products.find(p => p.id === productId);
      if (prod) {
          const loss = (prod.cost || prod.price * 0.7) * qty;
          setJournals(prev => [{
              id: `JRN-W-${Date.now()}`,
              date: new Date().toISOString(),
              description: `Waste: ${prod.name} (${qty} ${prod.unit}) - ${reason}`,
              reference: '-',
              account: 'Kerugian Stok',
              debit: loss,
              credit: 0,
              type: 'adjustment'
          }, ...prev]);
      }
  };

  const resetSimulation = () => {
      setTransactions([]);
      setLiveCart([]);
      setActiveOrders([]);
      setSearchQuery('');
      // Reset stock to initial if needed, or just clear transactions
  };

  const addPromotion = (p: Promotion) => setPromotions(prev => [...prev, p]);
  
  const togglePromotion = (id: string) => {
      setPromotions(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <SibosContext.Provider value={{
      products, addProduct, updateProduct, seedDatabase,
      transactions, processTransaction, updateLiveCart, liveCart,
      stats,
      outlets, selectedOutlet, setSelectedOutletId, addOutlet, updateOutlet, deleteOutlet, deleteBrand, updateOutletModules,
      activeShift, openShift, closeShift,
      activeOrders, updateOrderStatus,
      suppliers, addSupplier, updateSupplier, deleteSupplier,
      purchaseOrders, addPurchaseOrder, updatePOStatus,
      notifications, addNotification, markNotificationsRead,
      journals, recordWaste, resetSimulation,
      promotions, addPromotion, togglePromotion,
      searchQuery, setSearchQuery // Exported
    }}>
      {children}
    </SibosContext.Provider>
  );
};

export const useSibos = () => {
  const context = useContext(SibosContext);
  if (context === undefined) {
    throw new Error('useSibos must be used within a SibosProvider');
  }
  return context;
};
