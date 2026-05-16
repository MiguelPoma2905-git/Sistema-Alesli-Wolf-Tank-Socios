import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Users, ShoppingBag, Layers, DollarSign, Package,
  ArrowRight, TrendingUp, Plus, Edit, Trash2,
  BarChart3, Settings, UserPlus, AlertCircle,
  CheckCircle, Clock, X, Image as ImageIcon, Upload
} from 'lucide-react'
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../services/productos'
import { getOrders, updateOrder } from '../services/pedidos'
import { getClients } from '../services/clientes'
import { getSuppliers } from '../services/proveedores'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-[22px] font-black text-text-dark dark:text-white leading-none">{value}</p>
          <p className="text-[12px] font-medium text-text-muted">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, isAdmin } = useApp()

  const [activeTab, setActiveTab] = useState('resumen')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ products: [], orders: [], clients: [], suppliers: [] })

  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({ nombre: '', precio: '', id_categoria: '', imagen: '' })
  const [imagenPreview, setImagenPreview] = useState(null)
  const [imagenSource, setImagenSource] = useState('file')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
      return
    }
    async function load() {
      setLoading(true)
      const [products, orders, clients, suppliers, cats] = await Promise.all([
        getProducts().catch(() => []),
        getOrders().catch(() => []),
        getClients().catch(() => []),
        getSuppliers().catch(() => []),
        getCategories().catch(() => []),
      ])
      setData({
        products: Array.isArray(products) ? products : [],
        orders: Array.isArray(orders) ? orders : [],
        clients: Array.isArray(clients) ? clients : [],
        suppliers: Array.isArray(suppliers) ? suppliers : [],
      })
      setCategories(Array.isArray(cats) ? cats : [])
      setLoading(false)
    }
    load()
  }, [isAdmin, navigate])

  const totalRevenue = data.orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0)

  const handleSaveProduct = async () => {
    try {
      const codigo = editingProduct
        ? editingProduct.codigo
        : `PROD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      const payload = {
        codigo,
        nombre: productForm.nombre,
        precio_venta: productForm.precio,
        id_categoria: productForm.id_categoria ? Number(productForm.id_categoria) : null,
        imagen_url: productForm.imagen || null,
        activo: true,
      }
      if (editingProduct) {
        await updateProduct(editingProduct.id_producto, payload)
      } else {
        await createProduct(payload)
      }
      setShowProductModal(false)
      setEditingProduct(null)
      setProductForm({ nombre: '', precio: '', id_categoria: '', imagen: '' })
      setImagenPreview(null)
      setImagenSource('file')
      const products = await getProducts().catch(() => [])
      setData(prev => ({ ...prev, products: Array.isArray(products) ? products : [] }))
    } catch (err) {
      console.error('Error guardando producto:', err?.response?.data || err)
      alert(err?.response?.data?.codigo?.[0] || 'Error al guardar producto')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await deleteProduct(id)
      setData(prev => ({ ...prev, products: prev.products.filter(p => p.id_producto !== id) }))
    } catch {
      alert('Error al eliminar producto')
    }
  }

  const openEditProduct = (product) => {
    setEditingProduct(product)
    const img = product.imagen || product.imagen_url || ''
    setProductForm({
      nombre: product.nombre || '',
      precio: product.precio_venta || '',
      id_categoria: product.id_categoria || '',
      imagen: img,
    })
    setImagenPreview(img || null)
    setImagenSource(img.startsWith('data:') ? 'file' : 'url')
    setShowProductModal(true)
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted font-medium">Cargando panel...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: BarChart3 },
    { id: 'productos', label: 'Productos', icon: Layers },
    { id: 'pedidos', label: 'Pedidos', icon: Package },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
  ]

  return (
    <div className="flex-1 w-full animate-fade-in">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-black text-text-dark dark:text-white">Administración</h1>
            <p className="text-[14px] text-text-muted font-medium mt-1">Panel de control del sistema</p>
          </div>
          <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 text-text-dark dark:text-white rounded-xl font-bold text-[12px] hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
            Volver al Dashboard
          </button>
        </div>

        <div className="flex gap-1 mb-8 p-1 bg-gray-100 dark:bg-white/5 rounded-xl w-fit">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#1a1a2e] text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-dark dark:hover:text-white'
                }`}
              >
                <Icon size={15} /> {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'resumen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Clientes" value={data.clients.length} color="bg-purple-500" />
              <StatCard icon={ShoppingBag} label="Pedidos" value={data.orders.length} color="bg-blue-500" />
              <StatCard icon={Layers} label="Productos" value={data.products.length} color="bg-primary" />
              <StatCard icon={DollarSign} label="Ingresos" value={`Bs. ${totalRevenue.toFixed(2)}`} color="bg-green-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <h2 className="text-[16px] font-black text-text-dark dark:text-white mb-4">Últimos Pedidos</h2>
                {data.orders.length === 0 ? (
                  <p className="text-text-muted text-center py-8 text-[13px]">Sin pedidos registrados</p>
                ) : (
                  <div className="space-y-3">
                    {data.orders.slice(0, 5).map((o, i) => (
                      <div key={o.id || i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            o.status === 'Entregado' ? 'bg-green-50 text-green-500' :
                            o.status === 'Cancelado' ? 'bg-red-50 text-red-500' :
                            'bg-yellow-50 text-yellow-500'
                          }`}>
                            {o.status === 'Entregado' ? <CheckCircle size={16} /> :
                             o.status === 'Cancelado' ? <X size={16} /> :
                             <Clock size={16} />}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</p>
                            <p className="text-[11px] text-text-muted">Bs. {o.total || '0.00'}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                          o.status === 'Entregado' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                          o.status === 'Cancelado' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                          o.status === 'En camino' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                        }`}>{o.status || 'Pendiente'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <h2 className="text-[16px] font-black text-text-dark dark:text-white mb-4">Proveedores</h2>
                {data.suppliers.length === 0 ? (
                  <p className="text-text-muted text-center py-8 text-[13px]">Sin proveedores registrados</p>
                ) : (
                  <div className="space-y-3">
                    {data.suppliers.map((s, i) => (
                      <div key={s.id || i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                        <div>
                          <p className="text-[13px] font-bold text-text-dark dark:text-white">{s.nombre || s.name}</p>
                          <p className="text-[11px] text-text-muted">{s.telefono || s.contacto || '--'}</p>
                        </div>
                        <span className="text-[10px] font-black text-text-muted">{s.email || ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'productos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-black text-text-dark dark:text-white">Gestión de Productos</h2>
              <button onClick={() => { setEditingProduct(null); setProductForm({ nombre: '', precio: '', id_categoria: '', imagen: '' }); setImagenPreview(null); setImagenSource('file'); setShowProductModal(true) }} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-black text-[12px] uppercase tracking-wide hover:bg-secondary transition-all shadow-md">
                <Plus size={16} /> Nuevo Producto
              </button>
            </div>

            {data.products.length === 0 ? (
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-12 text-center">
                <Layers size={40} className="mx-auto text-text-muted/30 mb-4" />
                <p className="text-[16px] font-bold text-text-dark dark:text-white mb-2">No hay productos</p>
                <p className="text-[13px] text-text-muted mb-6">Crea tu primer producto en el catálogo</p>
                <button onClick={() => { setEditingProduct(null); setProductForm({ nombre: '', precio: '', id_categoria: '', imagen: '' }); setImagenPreview(null); setImagenSource('file'); setShowProductModal(true) }} className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-secondary transition-all shadow-md inline-flex items-center gap-2">
                  <Plus size={16} /> Crear Producto
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/5">
                        <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Nombre</th>
                        <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Precio</th>
                        <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Stock</th>
                        <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Categoría</th>
                        <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.products.map((p, i) => (
                        <tr key={p.id_producto || i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <td className="p-4 text-[13px] font-bold text-text-dark dark:text-white">{p.nombre}</td>
                          <td className="p-4 text-[13px] text-text-muted">Bs. {p.precio_venta || '0.00'}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${p.activo ? 'text-green-500 bg-green-50 dark:bg-green-500/10' : 'text-red-500 bg-red-50 dark:bg-red-500/10'}`}>
                              {p.activo ? 'Disponible' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="p-4 text-[12px] text-text-muted">{p.categoria_nombre || 'Sin categoría'}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => openEditProduct(p)} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-500 transition-colors"><Edit size={15} /></button>
                              <button onClick={() => handleDeleteProduct(p.id_producto)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-colors"><Trash2 size={15} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
            <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-4">Todos los Pedidos</h2>
            {data.orders.length === 0 ? (
              <p className="text-text-muted text-center py-12 text-[13px]">No hay pedidos en el sistema</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">ID</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Cliente</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Total</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Estado</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((o, i) => (
                      <tr key={o.id || i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</td>
                        <td className="p-4 text-[13px] text-text-muted">{o.cliente_nombre || 'N/A'}</td>
                        <td className="p-4 text-[13px] font-bold text-text-dark dark:text-white">Bs. {o.total || '0.00'}</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            o.status === 'Entregado' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                            o.status === 'Cancelado' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                            o.status === 'En camino' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                          }`}>{o.status || 'Pendiente'}</span>
                        </td>
                        <td className="p-4 text-[12px] text-text-muted">{o.fecha_pedido || '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
            <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-4">Clientes Registrados</h2>
            {data.clients.length === 0 ? (
              <p className="text-text-muted text-center py-12 text-[13px]">No hay clientes registrados</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Nombre</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Email</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Teléfono</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Tipo</th>
                      <th className="p-4 text-[11px] font-black text-text-muted uppercase tracking-wider">Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clients.map((c, i) => (
                      <tr key={c.id || i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 text-[13px] font-bold text-text-dark dark:text-white">{c.nombre || c.name}</td>
                        <td className="p-4 text-[12px] text-text-muted">{c.email || '--'}</td>
                        <td className="p-4 text-[12px] text-text-muted">{c.telefono || '--'}</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                            c.tipo_cliente === 'VIP' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' :
                            c.tipo_cliente === 'Premium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
                          }`}>{c.tipo_cliente || 'Regular'}</span>
                        </td>
                        <td className="p-4 text-[12px] text-text-muted">{c.fecha_registro || '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowProductModal(false)} />
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 relative z-10 p-8">
            <button onClick={() => setShowProductModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-[22px] font-black text-text-dark dark:text-white mb-6">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">Imagen del producto</label>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setImagenSource('file')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${imagenSource === 'file' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-text-muted'}`}>Subir archivo</button>
                  <button onClick={() => setImagenSource('url')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${imagenSource === 'url' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-text-muted'}`}>URL externa</button>
                </div>

                {imagenSource === 'file' ? (
                  <>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-primary transition-all">
                        <Upload size={18} className="text-text-muted" />
                        <span className="text-[13px] font-bold text-text-muted">Subir imagen (JPG/PNG)</span>
                        <input type="file" accept="image/jpeg,image/png,image/jpg" className="hidden" onChange={e => {
                          const file = e.target.files[0]
                          if (!file) return
                          const reader = new FileReader()
                          reader.onload = (ev) => {
                            setProductForm({...productForm, imagen: ev.target.result})
                            setImagenPreview(ev.target.result)
                          }
                          reader.readAsDataURL(file)
                        }} />
                      </label>
                      {imagenPreview && (
                        <button onClick={() => { setProductForm({...productForm, imagen: ''}); setImagenPreview(null) }} className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors">Quitar</button>
                      )}
                    </div>
                    {imagenPreview ? (
                      <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                        <img src={imagenPreview} alt="Preview" className="w-full h-[200px] object-contain bg-gray-50 dark:bg-black/20" />
                      </div>
                    ) : (
                      <div className="mt-3 w-full h-[120px] bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-text-muted">
                        <ImageIcon size={28} className="mb-1 opacity-50" />
                        <span className="text-[11px] font-bold">600 × 700 px — Subí o pegá URL</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <input type="text" value={productForm.imagen} onChange={e => { setProductForm({...productForm, imagen: e.target.value}); setImagenPreview(e.target.value || null) }} placeholder="https://res.cloudinary.com/.../imagen.jpg" className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] font-bold outline-none focus:border-primary transition-all" />
                      {productForm.imagen && (
                        <button onClick={() => { setProductForm({...productForm, imagen: ''}); setImagenPreview(null) }} className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors">Quitar</button>
                      )}
                    </div>
                    {imagenPreview ? (
                      <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                        <img src={imagenPreview} alt="Preview" className="w-full h-[200px] object-contain bg-gray-50 dark:bg-black/20" onError={e => { e.target.style.display = 'none' }} />
                      </div>
                    ) : (
                      <div className="mt-3 w-full h-[120px] bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-text-muted">
                        <ImageIcon size={28} className="mb-1 opacity-50" />
                        <span className="text-[11px] font-bold">Pegá la URL de Cloudinary u otro servicio</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div>
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">Nombre</label>
                <input type="text" value={productForm.nombre} onChange={e => setProductForm({...productForm, nombre: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-primary transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">Precio (Bs.)</label>
                  <input type="number" step="0.01" value={productForm.precio} onChange={e => setProductForm({...productForm, precio: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">Stock</label>
                  <input type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-primary transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest block mb-2">Categoría</label>
                <select value={productForm.id_categoria} onChange={e => setProductForm({...productForm, id_categoria: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                  <option value="">Seleccioná una categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleSaveProduct} className="w-full mt-4 bg-primary text-white py-3.5 rounded-xl font-black text-[13px] uppercase tracking-widest hover:bg-secondary transition-all shadow-md">
                {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
