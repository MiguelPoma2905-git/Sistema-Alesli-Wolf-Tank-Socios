import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Eye } from 'lucide-react'
import ProductCard from '../../components/shared/ProductCard'
import FilterBar from '../../components/ui/Filter'
import { getProducts, getCategories } from '../../services/productos'

export default function AdminCatalogo() {
  const [filter, setFilter] = useState('Todas')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const [prods, cats] = await Promise.all([
        getProducts().catch(() => []),
        getCategories().catch(() => []),
      ])
      setProducts(Array.isArray(prods) ? prods : [])
      setCategories(Array.isArray(cats) ? cats : [])
      setLoading(false)
    }
    load()
  }, [])

  const allCats = useMemo(() => ['Todas', ...categories.map(c => c.nombre)], [categories])

  const mapped = useMemo(() => products.map(p => ({
    id: p.id_producto,
    name: p.nombre,
    price: parseFloat(p.precio_venta),
    img: p.imagen || p.imagen_url || '/images/placeholder_product.jpg',
    cat: p.categoria_nombre || 'General',
    desc: p.descripcion || '',
    rating: 5.0,
    reviews: 0,
    stock: p.activo ? (p.stock || 10) : 0,
  })), [products])

  const filtered = filter === 'Todas' ? mapped : mapped.filter(p => p.cat === filter)

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
          <h2 className="text-[22px] font-extrabold text-gray-800">Catálogo</h2>
          <p className="text-sm text-gray-500">{products.length} productos — Vista previa del catálogo público</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-3xl bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
          <Eye size={14} /> Vista previa
        </div>
      </div>

      <div className="rounded-[28px] border border-gray-100 bg-white p-5">
        <FilterBar tabs={allCats} active={filter} onChange={setFilter} />
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[16px] font-bold text-gray-800 mb-1">No hay productos en esta categoría</p>
            <p className="text-[13px] text-gray-500">Creá productos desde la sección Productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6">
            {filtered.map(p => (
              <div key={p.id} onClick={() => navigate(`/flores/${p.id}`)} className="cursor-pointer">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}