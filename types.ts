
import { LucideIcon } from "lucide-react";

export type Page = 
  | 'home' | 'community' | 'about' | 'articles' | 'roadmap' | 'marketplace'
  | 'pos' | 'crm' | 'irm' | 'hrm' | 'accounting' | 'ai' 
  | 'login' | 'backoffice' 
  | 'pos-app' | 'irm-app' | 'crm-app' | 'accounting-app' | 'marketing-app' | 'settings-app' | 'hrm-app'
  | 'booking-app' | 'kds-app' | 'production-app' // New Modules
  | 'customer-display' | 'queue-display' | 'kitchen-display' // New Display Modules
  | 'mobile-staff' | 'mobile-supervisor' | 'mobile-owner' | 'mobile-admin'
  | 'community-investor' | 'community-developer' | 'community-partner' | 'community-user'; // New Community Pages

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
    type: 'Pusat' | 'Cabang' | 'Gudang';
    address: string;
    phone: string;
    assignedModules?: string[]; // Specific modules active for this outlet
    schedule?: WorkHours[]; // Operational Hours
    paymentMethods?: PaymentMethodConfig[]; // Active Payment Methods
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
    startTime: number; // Timestamp for duration calc
}

// Accounting Models
export interface JournalEntry {
    id: string;
    date: string;
    description: string;
    reference: string; // e.g., Transaction ID
    account: string; // e.g., "Kas Besar", "Pendapatan"
    debit: number;
    credit: number;
    type: 'sales' | 'expense' | 'purchase';
}

// Notification System
export interface AppNotification {
    id: string;
    title: string;
    message: string;
    time: string; // ISO or relative
    type: 'info' | 'warning' | 'success' | 'alert';
    read: boolean;
}
