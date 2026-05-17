import { statusClass } from '../../utils/helpers'

export default function Badge({ status }) {
  return <span className={statusClass(status)}>{status}</span>
}

/** Generic colored badge */
export function TagBadge({ children, color = '#d0439d', className = '' }) {
  return (
    <span
      style={{ background: color }}
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 text-white ${className}`}
    >
      {children}
    </span>
  )
}