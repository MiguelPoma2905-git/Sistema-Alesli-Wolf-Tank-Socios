import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input, { Select } from '../../components/ui/Input'

const ROLE_PERMISSIONS = {
  Admin: 'Todo',
  Vendedor: 'Catálogo, ventas, órdenes',
  Producción: 'Ver pedidos, actualizar estados',
  Delivery: 'Ver entregas, actualizar ruta',
  Finanzas: 'Reportes, pagos, anticipos',
}

const CURRENCIES = [
  { value: 'Bs', label: 'Bolivianos (Bs)' },
  { value: 'USD', label: 'Dólares (USD)' },
]

const ZONES = ['La Paz', 'El Alto']
const THEMES = ['Rosa claro', 'Claro', 'Oscuro']

function Configuraciones() {
  const [company, setCompany] = useState({
    name: 'Florería Aleslí',
    phone: '+591 77793200',
    whatsapp: '+591 77793200',
    email: 'info@floreriaalesli.com',
    address: 'Calle Campos #248, La Paz',
    hours: 'Lun-Sáb 09-19, Dom 10-14',
  })

  const [users, setUsers] = useState([
    { id: 1, name: 'Administrador', role: 'Admin' },
    { id: 2, name: 'Marcela', role: 'Vendedor' },
    { id: 3, name: 'Javier', role: 'Producción' },
    { id: 4, name: 'Andrés', role: 'Delivery' },
    { id: 5, name: 'Sara', role: 'Finanzas' },
  ])

  const [finance, setFinance] = useState({
    currency: 'Bs',
    advance: 50,
    tax: 0,
    paymentMethods: {
      transferencia: true,
      qr: true,
      debito: true,
      credito: true,
    },
  })

  const [inventory, setInventory] = useState({
    minStock: 10,
    stockAlerts: true,
    units: 'unidad, ramo, docena, manojo',
  })

  const [delivery, setDelivery] = useState({
    zones: ZONES,
    cost: '0-30 Bs por zona',
    eta: '30-90 minutos',
  })

  const [appearance, setAppearance] = useState({
    theme: 'Rosa claro',
    systemName: 'Dashboard Florería Aleslí',
  })

  const [notifications, setNotifications] = useState({
    desktop: true,
    email: true,
    sms: true,
    emailAddress: 'admin@floreria.com',
    activeTypes: {
      stock: true,
      order: true,
      delivery: true,
    },
  })

  const [security, setSecurity] = useState({
    backupFile: null,
  })

  const togglePaymentMethod = (key) => {
    setFinance(prev => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [key]: !prev.paymentMethods[key],
      },
    }))
  }

  const toggleNotificationType = (type) => {
    setNotifications(prev => ({
      ...prev,
      activeTypes: {
        ...prev.activeTypes,
        [type]: !prev.activeTypes[type],
      },
    }))
  }

  return (
    <div className="p-6 space-y-8">
      <header className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-500 font-bold">Administración</p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Configuración del sistema</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">Un solo lugar para controlar la empresa, usuarios, finanzas, inventario, entregas, apariencia, notificaciones y seguridad.</p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Perfil de la empresa</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Datos principales</h2>
              </div>
              <Button>Guardar perfil</Button>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Input
                label="Nombre de la empresa"
                value={company.name}
                onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="Teléfono principal"
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany(prev => ({ ...prev, phone: e.target.value }))}
              />
              <Input
                label="WhatsApp"
                type="tel"
                value={company.whatsapp}
                onChange={(e) => setCompany(prev => ({ ...prev, whatsapp: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={company.email}
                onChange={(e) => setCompany(prev => ({ ...prev, email: e.target.value }))}
              />
              <Input
                label="Dirección"
                value={company.address}
                onChange={(e) => setCompany(prev => ({ ...prev, address: e.target.value }))}
              />
              <Input
                label="Horarios"
                value={company.hours}
                onChange={(e) => setCompany(prev => ({ ...prev, hours: e.target.value }))}
              />
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Usuarios y roles</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Equipo y permisos</h2>
              </div>
              <Button>Crear usuario</Button>
            </div>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-gray-100">
              <table className="min-w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase tracking-[0.18em] text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Usuario</th>
                    <th className="px-4 py-3">Rol</th>
                    <th className="px-4 py-3">Permisos</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-4 py-4 font-medium text-slate-900">{user.name}</td>
                      <td className="px-4 py-4">{user.role}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{ROLE_PERMISSIONS[user.role]}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50">Editar</button>
                          <button type="button" className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Configuración financiera</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Moneda y pagos</h2>
              </div>
              <Button>Guardar finanzas</Button>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Select
                label="Moneda"
                value={finance.currency}
                onChange={(e) => setFinance(prev => ({ ...prev, currency: e.target.value }))}
                options={CURRENCIES}
              />
              <Input
                label="Anticipo requerido"
                type="number"
                value={finance.advance}
                onChange={(e) => setFinance(prev => ({ ...prev, advance: Number(e.target.value) }))}
                suffix="%"
              />
              <Input
                label="Impuesto"
                type="number"
                value={finance.tax}
                onChange={(e) => setFinance(prev => ({ ...prev, tax: Number(e.target.value) }))}
                suffix="%"
              />
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-sm font-semibold text-slate-900">Métodos de pago</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(finance.paymentMethods).map(([key, enabled]) => (
                  <label key={key} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => togglePaymentMethod(key)}
                      className="h-4 w-4 rounded border-gray-300 text-pink-600"
                    />
                    {key === 'transferencia' ? 'Transferencia' : key === 'qr' ? 'QR' : key === 'debito' ? 'Débito' : 'Crédito'}
                  </label>
                ))}
              </div>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Configuración de inventario</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Stock y alertas</h2>
              </div>
              <Button>Guardar inventario</Button>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Input
                label="Stock mínimo general"
                type="number"
                value={inventory.minStock}
                onChange={(e) => setInventory(prev => ({ ...prev, minStock: Number(e.target.value) }))}
              />
              <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                <input
                  type="checkbox"
                  checked={inventory.stockAlerts}
                  onChange={() => setInventory(prev => ({ ...prev, stockAlerts: !prev.stockAlerts }))}
                  className="h-4 w-4 rounded border-gray-300 text-pink-600"
                />
                Alertas de stock activadas
              </label>
            </div>
            <Input
              label="Unidades"
              value={inventory.units}
              onChange={(e) => setInventory(prev => ({ ...prev, units: e.target.value }))}
            />
          </article>
        </div>

        <aside className="space-y-6">
          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Configuración de entregas</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Zonas y logística</h2>
              </div>
              <Button>Guardar entrega</Button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Zonas de entrega</p>
                <p className="mt-2 text-sm text-gray-600">{delivery.zones.join(', ')}</p>
              </div>
              <Input
                label="Costo de envío"
                value={delivery.cost}
                onChange={(e) => setDelivery(prev => ({ ...prev, cost: e.target.value }))}
              />
              <Input
                label="Tiempo estimado"
                value={delivery.eta}
                onChange={(e) => setDelivery(prev => ({ ...prev, eta: e.target.value }))}
              />
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Apariencia</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Identidad visual</h2>
              </div>
              <Button>Guardar tema</Button>
            </div>
            <div className="mt-6 space-y-4">
              <Select
                label="Tema"
                value={appearance.theme}
                onChange={(e) => setAppearance(prev => ({ ...prev, theme: e.target.value }))}
                options={THEMES.map(theme => ({ value: theme, label: theme }))}
              />
              <Input
                label="Nombre del sistema"
                value={appearance.systemName}
                onChange={(e) => setAppearance(prev => ({ ...prev, systemName: e.target.value }))}
              />
              <div className="rounded-3xl border border-dashed border-gray-200 bg-slate-50 p-4 text-sm text-gray-600">
                <p className="font-semibold text-slate-900">Logo</p>
                <p className="mt-1">Sube una imagen para la marca del dashboard. (Vista previa aún no disponible)</p>
              </div>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Notificaciones</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Alertas activadas</h2>
              </div>
              <Button>Guardar notificaciones</Button>
            </div>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                <span>Notificaciones escritorio</span>
                <input
                  type="checkbox"
                  checked={notifications.desktop}
                  onChange={() => setNotifications(prev => ({ ...prev, desktop: !prev.desktop }))}
                  className="h-4 w-4 rounded border-gray-300 text-pink-600"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                <span>Notificaciones por email</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                  className="h-4 w-4 rounded border-gray-300 text-pink-600"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                <span>SMS para urgentes</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                  className="h-4 w-4 rounded border-gray-300 text-pink-600"
                />
              </label>
              <Input
                label="Email para alertas"
                type="email"
                value={notifications.emailAddress}
                onChange={(e) => setNotifications(prev => ({ ...prev, emailAddress: e.target.value }))}
              />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Tipos activados</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(notifications.activeTypes).map(([type, active]) => (
                    <label key={type} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleNotificationType(type)}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600"
                      />
                      {type === 'stock' ? 'Stock bajo' : type === 'order' ? 'Pedidos urgentes' : 'Entregas'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-bold">Seguridad y datos</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Respaldo y acceso</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Button full>Exportar datos JSON/CSV</Button>
              <label className="block rounded-3xl border border-dashed border-gray-300 bg-slate-50 p-4 text-sm text-gray-600">
                Subir backup anterior
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={(e) => setSecurity(prev => ({ ...prev, backupFile: e.target.files?.[0] ?? null }))}
                  className="mt-3 block w-full text-sm text-gray-700"
                />
              </label>
              <Button variant="secondary" full>Resetear datos demo</Button>
              <Button full>Cambiar contraseña admin</Button>
            </div>
          </article>
        </aside>
      </section>
    </div>
  )
}

export default Configuraciones