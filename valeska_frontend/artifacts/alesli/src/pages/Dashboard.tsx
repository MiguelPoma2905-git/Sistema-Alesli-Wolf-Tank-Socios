import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { PlusCircle, TrendingUp, PackageSearch } from "lucide-react";

const revenueData = [
  { value: 1200 },
  { value: 1400 },
  { value: 1350 },
  { value: 1600 },
  { value: 1550 },
  { value: 1847 },
];

const recentOrders = [
  { id: "ORD-089", client: "María González", arrangement: "Ramo 24 Rosas", total: "$1,200", status: "En Proceso", date: "Hoy, 14:00" },
  { id: "ORD-088", client: "Carlos Ruiz", arrangement: "Caja Tulipanes", total: "$850", status: "Pendiente", date: "Mañana, 10:00" },
  { id: "ORD-087", client: "Ana Silva", arrangement: "Centro de Mesa Lirios", total: "$1,500", status: "Listo", date: "Hoy, 16:30" },
  { id: "ORD-086", client: "Diego Torres", arrangement: "Ramo Primaveral", total: "$600", status: "Entregado", date: "Ayer, 11:00" },
  { id: "ORD-085", client: "Elena Díaz", arrangement: "Corona Fúnebre", total: "$3,200", status: "Entregado", date: "Ayer, 15:00" },
];

const statusColors: Record<string, string> = {
  "Pendiente": "bg-yellow-500/20 text-yellow-100 border-yellow-500/30",
  "En Proceso": "bg-blue-500/20 text-blue-100 border-blue-500/30",
  "Listo": "bg-green-500/20 text-green-100 border-green-500/30",
  "Entregado": "bg-white/10 text-white/60 border-white/20",
};

export default function Dashboard() {
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-[#111111]">Buenos días, Aleslí 🌸</h1>
        <p className="text-[#7A3055] capitalize">{today}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-white/90">Salud Financiera</h3>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-green-400/50">
              <span className="font-bold text-lg">82%</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-green-200">Ingresos: $12,450</span>
              <span className="text-red-200">Gastos: $4,230</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-white/90">Ingresos del Día</h3>
            <span className="rounded-full bg-green-500/30 px-2 py-0.5 text-xs font-medium text-green-100 border border-green-500/40">
              +12% vs ayer
            </span>
          </div>
          <div className="mt-2 text-4xl font-bold text-shadow-sm">$1,847</div>
          <div className="h-12 mt-2 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#fff" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-white/90">Entregas Pendientes</h3>
          <div className="text-4xl font-bold text-shadow-sm">7 <span className="text-xl font-normal text-white/70">pendientes</span></div>
          <div className="flex gap-2 flex-wrap mt-auto">
            <span className="rounded-md bg-red-500/30 px-2 py-1 text-xs border border-red-500/50">2 Urgentes</span>
            <span className="rounded-md bg-yellow-500/30 px-2 py-1 text-xs border border-yellow-500/50">3 Hoy</span>
            <span className="rounded-md bg-green-500/30 px-2 py-1 text-xs border border-green-500/50">2 Mañana</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button data-testid="btn-new-order" className="glass-panel hover:bg-white/20 transition-colors flex items-center gap-2 px-6 py-3 font-medium">
          <PlusCircle size={18} /> Nuevo Pedido
        </button>
        <button data-testid="btn-add-income" className="glass-panel hover:bg-white/20 transition-colors flex items-center gap-2 px-6 py-3 font-medium">
          <TrendingUp size={18} /> Registrar Ingreso
        </button>
        <button data-testid="btn-view-inventory" className="glass-panel hover:bg-white/20 transition-colors flex items-center gap-2 px-6 py-3 font-medium">
          <PackageSearch size={18} /> Ver Inventario
        </button>
      </div>

      <div className="glass-panel p-6 mt-2">
        <h2 className="text-xl font-semibold mb-4 text-shadow-sm">Órdenes Recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-white/70">
                <th className="py-3 px-2 font-medium">ID</th>
                <th className="py-3 px-2 font-medium">Cliente</th>
                <th className="py-3 px-2 font-medium">Arreglo</th>
                <th className="py-3 px-2 font-medium">Total</th>
                <th className="py-3 px-2 font-medium">Estado</th>
                <th className="py-3 px-2 font-medium">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 text-white/80">{order.id}</td>
                  <td className="py-3 px-2 font-medium">{order.client}</td>
                  <td className="py-3 px-2">{order.arrangement}</td>
                  <td className="py-3 px-2">{order.total}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white/80">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
