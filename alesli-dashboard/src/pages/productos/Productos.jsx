import { Link } from 'react-router-dom'
import { ArrowRight, Package, Sparkles, TrendingUp, Tag } from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import { PRODUCT_DETAILS } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'
import { TagBadge } from '../../components/ui/Badge'

function Productos() {
  const total = PRODUCT_DETAILS.length
  const activos = PRODUCT_DETAILS.filter(item => item.estado === 'activo').length
  const promociones = PRODUCT_DETAILS.filter(item => item.precios.promocional).length
  const stockCritico = PRODUCT_DETAILS.filter(item => item.stock <= item.stockMinimo).length

  return (
    <div className="p-6 space-y-8">
      <header className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-500 font-bold">Catálogo</p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Productos</h1>
            <p className="mt-4 text-sm leading-7 text-gray-500">Gestiona tu colección de arreglos florales con una vista amplia, métricas clave y acceso rápido a cada ficha de producto.</p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-auto xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Total</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{total}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Activos</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{activos}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">En promoción</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{promociones}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Stock crítico</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stockCritico}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-semibold">Listado activo</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Productos más recientes</h2>
            </div>
            <Link
              to={ROUTES.PRODUCTOS}
              className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
            >
              Ver todos los productos
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_DETAILS.map(product => (
              <article key={product.id} className="card card-hover overflow-hidden shadow-sm">
                <div className="h-44 bg-gradient-to-br from-pink-100 via-white to-white">
                  <img
                    src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80"
                    alt={product.nombre}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-pink-500 font-bold">{product.categoria}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.nombre}</h3>
                    </div>
                    <TagBadge
                      color={
                        product.estado === 'activo' ? '#22c55e' :
                        product.estado === 'agotado' ? '#ef4444' :
                        product.estado === 'en_oferta' ? '#f97316' :
                        product.estado === 'proximamente' ? '#2563eb' :
                        product.estado === 'discontinuado' ? '#0f172a' :
                        '#64748b'
                      }
                      textColor="#fff"
                    >
                      {product.estado.replace('_', ' ')}
                    </TagBadge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.descripcionCorta}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Stock</p>
                      <p className="mt-1 font-semibold text-slate-900">{product.stock}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Precio</p>
                      <p className="mt-1 font-semibold text-slate-900">{formatPrice(product.precios.aceptado, 'Bs ')}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map(tag => (
                      <TagBadge key={tag} color="#F9D1E7" textColor="#BE185D">{tag}</TagBadge>
                    ))}
                  </div>
                  <Link
                    to={`${ROUTES.PRODUCTOS}/${product.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
                  >
                    Ver detalles
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Tendencias</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">Productos con impulso</h3>
              </div>
              <Tag size={20} className="text-pink-500" />
            </div>
            <div className="mt-5 space-y-4">
              {PRODUCT_DETAILS.filter(item => item.visitas > 90).slice(0, 3).map(item => (
                <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.nombre}</p>
                      <p className="text-xs text-gray-500">{item.categoria}</p>
                    </div>
                    <span className="text-sm font-bold text-pink-600">+{item.visitas} visitas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-semibold">Atajos</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">Acciones rápidas</h3>
              </div>
              <Sparkles size={20} className="text-pink-500" />
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Administrar categorías y subcategorías</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Registrar precios especiales para temporada</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Ver historial completo de actualizaciones</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Productos