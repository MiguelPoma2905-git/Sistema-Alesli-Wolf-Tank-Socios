export type Role = 'admin' | 'vendedor' | 'almacen';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type OrderStatus =
  | 'pendiente'
  | 'confirmado'
  | 'en_preparacion'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export type ProductCategory =
  | 'ramos'
  | 'arreglos'
  | 'cajas'
  | 'globos'
  | 'chocolates'
  | 'peluches'
  | 'personalizado';

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  priceBs: number;
  images: string[];
  category: ProductCategory;
  stock: number;
  available: boolean;
  colors?: string[];
  flowers?: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPriceBs: number;
}

export interface Order {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  status: OrderStatus;
  scheduledAt: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  totalBs: number;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  favoriteProductIds: string[];
  totalOrders: number;
  totalSpentBs: number;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  supplies: string[];
  lastPurchaseAt: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplierName: string;
  amountBs: number;
  date: string;
  reference: string;
  items: string[];
}

export interface DashboardStats {
  salesTodayBs: number;
  pendingOrders: number;
  revenueMonthBs: number;
  lowStockCount: number;
  deliveredToday: number;
  recentPurchases: Purchase[];
  topProducts: { productId: string; name: string; units: number }[];
}

export interface MonthlyPoint {
  month: string;
  value: number;
}
