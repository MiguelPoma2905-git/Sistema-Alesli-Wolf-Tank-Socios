import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, Eye, PenLine, ShoppingBag,
  Package, Tag, ChevronDown, X, CheckCircle,
} from "lucide-react";

type ProductType = "arrangement" | "extra";
interface Product {
  code: string;
  name: string;
  price: number | "TBD";
  cost: number | "TBD";
  type: ProductType;
  emoji: string;
  notes?: string;
}

function makeArrangement(num: number, price: number | "TBD", name?: string, emoji = "🌸", notes?: string): Product {
  const cost: number | "TBD" = typeof price === "number" ? Math.round(price * 0.45) : "TBD";
  return { code: `A-${num}`, name: name ?? `Arreglo A-${num}`, price, cost, type: "arrangement", emoji, notes };
}

const ARRANGEMENTS: Product[] = [
  makeArrangement(1,  140, "Arreglo A-1",      "🌹", "Arreglo clásico compacto"),
  makeArrangement(2,  200, "Arreglo A-2",      "💐", "Arreglo mediano variado"),
  makeArrangement(3,  350, "Feliz Cumpleaños", "🎂", "Diseño festivo premium"),
  makeArrangement(4,  340, "Amor",             "❤️", "Rosas y flores románticas"),
  makeArrangement(6,  150, "Arreglo A-6",      "🌷"),
  makeArrangement(7,  150, "Arreglo A-7",      "🌼"),
  makeArrangement(8,  150, "Arreglo A-8",      "🌻"),
  makeArrangement(9,  100, "Arreglo A-9",      "🌸", "Arreglo esencial económico"),
  makeArrangement(10, 180, "Arreglo A-10",     "🪷", "Arreglo mediano especial"),
  ...[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
      31,32,33,34,35,36,37,38,39,40,41,42].map((n) =>
    makeArrangement(n, "TBD", `Arreglo A-${n}`,
      ["🌺","🌸","💐","🌹","🌷","🌼","🌻","🪻","🪷"][n % 9])),
];

const EXTRAS: Product[] = [
  { code: "A-5",  name: "Vinos",    price: 120, cost: 54, type: "extra", emoji: "🍷", notes: "Acompañamiento de vino" },
  { code: "EX-G", name: "Globos",   price: 30,  cost: 12, type: "extra", emoji: "🎈", notes: "Paquete decorativo" },
  { code: "EX-T", name: "Tarjetas", price: 15,  cost: 4,  type: "extra", emoji: "💌", notes: "Tarjeta personalizada" },
  { code: "EX-P", name: "Peluches", price: 80,  cost: 36, type: "extra", emoji: "🧸", notes: "Peluche de regalo" },
];

const ALL_PRODUCTS: Product[] = [...ARRANGEMENTS, ...EXTRAS];
const FILTERS = ["Todos", "Arreglos", "Extras", "Con precio", "TBD"];

