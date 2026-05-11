import React, { useState } from "react";
import { AlertTriangle, Plus } from "lucide-react";

type ItemType = {
  id: string;
  name: string;
  category: "Flores Frescas" | "Materiales" | "Accesorios";
  stock: number;
  threshold: number;
  unit: string;
  lastRestock: string;
};

const mockInventory: ItemType[] = [
  { id: "1", name: "Rosas Rojas (Libertad)", category: "Flores Frescas", stock: 120, threshold: 50, unit: "tallos", lastRestock: "Hace 1 día" },
  { id: "2", name: "Tulipanes Blancos", category: "Flores Frescas", stock: 15, threshold: 30, unit: "tallos", lastRestock: "Hace 3 días" },
  { id: "3", name: "Lirios Orientales", category: "Flores Frescas", stock: 45, threshold: 20, unit: "tallos", lastRestock: "Hace 2 días" },
  { id: "4", name: "Eucalipto", category: "Flores Frescas", stock: 8, threshold: 15, unit: "manojos", lastRestock: "Hace 4 días" },
  { id: "5", name: "Papel Kraft", category: "Materiales", stock: 200, threshold: 50, unit: "hojas", lastRestock: "Hace 2 semanas" },
  { id: "6", name: "Listón de Seda (Rosa)", category: "Materiales", stock: 12, threshold: 5, unit: "rollos", lastRestock: "Hace 1 semana" },
  { id: "7", name: "Esponja Floral (Oasis)", category: "Materiales", stock: 85, threshold: 20, unit: "bloques", lastRestock: "Hace 5 días" },
  { id: "8", name: "Jarrón de Cristal (Cilindro)", category: "Accesorios", stock: 24, threshold: 10, unit: "unidades", lastRestock: "Hace 1 mes" },
  { id: "9", name: "Base de Cerámica Blanca", category: "Accesorios", stock: 6, threshold: 15, unit: "unidades", lastRestock: "Hace 2 meses" },
  { id: "10", name: "Tarjetas de Dedicatoria", category: "Accesorios", stock: 500, threshold: 100, unit: "unidades", lastRestock: "Hace 3 semanas" },
];

export default function Inventario() {
  const [activeTab, setActiveTab] = useState<"Flores Frescas" | "Materiales" | "Accesorios">("Flores Frescas");
  
  const filteredItems = mockInventory.filter(item => item.category === activeTab);
  const lowStockItems = mockInventory.filter(item => item.stock < item.threshold);

  const getProgressColor = (stock: number, threshold: number) => {
    const ratio = stock / threshold;
    if (ratio < 1) return "bg-red-500";
    if (ratio < 1.5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-3xl font-bold text-shadow-sm">Inventario</h1>
          <p className="text-white/80">Gestión de existencias y alertas de reposición</p>
        </div>
        <button data-testid="btn-add-item" className="glass-panel hover:bg-white/20 transition-colors flex items-center gap-2 px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Añadir Artículo
        </button>
      </header>

      {lowStockItems.length > 0 && (
        <div className="glass-panel p-4 bg-yellow-500/20 border-yellow-500/40 flex items-start gap-3">
          <AlertTriangle className="text-yellow-300 shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-100">Atención: Stock Bajo</h4>
            <p className="text-sm text-yellow-200/80">
              {lowStockItems.length} {lowStockItems.length === 1 ? 'artículo está' : 'artículos están'} por debajo del límite de reposición.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2 border-b border-white/20 pb-2">
        {(["Flores Frescas", "Materiales", "Accesorios"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab 
                ? "bg-white/20 font-medium border-b-2 border-white" 
                : "hover:bg-white/10 text-white/70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-panel p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              {item.stock < item.threshold && (
                <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
              )}
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">Stock: <span className="font-medium text-white">{item.stock}</span> {item.unit}</span>
                <span className="text-white/60">Min: {item.threshold}</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(item.stock, item.threshold)}`} 
                  style={{ width: `${Math.min(100, (item.stock / (item.threshold * 2)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center text-xs text-white/60">
              <span>Actualizado: {item.lastRestock}</span>
              <button className="text-white/90 hover:text-white underline underline-offset-2">Actualizar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
