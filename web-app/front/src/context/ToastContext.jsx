import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

// 1. Creamos el contexto
const ToastContext = createContext()

// 2. El Provider que envolverá tu App
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Función para disparar notificaciones (se autodescartan en 3s)
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* EL RENDERIZADOR DE MENSAJES (Siempre flotando abajo a la derecha o centro) */}
      <div className="fixed bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:right-6 md:left-auto z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border pointer-events-auto animate-fade-in-up transition-all ${
              toast.type === 'success' ? 'bg-white border-green-100 text-text-dark dark:bg-[#1a1a2e] dark:border-green-500/20 dark:text-white' :
              toast.type === 'error' ? 'bg-white border-red-100 text-text-dark dark:bg-[#1a1a2e] dark:border-red-500/20 dark:text-white' :
              'bg-white border-blue-100 text-text-dark dark:bg-[#1a1a2e] dark:border-blue-500/20 dark:text-white'
            }`}
          >
            {/* ICONO DINÁMICO */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'success' ? 'bg-green-50 dark:bg-green-500/10 text-green-500' :
              toast.type === 'error' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' :
              'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
            }`}>
              {toast.type === 'success' && <CheckCircle2 size={16} />}
              {toast.type === 'error' && <AlertCircle size={16} />}
              {toast.type === 'info' && <Info size={16} />}
            </div>
            
            <p className="text-[13px] font-bold tracking-wide">{toast.message}</p>
            
            <button onClick={() => removeToast(toast.id)} className="ml-4 p-1 text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 rounded-full">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// 3. El Hook que usarás en tus componentes
export const useToast = () => useContext(ToastContext)