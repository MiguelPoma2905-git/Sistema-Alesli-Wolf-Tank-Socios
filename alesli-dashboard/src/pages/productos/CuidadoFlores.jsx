import { useMemo, useState } from 'react'
import { Search, SunMedium, Droplet, Thermometer, Sparkles, AlertTriangle, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const FLOWERS = [
  {
    id: 'roses',
    name: 'Rosas',
    level: 'Moderado',
    water: 'Cada 2 días',
    temp: '18-22°C',
    light: 'Luz indirecta brillante',
    tips: 'Cortar los tallos en diagonal y cambiar el agua para evitar bacterias.',
    alert: 'Mantener lejos de mascotas sensibles.',
    season: 'Primavera / Verano',
  },
  {
    id: 'tulipanes',
    name: 'Tulipanes',
    level: 'Fácil',
    water: 'Cada 2-3 días',
    temp: '12-18°C',
    light: 'Luz indirecta suave',
    tips: 'Retirar hojas en el agua y mantener en sitio fresco.',
    alert: 'Evitar temperaturas altas.',
    season: 'Primavera',
  },
  {
    id: 'lirios',
    name: 'Lirios',
    level: 'Requiere atención especial',
    water: 'Cada 2 días',
    temp: '16-20°C',
    light: 'Luz indirecta brillante',
    tips: 'Cortar los tallos con cuchillo limpio y cambiar el agua diariamente.',
    alert: 'ALERTA: Tóxicos para gatos y perros.',
    season: 'Primavera / Verano',
  },
  {
    id: 'peonias',
    name: 'Peonías',
    level: 'Moderado',
    water: 'Cada 3 días',
    temp: '15-20°C',
    light: 'Luz indirecta brillante',
    tips: 'Mantener en agua fresca y retirar pétalos marchitos.',
    alert: 'No exponer a corrientes de aire frío.',
    season: 'Primavera',
  },
  {
    id: 'orquideas',
    name: 'Orquídeas',
    level: 'Requiere atención especial',
    water: '1 vez por semana',
    temp: '20-24°C',
    light: 'Luz indirecta moderada',
    tips: 'Evitar encharcar y usar agua a temperatura ambiente.',
    alert: 'Necesitan humedad estable.',
    season: 'Todo el año',
  },
  {
    id: 'girasoles',
    name: 'Girasoles',
    level: 'Fácil',
    water: 'Cada 3 días',
    temp: '18-24°C',
    light: 'Sol directo durante la mañana',
    tips: 'Cambiar agua y girar hacia la luz cada día.',
    alert: 'Evitar interiores muy fríos.',
    season: 'Verano',
  },
]

const SEASONS = [
  {
    name: 'Primavera',
    desc: 'Flores frescas, riego moderado y ambientes con luz indirecta. Ideal para rosas, peonías y tulipanes.',
  },
  {
    name: 'Verano',
    desc: 'Mantener temperaturas controladas, agua fresca y sombra parcial para evitar marchitez.',
  },
  {
    name: 'Otoño',
    desc: 'Revisar humedad, retirar hojas dañadas y preparar flores para ambientes más frescos.',
  },
  {
    name: 'Invierno',
    desc: 'Evitar corrientes de aire, reducir riego y mantener flores en interiores cálidos y luminosos.',
  },
]

const LEVELS = ['Todos', 'Fácil', 'Moderado', 'Requiere atención especial']

const levelStyles = {
  Fácil: 'bg-emerald-100 text-emerald-700',
  Moderado: 'bg-amber-100 text-amber-700',
  'Requiere atención especial': 'bg-rose-100 text-rose-700',
}

function CuidadoFlores() {
  const { showToast } = useApp()
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('Todos')
  const [openFlower, setOpenFlower] = useState('roses')

  const visibleFlowers = useMemo(() => FLOWERS.filter((flower) => {
    const matchesName = flower.name.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = levelFilter === 'Todos' || flower.level === levelFilter
    return matchesName && matchesLevel
  }), [search, levelFilter])

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Cuidado de Flores</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Guía premium de mantenimiento floral</h1>
            <p className="mt-2 text-sm text-gray-500">Consejos estacionales, alertas especiales y filtros rápidos para el taller.</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Guía PDF descargada', 'success', '📄')}
            className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-100"
          >
            <Download className="h-4 w-4" />
            Descargar guía
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="card card-p">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="sec-title">Catálogo de flores por tipo</h2>
              <p className="text-sm text-gray-500">Busca por nombre, filtra por nivel de cuidado y consulta alertas críticas.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${levelFilter === level ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-700 border-gray-200 hover:border-pink-200 hover:text-pink-600'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar flores..."
                className="input pl-11"
              />
            </div>
            <div className="rounded-3xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700">
              {visibleFlowers.length} tipos encontrados
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {visibleFlowers.length === 0 && (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                No se encontraron flores con esos filtros.
              </div>
            )}

            {visibleFlowers.map((flower) => {
              const isOpen = openFlower === flower.id
              return (
                <article key={flower.id} className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFlower(isOpen ? '' : flower.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{flower.name}</p>
                      <p className="mt-2 text-sm text-gray-500">Temporada: {flower.season}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${levelStyles[flower.level]}`}>{flower.level}</span>
                      {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-gray-500">Nivel de mantenimiento</p>
                          <p className="mt-2 text-base font-semibold text-gray-900">{flower.level}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-gray-500">Frecuencia de cambio de agua</p>
                          <p className="mt-2 text-base font-semibold text-gray-900">{flower.water}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-gray-500">Temperatura óptima</p>
                          <p className="mt-2 text-base font-semibold text-gray-900">{flower.temp}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-gray-500">Condiciones de luz</p>
                          <p className="mt-2 text-base font-semibold text-gray-900">{flower.light}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 rounded-3xl bg-pink-50 p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-pink-700">
                          <Sparkles className="h-4 w-4" />
                          Consejos de cuidado
                        </div>
                        <p className="text-sm text-gray-600">{flower.tips}</p>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center gap-2 rounded-3xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                          <AlertTriangle className="h-4 w-4" />
                          {flower.alert}
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast(`Recordatorio configurado para ${flower.name}`, 'success', '✅')}
                          className="btn btn-secondary btn-sm"
                        >
                          Recordatorio de riego
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </article>

        <aside className="space-y-6">
          <article className="card card-p">
            <div className="sec-header">
              <div>
                <h2 className="sec-title">Consejos por Temporada</h2>
                <p className="text-sm text-gray-500">Ajustes rápidos según la estación.</p>
              </div>
            </div>
            <div className="grid gap-4">
              {SEASONS.map((season) => (
                <div key={season.name} className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-sm uppercase tracking-[1.4px] text-gray-400">{season.name}</p>
                  <p className="mt-2 text-sm text-gray-600">{season.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="card card-p">
            <div className="sec-header">
              <div>
                <h2 className="sec-title">Checklist de mantenimiento</h2>
                <p className="text-sm text-gray-500">Tareas diarias y semanales para el taller.</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Cambiar agua de rosas cada 2 días.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                Revisar temperatura y luz para orquídeas semanalmente.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                Retirar flores marchitas y limpiar el agua de los jarrones.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
                Etiquetar alertas tóxicas para especies peligrosas en el taller.
              </li>
            </ul>
          </article>
        </aside>
      </section>
    </div>
  )
}

export default CuidadoFlores