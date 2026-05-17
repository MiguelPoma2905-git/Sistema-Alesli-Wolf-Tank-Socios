import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react'
import { getFinancialTransactions } from '../../services/reportes'
import { getDashboardStats } from '../../services/admin/dashboard'
import { formatPrice } from '../../utils/helpers'

export default function AdminFinanzas() {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [txns, stats] = await Promise.all([
        getFinancialTransactions().catch(() => []),
        getDashboardStats().catch(() => null),
      ])
      setTransactions(Array.isArray(txns) ? txns : [])
      setSummary(stats)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const ingresos = transactions.filter(t => t.tipo === 'Ingreso')
  const egresos = transactions.filter(t => t.tipo === 'Egreso')
  const totalIngresos = ingresos.reduce((s, t) => s + parseFloat(t.monto || 0), 0)
  const totalEgresos = egresos.reduce((s, t) => s + parseFloat(t.monto || 0), 0)
  const balance = totalIngresos - totalEgresos

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-gray-800">Finanzas</h2>
        <p className="text-sm text-gray-500">{transactions.length} transacciones registradas</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="kpi-label">Ingresos</p>
              <p className="text-2xl font-extrabold text-gray-900">{formatPrice(totalIngresos)}</p>
            </div>
          </div>
        </div>
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <ArrowDownRight size={20} />
            </div>
            <div>
              <p className="kpi-label">Egresos</p>
              <p className="text-2xl font-extrabold text-gray-900">{formatPrice(totalEgresos)}</p>
            </div>
          </div>
        </div>
        <div className="card card-p">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="kpi-label">Balance</p>
              <p className={`text-2xl font-extrabold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatPrice(balance)}
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
                <th className="tbl-th">Fecha</th>
                <th className="tbl-th">Tipo</th>
                <th className="tbl-th">Monto</th>
                <th className="tbl-th">Método</th>
                <th className="tbl-th">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id_transaccion} className="tbl-row">
                  <td className="tbl-td text-gray-400">
                    {new Date(t.fecha).toLocaleDateString('es-BO')}
                  </td>
                  <td className="tbl-td">
                    <span className={`badge ${t.tipo === 'Ingreso' ? 'badge-listo' : 'badge-cancelado'}`}>
                      {t.tipo}
                    </span>
                  </td>
                  <td className="tbl-td font-bold">{formatPrice(t.monto || 0)}</td>
                  <td className="tbl-td text-gray-500">{t.metodo_pago || '--'}</td>
                  <td className="tbl-td text-gray-500">{t.descripcion || '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