// ── Toast ──────────────────────────────────────────────────────────
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-5 py-3 shadow-2xl"
    >
      <CheckCircle size={18} className="text-[#FF007F] flex-shrink-0" />
      <span className="text-sm font-bold text-gray-900">{msg}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-700 transition-colors">
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ── Admin Buttons ──────────────────────────────────────────────────
function AdminActions({ product, onAction }: { product: Product; onAction: (msg: string) => void }) {
  return (
    <div className="flex gap-2 pt-2 border-t border-gray-200">
      <button
        data-testid={`btn-stock-${product.code}`}
        onClick={() => onAction(`Stock de ${product.code} listo para editar`)}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 px-2 py-2 text-[11px] font-bold text-[#FF007F] transition-all border border-gray-200"
      >
        <Package size={12} /> Editar Stock
      </button>
      <button
        data-testid={`btn-details-${product.code}`}
        onClick={() => onAction(`Detalles de ${product.code}: ${product.name}`)}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 px-2 py-2 text-[11px] font-bold text-[#FF007F] transition-all border border-gray-200"
      >
        <Eye size={12} /> Ver Detalles
      </button>
      <button
        data-testid={`btn-sale-${product.code}`}
        onClick={() => onAction(`Venta de ${product.code} registrada`)}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#FF007F] hover:bg-[#E0006F] px-2 py-2 text-[11px] font-bold text-white transition-all"
      >
        <ShoppingBag size={12} /> Registrar Venta
      </button>
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────
function ProductCard({ product, index, onAction }: { product: Product; index: number; onAction: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const isTBD = product.price === "TBD";
  const anticipo = isTBD ? "TBD" : Math.ceil((product.price as number) * 0.5);
  const margin = (!isTBD && typeof product.cost === "number")
    ? Math.round(((product.price as number - product.cost) / (product.price as number)) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.6) }}
      data-testid={`card-${product.code}`}
      className="matte-card p-4 flex flex-col gap-3 hover:bg-[#E4E4E9] transition-all relative"
    >
      {/* Badges */}
      {product.type === "extra" && (
        <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
          <Tag size={8} /> Extra
        </span>
      )}
      {isTBD && (
        <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
          TBD
        </span>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl border border-gray-200 flex-shrink-0 shadow-sm">
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">{product.code}</p>
          <h3 className="font-bold text-[#111111] text-sm leading-tight truncate">{product.name}</h3>
          {product.notes && (
            <p className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">{product.notes}</p>
          )}
        </div>
      </div>

      {/* Pricing grid */}
      <div className="grid grid-cols-4 gap-1.5 text-center">
        <div className="rounded-lg bg-gray-200 border border-gray-300 p-2">
          <p className="text-xs font-bold text-[#111] leading-tight">
            {isTBD ? <span className="text-amber-600 text-[10px]">TBD</span> : `${product.price} Bs`}
          </p>
          <p className="text-[9px] text-gray-500 mt-0.5">Precio</p>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2">
          <p className="text-xs font-bold text-amber-700 leading-tight">
            {anticipo === "TBD" ? <span className="text-[10px]">TBD</span> : `${anticipo} Bs`}
          </p>
          <p className="text-[9px] text-gray-500 mt-0.5">Anticipo</p>
        </div>
        <div className="rounded-lg bg-gray-200 border border-gray-300 p-2">
          <p className="text-xs font-bold text-gray-700 leading-tight">
            {product.cost === "TBD" ? <span className="text-[10px]">TBD</span> : `${product.cost} Bs`}
          </p>
          <p className="text-[9px] text-gray-500 mt-0.5">Materiales</p>
        </div>
        <div className={`rounded-lg p-2 ${margin !== null ? "bg-[#FF007F] border-none" : "bg-gray-200 border border-gray-300"}`}>
          <p className={`text-xs font-bold leading-tight ${margin !== null ? "text-white" : "text-gray-400"}`}>
            {margin !== null ? `${margin}%` : "—"}
          </p>
          <p className={`text-[9px] mt-0.5 ${margin !== null ? "text-white/80" : "text-gray-500"}`}>Margen</p>
        </div>
      </div>

      {/* Expandable edit row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span className="flex items-center gap-1">
          <PenLine size={10} /> Editar detalles internos
        </span>
        <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">Precio (Bs)</label>
                <input
                  defaultValue={isTBD ? "" : String(product.price)}
                  placeholder="Ingresa precio"
                  className="w-full rounded-lg bg-white border border-gray-300 px-2 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF007F]"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">Costo mat. (Bs)</label>
                <input
                  defaultValue={product.cost === "TBD" ? "" : String(product.cost)}
                  placeholder="Costo real"
                  className="w-full rounded-lg bg-white border border-gray-300 px-2 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF007F]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin actions */}
      <AdminActions product={product} onAction={onAction} />
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "Todos" ||
      (filter === "Arreglos" && p.type === "arrangement") ||
      (filter === "Extras" && p.type === "extra") ||
      (filter === "Con precio" && p.price !== "TBD") ||
      (filter === "TBD" && p.price === "TBD");
    return matchSearch && matchFilter;
  });

  const arrangements = filtered.filter((p) => p.type === "arrangement");
  const extras = filtered.filter((p) => p.type === "extra");
  const priced = ALL_PRODUCTS.filter((p) => p.price !== "TBD").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#111111] flex items-center gap-3">
            <BookOpen size={28} className="text-[#FF007F]" /> Catálogo Interno
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {ALL_PRODUCTS.length} productos · {ARRANGEMENTS.length} arreglos · {EXTRAS.length} extras · {priced} con precio confirmado
          </p>
        </div>
        <div className="flex gap-2">
          <div className="fuchsia-card px-4 py-2 text-center min-w-[80px]">
            <p className="text-xl font-bold text-white">{ALL_PRODUCTS.length}</p>
            <p className="text-[10px] text-white/80 uppercase tracking-wide">Total SKUs</p>
          </div>
          <div className="fuchsia-card px-4 py-2 text-center min-w-[80px]">
            <p className="text-xl font-bold text-white">{ALL_PRODUCTS.length - priced}</p>
            <p className="text-[10px] text-white/80 uppercase tracking-wide">Sin precio</p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="matte-card p-4 flex items-start gap-3 border-l-4 border-l-[#FF007F]">
        <span className="text-2xl flex-shrink-0">📋</span>
        <div>
          <p className="font-bold text-[#111] text-sm">¿Cómo registrar un pedido?</p>
          <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
            Usa el código del arreglo (ej: <strong className="text-[#FF007F]">A-3</strong>) para registrar la venta.
            Se requiere un <strong className="text-[#FF007F]">anticipo del 50%</strong> para confirmar la reserva.
            Contacto: <strong>(+591) 77793200</strong> · <strong>70634636</strong>.
          </p>
        </div>
      </div>

      {/* Search & filter */}
      <div className="white-panel p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            data-testid="input-catalog-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o código (ej: A-10)…"
            className="w-full rounded-xl bg-white border border-gray-200 pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF007F] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-testid={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                filter === f
                  ? "bg-[#FF007F] text-white shadow-sm shadow-[#FF007F]/30"
                  : "text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Arrangements */}
      {arrangements.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF007F] mb-3 flex items-center gap-2">
            🌸 Arreglos Florales
            <span className="rounded-full bg-[#FF007F]/10 text-[#FF007F] px-2 py-0.5 text-xs normal-case tracking-normal">
              {arrangements.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {arrangements.map((p, i) => (
              <ProductCard key={p.code} product={p} index={i} onAction={showToast} />
            ))}
          </div>
        </section>
      )}

      {/* Extras */}
      {extras.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF007F] mb-3 flex items-center gap-2">
            🎁 Complementos & Extras
            <span className="rounded-full bg-[#FF007F]/10 text-[#FF007F] px-2 py-0.5 text-xs normal-case tracking-normal">
              {extras.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {extras.map((p, i) => (
              <ProductCard key={p.code} product={p} index={arrangements.length + i} onAction={showToast} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="matte-card p-10 text-center text-gray-400">
          <p className="text-lg">No se encontraron productos con ese criterio.</p>
        </div>
      )}

      <AnimatePresence>
        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
