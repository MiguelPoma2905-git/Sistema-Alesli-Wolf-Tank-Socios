import { useState } from 'react'
import { Save } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

export default function AdminConfiguraciones() {
  const { user, roleLabel } = useApp()
  const { addToast } = useToast()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-gray-800">Configuración</h2>
        <p className="text-sm text-gray-500">Ajustes del sistema</p>
      </div>

      <div className="card card-p-lg space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-gray-800 mb-4">Perfil del Administrador</h3>
          <div className="grid gap-4">
            <div>
              <label className="label">Nombre</label>
              <input type="text" value={user?.nombre || ''} readOnly className="input" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="text" value={user?.email || ''} readOnly className="input" />
            </div>
            <div>
              <label className="label">Rol</label>
              <input type="text" value={roleLabel} readOnly className="input" />
            </div>
          </div>
        </div>
      </div>

      <div className="card card-p-lg space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-gray-800 mb-4">Información del Sistema</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-bold">Versión</p>
              <p className="text-sm font-bold text-gray-800 mt-1">1.0.0</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-bold">Entorno</p>
              <p className="text-sm font-bold text-gray-800 mt-1">Producción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
