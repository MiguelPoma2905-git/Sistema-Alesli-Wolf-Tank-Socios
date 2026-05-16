import { statusClass } from '../../utils/helpers'

export default function Badge({ status }) {
  return <span className={statusClass(status)}>{status}</span>
}

/** Generic colored badge */
<<<<<<< HEAD
export function TagBadge({ children, color = '#FF4DB8', className = '' }) {
  return (
    <span
      style={{ background: color }}
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${className}`}
=======
export function TagBadge({ children, color = '#d0439d', className = '' }) {
  return (
    <span
      style={{ background: color }}
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 text-white ${className}`}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
    >
      {children}
    </span>
  )
}