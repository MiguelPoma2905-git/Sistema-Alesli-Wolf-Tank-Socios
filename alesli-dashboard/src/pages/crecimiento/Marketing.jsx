import { useMemo, useState } from 'react'
import { Mail, MessageCircle, Camera, Sparkles, Plus, Pencil, Copy, Archive, Pause, Play, CalendarDays, Search, Filter, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatPrice } from '../../utils/helpers'

const PLATFORM_LIST = [
  { id: 'Instagram', icon: Camera, color: 'bg-pink-50 text-pink-700' },
  { id: 'WhatsApp', icon: MessageCircle, color: 'bg-emerald-50 text-emerald-700' },
  { id: 'Email', icon: Mail, color: 'bg-blue-50 text-blue-700' },
  { id: 'Stories', icon: Sparkles, color: 'bg-purple-50 text-purple-700' },
]

const INITIAL_CAMPAIGNS = [
  {
    id: 'CMP-001',
    name: 'Amor en Primavera',
    platforms: ['Instagram', 'WhatsApp'],
    startDate: '2026-05-01',
    endDate: '2026-05-15',
    reach: 14500,
    clicks: 1840,
    conversions: 220,
    investment: 1850,
    revenue: 6100,
    active: true,
    archived: false,
  },
  {
    id: 'CMP-002',
    name: 'Bodas Elegantes',
    platforms: ['Email', 'Stories'],
    startDate: '2026-04-10',
    endDate: '2026-04-25',
    reach: 11200,
    clicks: 1250,
    conversions: 145,
    investment: 1420,
    revenue: 4100,
    active: false,
    archived: false,
  },
  {
    id: 'CMP-003',
    name: 'Regalos Corporativos',
    platforms: ['WhatsApp', 'Email'],
    startDate: '2026-03-20',
    endDate: '2026-03-30',
    reach: 9700,
    clicks: 920,
    conversions: 95,
    investment: 1080,
    revenue: 2850,
    active: false,
    archived: true,
  },
  {
    id: 'CMP-004',
    name: 'Día de la Madre',
    platforms: ['Instagram', 'Stories', 'Email'],
    startDate: '2026-05-01',
    endDate: '2026-05-12',
    reach: 18600,
    clicks: 2320,
    conversions: 310,
    investment: 2580,
    revenue: 9500,
    active: true,
    archived: false,
  },
]

const calculateROI = (campaign) => {
  if (campaign.investment <= 0) return 0
  return Math.round(((campaign.revenue - campaign.investment) / campaign.investment) * 100)
}

const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const campaignStatusLabel = (campaign) => {
  if (campaign.archived) return 'Archivada'
  return campaign.active ? 'Activa' : 'Pausada'
}

