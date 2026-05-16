import { useState, useEffect } from 'react'
import { Package, AlertTriangle } from 'lucide-react'
import { getProducts } from '../../services/productos'
import { getLowStockMaterials } from '../../services/admin/dashboard'
import { formatPrice } from '../../utils/helpers'

export default function AdminInventario() {
  const [products, setProducts] = useState([])
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [prods, mats] = await Promise.all([
        getProducts().catch(() => []),
        getLowStockMaterials().catch(() => []),
      ])
      setProducts(Array.isArray(prods) ? prods : [])
      setMaterials(Array.isArray(mats) ? mats : [])
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

  const lowStock = products.filter(p => (p.stock ?? 0) <= 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-extrabold text-gray-800">Inventario</h2>
          <p className="text-sm text-gray-500">{products.length} productos en total</p>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="rounded-[20px] bg-red-50 border border-red-100 p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-700">{lowStock.length} productos con stock bajo</p>
            <p className="text-xs text-red-500">Se recomienda reabastecer</p>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="tbl-th">Producto</th>
                <th className="tbl-th">Stock</th>
                <th className="tbl-th">Precio</th>
                <th className="tbl-th">Categoría</th>
                <th className="tbl-th">Estado</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id_producto} className="tbl-row">
                  <td className="tbl-td font-semibold text-gray-800">{p.nombre}</td>
                  <td className="tbl-td">
                    <span className={`inline-flex items-center gap-1.5 font-bold ${
                      (p.stock ?? 0) <= 0 ? 'text-red-500' :
                      (p.stock ?? 0) <= 5 ? 'text-yellow-600' : 'text-gray-800'
                    }`}>
                      <Package size={14} />
                      {p.stock ?? 0} und.
                    </span>
                  </td>
                  <td className="tbl-td">{formatPrice(p.precio_venta || 0)}</td>
                  <td className="tbl-td text-gray-500">{p.categoria_nombre || 'General'}</td>
                  <td className="tbl-td">
                    <span className={`badge ${p.activo ? 'badge-listo' : 'badge-cancelado'}`}>
                      {p.activo ? 'Disponible' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {materials.length > 0 && (
        <div>
          <h3 className="text-lg font-extrabold text-gray-800 mb-4">Materiales con Stock Bajo</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map(m => (
              <div key={m.id_material} className="card card-p flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{m.nombre}</p>
                  <p className="text-xs text-gray-500">Stock: {m.stock_actual} / Mín: {m.stock_minimo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
