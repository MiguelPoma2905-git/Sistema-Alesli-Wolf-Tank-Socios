import { AppProvider } from './context/AppContext'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <BrowserRouter>

      <AppProvider>

        <ToastProvider>

          <AppRoutes />

        </ToastProvider>

      </AppProvider>

    </BrowserRouter>
  )
}

export default App