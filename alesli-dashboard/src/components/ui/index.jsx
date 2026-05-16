// ─── Status Badge ─────────────────────────────────────────────────────────────
const estadoStyles = {
  'En Proceso': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Pendiente':  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Listo':      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Entregado':  'bg-pink-soft text-pink-hover dark:bg-pink-900/30 dark:text-pink-300',
  'Urgente':    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'En Camino':  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Activa':     'bg-emerald-100 text-emerald-700',
  'Completada': 'bg-blue-100 text-blue-700',
  'Borrador':   'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  'Disponible': 'bg-emerald-100 text-emerald-700',
  'Stock Bajo': 'bg-amber-100 text-amber-700',
  'Agotado':    'bg-red-100 text-red-700',
  'En Tránsito':'bg-violet-100 text-violet-700',
  'Confirmado': 'bg-blue-100 text-blue-700',
}

export function Badge({ estado, className = '' }) {
  const styles = estadoStyles[estado] || 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-poppins ${styles} ${className}`}>
      {estado}
    </span>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name = 'AL', size = 'md', gradient = true }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' }
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-poppins font-bold text-white flex-shrink-0`}
      style={gradient ? { background: 'linear-gradient(135deg,#FF4DB8,#A855F7)' } : { background: '#FF4DB8' }}>
      {initials}
    </div>
  )
}

// ─── Icon wrapper ─────────────────────────────────────────────────────────────
export function IconBox({ icon: Icon, color = 'pink', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' }
  const iconSizes = { sm: 14, md: 18, lg: 22 }
  const colors = {
    pink:   'bg-pink-soft text-pink-primary dark:bg-pink-primary/20',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    green:  'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber:  'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    red:    'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400',
  }
  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <Icon size={iconSizes[size]} />
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, trend, icon: Icon, color = 'pink' }) {
  const trendPositive = trend && trend.startsWith('+')
  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-poppins font-medium text-brand-muted dark:text-dark-muted mb-1">{label}</p>
          <p className="text-2xl font-poppins font-bold text-brand-text dark:text-dark-text">{value}</p>
          {sub && <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">{sub}</p>}
        </div>
        {Icon && <IconBox icon={Icon} color={color} />}
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${trendPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon = '🌸', title = 'Sin datos', desc = 'No hay información disponible aún.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <span className="text-5xl">{icon}</span>
      <p className="font-poppins font-semibold text-brand-text dark:text-dark-text text-base">{title}</p>
      <p className="text-sm text-brand-muted dark:text-dark-muted text-center max-w-xs">{desc}</p>
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action, actionLabel = 'Ver todas' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-poppins font-bold text-base text-brand-text dark:text-dark-text">{title}</h2>
      {action && (
        <button onClick={action} className="text-xs font-poppins font-semibold text-pink-primary hover:text-pink-hover transition-colors">
          {actionLabel} →
        </button>
      )}
    </div>
  )
}

// ─── Page Header ─────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-poppins font-extrabold text-2xl text-brand-text dark:text-dark-text">{title}</h1>
        {subtitle && <p className="text-sm text-brand-muted dark:text-dark-muted mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}

// ─── Search Input ─────────────────────────────────────────────────────────────
import { Search } from 'lucide-react'
export function SearchInput({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted dark:text-dark-muted" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-8 pr-4 py-2 text-sm"
      />
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
import { X } from 'lucide-react'
export function Modal({ open, onClose, title, children, width = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className={`relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl w-full ${width} animate-fade-in`}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border dark:border-dark-border">
          <h3 className="font-poppins font-bold text-base text-brand-text dark:text-dark-text">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-brand-bg dark:hover:bg-dark-card2 transition-colors">
            <X size={14} className="text-brand-muted" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}