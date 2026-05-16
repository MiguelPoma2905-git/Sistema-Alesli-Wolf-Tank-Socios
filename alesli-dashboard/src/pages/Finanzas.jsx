import { useMemo, useState } from 'react'
import { Banknote, CreditCard, QrCode, Wallet, ArrowRight, CalendarCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

const MONTHLY_DATA = [
  { month: 'Ene', ingresos: 8200, gastos: 4500 },
  { month: 'Feb', ingresos: 9500, gastos: 5300 },
  { month: 'Mar', ingresos: 7600, gastos: 4100 },
  { month: 'Abr', ingresos: 10400, gastos: 6200 },
  { month: 'May', ingresos: 11700, gastos: 6800 },
  { month: 'Jun', ingresos: 12850, gastos: 7100 },
]

const TRANSACTIONS = [
  { id: 'TRX-106', desc: "Venta: Arreglo A-4 'Amor' (Boda)", amount: 1450, date: '16 May 2026 · 11:40', category: 'Venta', type: 'income' },
  { id: 'TRX-105', desc: "Gasto: Compra de rosas rojas (Proveedor)", amount: -620, date: '16 May 2026 · 09:20', category: 'Materiales', type: 'expense' },
  { id: 'TRX-104', desc: "Anticipo: Pedido ORD-089 (Corporativo)", amount: 700, date: '15 May 2026 · 18:10', category: 'Anticipo', type: 'income' },
  { id: 'TRX-103', desc: "Pago: Billetera móvil Tigo Money", amount: -210, date: '15 May 2026 · 15:35', category: 'Gasto', type: 'expense' },
  { id: 'TRX-102', desc: "Venta: Caja Tulipanes (Cliente VIP)", amount: 980, date: '15 May 2026 · 13:00', category: 'Venta', type: 'income' },
  { id: 'TRX-101', desc: "Compra: Empaque premium para pedidos", amount: -340, date: '14 May 2026 · 16:50', category: 'Materiales', type: 'expense' },
]

const PAYMENT_METHODS = [
  {
    title: 'Transferencia Bancaria',
    icon: Banknote,
    items: ['Banco Unión', 'Bisa', 'BCP', 'Billetera Móvil', 'Tigo Money', 'Movistar', 'Viva'],
  },
  {
    title: 'Débito / Crédito',
    icon: CreditCard,
    items: ['Visa', 'Mastercard', 'Maestro'],
  },
  {
    title: 'Pago QR',
    icon: QrCode,
    items: ['QR interoperable Bolivia'],
  },
]

const PREDEFINED_TOTALS = [100, 140, 200, 340, 350]

function Finanzas() {
  const { showToast } = useApp()
  const [total, setTotal] = useState(200)
  const [selectedTotal, setSelectedTotal] = useState(200)
  const [detailTx, setDetailTx] = useState(null)

  const flujoCaja = useMemo(
    () => MONTHLY_DATA.reduce((sum, item) => sum + item.ingresos - item.gastos, 0),
    [],
  )

  const maxAmount = useMemo(
    () => Math.max(...MONTHLY_DATA.flatMap(item => [item.ingresos, item.gastos]), 1),
    [],
  )

  const depositAmount = useMemo(() => Math.round(total * 0.5), [total])

  const handleApplyAnticipo = () => {
    showToast(`Anticipo de ${formatPrice(depositAmount, 'Bs ')} registrado`, 'success', '✅')
  }

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Finanzas</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Resumen financiero, pagos y flujo de caja</h1>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-100"
            onClick={() => showToast('Función de exportar pronto disponible', 'info', 'ℹ️')}
          >
            <Wallet className="h-4 w-4" />
            Exportar reporte
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="card card-p">
          <div className="sec-header">
            <div>
              <h2 className="sec-title">Ingresos vs Gastos</h2>
              <p className="text-sm text-gray-500">Comparativa en los últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Ingresos
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Gastos
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-[30px] bg-pink-50 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="kpi-label">Flujo de caja neto</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{formatPrice(flujoCaja, 'Bs ')}</p>
                <p className="mt-2 text-sm text-gray-500">Ingresos totales menos gastos totales</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="kpi-label">Presupuesto mensual</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{formatPrice(11500, 'Bs ')}</p>
                <p className="mt-2 text-sm text-gray-500">Meta estimada para el semestre</p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <div className="relative h-72 min-w-[550px] rounded-[28px] bg-white p-5 shadow-card">
                <div className="absolute inset-x-0 top-5 flex justify-between text-[11px] uppercase tracking-[1.3px] text-gray-400">
                  <span>Mes</span>
                  <span>Monto (Bs)</span>
                </div>
                <div className="absolute inset-x-0 bottom-4 left-0 right-0 flex h-full items-end gap-3 px-4 pt-10">
                  {MONTHLY_DATA.map((item) => {
                    const ingresosHeight = Math.round((item.ingresos / maxAmount) * 100)
                    const gastosHeight = Math.round((item.gastos / maxAmount) * 100)
                    return (
                      <div key={item.month} className="flex flex-col items-center gap-2">
                        <div className="flex h-48 items-end gap-1.5">
                          <div className="w-7 rounded-full bg-emerald-500" style={{ height: `${ingresosHeight}%` }} title={`Ingresos ${formatPrice(item.ingresos, 'Bs ')}`} />
                          <div className="w-7 rounded-full bg-red-500" style={{ height: `${gastosHeight}%` }} title={`Gastos ${formatPrice(item.gastos, 'Bs ')}`} />
                        </div>
                        <span className="text-[12px] font-semibold text-gray-600">{item.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="card card-p">
          <div className="sec-header">
            <div>
              <h2 className="sec-title">Métodos de Pago Aceptados</h2>
              <p className="text-sm text-gray-500">Todas las opciones disponibles para clientes</p>
            </div>
          </div>
          <div className="grid gap-4">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{method.title}</p>
                      <p className="text-sm text-gray-500">{method.items.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="card card-p">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="sec-title">Transacciones Recientes</h2>
              <p className="text-sm text-gray-500">Últimas 6 operaciones financieras</p>
            </div>
            <button
              type="button"
              className="sec-link"
              onClick={() => showToast('Historial completo aún no implementado', 'info', 'ℹ️')}
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr>
                  <th className="tbl-th">Transacción</th>
                  <th className="tbl-th">Monto</th>
                  <th className="tbl-th">Fecha</th>
                  <th className="tbl-th">Categoría</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx) => (
                  <tr
                    key={tx.id}
                    className="tbl-row"
                    onClick={() => setDetailTx(tx)}
                  >
                    <td className="tbl-td text-gray-800">{tx.desc}</td>
                    <td className={`tbl-td font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatPrice(Math.abs(tx.amount), 'Bs ')}
                    </td>
                    <td className="tbl-td text-gray-500">{tx.date}</td>
                    <td className="tbl-td text-sm font-semibold text-gray-700">{tx.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card card-p">
          <div className="sec-header">
            <div>
              <h2 className="sec-title">Calculador de Anticipo</h2>
              <p className="text-sm text-gray-500">Se requiere el 50% para confirmar el pedido</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3 rounded-3xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-700">Precios totales sugeridos</p>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_TOTALS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedTotal === amount ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-pink-50'}`}
                    onClick={() => {
                      setTotal(amount)
                      setSelectedTotal(amount)
                    }}
                  >
                    {formatPrice(amount, 'Bs ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 rounded-3xl bg-gray-50 p-4">
              <label className="text-sm font-semibold text-gray-700">Precio total manual</label>
              <input
                type="number"
                min="0"
                value={total}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setTotal(Number.isNaN(value) ? 0 : value)
                  setSelectedTotal(value)
                }}
                className="input"
              />
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[1.4px] text-gray-400">Anticipo calculado</p>
              <p className="mt-3 text-3xl font-extrabold text-gray-900">{formatPrice(depositAmount, 'Bs ')}</p>
              <p className="mt-2 text-sm text-gray-500">50% de {formatPrice(total, 'Bs ')}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-md"
              onClick={handleApplyAnticipo}
            >
              Aplicar anticipo
            </button>
          </div>
        </article>
      </section>

      {detailTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Detalle de transacción</p>
                <h3 className="mt-2 text-2xl font-extrabold text-gray-900">{detailTx.id}</h3>
                <p className="text-sm text-gray-500">{detailTx.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailTx(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Descripción</p>
                <p className="mt-2 font-semibold text-gray-900">{detailTx.desc}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Monto</p>
                <p className={`mt-2 text-xl font-extrabold ${detailTx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {detailTx.type === 'income' ? '+' : '-'}{formatPrice(Math.abs(detailTx.amount), 'Bs ')}
                </p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Fecha y hora</p>
                <p className="mt-2 font-semibold text-gray-900">{detailTx.date}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="mt-2 font-semibold text-gray-900">{detailTx.category}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setDetailTx(null)}
              >Cerrar</button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  showToast('Detalle guardado en favoritos', 'success', '✨')
                  setDetailTx(null)
                }}
              >Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Finanzas