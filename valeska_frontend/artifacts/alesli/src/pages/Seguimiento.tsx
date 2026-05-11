import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle, Truck, Package, Phone, Navigation } from "lucide-react";

const deliveries = [
  {
    id: "DEL-041",
    customer: "María González",
    address: "Calle Serrano 45, 3° B",
    item: "Ramo 24 Rosas",
    driver: "Carlos M.",
    phone: "+34 612 345 678",
    scheduledTime: "14:00",
    estimatedArrival: "13:52",
    stage: 4,
    status: "en_ruta",
    distance: "1.2 km",
    startedAt: "13:30",
  },
  {
    id: "DEL-040",
    customer: "Ana Herrera",
    address: "Av. Castellana 200, Portal 3",
    item: "Corona Fúnebre Blanca",
    driver: "Luis R.",
    phone: "+34 688 901 234",
    scheduledTime: "14:30",
    estimatedArrival: "14:25",
    stage: 3,
    status: "recogida",
    distance: "3.8 km",
    startedAt: "13:45",
  },
  {
    id: "DEL-039",
    customer: "Isabela Cruz",
    address: "Plaza Mayor 12, 1° Izq",
    item: "Ramo Novia Premium",
    driver: "Sofía V.",
    phone: "+34 655 432 109",
    scheduledTime: "07:30",
    estimatedArrival: "07:28",
    stage: 5,
    status: "entregado",
    distance: "0 km",
    startedAt: "07:00",
  },
  {
    id: "DEL-042",
    customer: "Lucas Fontaine",
    address: "Hotel Marqués, Gran Vía 55",
    item: "Centerpieces × 8",
    driver: "Pendiente",
    phone: "—",
    scheduledTime: "08:00",
    estimatedArrival: "—",
    stage: 1,
    status: "preparando",
    distance: "5.1 km",
    startedAt: "—",
  },
  {
    id: "DEL-043",
    customer: "Sophie Laurent",
    address: "Paseo del Prado 14",
    item: "Wedding Arch — Roses & Peonies",
    driver: "Roberto A.",
    phone: "+34 601 789 012",
    scheduledTime: "10:00",
    estimatedArrival: "09:55",
    stage: 2,
    status: "asignado",
    distance: "4.3 km",
    startedAt: "—",
  },
];

const stages = [
  { label: "Preparando", icon: Package },
  { label: "Asignado", icon: Truck },
  { label: "Recogida", icon: CheckCircle },
  { label: "En Ruta", icon: Navigation },
  { label: "Entregado", icon: CheckCircle },
];

const statusColors: Record<string, string> = {
  preparando: "bg-white/20 text-white/70",
  asignado: "bg-blue-400/30 text-blue-100",
  recogida: "bg-amber-400/30 text-amber-100",
  en_ruta: "bg-green-400/30 text-green-100",
  entregado: "bg-white/15 text-white/50",
};

const statusLabels: Record<string, string> = {
  preparando: "Preparando",
  asignado: "Asignado",
  recogida: "Recogida",
  en_ruta: "En Ruta",
  entregado: "Entregado",
};

export default function Seguimiento() {
  const [selected, setSelected] = useState<string | null>("DEL-041");

  const selectedDelivery = deliveries.find((d) => d.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <MapPin size={28} /> Delivery Tracking
        </h1>
        <p className="text-white/60 text-sm mt-1">Real-time status for all active deliveries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {deliveries.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              data-testid={`card-delivery-${d.id}`}
              onClick={() => setSelected(d.id)}
              className={`glass-panel p-4 cursor-pointer transition-all hover:bg-white/20 ${
                selected === d.id ? "border-white/50 bg-white/20" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white text-sm">{d.customer}</p>
                  <p className="text-xs text-white/50 mt-0.5 flex items-center gap-1">
                    <MapPin size={10} /> {d.address}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[d.status]}`}>
                  {statusLabels[d.status]}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{d.item}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {d.scheduledTime}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selectedDelivery ? (
            <motion.div
              key={selectedDelivery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 space-y-6 h-full"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/40 font-mono">{selectedDelivery.id}</p>
                  <h2 className="text-xl font-bold text-white mt-0.5">{selectedDelivery.customer}</h2>
                  <p className="text-sm text-white/60 mt-1 flex items-center gap-1.5">
                    <MapPin size={13} /> {selectedDelivery.address}
                  </p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${statusColors[selectedDelivery.status]}`}>
                  {statusLabels[selectedDelivery.status]}
                </span>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  {stages.map((stage, i) => {
                    const Icon = stage.icon;
                    const done = i + 1 <= selectedDelivery.stage;
                    const active = i + 1 === selectedDelivery.stage;
                    return (
                      <div key={stage.label} className="flex flex-col items-center gap-1 flex-1">
                        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                          active ? "bg-white text-rose-600 shadow-lg scale-110" :
                          done ? "bg-white/30 text-white" : "bg-white/10 text-white/30"
                        }`}>
                          <Icon size={15} />
                        </div>
                        <p className={`text-[10px] text-center leading-tight ${done ? "text-white/70" : "text-white/30"}`}>
                          {stage.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10 -z-0" />
                <div
                  className="absolute top-4 left-0 h-0.5 bg-white/40 transition-all"
                  style={{ width: `${((selectedDelivery.stage - 1) / (stages.length - 1)) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Producto", value: selectedDelivery.item },
                  { label: "Conductor", value: selectedDelivery.driver },
                  { label: "Hora programada", value: selectedDelivery.scheduledTime },
                  { label: "Llegada estimada", value: selectedDelivery.estimatedArrival },
                  { label: "Inicio", value: selectedDelivery.startedAt },
                  { label: "Distancia restante", value: selectedDelivery.distance },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-white/10 p-3">
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {selectedDelivery.phone !== "—" && (
                <button
                  data-testid={`button-call-${selectedDelivery.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 py-3 text-sm font-semibold text-white transition-all"
                >
                  <Phone size={15} /> Llamar a {selectedDelivery.driver} · {selectedDelivery.phone}
                </button>
              )}
            </motion.div>
          ) : (
            <div className="glass-panel p-10 text-center text-white/40 h-full flex items-center justify-center">
              <p>Selecciona una entrega para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
