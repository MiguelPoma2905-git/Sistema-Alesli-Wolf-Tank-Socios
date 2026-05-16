import { statusBadgeClass, statusDotColor } from '../../utils/helpers'

export default function Badge({ status }) {
  return (
    <span className={statusBadgeClass(status)}>
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: statusDotColor(status) }}
      />
      {status}
    </span>
  )
}

export function TagBadge({ children, color = '#FF4DB8', textColor = '#fff', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${className}`}
      style={{ background: color, color: textColor }}
    >
      {children}
    </span>
  )
}

export function NavBadge({ count, variant = 'pink' }) {
  if (!count) return null
  const colors = {
    pink:  'bg-pink-500 text-white',
    green: 'bg-green-500 text-white',
    red:   'bg-red-500 text-white',
  }
  return (
    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${colors[variant]}`}>
      {count}
    </span>
  )
}