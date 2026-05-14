export default function Card({ children, className = '', padding = 'p-5' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_2px_16px_rgba(255,77,184,0.08)] dark:bg-[#1a1a2e] ${padding} ${className}`}>
      {children}
    </div>
  )
}