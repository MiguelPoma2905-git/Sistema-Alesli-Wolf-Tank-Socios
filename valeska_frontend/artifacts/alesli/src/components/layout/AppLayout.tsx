import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, TrendingUp, Package, Truck,
  Megaphone, ShoppingBag, ShoppingCart, BookOpen,
  Leaf, MapPin, Sparkles, ChevronDown, Bell,
} from "lucide-react";
import { SiInstagram, SiFacebook, SiWhatsapp, SiTiktok } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
  {
    label: "Dashboard",
    href: "/",
    single: true,
    icon: LayoutDashboard,
    items: [],
  },
  {
    label: "Finanzas",
    href: "/finanzas",
    single: true,
    icon: TrendingUp,
    items: [],
  },
  {
    label: "Operaciones",
    single: false,
    items: [
      { href: "/pedidos", label: "Pedidos", icon: ShoppingBag },
      { href: "/orders", label: "Orders", icon: ShoppingCart },
      { href: "/entregas", label: "Entregas", icon: Truck },
      { href: "/seguimiento", label: "Delivery Tracking", icon: MapPin },
    ],
  },
  {
    label: "Productos",
    single: false,
    items: [
      { href: "/inventario", label: "Inventario", icon: Package },
      { href: "/catalogo", label: "Product Catalog", icon: BookOpen },
      { href: "/cuidado-flores", label: "Flower Care", icon: Leaf },
    ],
  },
  {
    label: "Crecimiento",
    single: false,
    items: [
      { href: "/marketing", label: "Marketing", icon: Megaphone },
      { href: "/campanas", label: "Campaigns", icon: Sparkles },
    ],
  },
];