function Marketing() {
  const { showToast } = useApp()
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS)
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState('Todos')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [minRoi, setMinRoi] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailCampaign, setDetailCampaign] = useState(null)
  const [editingCampaign, setEditingCampaign] = useState(null)

  const filteredCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = platformFilter === 'Todos' || campaign.platforms.includes(platformFilter)
    const matchesRoi = calculateROI(campaign) >= minRoi

    const fromDate = dateRange.from ? new Date(dateRange.from) : null
    const toDate = dateRange.to ? new Date(dateRange.to) : null
    const campaignStart = new Date(campaign.startDate)
    const withinDate = (!fromDate || campaignStart >= fromDate) && (!toDate || campaignStart <= toDate)

    return matchesSearch && matchesPlatform && matchesRoi && withinDate
  }), [campaigns, search, platformFilter, dateRange, minRoi])

  const totals = useMemo(() => {
    const activeCampaigns = campaigns.filter((campaign) => campaign.active && !campaign.archived)
    const totalRevenue = campaigns.reduce((sum, item) => sum + item.revenue, 0)
    const totalReach = campaigns.reduce((sum, item) => sum + item.reach, 0)
    const totalInvestment = campaigns.reduce((sum, item) => sum + item.investment, 0)
    const averageROI = activeCampaigns.length
      ? Math.round(activeCampaigns.reduce((sum, item) => sum + calculateROI(item), 0) / activeCampaigns.length)
      : 0

    return { totalRevenue, totalReach, totalInvestment, averageROI }
  }, [campaigns])

  const handleToggleStatus = (campaign) => {
    setCampaigns((prev) => prev.map((item) => item.id === campaign.id
      ? { ...item, active: !item.active }
      : item,
    ))
    showToast(`Campaña ${campaign.active ? 'pausada' : 'activada'}`, 'success', '✅')
  }

  const handleArchive = (campaign) => {
    setCampaigns((prev) => prev.map((item) => item.id === campaign.id ? { ...item, archived: true } : item))
    showToast('Campaña archivada', 'success', '✅')
  }

  const handleDuplicate = (campaign) => {
    const nextId = `CMP-${String(campaigns.length + 1).padStart(3, '0')}`
    setCampaigns((prev) => [
      {
        ...campaign,
        id: nextId,
        name: `${campaign.name} (Copia)`,
        active: false,
        archived: false,
      },
      ...prev,
    ])
    showToast('Campaña duplicada', 'success', '✅')
  }

  const handleSaveCampaign = () => {
    if (!editingCampaign.name || !editingCampaign.startDate || !editingCampaign.endDate) {
      showToast('Completa el nombre y las fechas', 'warning', '⚠️')
      return
    }

    setCampaigns((prev) => prev.map((item) => item.id === editingCampaign.id ? editingCampaign : item))
    setEditingCampaign(null)
    setIsModalOpen(false)
    showToast('Campaña actualizada', 'success', '✅')
  }

  const handleCreateCampaign = () => {
    const newId = `CMP-${String(campaigns.length + 1).padStart(3, '0')}`
    const campaign = {
      id: newId,
      name: editingCampaign.name,
      platforms: editingCampaign.platforms,
      startDate: editingCampaign.startDate,
      endDate: editingCampaign.endDate,
      reach: Number(editingCampaign.reach) || 0,
      clicks: Number(editingCampaign.clicks) || 0,
      conversions: Number(editingCampaign.conversions) || 0,
      investment: Number(editingCampaign.investment) || 0,
      revenue: Number(editingCampaign.revenue) || 0,
      active: editingCampaign.active,
      archived: false,
    }
    setCampaigns((prev) => [campaign, ...prev])
    setEditingCampaign(null)
    setIsModalOpen(false)
    showToast('Campaña creada', 'success', '✅')
  }

  const openCreateModal = () => {
    setEditingCampaign({
      id: '',
      name: '',
      platforms: [],
      startDate: '',
      endDate: '',
      reach: '',
      clicks: '',
      conversions: '',
      investment: '',
      revenue: '',
      active: true,
      archived: false,
    })
    setIsModalOpen(true)
  }

  const handleSubmitModal = () => {
    editingCampaign.id ? handleSaveCampaign() : handleCreateCampaign()
  }

  const allPlatforms = ['Todos', ...PLATFORM_LIST.map((item) => item.id)]

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Marketing</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Campañas y rendimiento</h1>
            <p className="mt-2 text-sm text-gray-500">Gestiona campañas activas, crea nuevas estrategias y mide el ROI en un solo lugar.</p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="btn btn-primary btn-sm inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Crear campaña
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <article className="card card-p">
          <p className="kpi-label">Revenue Total</p>
          <p className="mt-3 text-3xl font-extrabold text-gray-900">{formatPrice(totals.totalRevenue, 'Bs ')}</p>
        </article>
        <article className="card card-p">
          <p className="kpi-label">Alcance Total</p>
          <p className="mt-3 text-3xl font-extrabold text-gray-900">{totals.totalReach.toLocaleString('es-BO')}</p>
        </article>
        <article className="card card-p">
          <p className="kpi-label">Inversión Total</p>
          <p className="mt-3 text-3xl font-extrabold text-gray-900">{formatPrice(totals.totalInvestment, 'Bs ')}</p>
        </article>
        <article className="card card-p">
          <p className="kpi-label">ROI Promedio</p>
          <p className="mt-3 text-3xl font-extrabold text-gray-900">{totals.averageROI}%</p>
        </article>
      </section>

      <section className="card card-p">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="sec-title">Campañas</h2>
            <p className="text-sm text-gray-500">Filtra por nombre, plataforma, fecha o ROI mínimo.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar campaña..."
                className="input w-full pl-11"
              />
            </div>
            <select
              value={platformFilter}
              onChange={(event) => setPlatformFilter(event.target.value)}
              className="input"
            >
              {allPlatforms.map((platform) => (<option key={platform} value={platform}>{platform}</option>))}
            </select>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(event) => setDateRange((prev) => ({ ...prev, from: event.target.value }))}
                className="input"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(event) => setDateRange((prev) => ({ ...prev, to: event.target.value }))}
                className="input"
              />
            </div>
            <div className="relative">
              <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="0"
                value={minRoi}
                onChange={(event) => setMinRoi(Number(event.target.value))}
                placeholder="ROI mínimo"
                className="input w-full pl-11"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {filteredCampaigns.map((campaign) => (
            <article key={campaign.id} className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">{campaign.name}</h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{campaignStatusLabel(campaign)}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => {
                      const platformMeta = PLATFORM_LIST.find((item) => item.id === platform)
                      const Icon = platformMeta?.icon ?? Camera
                      return (
                        <span key={platform} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${platformMeta?.color}`}>
                          <Icon className="h-3.5 w-3.5" /> {platform}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-center">
                  <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="font-semibold">Alcance</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">{campaign.reach.toLocaleString('es-BO')}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="font-semibold">Clics</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">{campaign.clicks}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="font-semibold">Conversiones</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">{campaign.conversions}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="font-semibold">ROI</p>
                    <p className={`mt-2 text-lg font-bold ${calculateROI(campaign) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{calculateROI(campaign)}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold">Revenue</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(campaign.revenue, 'Bs ')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold">Inversión</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(campaign.investment, 'Bs ')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold">CPC estimado</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(Math.round(campaign.investment / Math.max(campaign.clicks, 1)), 'Bs ')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold">Conversión</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">{Math.round((campaign.conversions / Math.max(campaign.clicks, 1)) * 100)}%</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDetailCampaign(campaign)}
                  className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" /> Ver detalles
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCampaign(campaign)
                    setIsModalOpen(true)
                  }}
                  className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" /> Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDuplicate(campaign)}
                  className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" /> Duplicar
                </button>
                <button
                  type="button"
                  onClick={() => handleArchive(campaign)}
                  className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                >
                  <Archive className="h-4 w-4" /> Archivar
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(campaign)}
                  className="btn btn-primary btn-sm inline-flex items-center gap-2"
                >
                  {campaign.active ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {campaign.active ? 'Pausar' : 'Activar'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isModalOpen && editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">{editingCampaign.id ? 'Editar campaña' : 'Crear campaña'}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{editingCampaign.id ? editingCampaign.name : 'Nueva campaña'}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingCampaign(null)
                }}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4">
              <input
                type="text"
                value={editingCampaign.name}
                onChange={(event) => setEditingCampaign((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Nombre de campaña"
                className="input"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  value={editingCampaign.startDate}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, startDate: event.target.value }))}
                  className="input"
                />
                <input
                  type="date"
                  value={editingCampaign.endDate}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, endDate: event.target.value }))}
                  className="input"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={editingCampaign.reach}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, reach: event.target.value }))}
                  placeholder="Alcance"
                  className="input"
                />
                <input
                  type="number"
                  value={editingCampaign.clicks}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, clicks: event.target.value }))}
                  placeholder="Clics"
                  className="input"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={editingCampaign.conversions}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, conversions: event.target.value }))}
                  placeholder="Conversiones"
                  className="input"
                />
                <input
                  type="number"
                  value={editingCampaign.investment}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, investment: event.target.value }))}
                  placeholder="Inversión"
                  className="input"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={editingCampaign.revenue}
                  onChange={(event) => setEditingCampaign((prev) => ({ ...prev, revenue: event.target.value }))}
                  placeholder="Revenue"
                  className="input"
                />
                <div className="grid gap-2">
                  <p className="text-sm font-semibold text-gray-700">Plataformas</p>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORM_LIST.map((platform) => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => {
                          const hasPlatform = editingCampaign.platforms.includes(platform.id)
                          setEditingCampaign((prev) => ({
                            ...prev,
                            platforms: hasPlatform
                              ? prev.platforms.filter((item) => item !== platform.id)
                              : [...prev.platforms, platform.id],
                          }))
                        }}
                        className={`rounded-full border px-3 py-2 text-sm transition ${editingCampaign.platforms.includes(platform.id) ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-pink-50'}`}
                      >
                        {platform.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubmitModal}
                  className="btn btn-primary btn-sm"
                >Guardar</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCampaign(null)
                  }}
                  className="btn btn-secondary btn-sm"
                >Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {detailCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Detalle de campaña</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{detailCampaign.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setDetailCampaign(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Periodo</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{formatDate(detailCampaign.startDate)} — {formatDate(detailCampaign.endDate)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Estado</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{campaignStatusLabel(detailCampaign)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">ROI</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{calculateROI(detailCampaign)}%</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{formatPrice(detailCampaign.revenue, 'Bs ')}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Alcance</p>
                  <p className="mt-2 font-semibold text-gray-900">{detailCampaign.reach.toLocaleString('es-BO')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Clics</p>
                  <p className="mt-2 font-semibold text-gray-900">{detailCampaign.clicks}</p>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Conversiones</p>
                  <p className="mt-2 font-semibold text-gray-900">{detailCampaign.conversions}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Inversión</p>
                  <p className="mt-2 font-semibold text-gray-900">{formatPrice(detailCampaign.investment, 'Bs ')}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {detailCampaign.platforms.map((platform) => {
                const platformMeta = PLATFORM_LIST.find((item) => item.id === platform)
                const Icon = platformMeta?.icon ?? Camera
                return (
                  <span key={platform} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${platformMeta?.color}`}>
                    <Icon className="h-4 w-4" /> {platform}
                  </span>
                )
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailCampaign(null)}
                className="btn btn-secondary btn-sm"
              >Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketing