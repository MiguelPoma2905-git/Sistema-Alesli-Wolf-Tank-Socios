import React, { useState } from "react";
import { MapPin, Clock, CheckCircle2 } from "lucide-react";

type DeliveryStatus = "Pendiente" | "En Camino" | "Entregado";
type DeliveryPriority = "Normal" | "Urgente";

type DeliveryType = {
  id: string;
  client: string;
  address: string;
  arrangement: string;
  time: string;
  status: DeliveryStatus;
  priority: DeliveryPriority;
};

const mockDeliveries: DeliveryType[] = [
  { id: "D-101", client: "Roberto Sánchez", address: "Av. Reforma 450, Lomas", arrangement: "Ramo de Aniversario", time: "10:00 - 12:00", status: "Pendiente", priority: "Urgente" },
  { id: "D-102", client: "Lucía Méndez", address: "Calle 8 #123, Centro", arrangement: "Caja de Rosas Premium", time: "11:30 - 13:00", status: "En Camino", priority: "Normal" },
  { id: "D-103", client: "Hotel Grand Boutique", address: "Blvd. Kukulcan 800", arrangement: "12 Centros de Mesa", time: "13:00 - 14:00", status: "Pendiente", priority: "Urgente" },
  { id: "D-104", client: "Valeria Domínguez", address: "Paseo del Río 22", arrangement: "Orquídeas Blancas", time: "15:00 - 17:00", status: "Pendiente", priority: "Normal" },
  { id: "D-105", client: "Carlos Fuentes", address: "Av. Universidad 1000", arrangement: "Arreglo Tropical", time: "16:00 - 18:00", status: "Pendiente", priority: "Normal" },
  { id: "D-106", client: "Marta Ríos", address: "Callejón de las Flores 5", arrangement: "Ramo Primaveral", time: "09:00 - 10:00", status: "Entregado", priority: "Normal" },
];

export default function Entregas() {
  const [filter, setFilter] = useState<"Todos" | "Hoy" | "Urgente" | "Completado">("Todos");

  const filteredDeliveries = mockDeliveries.filter(d => {
    if (filter === "Todos") return true;
    if (filter === "Urgente") return d.priority === "Urgente" && d.status !== "Entregado";
    if (filter === "Completado") return d.status === "Entregado";
    if (filter === "Hoy") return d.status !== "Entregado";
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-shadow-sm">Entregas</h1>
        <p className="text-white/80">Logística y rutas del día</p>
      </header>

      <div className="flex gap-3 flex-wrap">
        {(["Todos", "Hoy", "Urgente", "Completado"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f 
                ? "bg-white text-gray-900 shadow-md" 
                : "glass-panel hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDeliveries.map(delivery => (
          <div key={delivery.id} className="glass-panel p-5 flex flex-col gap-4 relative overflow-hidden group">
            {delivery.priority === "Urgente" && delivery.status !== "Entregado" && (
              <div className="absolute top-0 right-0 bg-red-500/80 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                URGENTE
              </div>
            )}
            
            <div className="flex justify-between items-start pt-1">
              <div>
                <h3 className="font-bold text-lg">{delivery.client}</h3>
                <p className="text-white/80 font-medium">{delivery.arrangement}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-xs border ${
                delivery.status === "Entregado" ? "bg-white/10 text-white/60 border-white/20" :
                delivery.status === "En Camino" ? "bg-blue-500/20 text-blue-100 border-blue-500/30" :
                "bg-yellow-500/20 text-yellow-100 border-yellow-500/30"
              }`}>
                {delivery.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-white/50" />
                <span>{delivery.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-white/50" />
                <span>{delivery.time}</span>
              </div>
            </div>

            {delivery.status !== "Entregado" && (
              <div className="mt-2 pt-4 border-t border-white/10 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 rounded-lg text-green-100 transition-colors text-sm font-medium">
                  <CheckCircle2 size={16} />
                  Marcar Entregado
                </button>
              </div>
            )}
          </div>
        ))}
        
        {filteredDeliveries.length === 0 && (
          <div className="col-span-full glass-panel p-8 text-center text-white/60">
            No hay entregas para mostrar con este filtro.
          </div>
        )}
      </div>
    </div>
  );
}
