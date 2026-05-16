import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, CheckCircle2, DollarSign, Gift, Package, Pencil, Plus, Tag, TrendingUp, Zap } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input, { Select, Textarea } from '../../components/ui/Input'
import { TagBadge } from '../../components/ui/Badge'
import { formatPrice } from '../../utils/helpers'
import { ROUTES } from '../../utils/constants'
import { PRODUCT_DETAILS } from '../../data/mockData'

const CATEGORY_OPTIONS = [
  { value: 'Ramos', label: 'Ramos' },
  { value: 'Centros de Mesa', label: 'Centros de Mesa' },
  { value: 'Coronas', label: 'Coronas' },
  { value: 'Arreglos Premium', label: 'Arreglos Premium' },
  { value: 'Cajas', label: 'Cajas' },
]

const SUBCATEGORY_MAP = {
  Ramos: [
    { value: 'Ramos románticos', label: 'Ramos románticos' },
    { value: 'Ramos mixtos', label: 'Ramos mixtos' },
    { value: 'Ramos alegres', label: 'Ramos alegres' },
    { value: 'Ramos primaverales', label: 'Ramos primaverales' },
  ],
  'Centros de Mesa': [
    { value: 'Centros elegantes', label: 'Centros elegantes' },
    { value: 'Centros festivos', label: 'Centros festivos' },
  ],
  Coronas: [
    { value: 'Funerarias', label: 'Funerarias' },
    { value: 'Festivas', label: 'Festivas' },
    { value: 'Contemporáneas', label: 'Contemporáneas' },
  ],
  'Arreglos Premium': [
    { value: 'Premium', label: 'Premium' },
    { value: 'Eventos', label: 'Eventos' },
  ],
  Cajas: [
    { value: 'Cajas regalo', label: 'Cajas regalo' },
    { value: 'Caja premium', label: 'Caja premium' },
    { value: 'Caja sorpresa', label: 'Caja sorpresa' },
  ],
}

const STATUS_STYLES = {
  activo: { bg: '#DCFCE7', color: '#15803D' },
  inactivo: { bg: '#E2E8F0', color: '#475569' },
  agotado: { bg: '#FEE2E2', color: '#B91C1C' },
  en_oferta: { bg: '#FFEDD5', color: '#C2410C' },
  proximamente: { bg: '#DBEAFE', color: '#1D4ED8' },
  discontinuado: { bg: '#F8FAFC', color: '#0F172A' },
}

function buildChartPath(points) {
  if (!points.length) return ''
  const values = points.map(point => point.precio)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100
      const y = 100 - ((point.precio - min) / span) * 100
      return `${x},${y}`
    })
    .join(' ')
}

