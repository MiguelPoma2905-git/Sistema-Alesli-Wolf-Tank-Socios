import {
  mockClients,
  mockInventory,
  mockOrders,
  mockProducts,
  mockPurchases,
  mockSuppliers,
  purchasesMonthly,
  salesMonthly,
} from '@/data/mockData';
import type {
  Client,
  DashboardStats,
  InventoryItem,
  Order,
  OrderStatus,
  Product,
  Purchase,
  Supplier,
} from '@/types/models';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function fetchDashboard(): Promise<DashboardStats> {
  await delay();
  const salesTodayBs = mockOrders
    .filter((o) => o.createdAt.startsWith(new Date().toISOString().slice(0, 10)))
    .reduce((a, o) => a + o.totalBs, 0);

  return {
    salesTodayBs: salesTodayBs || 1840,
    pendingOrders: mockOrders.filter((o) => o.status === 'pendiente' || o.status === 'confirmado').length,
    revenueMonthBs: 16240,
    lowStockCount: mockInventory.filter((i) => i.quantity <= i.minStock).length,
    deliveredToday: mockOrders.filter((o) => o.status === 'entregado').length,
    recentPurchases: mockPurchases.slice(0, 3),
    topProducts: [
      { productId: 'p2', name: 'Ramo rosas rojas premium', units: 28 },
      { productId: 'p4', name: 'Arreglo premium horizontal', units: 14 },
      { productId: 'p5', name: 'Caja floral elegante', units: 11 },
    ],
  };
}

export async function fetchProducts(q?: string, category?: string): Promise<Product[]> {
  await delay(300);
  let list = [...mockProducts];
  if (q?.trim()) {
    const s = q.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s));
  }
  if (category && category !== 'todas') {
    list = list.filter((p) => p.category === category);
  }
  return list;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(250);
  return mockProducts.find((p) => p.id === id) ?? null;
}

export async function fetchOrders(): Promise<Order[]> {
  await delay(350);
  return [...mockOrders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  await delay(400);
  const o = mockOrders.find((x) => x.id === id);
  if (o) o.status = status;
  return o ? { ...o } : null;
}

export async function fetchClients(): Promise<Client[]> {
  await delay(300);
  return mockClients;
}

export async function fetchSuppliers(): Promise<Supplier[]> {
  await delay(300);
  return mockSuppliers;
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  await delay(300);
  return mockInventory;
}

export async function fetchPurchases(): Promise<Purchase[]> {
  await delay(300);
  return mockPurchases;
}

export async function fetchReportSeries() {
  await delay(350);
  return {
    salesMonthly,
    purchasesMonthly,
    profitMonthly: salesMonthly.map((s, i) => ({
      month: s.month,
      value: Math.max(0, s.value - (purchasesMonthly[i]?.value ?? 0)),
    })),
    ordersByStatus: [
      { label: 'Pendiente', value: 4 },
      { label: 'Confirmado', value: 3 },
      { label: 'En preparación', value: 5 },
      { label: 'Enviado', value: 2 },
      { label: 'Entregado', value: 28 },
      { label: 'Cancelado', value: 1 },
    ],
  };
}
