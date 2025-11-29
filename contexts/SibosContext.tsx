
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Transaction, CartItem, Order, OrderStatus, JournalEntry, Outlet, AppModule, AppNotification, WorkHours, PaymentMethodConfig } from '../types';

// --- INITIAL MOCK DATA ---
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Kopi Susu Gula Aren', category: 'fnb', price: 18000, stock: 100, minStock: 20, barcode: '8991001', sku: 'FNB-001', unit: 'Cup', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Croissant Butter', category: 'fnb', price: 25000, stock: 45, minStock: 10, barcode: '8991002', sku: 'FNB-002', unit: 'Pcs', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Nasi Goreng Spesial', category: 'fnb', price: 32000, stock: 50, minStock: 15, barcode: '8991003', sku: 'FNB-003', unit: 'Porsi', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Air Mineral 600ml', category: 'retail', price: 5000, stock: 240, minStock: 50, barcode: '8999909090', sku: 'RTL-005', unit: 'Btl', image: 'https://images.unsplash.com/photo-1562252197-0136207b5242?q=80&w=300&auto=format&fit=crop' },
  { id: 8, name: 'Beras Premium 5kg', category: 'retail', price: 75000, stock: 20, minStock: 5, barcode: '8990001112', sku: 'RTL-008', unit: 'Sak', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop' },
  { id: 9, name: 'Kaos Polos Hitam', category: 'fashion', price: 85000, stock: 50, minStock: 10, barcode: 'FSH001', sku: 'FSH-BLK-L', unit: 'Pcs', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop' },
  { id: 12, name: 'Kabel Data USB-C', category: 'electronic', price: 45000, stock: 100, minStock: 20, barcode: 'ELC001', sku: 'ACC-001', unit: 'Pcs', image: 'https://images.unsplash.com/photo-1630080644613-5b2cb6121cc7?q=80&w=300&auto=format&fit=crop' },
];

// --- DATA FACTORIES ---
const createDefaultSchedule = (): WorkHours[] => {
    return ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => ({
        day: d, open: '08:00', close: '22:00', active: true
    }));
};

const createDefaultPayments = (): PaymentMethodConfig[] => {
    return [
        { id: 'cash', name: 'Tunai (Cash)', type: 'Basic', active: true },
        { id: 'qris', name: 'QRIS Statis', type: 'Digital', active: true },
        { id: 'edc_bca', name: 'EDC BCA', type: 'Card', active: false },
        { id: 'edc_mandiri', name: 'EDC Mandiri', type: 'Card', active: false },
        { id: 'transfer', name: 'Transfer Bank', type: 'Bank', active: true },
    ];
};

const INITIAL_OUTLETS: Outlet[] = [
    { 
        id: 1, 
        brand: 'Kopi Senja',
        name: 'Kopi Senja - Pusat', 
        location: 'Cabang Pusat (Slamet Riyadi)',
        category: 'fnb', 
        type: 'Pusat', 
        address: 'Jl. Slamet Riyadi No. 45', 
        phone: '0812-3456-7890',
        assignedModules: ['pos_fnb', 'production', 'crm'],
        schedule: createDefaultSchedule(),
        paymentMethods: createDefaultPayments()
    },
    { 
        id: 2, 
        brand: 'Kopi Senja',
        name: 'Kopi Senja - Cabang Mall', 
        location: 'Cabang Paragon Mall',
        category: 'fnb', 
        type: 'Cabang', 
        address: 'Jl. Yosodipuro No. 133', 
        phone: '0812-9988-7766',
        assignedModules: ['pos_fnb', 'crm'],
        schedule: createDefaultSchedule(),
        paymentMethods: createDefaultPayments()
    },
    { 
        id: 3, 
        brand: 'Senja Mart',
        name: 'Senja Mart - Gatot Subroto', 
        location: 'Cabang Gatot Subroto',
        category: 'retail', 
        type: 'Pusat', 
        address: 'Jl. Gatot Subroto No. 12', 
        phone: '0812-9876-5432',
        assignedModules: ['pos_retail', 'irm'],
        schedule: createDefaultSchedule(),
        paymentMethods: createDefaultPayments()
    },
];

interface DashboardStats {
    todayRevenue: number;
    todayTransactions: number;
    lowStockCount: number;
}

interface SibosContextType {
  products: Product[];
  transactions: Transaction[];
  activeOrders: Order[]; 
  journals: JournalEntry[];
  stats: DashboardStats;
  notifications: AppNotification[];
  // Global Cart
  liveCart: CartItem[];
  updateLiveCart: (cart: CartItem[]) => void;
  // Outlet Management
  outlets: Outlet[];
  selectedOutlet: Outlet;
  setSelectedOutletId: (id: number) => void;
  addOutlet: (outlet: Outlet) => void;
  deleteOutlet: (id: number) => void;
  deleteBrand: (brandName: string) => void;
  updateOutletModules: (outletId: number, moduleKey: string) => void;
  updateOutlet: (outletId: number, data: Partial<Outlet>) => void; 
  // Actions
  processTransaction: (cart: CartItem[], paymentMethod: 'tunai' | 'kartu' | 'qris' | 'hutang') => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetSimulation: () => void;
  addNotification: (title: string, message: string, type: 'info' | 'warning' | 'success' | 'alert') => void;
  markNotificationsRead: () => void;
}

