
import { LucideIcon } from "lucide-react";

export type Page = 
  | 'home' | 'community' | 'about' | 'articles' | 'roadmap' | 'marketplace' | 'social-media' | 'webstore'
  | 'solution-fnb' | 'solution-retail' | 'solution-service' | 'solution-fashion' | 'solution-pharmacy' | 'solution-manufacturing' 
  | 'solution-umkm' | 'solution-enterprise' | 'solution-multibusiness' | 'solution-multioutlet' | 'solution-franchise'
  | 'pos' | 'crm' | 'irm' | 'hrm' | 'accounting' | 'ai' 
  | 'login' | 'backoffice' 
  | 'pos-app' | 'irm-app' | 'crm-app' | 'accounting-app' | 'marketing-app' | 'settings-app' | 'hrm-app'
  | 'booking-app' | 'kds-app' | 'production-app' | 'purchase-app' // New Module
  | 'customer-display' | 'queue-display' | 'kitchen-display' 
  | 'mobile-staff' | 'mobile-supervisor' | 'mobile-owner' | 'mobile-admin'
  | 'community-investor' | 'community-developer' | 'community-partner' | 'community-user';

// Business Categories (Initial Preset Only)
export type BusinessCategory = 
  | 'fnb' | 'retail' | 'service' | 'fashion' | 'health' 
  | 'corporate' | 'manufacturing' | 'agri' | 'education' 
  | 'hospitality' | 'entertainment';

// APP MODULES (The LEGO Bricks)
export type AppModule = 
  | 'pos_retail'      // Retail Features (Barcode, Wholesale)
  | 'pos_fnb'         // F&B Features (Table Mgmt, Modifiers)
  | 'booking'         // Reservation System (Hotel, Service, Rental)
  | 'production'      // Manufacturing (BOM, Work Order)
  | 'crm'             // Customer Relationship
  | 'hrm'             // Human Resources
  | 'accounting'      // Finance
  | 'marketing';      // Omnichannel

// Outlet Configuration Types
export interface WorkHours {
    day: string;
    open: string;
    close: string;
    active: boolean;
}

export interface PaymentMethodConfig {
    id: string;
    name: string;
    type: string;
    active: boolean;
}

// OUTLET / BUSINESS UNIT (Updated for Multi-Branch)
export interface Outlet {
    id: number;
    brand: string; // Nama Unit Bisnis (Induk), e.g., "Kopi Senja Group"
    name: string; // Nama Display Lengkap, e.g., "Kopi Senja - Pusat"
    location: string; // Nama Lokasi Spesifik, e.g., "Cabang Mall Paragon"
    category: BusinessCategory | string;
    type: 'Pusat' | 'Cabang' | 'Gudang' | 'Pop-up Store';
    address: string;
    city?: string; // Kota/Area
    phone: string;
    npwp?: string; // NPWP Brand
    slogan?: string; // Slogan Brand
    assignedModules?: string[]; // Specific modules active for this outlet
    schedule?: WorkHours[]; // Operational Hours
    paymentMethods?: PaymentMethodConfig[]; // Active Payment Methods
    allowDebt?: boolean; // New: Toggle to enable/disable debt transactions
}

// Expanded Corporate Hierarchy Roles
export type UserRole = 
  // Executive Level
  | 'owner' | 'director' | 'general_manager' 
  // Management Level
  | 'finance_manager' | 'hr_manager' | 'area_manager' | 'admin' | 'auditor'
  // Operational Level (Supervisor)
  | 'supervisor' | 'store_manager'
  // Operational Level (Staff)
  | 'staff' | 'cashier' | 'warehouse_staff' | 'kitchen_staff' | 'waiter' 
  // Specialized & Field Level (New)
  | 'sales' | 'courier' | 'technician' | 'production_staff' | null;

// Hardware Modules for Activation
export type HardwareModule = 
  | 'printer' 
  | 'scanner' 
  | 'scale' 
  | 'customer_display' // Layar ke-2
  | 'queue_display'    // Layar Antrian
  | 'kitchen_display'  // Layar Wall Dapur
  | 'kds_tablet';      // Tablet Masak Interaktif

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  id: string;
  columns?: {
    title: string;
    items: string[];
  }[];
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

// --- DATA MODELS FOR SIMULATION ---

// F&B Specific Models
export interface RecipeItem {
    ingredientId: number;
    ingredientName: string;
    qty: number;
    unit: string;
    costPerUnit: number;
}

export interface ModifierOption {
    name: string;
    priceDelta: number;
}

export interface ModifierGroup {
    name: string; // e.g. "Level Pedas", "Topping"
    minSelection: number; // 0 for optional, 1 for required
    maxSelection: number;
    options: ModifierOption[];
}

export type ProductType = 'menu' | 'ingredient' | 'goods';

export interface Product {
  id: number;
  name: string;
  category: string; // Simplified for global use
  price: number;
  stock: number | null; 
  image: string;
  barcode: string;
  sku: string;
  tax?: number; // percent
  unit?: string;
  minStock?: number; // for alerts
  
  // F&B Enhancements
  type?: ProductType; // 'menu' (jual), 'ingredient' (bahan baku), 'goods' (barang ritel)
  cost?: number; // HPP (Calculated or Manual)
  printerTarget?: 'kitchen' | 'bar' | 'cashier'; // Where to print receipt
  recipe?: RecipeItem[]; // Ingredients deducted when sold
  modifiers?: ModifierGroup[]; // Options for the menu
}

export interface CartItem extends Product {
  qty: number;
  discount: number; // Percentage
  note?: string;
}

export interface Transaction {
  id: string;
  date: string; // ISO string
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'tunai' | 'kartu' | 'qris' | 'hutang';
  staff: string;
  shiftId?: string; // Link to shift
}

// Shift Management
export interface Shift {
    id: string;
    staffName: string;
    startTime: string;
    endTime: string | null;
    startCash: number; // Modal Awal
    expectedCash: number; // System Calc (Start + Cash Sales)
    actualCash: number | null; // Physical Count
    variance: number | null; // Actual - Expected
    status: 'open' | 'closed';
    totalCashSales: number;
    totalNonCashSales: number;
}

// Waste Management
export interface WasteRecord {
    id: string;
    date: string;
    productId: number;
    productName: string;
    qty: number;
    unit: string;
    cost: number;
    reason: 'Expired' | 'Damaged' | 'Lost' | 'Internal Use' | 'Other';
    staffName: string;
}

// KDS Models
export type OrderStatus = 'queue' | 'cooking' | 'done';

export interface OrderItem {
    name: string;
    qty: number;
    note?: string;
}

export interface Order {
    id: string;
    table: string;
    time: string;
    status: OrderStatus;
    items: OrderItem[];
    startTime: number;
}

// Accounting Models
export interface JournalEntry {
    id: string;
    date: string;
    description: string;
    reference: string; // Transaction ID or PO ID
    account: string; // e.g., 'Sales Revenue', 'Cash', 'Inventory'
    debit: number;
    credit: number;
    type: 'sales' | 'purchase' | 'expense' | 'adjustment';
}

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'alert';
    time: string;
    read: boolean;
}

// Procurement Models
export interface Supplier {
    id: number;
    name: string;
    contactPerson: string;
    phone: string;
    email?: string;
    address?: string;
}

export type POStatus = 'ordered' | 'received' | 'cancelled';

export interface PurchaseOrderItem {
    productId: number;
    productName: string;
    qty: number;
    cost: number;
    unit: string;
}

export interface PurchaseOrder {
    id: string;
    date: string;
    supplierId: number;
    supplierName: string;
    items: PurchaseOrderItem[];
    total: number;
    status: POStatus;
    receivedDate?: string;
}

// PROMOTION ENGINE TYPES
export type PromoType = 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'bundle';
export type PromoScope = 'general' | 'member_only';

export interface Promotion {
    id: string;
    name: string;
    description?: string;
    type: PromoType;
    value: number; // e.g. 10 (for 10%) or 5000 (for Rp 5000 off)
    scope: PromoScope;
    active: boolean;
    startDate?: string;
    endDate?: string;
    // Conditions
    minPurchase?: number;
    targetTier?: string[]; // For member promos: ['Gold', 'Platinum']
    daysActive?: string[]; // For Happy Hour: ['Mon', 'Tue']
    startHour?: string;
    endHour?: string;
}
