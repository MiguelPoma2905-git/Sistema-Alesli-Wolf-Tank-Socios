import { useMemo, useState } from 'react'
import { Search, ArrowUpDown, Plus, Trash2, Edit3, Barcode, Download, AlertTriangle, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { INVENTORY } from '../../data/mockData'

const CATEGORY_MAP = {
  Rosas: 'Flores',
  Tulipanes: 'Flores',
  Lirios: 'Flores',
  Girasoles: 'Flores',
  'Cinta satén': 'Materiales',
  Papel: 'Materiales',
  Cajas: 'Materiales',
}

const makeCategory = (product) => {
  const key = Object.keys(CATEGORY_MAP).find((term) => product.includes(term))
  return key ? CATEGORY_MAP[key] : 'Otros'
}

const formatDateTime = (value = new Date()) => {
  return typeof value === 'string'
    ? value
    : new Date(value).toLocaleString('es-BO', { dateStyle: 'short', timeStyle: 'short' })
}

function Inventario() {
  const { showToast } = useApp()
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [barcode, setBarcode] = useState('')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [newProduct, setNewProduct] = useState({ product: '', category: 'Flores', stock: '', minStock: '', unit: '' })
  const [editItem, setEditItem] = useState(null)
  const [editQty, setEditQty] = useState('')
  const [editReason, setEditReason] = useState('')
  const [inventory, setInventory] = useState(() => INVENTORY.map((item) => ({
    ...item,
    category: makeCategory(item.product),
    updated: 'Hace 1h',
  })))
  const [movements, setMovements] = useState([
    { id: 1, product: 'Lirios', type: 'Salida', qty: 10, unit: 'tallos', when: '16/05/2026 09:35', note: 'Pedido ORD-087' },
    { id: 2, product: 'Cinta satén rosa', type: 'Salida', qty: 20, unit: 'rollos', when: '15/05/2026 16:20', note: 'Reempaque bodas' },
    { id: 3, product: 'Papel kraft', type: 'Entrada', qty: 50, unit: 'pliegos', when: '15/05/2026 14:10', note: 'Recepción proveedor' },
  ])

  const groupedInventory = useMemo(() => {
    const entries = inventory
      .filter((item) => item.product.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock))

    return entries.reduce((acc, item) => {
      const category = item.category || 'Otros'
      if (!acc[category]) acc[category] = []
      acc[category].push(item)
      return acc
    }, {})
  }, [inventory, search, sortOrder])

  const categories = useMemo(() => Object.keys(groupedInventory), [groupedInventory])

  const lowStockItems = useMemo(
    () => inventory.filter((item) => item.stock <= item.minStock),
    [inventory],
  )

  const handleToggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleRequestRestock = () => {
    showToast('Solicitud de reposición enviada al proveedor', 'success', '✅')
  }

  const handleSaveEdit = () => {
    if (!editItem || editQty === '') {
      showToast('Ingresa la nueva cantidad antes de guardar', 'warning', '⚠️')
      return
    }
    setInventory((prev) => prev.map((item) => {
      if (item.id !== editItem.id) return item
      return {
        ...item,
        stock: Number(editQty),
        updated: formatDateTime(new Date()),
      }
    }))
    setMovements((prev) => [
      {
        id: prev.length + 1,
        product: editItem.product,
        type: 'Ajuste',
        qty: Number(editQty) - editItem.stock,
        unit: editItem.unit,
        when: formatDateTime(new Date()),
        note: editReason || 'Ajuste de inventario',
      },
      ...prev,
    ])
    setEditItem(null)
    setEditQty('')
    setEditReason('')
    showToast('Cantidad actualizada', 'success', '✅')
  }

  const handleAddProduct = () => {
    if (!newProduct.product || !newProduct.unit || newProduct.stock === '' || newProduct.minStock === '') {
      showToast('Completa todos los campos para agregar el producto', 'warning', '⚠️')
      return
    }
    const nextId = Math.max(...inventory.map((item) => item.id)) + 1
    const product = {
      id: nextId,
      product: newProduct.product,
      category: newProduct.category,
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock),
      unit: newProduct.unit,
      status: Number(newProduct.stock) <= Number(newProduct.minStock) ? 'Bajo' : 'OK',
      updated: formatDateTime(new Date()),
    }
    setInventory((prev) => [product, ...prev])
    setMovements((prev) => [
      {
        id: prev.length + 1,
        product: product.product,
        type: 'Entrada',
        qty: product.stock,
        unit: product.unit,
        when: formatDateTime(new Date()),
        note: 'Producto agregado',
      },
      ...prev,
    ])
    setNewProduct({ product: '', category: 'Flores', stock: '', minStock: '', unit: '' })
    showToast('Producto agregado al inventario', 'success', '✅')
  }

  const handleDeleteProduct = (item) => {
    if (!window.confirm(`¿Eliminar ${item.product} del inventario?`)) return
    setInventory((prev) => prev.filter((product) => product.id !== item.id))
    setMovements((prev) => [
      {
        id: prev.length + 1,
        product: item.product,
        type: 'Salida',
        qty: item.stock,
        unit: item.unit,
        when: formatDateTime(new Date()),
        note: 'Producto eliminado',
      },
      ...prev,
    ])
    showToast('Producto eliminado', 'error', '🗑️')
  }

  const handleScanBarcode = () => {
    if (!barcode) {
      showToast('Ingresa un código de barras simulado', 'warning', '⚠️')
      return
    }
    const item = inventory.find((entry) => String(entry.id) === barcode)
    if (item) {
      setSearch(item.product)
      showToast(`Producto detectado: ${item.product}`, 'success', '✅')
    } else {
      showToast('Código no reconocido', 'error', '⚠️')
    }
    setBarcode('')
  }

  const countLowStock = lowStockItems.length

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Inventario</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Gestión de stock y reposición</h1>
            <p className="mt-2 text-sm text-gray-500">Controla productos, solicita reposición y registra movimientos en tiempo real.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => showToast('Reporte exportado a Excel/PDF', 'success', '✅')}
              className="btn btn-secondary btn-sm inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Exportar reporte
            </button>
            <button
              type="button"
              onClick={() => handleRequestRestock()}
              className="btn btn-primary btn-sm inline-flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" /> Solicitar reposición
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="card card-p">
          <div className="rounded-[32px] border border-rose-100 bg-rose-50 p-5 text-rose-700 shadow-sm">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <AlertTriangle className="h-5 w-5" />
              <span>{countLowStock} productos con stock bajo o crítico</span>
            </div>
            <p className="mt-2 text-sm text-rose-700/80">Revisa el listado filtrado y solicita reposición o ajusta cantidades.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar producto..."
                className="input w-full pl-11"
              />
            </div>
            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className="btn btn-secondary btn-sm inline-flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" /> Ordenar stock: {sortOrder === 'asc' ? 'menor a mayor' : 'mayor a menor'}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {categories.map((category) => {
              const items = groupedInventory[category] || []
              const isExpanded = expandedCategories[category] !== false
              return (
                <div key={category} className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(category)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{category}</p>
                      <p className="text-sm text-gray-500">{items.length} productos</p>
                    </div>
                    <span className="text-pink-500">{isExpanded ? 'Ocultar' : 'Mostrar'}</span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 py-4">
                      <div className="grid gap-4">
                        {items.map((item) => (
                          <div key={item.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-base font-semibold text-gray-900">{item.product}</p>
                                <p className="mt-1 text-sm text-gray-500">Actualizado: {item.updated}</p>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{item.stock} {item.unit}</span>
                                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">Mínimo {item.minStock}</span>
                              </div>
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-3xl bg-white p-3 text-sm text-gray-700">
                                <p className="font-semibold">Categoría</p>
                                <p className="mt-1">{item.category}</p>
                              </div>
                              <div className="rounded-3xl bg-white p-3 text-sm text-gray-700">
                                <p className="font-semibold">Estado</p>
                                <p className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.stock <= item.minStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {item.stock <= item.minStock ? 'Bajo' : 'OK'}
                                </p>
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditItem(item)
                                    setEditQty(String(item.stock))
                                  }}
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-gray-600 shadow-sm hover:bg-pink-50 hover:text-pink-600"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(item)}
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-gray-600 shadow-sm hover:bg-rose-50 hover:text-rose-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </article>

        <aside className="space-y-6">
          <article className="card card-p">
            <div className="flex items-center gap-3">
              <Barcode className="h-5 w-5 text-pink-500" />
              <h2 className="sec-title">Escanear código de barras</h2>
            </div>
            <div className="mt-5 space-y-3">
              <input
                value={barcode}
                onChange={(event) => setBarcode(event.target.value)}
                placeholder="Código numérico simulado"
                className="input"
              />
              <button
                type="button"
                onClick={handleScanBarcode}
                className="btn btn-primary btn-sm w-full"
              >
                Escanear
              </button>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center gap-3">
              <Plus className="h-5 w-5 text-pink-500" />
              <h2 className="sec-title">Agregar nuevo producto</h2>
            </div>
            <div className="mt-5 space-y-3">
              <input
                value={newProduct.product}
                onChange={(event) => setNewProduct((prev) => ({ ...prev, product: event.target.value }))}
                placeholder="Nombre del producto"
                className="input"
              />
              <input
                value={newProduct.unit}
                onChange={(event) => setNewProduct((prev) => ({ ...prev, unit: event.target.value }))}
                placeholder="Unidad"
                className="input"
              />
              <input
                type="number"
                value={newProduct.stock}
                onChange={(event) => setNewProduct((prev) => ({ ...prev, stock: event.target.value }))}
                placeholder="Stock inicial"
                className="input"
              />
              <input
                type="number"
                value={newProduct.minStock}
                onChange={(event) => setNewProduct((prev) => ({ ...prev, minStock: event.target.value }))}
                placeholder="Stock mínimo"
                className="input"
              />
              <select
                value={newProduct.category}
                onChange={(event) => setNewProduct((prev) => ({ ...prev, category: event.target.value }))}
                className="input"
              >
                <option>Flores</option>
                <option>Materiales</option>
                <option>Otros</option>
              </select>
              <button
                type="button"
                onClick={handleAddProduct}
                className="btn btn-primary btn-sm w-full"
              >
                Agregar producto
              </button>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-pink-500" />
              <h2 className="sec-title">Historial de movimientos</h2>
            </div>
            <div className="mt-5 space-y-3">
              {movements.slice(0, 6).map((movement) => (
                <div key={movement.id} className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{movement.product}</p>
                  <p className="mt-1">{movement.type} {Math.abs(movement.qty)} {movement.unit}</p>
                  <p className="mt-1 text-xs text-gray-400">{movement.when}</p>
                  <p className="mt-1 text-xs text-gray-500">{movement.note}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Editar cantidad</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{editItem.product}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 space-y-4">
              <input
                type="number"
                value={editQty}
                onChange={(event) => setEditQty(event.target.value)}
                className="input"
                placeholder="Cantidad nueva"
              />
              <textarea
                value={editReason}
                onChange={(event) => setEditReason(event.target.value)}
                className="input h-24"
                placeholder="Justificación opcional"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="btn btn-secondary btn-sm"
                >Cancelar</button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="btn btn-primary btn-sm"
                >Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventario