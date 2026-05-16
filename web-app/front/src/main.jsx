import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
<<<<<<< HEAD
import { AppProvider } from './context/AppContext'
import './index.css' // <-- Apuntando a la raíz

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
=======
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
  </React.StrictMode>,
)