function DropdownItem({ href, label, icon: Icon, isActive, onClick }: {
  href: string; label: string; icon: React.ElementType; isActive: boolean; onClick: () => void;
}) {
  return (
    <Link href={href}>
      <div
        onClick={onClick}
        data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-all ${
          isActive ? "bg-[#B50068]/30 text-white font-semibold" : "text-white/80 hover:bg-white/15 hover:text-white"
        }`}
      >
        <Icon size={15} className="flex-shrink-0" />
        {label}
      </div>
    </Link>
  );
}

function NavItem({ group, location }: { group: typeof navGroups[0]; location: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (group.single) {
    const Icon = group.icon!;
    const isActive = location === group.href;
    return (
      <Link href={group.href!}>
        <div
          data-testid={`nav-${group.label.toLowerCase()}`}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
            isActive ? "bg-[#B50068] text-white" : "text-white hover:bg-white/15 hover:text-white"
          }`}
        >
          <Icon size={15} />
          {group.label}
        </div>
      </Link>
    );
  }

  const isGroupActive = group.items.some((i) => i.href === location);

  return (
    <div ref={ref} className="relative">
      <button
        data-testid={`nav-group-${group.label.toLowerCase()}`}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
          isGroupActive ? "bg-[#B50068] text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
        }`}
      >
        {group.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 glass-panel py-2 px-1.5 z-50"
          >
            {group.items.map((item) => (
              <DropdownItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={location === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col text-[#111111]">

      {/* Background floral SVGs — dense botanical layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* 1 · Top-left — tall leafy stem */}
        <svg className="absolute -top-4 left-6 h-72 w-48 opacity-[0.22] animate-sway" viewBox="0 0 80 200" fill="none" stroke="#C04080" strokeWidth="0.9">
          <path d="M40 200 Q38 155 40 110 Q42 65 40 10" />
          <path d="M40 165 Q22 148 8 153" /><ellipse cx="8" cy="151" rx="9" ry="5" transform="rotate(-25 8 151)" />
          <path d="M40 140 Q56 124 68 130" /><ellipse cx="68" cy="128" rx="9" ry="5" transform="rotate(18 68 128)" />
          <path d="M40 112 Q24 96 12 101" /><ellipse cx="12" cy="99" rx="8" ry="4" transform="rotate(-20 12 99)" />
          <path d="M40 88 Q54 74 65 79" /><ellipse cx="65" cy="77" rx="8" ry="4" transform="rotate(15 65 77)" />
          <path d="M40 62 Q26 48 16 53" /><ellipse cx="16" cy="51" rx="7" ry="4" transform="rotate(-18 16 51)" />
          <circle cx="40" cy="10" r="4" />
          <path d="M36 7 Q28 0 22 4" /><path d="M44 7 Q52 0 58 4" />
        </svg>

        {/* 2 · Upper-left area — small spray of buds */}
        <svg className="absolute top-32 left-48 h-36 w-36 opacity-[0.18] animate-sway-slow" style={{ animationDelay: "2s" }} viewBox="0 0 80 80" fill="none" stroke="#C04080" strokeWidth="0.8">
          <path d="M40 75 Q38 55 40 35" />
          <path d="M40 60 Q26 50 18 54" /><circle cx="15" cy="52" r="4" />
          <path d="M40 48 Q52 38 60 42" /><circle cx="63" cy="40" r="4" />
          <path d="M40 36 Q30 24 26 28" /><circle cx="24" cy="26" r="3.5" />
          <circle cx="40" cy="34" r="3" />
        </svg>

        {/* 3 · Top-right — ornate radial bloom */}
        <svg className="absolute top-16 right-10 h-80 w-80 opacity-[0.18] animate-sway-slow" viewBox="0 0 140 140" fill="none" stroke="#C04080" strokeWidth="0.9">
          <circle cx="70" cy="70" r="10" />
          <path d="M70 60 Q70 38 70 16" /><path d="M70 16 Q62 8 54 12 Q62 18 70 16" /><path d="M70 16 Q78 8 86 12 Q78 18 70 16" />
          <path d="M80 62 Q100 52 118 60" /><path d="M118 60 Q122 48 114 42 Q110 52 118 60" />
          <path d="M78 78 Q94 96 90 114" /><path d="M90 114 Q102 116 106 108 Q96 104 90 114" />
          <path d="M62 78 Q46 96 50 114" /><path d="M50 114 Q38 116 34 108 Q44 104 50 114" />
          <path d="M60 62 Q40 52 22 60" /><path d="M22 60 Q18 48 26 42 Q30 52 22 60" />
          <path d="M64 60 Q56 40 62 22" /><path d="M76 60 Q84 40 78 22" />
        </svg>

        {/* 4 · Top-center — delicate branching twigs */}
        <svg className="absolute top-8 left-1/2 -translate-x-1/2 h-52 w-52 opacity-[0.15] animate-sway" style={{ animationDelay: "4s" }} viewBox="0 0 120 120" fill="none" stroke="#C04080" strokeWidth="0.8">
          <path d="M60 120 Q60 90 60 60" />
          <path d="M60 95 Q44 80 34 84" /><path d="M34 84 Q26 76 20 80" /><circle cx="17" cy="79" r="3" />
          <path d="M60 78 Q74 64 84 68" /><path d="M84 68 Q92 60 98 64" /><circle cx="101" cy="63" r="3" />
          <path d="M60 60 Q48 44 40 48" /><circle cx="37" cy="46" r="3.5" />
          <path d="M60 60 Q72 44 80 48" /><circle cx="83" cy="46" r="3.5" />
        </svg>

        {/* 5 · Left-middle — climbing vine with small blooms */}
        <svg className="absolute top-1/3 -left-4 h-64 w-40 opacity-[0.18] animate-sway-slow" style={{ animationDelay: "6s" }} viewBox="0 0 60 160" fill="none" stroke="#C04080" strokeWidth="0.85">
          <path d="M10 160 Q30 130 10 100 Q-10 70 20 40 Q35 20 30 0" />
          <path d="M10 140 Q28 132 30 122" /><circle cx="32" cy="120" r="4" />
          <path d="M14 108 Q2 96 4 84" /><circle cx="3" cy="82" r="4" />
          <path d="M16 72 Q30 64 32 52" /><circle cx="33" cy="50" r="4" />
          <path d="M22 36 Q12 26 16 16" /><circle cx="15" cy="14" r="3.5" />
        </svg>

        {/* 6 · Center-right — single tall stem, large petals at top */}
        <svg className="absolute top-20 right-1/3 h-56 w-40 opacity-[0.14] animate-sway" style={{ animationDelay: "1.5s" }} viewBox="0 0 80 160" fill="none" stroke="#C04080" strokeWidth="0.85">
          <path d="M40 160 Q40 110 40 20" />
          <path d="M40 120 Q24 108 16 114" /><ellipse cx="12" cy="112" rx="7" ry="4" transform="rotate(-20 12 112)" />
          <path d="M40 95 Q54 84 62 89" /><ellipse cx="66" cy="87" rx="7" ry="4" transform="rotate(16 66 87)" />
          <path d="M38 20 Q28 8 20 12" /><path d="M38 20 Q32 6 38 0" /><path d="M42 20 Q48 6 42 0" /><path d="M42 20 Q52 8 60 12" />
        </svg>

        {/* 7 · Center faint — large ghost bloom */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 opacity-[0.07] animate-sway-slow" style={{ animationDelay: "5s" }} viewBox="0 0 200 200" fill="none" stroke="#C04080" strokeWidth="0.8">
          <circle cx="100" cy="100" r="18" />
          {[0,45,90,135,180,225,270,315].map((deg) => {
            const r = deg * Math.PI / 180;
            const x1 = 100 + 18 * Math.cos(r);
            const y1 = 100 + 18 * Math.sin(r);
            const x2 = 100 + 72 * Math.cos(r);
            const y2 = 100 + 72 * Math.sin(r);
            const cx1 = 100 + 48 * Math.cos(r) - 18 * Math.sin(r);
            const cy1 = 100 + 48 * Math.sin(r) + 18 * Math.cos(r);
            const cx2 = 100 + 48 * Math.cos(r) + 18 * Math.sin(r);
            const cy2 = 100 + 48 * Math.sin(r) - 18 * Math.cos(r);
            return <path key={deg} d={`M${x1} ${y1} Q${cx1} ${cy1} ${x2} ${y2} Q${cx2} ${cy2} ${x1} ${y1}`} />;
          })}
        </svg>

        {/* 8 · Bottom-left — arching branch */}
        <svg className="absolute bottom-24 left-8 h-52 w-64 opacity-[0.20] animate-sway" style={{ animationDelay: "3.5s" }} viewBox="0 0 160 100" fill="none" stroke="#C04080" strokeWidth="0.85">
          <path d="M0 90 Q50 60 100 70 Q130 76 160 55" />
          <path d="M20 88 Q22 68 24 54" /><path d="M24 54 Q16 44 10 48" /><path d="M24 54 Q30 44 36 48" />
          <path d="M70 76 Q70 58 72 44" /><path d="M72 44 Q64 34 58 38" /><path d="M72 44 Q78 34 84 38" />
          <path d="M125 68 Q124 50 125 36" /><path d="M125 36 Q118 26 112 30" /><path d="M125 36 Q130 26 136 30" />
        </svg>

        {/* 9 · Bottom-center — stems with seed pods */}
        <svg className="absolute bottom-20 left-1/2 -translate-x-1/2 h-48 w-56 opacity-[0.17] animate-sway-slow" style={{ animationDelay: "7s" }} viewBox="0 0 120 100" fill="none" stroke="#C04080" strokeWidth="0.85">
          <path d="M40 100 Q40 70 42 40" /><path d="M80 100 Q78 72 76 40" />
          <path d="M42 75 Q30 64 22 68" /><ellipse cx="18" cy="66" rx="7" ry="4" transform="rotate(-22 18 66)" />
          <path d="M76 72 Q88 60 96 65" /><ellipse cx="100" cy="63" rx="7" ry="4" transform="rotate(20 100 63)" />
          <ellipse cx="42" cy="40" rx="5" ry="7" />
          <ellipse cx="76" cy="40" rx="5" ry="7" />
          <path d="M42 33 Q40 20 42 10" /><path d="M76 33 Q76 20 74 10" />
          <path d="M39 8 Q34 2 28 5" /><path d="M45 8 Q50 2 56 5" />
          <path d="M71 8 Q66 2 60 5" /><path d="M77 8 Q82 2 88 5" />
        </svg>

        {/* 10 · Bottom-right — full radial flower */}
        <svg className="absolute bottom-16 right-8 h-64 w-64 opacity-[0.20] animate-sway" style={{ animationDelay: "2.5s" }} viewBox="0 0 120 120" fill="none" stroke="#C04080" strokeWidth="0.9">
          <circle cx="60" cy="60" r="9" />
          <path d="M60 51 Q58 36 60 18" /><path d="M60 18 Q54 10 48 14 Q54 20 60 18" /><path d="M60 18 Q66 10 72 14 Q66 20 60 18" />
          <path d="M69 54 Q82 46 96 52" /><path d="M96 52 Q100 44 94 38 Q90 46 96 52" />
          <path d="M67 67 Q76 80 72 94" /><path d="M72 94 Q80 96 84 90 Q76 86 72 94" />
          <path d="M53 67 Q44 80 48 94" /><path d="M48 94 Q40 96 36 90 Q44 86 48 94" />
          <path d="M51 54 Q38 46 24 52" /><path d="M24 52 Q20 44 26 38 Q30 46 24 52" />
          <path d="M55 51 Q50 36 54 20" /><path d="M65 51 Q70 36 66 20" />
          <path d="M69 65 Q82 72 92 64" /><path d="M51 65 Q38 72 28 64" />
        </svg>

        {/* 11 · Right-middle — graceful arching stem */}
        <svg className="absolute top-1/2 -right-2 h-52 w-44 opacity-[0.17] animate-sway-slow" style={{ animationDelay: "8s" }} viewBox="0 0 80 160" fill="none" stroke="#C04080" strokeWidth="0.85">
          <path d="M70 160 Q40 120 50 80 Q60 40 40 0" />
          <path d="M64 130 Q72 116 72 102" /><circle cx="73" cy="100" r="4" />
          <path d="M56 98 Q68 86 68 72" /><circle cx="69" cy="70" r="4" />
          <path d="M50 64 Q62 52 60 38" /><circle cx="61" cy="36" r="4" />
          <path d="M44 30 Q52 18 48 6" /><circle cx="48" cy="4" r="3.5" />
        </svg>
      </div>

      {/* TOP NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 pt-3">
        <nav className="glass-panel flex items-center justify-between px-5 py-2.5 max-w-screen-2xl mx-auto">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer select-none" data-testid="nav-logo">
              <span className="text-2xl">🌸</span>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold italic tracking-tight text-[#B50068]">
                  Aleslí
                </span>
                <span className="text-[9px] tracking-widest uppercase text-white/70 font-medium" style={{ textShadow: "none" }}>
                  Naturalmente para ti
                </span>
              </div>
            </div>
          </Link>

          {/* Center nav */}
          <div className="flex items-center gap-1">
            {navGroups.map((group) => (
              <NavItem key={group.label} group={group} location={location} />
            ))}
          </div>

          {/* Right: notifications + profile */}
          <div className="flex items-center gap-3">
            <button data-testid="button-notifications" className="relative flex h-8 w-8 items-center justify-center rounded-xl text-white/70 hover:bg-white/15 hover:text-white transition-all">
              <Bell size={17} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-400 border border-white/30" />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-white/15 cursor-pointer transition-all" data-testid="nav-profile">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm font-bold text-white">
                AL
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-semibold text-white">Aleslí Studio</span>
                <span className="text-[10px] text-white/60">Florista</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 px-4 md:px-8 pt-24 pb-8">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          {children}
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 px-4 pb-4">
        <div className="glass-panel max-w-screen-2xl mx-auto overflow-hidden">

          {/* Floral SVG decoration inside footer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
            <svg className="absolute -bottom-4 left-0 h-32 w-64" viewBox="0 0 200 80" fill="none" stroke="#C04080" strokeWidth="0.8">
              <path d="M0 70 Q30 50 60 60 Q90 70 120 50 Q150 30 180 45 Q195 52 200 48" />
              <path d="M20 70 Q20 50 25 35" />
              <path d="M25 35 Q18 28 12 32" /><path d="M25 35 Q30 26 36 30" />
              <path d="M80 65 Q82 48 85 36" />
              <path d="M85 36 Q78 28 72 33" /><path d="M85 36 Q91 29 96 34" />
              <path d="M150 52 Q150 36 152 24" />
              <path d="M152 24 Q146 16 140 20" /><path d="M152 24 Q157 16 163 20" />
            </svg>
            <svg className="absolute -bottom-4 right-0 h-32 w-64" viewBox="0 0 200 80" fill="none" stroke="#C04080" strokeWidth="0.8">
              <path d="M200 70 Q170 50 140 60 Q110 70 80 50 Q50 30 20 45 Q5 52 0 48" />
              <path d="M180 70 Q178 50 175 35" />
              <path d="M175 35 Q182 28 188 32" /><path d="M175 35 Q170 26 164 30" />
              <path d="M120 65 Q118 48 115 36" />
              <path d="M115 36 Q122 28 128 33" /><path d="M115 36 Q109 29 104 34" />
              <path d="M50 52 Q50 36 48 24" />
              <path d="M48 24 Q54 16 60 20" /><path d="M48 24 Q43 16 37 20" />
            </svg>
          </div>

          <div className="relative px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand column */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌸</span>
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-2xl font-bold italic text-[#B50068]">Aleslí</span>
                  <span className="text-[9px] tracking-widest uppercase text-white/60 font-medium" style={{ textShadow: "none" }}>
                    Naturalmente para ti
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Florería artesanal en La Paz. Arreglos frescos, únicos y llenos de sentimiento para cada ocasión especial.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a href="https://instagram.com/floreria_alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-instagram" aria-label="Instagram @floreria_alesli"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-pink-500/40 transition-all border border-white/20">
                  <SiInstagram size={15} />
                </a>
                <a href="https://facebook.com/Alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-facebook" aria-label="Facebook Aleslí"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-blue-500/40 transition-all border border-white/20">
                  <SiFacebook size={15} />
                </a>
                <a href="https://tiktok.com/@Alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-tiktok" aria-label="TikTok @Aleslí"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-black/40 transition-all border border-white/20">
                  <SiTiktok size={15} />
                </a>
                <a href="https://wa.me/59177793200" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-whatsapp" aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-green-500/40 transition-all border border-white/20">
                  <SiWhatsapp size={15} />
                </a>
              </div>
            </div>

            {/* Contact column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/45">Contáctanos</h3>
              <div className="space-y-2.5">
                <a href="https://wa.me/59177793200" data-testid="footer-whatsapp-primary"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-300 group-hover:bg-green-500/30 transition-all flex-shrink-0 border border-green-400/25">
                    <SiWhatsapp size={14} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">(+591) 77793200</p>
                    <p className="text-[10px] text-white/50">Principal · WhatsApp</p>
                  </div>
                </a>
                <a href="tel:+59170634636" data-testid="footer-phone-secondary"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-300 group-hover:bg-green-500/30 transition-all flex-shrink-0 border border-green-400/25">
                    <SiWhatsapp size={14} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">(+591) 70634636</p>
                    <p className="text-[10px] text-white/50">Alternativo</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/45">Redes Sociales</h3>
              <div className="space-y-2.5">
                <a href="https://instagram.com/floreria_alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-instagram-link"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/20 text-pink-300 group-hover:bg-pink-500/30 transition-all flex-shrink-0 border border-pink-400/25">
                    <SiInstagram size={14} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">@floreria_alesli</p>
                    <p className="text-[10px] text-white/50">Instagram</p>
                  </div>
                </a>
                <a href="https://facebook.com/Alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-facebook-link"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30 transition-all flex-shrink-0 border border-blue-400/25">
                    <SiFacebook size={14} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">Aleslí</p>
                    <p className="text-[10px] text-white/50">Facebook</p>
                  </div>
                </a>
                <a href="https://tiktok.com/@Alesli" target="_blank" rel="noopener noreferrer"
                  data-testid="footer-tiktok-link"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white group-hover:bg-white/25 transition-all flex-shrink-0 border border-white/20">
                    <SiTiktok size={14} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">@Aleslí</p>
                    <p className="text-[10px] text-white/50">TikTok</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Address column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/45">Nuestra Ubicación</h3>
              <div className="space-y-1 text-sm text-white/80 leading-relaxed">
                <p className="font-bold text-white">Florería Aleslí</p>
                <p>Calle Campos #248</p>
                <p className="text-white/65 text-xs">Entre 6 de Agosto y Av. Arce</p>
                <p className="text-white/65 text-xs">La Paz, Bolivia</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-xs text-white/65 space-y-1">
                <p className="font-bold text-white/90">Horario de atención</p>
                <p>Lun – Sáb · 09:00 – 19:00</p>
                <p>Dom · 10:00 – 14:00</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/40">© 2026 Florería Aleslí · La Paz, Bolivia · Todos los derechos reservados.</p>
            <p className="text-[11px] text-white/40 italic">Naturalmente para ti 🌸</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
