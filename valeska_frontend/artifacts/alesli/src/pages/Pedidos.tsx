import React from "react";
import { Plus } from "lucide-react";

type OrderStatus = "Nuevos" | "En Proceso" | "Listos" | "Entregados";
type Priority = "Alta" | "Media" | "Baja";

type Order = {
  id: string;
  client: string;
  arrangement: string;
  price: string;
  dueDate: string;
  priority: Priority;
  status: OrderStatus;
};

const mockOrders: Order[] = [
  { id: "O-201", client: "Ana V.", arrangement: "Caja de Rosas", price: "$850", dueDate: "Hoy 14:00", priority: "Alta", status: "Nuevos" },
  { id: "O-202", client: "Luis M.", arrangement: "Ramo Cumpleaños", price: "$600", dueDate: "Mañana 10:00", priority: "Media", status: "Nuevos" },
  { id: "O-203", client: "Boda Silva", arrangement: "8 Centros Mesa", price: "$4,500", dueDate: "Sáb 16:00", priority: "Alta", status: "Nuevos" },
  
  { id: "O-198", client: "Carla D.", arrangement: "Arreglo Tulipanes", price: "$1,200", dueDate: "Hoy 12:00", priority: "Alta", status: "En Proceso" },
  { id: "O-199", client: "Juan P.", arrangement: "Ramo Sencillo", price: "$350", dueDate: "Hoy 17:00", priority: "Baja", status: "En Proceso" },
  { id: "O-200", client: "Hotel X", arrangement: "Lobby Arreglo", price: "$2,000", dueDate: "Mañana 09:00", priority: "Media", status: "En Proceso" },
  
  { id: "O-195", client: "María G.", arrangement: "Canasta Floral", price: "$950", dueDate: "Hoy 11:00", priority: "Media", status: "Listos" },
  { id: "O-196", client: "Pedro C.", arrangement: "Orquídea Maceta", price: "$1,500", dueDate: "Hoy 13:00", priority: "Media", status: "Listos" },
  
  { id: "O-190", client: "Sonia R.", arrangement: "Corona Fúnebre", price: "$3,200", dueDate: "Ayer", priority: "Alta", status: "Entregados" },
  { id: "O-191", client: "Diego F.", arrangement: "Ramo Rosas Rojas", price: "$700", dueDate: "Ayer", priority: "Media", status: "Entregados" },
  { id: "O-192", client: "Elena T.", arrangement: "Ramo Primaveral", price: "$550", dueDate: "Ayer", priority: "Baja", status: "Entregados" },
];

const priorityColors: Record<Priority, string> = {
  Alta: "bg-red-500 text-white",
  Media: "bg-yellow-500 text-white",
  Baja: "bg-blue-500 text-white"
};

export default function Pedidos() {
  const columns: OrderStatus[] = ["Nuevos", "En Proceso", "Listos", "Entregados"];

  return (
    <div className="flex flex-col gap-6 h-full">
      <header className="flex justify-between items-end mb-2 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-shadow-sm">Pedidos</h1>
          <p className="text-white/80">Tablero de producción y seguimiento</p>
        </div>
        <button className="glass-panel hover:bg-white/20 transition-colors flex items-center gap-2 px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Nuevo Pedido
        </button>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start min-h-[500px]">
        {columns.map(col => {
          const columnOrders = mockOrders.filter(o => o.status === col);
          
          return (
            <div key={col} className="flex flex-col min-w-[300px] w-1/4 glass-panel p-4 h-full shrink-0">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/20">
                <h3 className="font-semibold text-lg">{col}</h3>
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {columnOrders.length}
                </span>
              </div>
              
              <div className="flex flex-col gap-3 overflow-y-auto">
                {columnOrders.map(order => (
                  <div key={order.id} className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-white/60">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-white/20 ${priorityColors[order.priority]}`}>
                        {order.priority}
                      </span>
                    </div>
                    <h4 className="font-bold text-white mb-1">{order.client}</h4>
                    <p className="text-sm text-white/80 mb-3">{order.arrangement}</p>
                    
                    <div className="flex justify-between items-center text-xs mt-auto pt-2 border-t border-white/10">
                      <span className="text-white/70">{order.dueDate}</span>
                      <span className="font-semibold">{order.price}</span>
                    </div>
                  </div>
                ))}
                {columnOrders.length === 0 && (
                  <div className="text-center text-white/40 text-sm py-4 border-2 border-dashed border-white/10 rounded-xl">
                    Vacío
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