const SibosContext = createContext<SibosContextType | undefined>(undefined);

export const SibosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [liveCart, setLiveCart] = useState<CartItem[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ todayRevenue: 0, todayTransactions: 0, lowStockCount: 0 });
  
  // Outlet State
  const [outlets, setOutlets] = useState<Outlet[]>(INITIAL_OUTLETS);
  const [selectedOutletId, setSelectedOutletId] = useState<number>(1);

  const selectedOutlet = outlets.find(o => o.id === selectedOutletId) || outlets[0] || INITIAL_OUTLETS[0];

  // Load from LocalStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('sibos_products');
    const savedTransactions = localStorage.getItem('sibos_transactions');
    const savedOrders = localStorage.getItem('sibos_orders');
    const savedJournals = localStorage.getItem('sibos_journals');
    const savedOutlets = localStorage.getItem('sibos_outlets');
    const savedNotifications = localStorage.getItem('sibos_notifications');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(INITIAL_PRODUCTS);

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedOrders) setActiveOrders(JSON.parse(savedOrders));
    if (savedJournals) setJournals(JSON.parse(savedJournals));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    
    if (savedOutlets) {
        const parsedOutlets = JSON.parse(savedOutlets);
        if (parsedOutlets.length > 0) setOutlets(parsedOutlets);
        else setOutlets(INITIAL_OUTLETS);
    } else {
        setOutlets(INITIAL_OUTLETS);
    }
  }, []);

  // Persist & Stats
  useEffect(() => {
    const today = new Date().toDateString();
    const todaysTx = transactions.filter(t => new Date(t.date).toDateString() === today);
    
    const revenue = todaysTx.reduce((acc, t) => acc + t.total, 0);
    const lowStock = products.filter(p => p.stock !== null && p.minStock !== undefined && p.stock <= p.minStock).length;

    setStats({
        todayRevenue: revenue,
        todayTransactions: todaysTx.length,
        lowStockCount: lowStock
    });

    if (products.length > 0) localStorage.setItem('sibos_products', JSON.stringify(products));
    if (transactions.length > 0) localStorage.setItem('sibos_transactions', JSON.stringify(transactions));
    localStorage.setItem('sibos_orders', JSON.stringify(activeOrders));
    if (journals.length > 0) localStorage.setItem('sibos_journals', JSON.stringify(journals));
    if (outlets.length > 0) localStorage.setItem('sibos_outlets', JSON.stringify(outlets));
    localStorage.setItem('sibos_notifications', JSON.stringify(notifications));

  }, [products, transactions, activeOrders, journals, outlets, notifications]);

  const addNotification = (title: string, message: string, type: 'info' | 'warning' | 'success' | 'alert') => {
      const newNotif: AppNotification = {
          id: Date.now().toString(),
          title,
          message,
          type,
          time: new Date().toISOString(),
          read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
      setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const updateLiveCart = (cart: CartItem[]) => {
      setLiveCart(cart);
  };

  const processTransaction = (cart: CartItem[], paymentMethod: 'tunai' | 'kartu' | 'qris' | 'hutang') => {
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const tax = cart.reduce((acc, item) => acc + ((item.tax || 0) / 100 * item.price * item.qty), 0);
      const total = subtotal + tax;
      const txId = `#INV-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toISOString();

      const newTransaction: Transaction = {
          id: txId,
          date: timestamp,
          items: cart,
          subtotal,
          tax,
          total,
          paymentMethod,
          staff: 'Kasir 1'
      };

      // Deduct Stock
      setProducts(prevProducts => prevProducts.map(p => {
          const cartItem = cart.find(c => c.id === p.id);
          if (cartItem && p.stock !== null) {
              const newStock = Math.max(0, p.stock - cartItem.qty);
              if (newStock <= (p.minStock || 0) && p.stock > (p.minStock || 0)) {
                  addNotification('Stok Menipis', `${p.name} tersisa ${newStock} ${p.unit}. Segera restock!`, 'warning');
              }
              return { ...p, stock: newStock };
          }
          return p;
      }));

      setTransactions(prev => [newTransaction, ...prev]);
      addNotification('Transaksi Berhasil', `Penjualan ${txId} senilai Rp ${total.toLocaleString()} berhasil dicatat.`, 'success');
      setLiveCart([]);

      if (selectedOutlet.category === 'fnb') {
        const newOrder: Order = {
            id: txId,
            table: `Meja ${Math.floor(Math.random() * 20) + 1}`, 
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'queue',
            items: cart.map(i => ({ name: i.name, qty: i.qty, note: i.note })),
            startTime: Date.now()
        };
        setActiveOrders(prev => [...prev, newOrder]);
      }

      const debitAccount = paymentMethod === 'hutang' ? 'Piutang Usaha' : 
                           paymentMethod === 'tunai' ? 'Kas Besar' : 'Bank/E-Wallet';
      
      const journalEntries: JournalEntry[] = [
          {
              id: `JRN-${Date.now()}-D`,
              date: timestamp,
              description: `Penjualan ${txId}`,
              reference: txId,
              account: debitAccount,
              debit: total,
              credit: 0,
              type: 'sales'
          },
          {
              id: `JRN-${Date.now()}-C`,
              date: timestamp,
              description: `Pendapatan Penjualan ${txId}`,
              reference: txId,
              account: 'Pendapatan Penjualan',
              debit: 0,
              credit: subtotal,
              type: 'sales'
          }
      ];

      if (tax > 0) {
          journalEntries.push({
              id: `JRN-${Date.now()}-T`,
              date: timestamp,
              description: `Pajak Penjualan ${txId}`,
              reference: txId,
              account: 'Hutang Pajak (PPN)',
              debit: 0,
              credit: tax,
              type: 'sales'
          });
      }

      setJournals(prev => [...journalEntries, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
      setActiveOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status } : order
      ));
  };

  const addOutlet = (outlet: Outlet) => {
      const initializedOutlet: Outlet = {
          ...outlet,
          // Use factory to ensure unique object references
          schedule: outlet.schedule || createDefaultSchedule(),
          paymentMethods: outlet.paymentMethods || createDefaultPayments()
      };
      
      setOutlets(prev => [...prev, initializedOutlet]);
      setSelectedOutletId(outlet.id);
      addNotification('Unit Baru Dibuat', `${outlet.name} berhasil ditambahkan.`, 'success');
  };

  const deleteOutlet = (id: number) => {
      if (outlets.length <= 1) {
          addNotification('Gagal Hapus', 'Anda harus memiliki minimal satu outlet aktif.', 'alert');
          return;
      }

      const outletToDelete = outlets.find(o => o.id === id);
      const newOutlets = outlets.filter(o => o.id !== id);
      
      setOutlets(newOutlets);
      
      // Auto-switch if deleted outlet was active
      if (selectedOutletId === id) {
          if (newOutlets.length > 0) {
              setSelectedOutletId(newOutlets[0].id);
          }
      }

      addNotification('Unit Dihapus', `Outlet ${outletToDelete?.name} telah dihapus.`, 'warning');
  };

  const deleteBrand = (brandName: string) => {
      const remainingOutlets = outlets.filter(o => o.brand !== brandName);
      
      if (remainingOutlets.length === 0) {
           addNotification('Gagal Hapus', 'Anda harus memiliki minimal satu Unit Bisnis aktif.', 'alert');
           return;
      }

      setOutlets(remainingOutlets);
      
      // Auto-switch if active outlet belonged to deleted brand
      if (selectedOutlet.brand === brandName) {
          if (remainingOutlets.length > 0) {
              setSelectedOutletId(remainingOutlets[0].id);
          }
      }
      
      addNotification('Brand Dihapus', `Unit Bisnis ${brandName} beserta seluruh cabangnya dihapus.`, 'warning');
  };

  const updateOutletModules = (outletId: number, moduleKey: string) => {
      setOutlets(prev => prev.map(outlet => {
          if (outlet.id === outletId) {
              const currentModules = outlet.assignedModules || [];
              const isActive = currentModules.includes(moduleKey);
              return {
                  ...outlet,
                  assignedModules: isActive 
                    ? currentModules.filter(m => m !== moduleKey)
                    : [...currentModules, moduleKey]
              };
          }
          return outlet;
      }));
  };

  const updateOutlet = (outletId: number, data: Partial<Outlet>) => {
      setOutlets(prev => prev.map(outlet => 
          outlet.id === outletId ? { ...outlet, ...data } : outlet
      ));
  };

  const resetSimulation = () => {
      setProducts(INITIAL_PRODUCTS);
      setTransactions([]);
      setActiveOrders([]);
      setJournals([]);
      setOutlets(INITIAL_OUTLETS);
      setNotifications([]);
      localStorage.clear();
      window.location.reload();
  };

  return (
    <SibosContext.Provider value={{ 
        products, transactions, activeOrders, journals, stats, notifications,
        liveCart, updateLiveCart,
        outlets, selectedOutlet, setSelectedOutletId, updateOutletModules, updateOutlet,
        addOutlet, deleteOutlet, deleteBrand,
        processTransaction, updateOrderStatus, resetSimulation,
        addNotification, markNotificationsRead
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
