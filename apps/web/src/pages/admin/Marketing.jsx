import { useState, useEffect } from 'react'
import { TrendingUp, Megaphone, Calendar } from 'lucide-react'
import { getCampanas } from '../../services/reportes'

export default function AdminMarketing() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCampanas()
      .then(data => setCampaigns(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-extrabold text-gray-800">Marketing</h2>
          <p className="text-sm text-gray-500">{campaigns.length} campañas registradas</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
              <Megaphone size={20} />
            </div>
            <div>
              <p className="kpi-label">Activas</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {campaigns.filter(c => c.estado === 'Activa').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calendar size={20} />
            </div>
            <div>
              <p className="kpi-label">Finalizadas</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {campaigns.filter(c => c.estado === 'Finalizada').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="kpi-label">Presupuesto Total</p>
              <p className="text-2xl font-extrabold text-gray-900">
                Bs. {campaigns.reduce((s, c) => s + (parseFloat(c.presupuesto) || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="tbl-th">Nombre</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Presupuesto</th>
                <th className="tbl-th">Inicio</th>
                <th className="tbl-th">Fin</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.id_campania} className="tbl-row">
                  <td className="tbl-td font-semibold text-gray-800">{c.nombre}</td>
                  <td className="tbl-td">
                    <span className={`badge ${
                      c.estado === 'Activa' ? 'badge-listo' :
                      c.estado === 'Finalizada' ? 'badge-proceso' : 'badge-cancelado'
                    }`}>{c.estado}</span>
                  </td>
                  <td className="tbl-td font-bold">Bs. {c.presupuesto || '0.00'}</td>
                  <td className="tbl-td text-gray-400">
                    {c.fecha_inicio ? new Date(c.fecha_inicio).toLocaleDateString('es-BO') : '--'}
                  </td>
                  <td className="tbl-td text-gray-400">
                    {c.fecha_fin ? new Date(c.fecha_fin).toLocaleDateString('es-BO') : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
