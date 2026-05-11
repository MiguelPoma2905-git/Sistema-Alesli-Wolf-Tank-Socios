import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Instagram, Send, BarChart2, Calendar, Users, TrendingUp, Plus, Eye, Heart, MessageCircle } from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "Día de las Madres 2026",
    channel: "Instagram + WhatsApp",
    status: "active",
    startDate: "May 1",
    endDate: "May 12",
    budget: 350,
    spent: 210,
    reach: 4820,
    clicks: 312,
    conversions: 38,
    revenue: 6200,
    emoji: "💐",
  },
  {
    id: 2,
    name: "Boda de Primavera — Paquetes",
    channel: "Instagram",
    status: "active",
    startDate: "Apr 15",
    endDate: "Jun 15",
    budget: 600,
    spent: 280,
    reach: 7100,
    clicks: 540,
    conversions: 12,
    revenue: 28400,
    emoji: "💍",
  },
  {
    id: 3,
    name: "Flash Sale: Tulipanes",
    channel: "WhatsApp + Stories",
    status: "paused",
    startDate: "Apr 28",
    endDate: "Apr 30",
    budget: 80,
    spent: 80,
    reach: 1250,
    clicks: 210,
    conversions: 42,
    revenue: 2940,
    emoji: "🌷",
  },
  {
    id: 4,
    name: "Lanzamiento: Orquídeas Premium",
    channel: "Instagram + Email",
    status: "draft",
    startDate: "May 20",
    endDate: "Jun 5",
    budget: 400,
    spent: 0,
    reach: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    emoji: "🪷",
  },
];

const posts = [
  { id: 1, img: "🌹", caption: "La primavera llega a Aleslí 🌸 ¿Ya elegiste tu ramo?", channel: "Instagram", likes: 284, comments: 31, reach: 1820, date: "May 8" },
  { id: 2, img: "💐", caption: "Sorprende a mamá este 12 de Mayo con algo único", channel: "Stories", likes: 0, comments: 0, reach: 3200, date: "May 7" },
  { id: 3, img: "🌷", caption: "Tulipanes holandeses recién llegados — solo esta semana", channel: "WhatsApp", likes: 0, comments: 0, reach: 890, date: "May 6" },
  { id: 4, img: "🌺", caption: "Bodas de ensueño con arreglos de peonías y jardín", channel: "Instagram", likes: 412, comments: 58, reach: 2640, date: "May 5" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Activa", color: "bg-green-400/25 text-green-200 border border-green-300/30" },
  paused: { label: "Pausada", color: "bg-amber-400/25 text-amber-200 border border-amber-300/30" },
  draft: { label: "Borrador", color: "bg-white/15 text-white/60 border border-white/20" },
  ended: { label: "Finalizada", color: "bg-white/10 text-white/40 border border-white/15" },
};

export default function Campanas() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "posts">("campaigns");

  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalReach = campaigns.reduce((s, c) => s + c.reach, 0);
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0);
  const avgROI = Math.round(((totalRevenue - totalSpent) / totalSpent) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles size={28} /> Marketing Campaigns
          </h1>
          <p className="text-white/60 text-sm mt-1">Track performance across all your campaigns and content</p>
        </div>
        <button
          data-testid="button-new-campaign"
          className="flex items-center gap-2 rounded-xl glass-panel px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Revenue Total", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-green-300" },
          { label: "Alcance Total", value: totalReach.toLocaleString(), icon: Users, color: "text-blue-300" },
          { label: "Inversión", value: `$${totalSpent}`, icon: BarChart2, color: "text-amber-300" },
          { label: "ROI Promedio", value: `${avgROI}%`, icon: Sparkles, color: "text-pink-300" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel p-4 text-center">
            <Icon size={20} className={`mx-auto mb-2 ${color}`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["campaigns", "posts"] as const).map((tab) => (
          <button
            key={tab}
            data-testid={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all capitalize ${
              activeTab === tab ? "bg-white/25 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab === "campaigns" ? "Campañas" : "Contenido"}
          </button>
        ))}
      </div>

      {activeTab === "campaigns" && (
        <div className="space-y-4">
          {campaigns.map((c, i) => {
            const sc = statusConfig[c.status];
            const budgetPct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
            const roi = c.spent > 0 ? Math.round(((c.revenue - c.spent) / c.spent) * 100) : 0;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-testid={`card-campaign-${c.id}`}
                className="glass-panel p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white">{c.name}</h3>
                      <p className="text-xs text-white/50 mt-0.5 flex items-center gap-1.5">
                        <Send size={10} /> {c.channel}
                        <span className="mx-1">·</span>
                        <Calendar size={10} /> {c.startDate} → {c.endDate}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${sc.color}`}>{sc.label}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {[
                    { label: "Alcance", value: c.reach.toLocaleString() },
                    { label: "Clicks", value: c.clicks.toLocaleString() },
                    { label: "Conversiones", value: c.conversions },
                    { label: "Revenue", value: c.revenue > 0 ? `$${c.revenue.toLocaleString()}` : "—" },
                    { label: "ROI", value: c.spent > 0 ? `${roi}%` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-white/10 p-2.5 text-center">
                      <p className="text-base font-bold text-white">{value}</p>
                      <p className="text-[10px] text-white/40">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Presupuesto gastado</span>
                    <span>${c.spent} / ${c.budget} ({budgetPct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        budgetPct >= 90 ? "bg-red-400" : budgetPct >= 60 ? "bg-amber-400" : "bg-green-400"
                      }`}
                      style={{ width: `${Math.min(budgetPct, 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              data-testid={`card-post-${post.id}`}
              className="glass-panel p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/15 text-4xl flex-shrink-0">
                  {post.img}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/85 leading-relaxed line-clamp-2">{post.caption}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      <Instagram size={10} /> {post.channel}
                    </span>
                    <span className="text-xs text-white/40">{post.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 border-t border-white/10 pt-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Eye size={13} /> {post.reach.toLocaleString()}</span>
                {post.likes > 0 && <span className="flex items-center gap-1.5"><Heart size={13} /> {post.likes}</span>}
                {post.comments > 0 && <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {post.comments}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