function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCT_DETAILS.find(item => item.id === id) ?? PRODUCT_DETAILS[0]

  const [formValues, setFormValues] = useState({
    codigo: product.codigo,
    sku: product.sku,
    nombre: product.nombre,
    alias: product.alias,
    descripcionCorta: product.descripcionCorta,
    descripcionLarga: product.descripcionLarga,
    categoria: product.categoria,
    subcategoria: product.subcategoria,
    estado: product.estado,
    tags: product.tags,
    precioOriginal: product.precios.original,
    precioAceptado: product.precios.aceptado,
    precioMantenido: product.precios.mantenido,
    precioPromocional: product.precios.promocional ?? '',
    promocionInicio: product.precios.promocionInicio,
    promocionFin: product.precios.promocionFin,
  })

  const subcategoryOptions = useMemo(
    () => SUBCATEGORY_MAP[formValues.categoria] || [],
    [formValues.categoria],
  )

  const marginBruto = useMemo(() => {
    const accepted = Number(formValues.precioAceptado)
    const cost = Number(formValues.precioMantenido)
    return accepted > 0 ? ((accepted - cost) / accepted) * 100 : 0
  }, [formValues.precioAceptado, formValues.precioMantenido])

  const roi = useMemo(() => {
    const accepted = Number(formValues.precioAceptado)
    const cost = Number(formValues.precioMantenido)
    return cost > 0 ? ((accepted - cost) / cost) * 100 : 0
  }, [formValues.precioAceptado, formValues.precioMantenido])

  const ahorroPromocion = useMemo(() => {
    const original = Number(formValues.precioOriginal)
    const promo = Number(formValues.precioPromocional)
    return promo > 0 ? original - promo : 0
  }, [formValues.precioOriginal, formValues.precioPromocional])

  const descuentoPromocion = useMemo(() => {
    const original = Number(formValues.precioOriginal)
    const promo = Number(formValues.precioPromocional)
    return original > 0 && promo > 0 ? ((original - promo) / original) * 100 : 0
  }, [formValues.precioOriginal, formValues.precioPromocional])

  const chartPath = buildChartPath(product.evolucionPrecio)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            to={ROUTES.PRODUCTOS}
            className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-800"
          >
            <ArrowLeft size={16} /> Volver a productos
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-pink-500 font-bold">Gestión de producto</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.nombre}</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">Ficha completa del arreglo floral con datos de precio, margen, stock y cambios históricos.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon={<Pencil size={16} />}>Editar contenido</Button>
          <Button icon={<Plus size={16} />}>Agregar cambio histórico</Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <section className="card card-p">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Información general</h2>
                <p className="mt-2 text-sm text-gray-500">Actualiza los datos del producto y controla la clasificación, el alias y las etiquetas.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <TagBadge color={STATUS_STYLES[product.estado].bg} textColor={STATUS_STYLES[product.estado].color}>
                  {product.estado.replace('_', ' ')}
                </TagBadge>
                <TagBadge color="#FCE7F3" textColor="#BE185D">
                  {product.categoria}
                </TagBadge>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Input
                label="Código"
                value={formValues.codigo}
                onChange={e => setFormValues(prev => ({ ...prev, codigo: e.target.value }))}
              />
              <Input
                label="SKU"
                value={formValues.sku}
                onChange={e => setFormValues(prev => ({ ...prev, sku: e.target.value }))}
              />
              <Input
                label="Nombre"
                value={formValues.nombre}
                onChange={e => setFormValues(prev => ({ ...prev, nombre: e.target.value }))}
              />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Input
                label="Nombre alternativo"
                value={formValues.alias}
                onChange={e => setFormValues(prev => ({ ...prev, alias: e.target.value }))}
              />
              <Select
                label="Categoría"
                value={formValues.categoria}
                onChange={e => setFormValues(prev => ({ ...prev, categoria: e.target.value, subcategoria: SUBCATEGORY_MAP[e.target.value]?.[0]?.value ?? '' }))}
                options={CATEGORY_OPTIONS}
              />
              <Select
                label="Subcategoría"
                value={formValues.subcategoria}
                onChange={e => setFormValues(prev => ({ ...prev, subcategoria: e.target.value }))}
                options={subcategoryOptions}
              />
            </div>

            <div className="mt-4 grid gap-4">
              <Textarea
                label="Descripción corta"
                rows={3}
                value={formValues.descripcionCorta}
                onChange={e => setFormValues(prev => ({ ...prev, descripcionCorta: e.target.value }))}
              />
              <Textarea
                label="Descripción larga"
                rows={5}
                value={formValues.descripcionLarga}
                onChange={e => setFormValues(prev => ({ ...prev, descripcionLarga: e.target.value }))}
              />
            </div>

            <div className="mt-4">
              <div className="mb-2 text-sm font-bold text-slate-700">Etiquetas</div>
              <div className="flex flex-wrap gap-2">
                {formValues.tags.map(tag => (
                  <TagBadge key={tag} color="#FCE7F3" textColor="#BE185D">{tag}</TagBadge>
                ))}
              </div>
            </div>
          </section>

          <section className="card card-p">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Precios y márgenes</h2>
                <p className="mt-2 text-sm text-gray-500">Controla los precios, fechas de promoción y cálculos automáticos que impactan la rentabilidad.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Input
                label="Precio original"
                type="number"
                value={formValues.precioOriginal}
                onChange={e => setFormValues(prev => ({ ...prev, precioOriginal: Number(e.target.value) }))}
                suffix="Bs"
              />
              <Input
                label="Precio aceptado"
                type="number"
                value={formValues.precioAceptado}
                onChange={e => setFormValues(prev => ({ ...prev, precioAceptado: Number(e.target.value) }))}
                suffix="Bs"
              />
              <Input
                label="Precio mantenido"
                type="number"
                value={formValues.precioMantenido}
                onChange={e => setFormValues(prev => ({ ...prev, precioMantenido: Number(e.target.value) }))}
                suffix="Bs"
              />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Input
                label="Precio promocional"
                type="number"
                value={formValues.precioPromocional}
                onChange={e => setFormValues(prev => ({ ...prev, precioPromocional: Number(e.target.value) }))}
                suffix="Bs"
              />
              <Input
                label="Fecha inicio promoción"
                type="date"
                value={formValues.promocionInicio}
                onChange={e => setFormValues(prev => ({ ...prev, promocionInicio: e.target.value }))}
              />
              <Input
                label="Fecha fin promoción"
                type="date"
                value={formValues.promocionFin}
                onChange={e => setFormValues(prev => ({ ...prev, promocionFin: e.target.value }))}
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">Margen bruto</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{marginBruto.toFixed(0)}%</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">ROI del producto</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{roi.toFixed(0)}%</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">Ahorro en promoción</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{formatPrice(ahorroPromocion, 'Bs ')}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">% de descuento</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{descuentoPromocion.toFixed(0)}%</p>
              </div>
            </div>
          </section>

          <section className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Historial de cambios de precio</h2>
                <p className="mt-1 text-sm text-gray-500">Revisa los últimos registros con fecha, usuario y motivo.</p>
              </div>
              <Button variant="secondary" icon={<Plus size={16} />}>Agregar cambio histórico</Button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase tracking-[0.18em] text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Usuario</th>
                      <th className="px-4 py-3">Precio anterior</th>
                      <th className="px-4 py-3">Precio nuevo</th>
                      <th className="px-4 py-3">Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.historialPrecios.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 py-4 font-medium text-slate-700">{item.fecha}</td>
                        <td className="px-4 py-4">{item.usuario}</td>
                        <td className="px-4 py-4">{formatPrice(item.anterior, 'Bs ')}</td>
                        <td className="px-4 py-4">{formatPrice(item.nuevo, 'Bs ')}</td>
                        <td className="px-4 py-4 text-gray-500">{item.motivo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Resumen</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{product.nombre}</h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">{product.unidad}</span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Estado</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-2" style={{ background: STATUS_STYLES[product.estado].bg }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_STYLES[product.estado].color }} />
                  <span className="text-sm font-semibold" style={{ color: STATUS_STYLES[product.estado].color }}>
                    {product.estado.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Stock actual</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{product.stock}</p>
                  <p className="mt-1 text-sm text-gray-500">Mínimo: {product.stockMinimo}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Proveedor</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{product.proveedor}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Visitas</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{product.visitas}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Ventas totales</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{product.ventasTotales}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Evolución de precios</h2>
                <p className="mt-2 text-sm text-gray-500">Últimos 12 meses</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative h-52 overflow-hidden rounded-[30px] bg-gradient-to-br from-pink-50 to-white p-4">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    points={chartPath}
                  />
                  {product.evolucionPrecio.map((item, index) => {
                    const values = product.evolucionPrecio.map(point => point.precio)
                    const max = Math.max(...values)
                    const min = Math.min(...values)
                    const span = max - min || 1
                    const x = (index / (product.evolucionPrecio.length - 1)) * 100
                    const y = 100 - ((item.precio - min) / span) * 100
                    return (
                      <circle key={item.mes} cx={x} cy={y} r="1.8" fill="#ec4899" />
                    )
                  })}
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-500">
                {product.evolucionPrecio.slice(0, 3).map(point => (
                  <div key={point.mes} className="rounded-2xl bg-white p-3 shadow-sm">
                    <p>{point.mes}</p>
                    <p className="mt-1 font-semibold text-slate-900">{formatPrice(point.precio, 'Bs ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default ProductDetail