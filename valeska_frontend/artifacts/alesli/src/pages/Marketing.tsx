import React, { useState } from "react";
import { SiInstagram, SiFacebook, SiWhatsapp } from "react-icons/si";
import { Calendar, Percent, Users, Heart } from "lucide-react";

export default function Marketing() {
  const [promos, setPromos] = useState([
    { id: 1, name: "Primavera en Flor", discount: 15, endDate: "30 May", active: true },
    { id: 2, name: "Bodas Anticipadas", discount: 10, endDate: "15 Jun", active: true },
    { id: 3, name: "Flash Sale Fin de Semana", discount: 20, endDate: "10 Jun", active: false },
  ]);

  const togglePromo = (id: number) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-shadow-sm">Marketing</h1>
        <p className="text-white/80">Alcance, promociones y fidelización</p>
      </header>

      {/* Social Media */}
      <h2 className="text-xl font-semibold mt-2 text-shadow-sm">Redes Sociales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white">
              <SiInstagram size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-xs text-white/70">@alesli.flor</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Seguidores</span>
              <span className="font-bold">12.4K</span>
            </div>
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Interacción</span>
              <span className="font-bold">4.8%</span>
            </div>
          </div>
          <div className="text-xs text-white/70 flex items-center gap-2 border-t border-white/10 pt-3 mt-2">
            <Calendar size={14} /> Próximo post: Hoy 18:00
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white">
              <SiFacebook size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Facebook</h3>
              <p className="text-xs text-white/70">Aleslí Florería</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Seguidores</span>
              <span className="font-bold">8.2K</span>
            </div>
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Interacción</span>
              <span className="font-bold">2.1%</span>
            </div>
          </div>
          <div className="text-xs text-white/70 flex items-center gap-2 border-t border-white/10 pt-3 mt-2">
            <Calendar size={14} /> Próximo post: Mañana 10:00
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <SiWhatsapp size={20} />
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-xs text-white/70">Catálogo Business</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Contactos</span>
              <span className="font-bold">1,450</span>
            </div>
            <div className="flex flex-col bg-white/5 p-2 rounded-lg">
              <span className="text-white/60 text-xs">Conversión</span>
              <span className="font-bold">18%</span>
            </div>
          </div>
          <div className="text-xs text-white/70 flex items-center gap-2 border-t border-white/10 pt-3 mt-2">
            <Calendar size={14} /> Campaña activa: Día de las Madres
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Promos */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-shadow-sm flex items-center gap-2">
            <Percent size={20} /> Promociones Activas
          </h2>
          {promos.map(promo => (
            <div key={promo.id} className={`glass-panel p-4 flex justify-between items-center transition-all ${!promo.active ? 'opacity-60' : ''}`}>
              <div>
                <h4 className="font-semibold text-lg">{promo.name}</h4>
                <p className="text-sm text-white/70">Descuento: {promo.discount}% • Vence: {promo.endDate}</p>
              </div>
              <button 
                onClick={() => togglePromo(promo.id)}
                className={`w-12 h-6 rounded-full relative transition-colors ${promo.active ? 'bg-green-400' : 'bg-white/20'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${promo.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          ))}
        </div>

        {/* Loyalty */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-shadow-sm flex items-center gap-2">
            <Heart size={20} /> Clientes VIP (Este Mes)
          </h2>
          <div className="glass-panel p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-4 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-semibold">Empresa Eventos S.A.</h4>
                <p className="text-sm text-white/70">12 Pedidos corporativos</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-green-300">$18,500</span>
              </div>
            </div>
            <div className="p-4 border-b border-white/10 flex items-center gap-4 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-semibold">Sofía Garza</h4>
                <p className="text-sm text-white/70">4 Pedidos (Eventos sociales)</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-green-300">$6,200</span>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-semibold">Martín López</h4>
                <p className="text-sm text-white/70">3 Suscripciones semanales</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-green-300">$2,400</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
