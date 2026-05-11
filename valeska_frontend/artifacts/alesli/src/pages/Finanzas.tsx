import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowDownRight, ArrowUpRight, DollarSign, Building2, CreditCard, Smartphone, QrCode, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const chartData = [
  { month: "Ene", ingresos: 12400, gastos: 8200 },
  { month: "Feb", ingresos: 14200, gastos: 9100 },
  { month: "Mar", ingresos: 18500, gastos: 11000 },
  { month: "Abr", ingresos: 16800, gastos: 9500 },
  { month: "May", ingresos: 21000, gastos: 12500 },
  { month: "Jun", ingresos: 19450, gastos: 10200 },
];

const transactions = [
  { id: 1, date: "15 Jun, 10:30", description: "Venta: Arreglo A-4 'Amor' (Boda)", amount: 340, type: "income", category: "Venta" },
  { id: 2, date: "14 Jun, 16:45", description: "Compra: Proveedor Mayorista Flores", amount: -1250, type: "expense", category: "Inventario" },
  { id: 3, date: "14 Jun, 11:20", description: "Anticipo: Arreglo A-3 'Feliz Cumpleaños'", amount: 175, type: "income", category: "Anticipo" },
  { id: 4, date: "13 Jun, 09:15", description: "Venta: Arreglo A-2 × 3", amount: 600, type: "income", category: "Venta" },
  { id: 5, date: "12 Jun, 14:00", description: "Anticipo: Arreglo A-4 × 2 (Evento)", amount: 340, type: "income", category: "Anticipo" },
  { id: 6, date: "12 Jun, 10:00", description: "Gasto: Material de Empaque", amount: -320, type: "expense", category: "Materiales" },
];

const paymentMethods = [
  {
    id: "transfer",
    label: "Transferencia Bancaria",
    icon: Building2,
    color: "blue",
    detail: "Banco Unión · Bisa · BCP",
    active: true,
  },
  {
    id: "card",
    label: "Débito / Crédito",
    icon: CreditCard,
    color: "purple",
    detail: "Visa · Mastercard · Maestro",
    active: true,
  },
  {
    id: "billetera",
    label: "Billetera Móvil",
    icon: Smartphone,
    color: "green",
    detail: "Tigo Money · Movistar · Viva",
    active: true,
  },
  {
    id: "qr",
    label: "Pago QR",
    icon: QrCode,
    color: "amber",
    detail: "QR interoperable Bolivia",
    active: true,
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-200 border-blue-400/30",
  purple: "bg-purple-500/20 text-purple-200 border-purple-400/30",
  green: "bg-green-500/20 text-green-200 border-green-400/30",
  amber: "bg-amber-500/20 text-amber-200 border-amber-400/30",
};

export default function Finanzas() {
  const [anticipoTotal, setAnticipoTotal] = useState("");
  const computed = anticipoTotal ? Math.ceil(parseFloat(anticipoTotal) * 0.5) : null;

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-[#111111]">Finanzas</h1>
        <p className="text-[#7A3055]">Resumen financiero, pagos y flujo de caja</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-200 border border-green-500/30">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium">Total Ingresos</p>
            <p className="text-2xl font-bold text-shadow-sm">102,350 Bs</p>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-200 border border-red-500/30">
            <ArrowDownRight size={24} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium">Total Gastos</p>
            <p className="text-2xl font-bold text-shadow-sm">60,500 Bs</p>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-200 border border-yellow-500/30">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium">Ganancia Neta</p>
            <p className="text-2xl font-bold text-shadow-sm">41,850 Bs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col min-h-[380px]">
          <h2 className="text-xl font-semibold mb-6 text-shadow-sm">Ingresos vs Gastos (6 Meses)</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.8)" }} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.8)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{ backgroundColor: "rgba(20,20,20,0.8)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="ingresos" name="Ingresos" fill="rgba(74, 222, 128, 0.8)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" name="Gastos" fill="rgba(248, 113, 113, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-shadow-sm">Transacciones Recientes</h2>
          <div className="flex flex-col gap-3 overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm line-clamp-1 flex-1 pr-2">{tx.description}</span>
                  <span className={`font-bold whitespace-nowrap text-sm ${tx.type === "income" ? "text-green-300" : "text-red-300"}`}>
                    {tx.type === "income" ? "+" : "-"}{Math.abs(tx.amount)} Bs
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">{tx.date}</span>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${
                    tx.category === "Anticipo" ? "bg-amber-500/20 text-amber-200 border-amber-400/30" : "bg-white/10 text-white/70 border-white/10"
                  }`}>
                    {tx.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAYMENT MODULE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Payment Methods */}
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-xl font-bold text-shadow-sm">Métodos de Pago Aceptados</h2>
          <p className="text-white/65 text-sm">Aceptamos los siguientes métodos para facilitar tus pagos.</p>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-testid={`payment-method-${method.id}`}
                  className={`flex flex-col gap-2 p-4 rounded-xl border ${colorMap[method.color]}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={22} />
                    <CheckCircle size={14} className="text-white/60" />
                  </div>
                  <p className="font-bold text-white text-sm leading-tight">{method.label}</p>
                  <p className="text-[11px] text-white/60">{method.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Anticipo Calculator */}
        <div className="glass-panel p-6 space-y-4 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-6 -right-6 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/25 border border-amber-400/30 text-amber-200">
              <AlertCircle size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-shadow-sm">Anticipo de Reserva</h2>
              <p className="text-xs text-amber-200/80 font-semibold">Se requiere el 50% para confirmar el pedido</p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-500/10 border border-amber-400/25 p-4 text-sm text-white/80 leading-relaxed">
            Para garantizar la disponibilidad del arreglo y la frescura de las flores, <strong>todos los pedidos requieren un anticipo del 50%</strong> del valor total al momento de la reserva. El saldo restante se cancela al momento de la entrega.
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-white/90">Calcular anticipo</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  data-testid="input-anticipo-total"
                  type="number"
                  value={anticipoTotal}
                  onChange={(e) => setAnticipoTotal(e.target.value)}
                  placeholder="Precio total (Bs)"
                  className="w-full rounded-xl bg-white/10 border border-white/25 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm"
                />
              </div>
            </div>

            {computed !== null && !isNaN(computed) && computed > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-white/15 border border-white/25 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs text-white/60">Anticipo requerido (50%)</p>
                  <p className="text-3xl font-bold text-amber-300">{computed} Bs</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Saldo al entregar</p>
                  <p className="text-xl font-bold text-white">{Math.ceil(parseFloat(anticipoTotal) - computed)} Bs</p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[100, 140, 200, 340, 350, 120].map((price) => (
              <button
                key={price}
                data-testid={`quick-price-${price}`}
                onClick={() => setAnticipoTotal(String(price))}
                className="rounded-lg bg-white/10 hover:bg-white/20 py-2 text-xs font-bold text-white/80 hover:text-white transition-all border border-white/15"
              >
                {price} Bs
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
