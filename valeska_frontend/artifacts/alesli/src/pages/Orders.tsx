import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Filter, Plus, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const allOrders = [
  { id: "ORD-101", customer: "Sophie Laurent", item: "Wedding Arch — Roses & Peonies", total: 3200, status: "confirmed", priority: "high", placed: "May 9, 09:12", due: "May 12, 10:00", notes: "White and blush palette only" },
  { id: "ORD-100", customer: "James Park", item: "Birthday Bouquet — Sunflowers", total: 480, status: "processing", priority: "medium", placed: "May 9, 08:45", due: "May 9, 15:00", notes: "" },
  { id: "ORD-099", customer: "Camila Torres", item: "Office Arrangement — Mixed Greens", total: 650, status: "ready", priority: "low", placed: "May 8, 17:30", due: "May 10, 09:00", notes: "Reception desk delivery" },
  { id: "ORD-098", customer: "Marco Ricci", item: "Anniversary Roses — 50 Stems", total: 920, status: "delivered", priority: "high", placed: "May 7, 11:00", due: "May 8, 18:00", notes: "Red ribbon wrap" },
  { id: "ORD-097", customer: "Ana Herrera", item: "Sympathy Wreath", total: 750, status: "confirmed", priority: "high", placed: "May 9, 10:00", due: "May 10, 14:00", notes: "White lilies preferred" },
  { id: "ORD-096", customer: "Lucas Fontaine", item: "Centerpieces × 8", total: 1600, status: "processing", priority: "high", placed: "May 8, 14:20", due: "May 11, 08:00", notes: "Venue: Hotel Marqués" },
  { id: "ORD-095", customer: "Isabela Cruz", item: "Bridal Bouquet — Wildflowers", total: 580, status: "ready", priority: "medium", placed: "May 7, 09:00", due: "May 9, 07:30", notes: "" },
  { id: "ORD-094", customer: "David Müller", item: "Potted Orchid — Gift", total: 320, status: "delivered", priority: "low", placed: "May 6, 15:00", due: "May 7, 12:00", notes: "Gift wrap" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "bg-blue-400/30 text-blue-100 border border-blue-300/30", icon: Clock },
  processing: { label: "Processing", color: "bg-amber-400/30 text-amber-100 border border-amber-300/30", icon: AlertCircle },
  ready: { label: "Ready", color: "bg-green-400/30 text-green-100 border border-green-300/30", icon: CheckCircle },
  delivered: { label: "Delivered", color: "bg-white/20 text-white/70 border border-white/20", icon: XCircle },
};

const priorityConfig: Record<string, string> = {
  high: "bg-red-400/30 text-red-100 border border-red-300/30",
  medium: "bg-amber-400/20 text-amber-100 border border-amber-300/20",
  low: "bg-green-400/20 text-green-100 border border-green-300/20",
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = allOrders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.item.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="text-white/60 text-sm mt-1">All customer orders — search, filter, and track</p>
        </div>
        <button
          data-testid="button-new-order"
          className="flex items-center gap-2 rounded-xl glass-panel px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
        >
          <Plus size={16} /> New Order
        </button>
      </div>

      <div className="glass-panel p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            data-testid="input-order-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or item…"
            className="w-full rounded-lg bg-white/10 pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-white/50" />
          {["all", "confirmed", "processing", "ready", "delivered"].map((s) => (
            <button
              key={s}
              data-testid={`filter-${s}`}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-all ${
                statusFilter === s ? "bg-white/25 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto_auto_auto] gap-x-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/40 border-b border-white/10">
          <span>ID</span>
          <span>Customer</span>
          <span>Item</span>
          <span>Total</span>
          <span>Priority</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-white/10">
          {filtered.map((order, i) => {
            const sc = statusConfig[order.status];
            const StatusIcon = sc.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                data-testid={`row-order-${order.id}`}
                className="grid grid-cols-[auto_1fr_1fr_auto_auto_auto] gap-x-4 px-5 py-4 items-center hover:bg-white/5 transition-colors"
              >
                <span className="text-xs font-mono text-white/50">{order.id}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{order.customer}</p>
                  <p className="text-xs text-white/50 mt-0.5">Due: {order.due}</p>
                </div>
                <div>
                  <p className="text-sm text-white/85">{order.item}</p>
                  {order.notes && <p className="text-xs text-white/40 mt-0.5 italic">{order.notes}</p>}
                </div>
                <span className="text-sm font-bold text-white">${order.total.toLocaleString()}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${priorityConfig[order.priority]}`}>
                  {order.priority}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.color}`}>
                  <StatusIcon size={12} />
                  {sc.label}
                </span>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-center text-white/40 text-sm">No orders match your search.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const count = allOrders.filter((o) => o.status === key).length;
          const Icon = cfg.icon;
          return (
            <div key={key} className="glass-panel p-4 text-center">
              <Icon size={20} className="mx-auto mb-2 text-white/60" />
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-white/60 mt-1">{cfg.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
