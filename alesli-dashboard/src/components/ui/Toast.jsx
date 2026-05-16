import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const TYPE_STYLES = {
  success: 'border-l-green-500',
  error:   'border-l-red-500',
  warning: 'border-l-yellow-500',
  info:    'border-l-blue-500',
}

function ToastItem({ toast, onRemove }) {
  return (
    <div
      className={`
        flex items-center gap-3 bg-white rounded-xl px-4 py-3
        shadow-[0_8px_28px_rgba(0,0,0,0.12)] border-l-4 min-w-[260px]
        animate-fade-up ${TYPE_STYLES[toast.type] ?? 'border-l-pink-500'}
      `}
    >
      <span className="text-[18px] flex-shrink-0">{toast.icon}</span>
      <span className="text-[12.5px] font-semibold text-gray-700 flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-300 hover:text-gray-500 transition-colors ml-1"
      >
        <X size={13} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts, removeToast } = useApp()
  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-[100]">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  )
}