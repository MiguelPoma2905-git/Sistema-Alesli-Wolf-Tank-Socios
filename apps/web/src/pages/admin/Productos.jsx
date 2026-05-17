import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Image as ImageIcon, Upload } from 'lucide-react'
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories, saveProductWithImage } from '../../services/productos'
import { useToast } from '../../context/ToastContext'

const statusBadgeClass = (status) => status ? 'badge-listo' : 'badge-cancelado'

export default function AdminProductos() {
  const { addToast } = useToast()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ nombre: '', precio_venta: '', id_categoria: '', imagen_url: '', stock: '' })
  const [imagenPreview, setImagenPreview] = useState(null)
  const [imagenFile, setImagenFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    const [prods, cats] = await Promise.all([
      getProducts().catch(() => []),
      getCategories().catch(() => []),
    ])
    setProducts(Array.isArray(prods) ? prods : [])
    setCategories(Array.isArray(cats) ? cats : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditingProduct(null)
    setForm({ nombre: '', precio_venta: '', id_categoria: '', imagen_url: '', stock: '' })
    setImagenPreview(null)
    setImagenFile(null)
    setShowModal(true)
  }

  const openEdit = (p) => {
    setEditingProduct(p)
    setForm({
      nombre: p.nombre || '',
      precio_venta: p.precio_venta || '',
      id_categoria: p.id_categoria || '',
      imagen_url: p.imagen_url || '',
      stock: p.stock ?? '',
    })
    setImagenPreview(p.imagen_url || p.imagen || null)
    setImagenFile(null)
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      setUploading(true)
      const payload = {
        codigo: editingProduct ? editingProduct.codigo : `PROD-${Date.now().toString(36).toUpperCase()}`,
        nombre: form.nombre,
        precio_venta: form.precio_venta,
        id_categoria: form.id_categoria ? Number(form.id_categoria) : null,
        imagen_url: form.imagen_url || null,
        activo: true,
        stock: form.stock ? Number(form.stock) : 0,
      }
      if (imagenFile) {
        if (editingProduct) {
          await saveProductWithImage(payload, imagenFile, editingProduct.id_producto)
        } else {
          await saveProductWithImage(payload, imagenFile)
        }
      } else {
        if (editingProduct) {
          await updateProduct(editingProduct.id_producto, payload)
        } else {
          await createProduct(payload)
        }
      }
      addToast(editingProduct ? 'Producto actualizado' : 'Producto creado', 'success')
      setShowModal(false)
      load()
    } catch (err) {
      addToast('Error al guardar producto', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await deleteProduct(id)
      addToast('Producto eliminado', 'success')
      load()
    } catch {
      addToast('Error al eliminar', 'error')
    }
  }

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
          <h2 className="text-[22px] font-extrabold text-gray-800">Gestión de Productos</h2>
          <p className="text-sm text-gray-500">{products.length} productos en el catálogo</p>
        </div>
        <button onClick={openNew} className="btn btn-primary btn-md gap-2">
          <Plus size={16} /> Nuevo Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="card card-p-lg text-center py-16">
          <p className="text-gray-400 text-lg font-semibold">No hay productos</p>
          <p className="text-gray-400 text-sm mt-2">Crea tu primer producto</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full">
              <thead>
                <tr>
                  <th className="tbl-th">Imagen</th>
                  <th className="tbl-th">Nombre</th>
                  <th className="tbl-th">Precio</th>
                  <th className="tbl-th">Stock</th>
                  <th className="tbl-th">Categoría</th>
                  <th className="tbl-th">Estado</th>
                  <th className="tbl-th">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id_producto} className="tbl-row">
                    <td className="tbl-td">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={p.imagen || p.imagen_url || '/images/placeholder_product.jpg'}
                          alt={p.nombre}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.src = '/images/placeholder_product.jpg' }}
                        />
                      </div>
                    </td>
                    <td className="tbl-td font-semibold text-gray-800">{p.nombre}</td>
                    <td className="tbl-td">Bs. {p.precio_venta || '0.00'}</td>
                    <td className="tbl-td">
                      <span className={`font-bold ${p.stock > 0 ? 'text-gray-800' : 'text-red-500'}`}>
                        {p.stock ?? 0}
                      </span>
                    </td>
                    <td className="tbl-td text-gray-500">{p.categoria_nombre || 'Sin categoría'}</td>
                    <td className="tbl-td">
                      <span className={`badge ${statusBadgeClass(p.activo)}`}>
                        {p.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="tbl-td">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id_producto)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 relative z-10 p-8">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
            <h3 className="text-[22px] font-black text-gray-800 mb-6">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Imagen</label>
                <div className="flex gap-3 mb-3">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-pink-300 hover:bg-pink-50/30 transition-all">
                    <Upload size={18} className="text-pink-500" />
                    <span className="text-[12px] font-bold text-gray-500">{imagenFile ? imagenFile.name : 'Subir archivo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          setImagenFile(file)
                          setImagenPreview(URL.createObjectURL(file))
                          setForm({...form, imagen_url: ''})
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">O pegar URL</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <input
                  type="text"
                  value={form.imagen_url}
                  onChange={e => { setForm({...form, imagen_url: e.target.value}); setImagenFile(null); setImagenPreview(e.target.value || null) }}
                  placeholder="https://...imagen.jpg"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-bold outline-none focus:border-pink-500 transition-all"
                />
                {imagenPreview ? (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                    <img src={imagenPreview} alt="" className="w-full h-[150px] object-contain bg-gray-50" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                ) : (
                  <div className="mt-3 w-full h-[100px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Nombre</label>
                <input type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-pink-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Precio (Bs.)</label>
                  <input type="number" step="0.01" value={form.precio_venta} onChange={e => setForm({...form, precio_venta: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-pink-500" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-pink-500" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Categoría</label>
                <select value={form.id_categoria} onChange={e => setForm({...form, id_categoria: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                  <option value="">Sin categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleSave} disabled={uploading} className="w-full mt-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3.5 rounded-xl font-black text-[13px] uppercase tracking-widest hover:-translate-y-px transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? 'Subiendo...' : (editingProduct ? 'Actualizar Producto' : 'Crear Producto')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
