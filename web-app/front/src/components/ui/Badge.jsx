import { statusClass } from '../../utils/helpers'

export default function Badge({ status }) {
  return <span className={statusClass(status)}>{status}</span>
}

/** Generic colored badge */
export function TagBadge({ children, color = '#FF4DB8', className = '' }) {
  return (
    <span
      style={{ background: color }}
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${className}`}
    >
      {children}
    </span>
  )
}