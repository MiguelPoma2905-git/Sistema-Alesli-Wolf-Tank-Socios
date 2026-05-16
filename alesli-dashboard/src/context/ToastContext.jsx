import { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)

  const showToast = (text) => {
    setMessage(text)

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div className="fixed bottom-5 right-5 bg-pink-500 text-white px-4 py-2 rounded-xl shadow-lg">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}