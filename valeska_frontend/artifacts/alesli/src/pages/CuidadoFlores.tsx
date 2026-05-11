import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Thermometer, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const careGuides = [
  {
    flower: "Rosas",
    emoji: "🌹",
    lifespan: "7–14 días",
    water: "Cambiar agua cada 2 días",
    light: "Luz indirecta brillante",
    temp: "15–22 °C",
    tips: ["Cortar 2 cm del tallo en diagonal bajo el agua", "Retirar hojas bajo la línea del agua", "Añadir preservante floral al agua", "Mantener alejadas del sol directo y la fruta"],
    alertLevel: "low",
  },
  {
    flower: "Tulipanes",
    emoji: "🌷",
    lifespan: "5–10 días",
    water: "Agua fría, cambiar cada día",
    light: "Evitar sol directo",
    temp: "10–18 °C",
    tips: ["Prefieren agua muy fría o con hielo", "Siguen creciendo después de cortados", "Envolver en papel para mantener forma", "No mezclar con narcisos recién cortados"],
    alertLevel: "medium",
  },
  {
    flower: "Lirios",
    emoji: "🪷",
    lifespan: "10–14 días",
    water: "Cambiar agua cada 3 días",
    light: "Luz brillante indirecta",
    temp: "18–24 °C",
    tips: ["Remover estambres para evitar manchas de polen", "No dejar secar el tallo", "Cortar tallos helicoidalmente", "ALERTA: tóxicos para gatos"],
    alertLevel: "high",
  },
  {
    flower: "Peonías",
    emoji: "🌸",
    lifespan: "5–7 días",
    water: "Agua tibia, diaria",
    light: "Lugar fresco, sin sol directo",
    temp: "12–18 °C",
    tips: ["Comprar en capullo para mayor duración", "Sumergir tallo en agua caliente 30 seg", "Refrigerar de noche para prolongar vida", "Quitar pétalos exteriores dañados"],
    alertLevel: "medium",
  },
  {
    flower: "Orquídeas",
    emoji: "🌺",
    lifespan: "21–60 días",
    water: "Riego semanal, no encharcadas",
    light: "Luz brillante sin sol directo",
    temp: "18–27 °C",
    tips: ["Regar por inmersión 10 minutos", "Humedad del 50–70%", "Nunca dejar agua en el centro", "Fertilizar mensualmente en floración"],
    alertLevel: "low",
  },
  {
    flower: "Girasoles",
    emoji: "🌻",
    lifespan: "7–12 días",
    water: "Agua abundante, cambiar cada 2 días",
    light: "Sol directo o luz muy brillante",
    temp: "18–25 °C",
    tips: ["Necesitan más agua que la mayoría", "El tallo puede absorber agua por los lados", "Mantener en lugar luminoso", "Mezclan bien con casi cualquier arreglo"],
    alertLevel: "low",
  },
];

const alertColors: Record<string, string> = {
  low: "border-green-400/30 bg-green-400/10",
  medium: "border-amber-400/30 bg-amber-400/10",
  high: "border-red-400/30 bg-red-400/10",
};

const alertIcons: Record<string, React.ElementType> = {
  low: CheckCircle,
  medium: Clock,
  high: AlertTriangle,
};

const alertText: Record<string, string> = {
  low: "Fácil mantenimiento",
  medium: "Cuidado moderado",
  high: "Requiere atención especial",
};

const seasonalTips = [
  { season: "🌱 Primavera", tip: "Temporada alta de peonías y tulipanes. Controlar temperatura del taller — el calor reduce vida." },
  { season: "☀️ Verano", tip: "Hidratación crítica. Refrigerar flores sensibles. Evitar ventanas expuestas al sol." },
  { season: "🍂 Otoño", tip: "Ideal para crisantemos y dálias. Excelente duración con temperaturas frescas." },
  { season: "❄️ Invierno", tip: "Rosas y lirios en su mejor momento. Cuidar del frío extremo en transporte." },
];

export default function CuidadoFlores() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Leaf size={28} /> Flower Care
        </h1>
        <p className="text-white/60 text-sm mt-1">Care guides for every bloom in your studio</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Droplets, label: "Hydration", value: "Critical factor" },
          { icon: Sun, label: "Light", value: "Varies by species" },
          { icon: Thermometer, label: "Temperature", value: "Cool = longer life" },
          { icon: Clock, label: "Avg Lifespan", value: "7–12 days" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-panel p-4 text-center">
            <Icon size={20} className="mx-auto mb-2 text-white/70" />
            <p className="text-xs text-white/50">{label}</p>
            <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {careGuides.map((guide, i) => {
          const AlertIcon = alertIcons[guide.alertLevel];
          return (
            <motion.div
              key={guide.flower}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              data-testid={`card-care-${guide.flower.toLowerCase()}`}
              className={`glass-panel p-5 border ${alertColors[guide.alertLevel]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{guide.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white text-lg">{guide.flower}</h3>
                    <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${
                      guide.alertLevel === "low" ? "text-green-300" : guide.alertLevel === "medium" ? "text-amber-300" : "text-red-300"
                    }`}>
                      <AlertIcon size={10} /> {alertText[guide.alertLevel]}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">Vida útil</p>
                  <p className="text-sm font-semibold text-white">{guide.lifespan}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg bg-white/10 p-2 text-center">
                  <Droplets size={13} className="mx-auto mb-1 text-blue-300" />
                  <p className="text-[10px] text-white/50 leading-tight">{guide.water}</p>
                </div>
                <div className="rounded-lg bg-white/10 p-2 text-center">
                  <Sun size={13} className="mx-auto mb-1 text-amber-300" />
                  <p className="text-[10px] text-white/50 leading-tight">{guide.light}</p>
                </div>
                <div className="rounded-lg bg-white/10 p-2 text-center">
                  <Thermometer size={13} className="mx-auto mb-1 text-rose-300" />
                  <p className="text-[10px] text-white/50 leading-tight">{guide.temp}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                {guide.tips.map((tip, ti) => (
                  <div key={ti} className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/40 flex-shrink-0" />
                    <p className="text-xs text-white/70 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-panel p-5">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><Leaf size={16} /> Consejos por Temporada</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seasonalTips.map((s) => (
            <div key={s.season} className="rounded-xl bg-white/10 p-4">
              <p className="font-semibold text-white text-sm mb-1">{s.season}</p>
              <p className="text-xs text-white/65 leading-relaxed">{s.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
