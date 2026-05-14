import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Star, Gift, Crown, Sparkles, TrendingUp, History, ChevronRight, 
  ArrowRight, Clock, ShoppingBag, MessageSquare, Users, X, CheckCircle2 
} from 'lucide-react'

export default function Rewards() {
  const navigate = useNavigate()
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [successRedeem, setSuccessRedeem] = useState(null) // Para animación de éxito

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // MOCK DATA EXPANDIDA
  const userStats = {
    points: 450,
    tier: 'Oro',
    nextTier: 'Platino',
    pointsToNext: 150,
    progress: 75,
    expires: '31 Dic 2026' // Sentido de urgencia
  }

  const history = [
    { id: 1, desc: 'Compra #AL-84721', date: '13 May 2026', pts: 80, type: 'gain' },
    { id: 2, desc: 'Bono por Reseña', date: '05 May 2026', pts: 20, type: 'gain' },
    { id: 3, desc: 'Canje Envío Gratis', date: '10 Feb 2026', pts: -100, type: 'loss' },
    { id: 4, desc: 'Compra #AL-61092', date: '08 Feb 2026', pts: 150, type: 'gain' }
  ]

  const benefits = [
    { id: 1, title: 'Envío Gratis', desc: 'En pedidos mayores a Bs. 300', active: true, icon: TrendingUp },
    { id: 2, title: 'Acceso Anticipado', desc: 'Compra nuevas colecciones antes', active: true, icon: Sparkles },
    { id: 3, title: 'Tarjeta Premium', desc: 'Dedicatorias de lujo gratis', active: true, icon: Gift },
    { id: 4, title: 'Asesoría VIP', desc: 'Línea directa con diseñadores', active: false, icon: Crown }
  ]

  const earnMethods = [
    { id: 1, title: 'Comprar', desc: 'Gana 1 punto por cada Bs. 10', icon: ShoppingBag },
    { id: 2, title: 'Reseñar', desc: 'Gana 20 puntos por foto', icon: MessageSquare },
    { id: 3, title: 'Referir', desc: 'Gana 100 puntos por amigo', icon: Users }
  ]

  const redeemCatalog = [
    { id: 1, title: 'Envío Express Gratis', cost: 150, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 2, title: 'Caja de Trufas Extra', cost: 300, icon: Gift, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
    { id: 3, title: '-Bs. 50 en tu pedido', cost: 400, icon: Star, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' }
  ]

  const handleRedeem = (item) => {
    if (userStats.points >= item.cost) {
      setSuccessRedeem(item.id)
      setTimeout(() => {
        setSuccessRedeem(null)
        setShowRedeemModal(false)
      }, 2000)
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 animate-fade-in transition-colors duration-500">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-[32px] md:text-[40px] font-black text-text-dark dark:text-white leading-tight">
          Mis Recompensas
        </h1>
        <p className="text-[14px] text-text-muted dark:text-gray-400 font-medium mt-1">
          Tu lealtad tiene valor. Gestiona tus beneficios y canjea tus puntos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LADO IZQUIERDO: TARJETA DE PUNTOS Y MOVIMIENTOS */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* TARJETA DE NIVEL */}
          <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-primary">
                <Star size={16} className="fill-primary" /> Nivel {userStats.tier}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-md">
                <Clock size={12} /> Caducan el {userStats.expires}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[12px] font-bold text-text-muted dark:text-gray-400 mb-1 uppercase tracking-wider">Puntos Disponibles</p>
              <p className="text-[56px] font-black text-text-dark dark:text-white leading-none tracking-tighter">
                {userStats.points}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5">
              <div className="flex justify-between text-[11px] font-bold text-text-dark dark:text-white mb-2 uppercase tracking-widest">
                <span>Faltan {userStats.pointsToNext} pts</span>
                <span>{userStats.nextTier}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${userStats.progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* HISTORIAL EXPANDIDO */}
          <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="text-[14px] font-black text-text-dark dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <History size={16} className="text-gray-400" /> Movimientos Recientes
            </h3>
            <div className="flex flex-col gap-1">
              {history.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
                  <div>
                    <p className="text-[14px] font-bold text-text-dark dark:text-white">{item.desc}</p>
                    <p className="text-[12px] text-text-muted">{item.date}</p>
                  </div>
                  <span className={`text-[14px] font-black ${item.type === 'gain' ? 'text-green-500' : 'text-text-dark dark:text-white'}`}>
                    {item.type === 'gain' ? '+' : ''}{item.pts} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LADO DERECHO: BENEFICIOS Y CÓMO GANAR MÁS */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-[18px] font-black text-text-dark dark:text-white">Tus Beneficios</h2>
              <button onClick={() => setShowRedeemModal(true)} className="w-full sm:w-auto bg-text-dark dark:bg-white text-white dark:text-text-dark px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all">
                <Gift size={16} /> Canjear Puntos
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map(benefit => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.id} className={`p-5 rounded-xl border ${benefit.active ? 'border-pink-light/50 dark:border-white/10 bg-pink-50/30 dark:bg-white/5' : 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 opacity-60'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${benefit.active ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                      <Icon size={16} />
                    </div>
                    <h3 className="text-[14px] font-black text-text-dark dark:text-white mb-1">{benefit.title}</h3>
                    <p className="text-[12px] text-text-muted dark:text-gray-400 font-medium">{benefit.desc}</p>
                    {!benefit.active && (
                      <span className="inline-block mt-3 text-[10px] font-black uppercase text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">Desbloquea en Platino</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* NUEVO: CÓMO GANAR MÁS PUNTOS (Gamificación) */}
          <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-6">Cómo ganar más puntos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {earnMethods.map(method => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-full flex items-center justify-center text-primary mb-3 shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-[13px] font-black text-text-dark dark:text-white mb-1">{method.title}</h3>
                    <p className="text-[11px] text-text-muted font-bold leading-relaxed">{method.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL: CATÁLOGO DE CANJE */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRedeemModal(false)}></div>
          
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-2xl rounded-2xl p-6 md:p-8 relative z-10 shadow-2xl border border-gray-200 dark:border-white/10 animate-fade-in-up max-h-[90vh] overflow-y-auto hide-scrollbar">
            <button onClick={() => setShowRedeemModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 p-2 rounded-full">
              <X size={20} />
            </button>
            
            <h2 className="text-[24px] font-black text-text-dark dark:text-white mb-2">Catálogo de Canje</h2>
            <p className="text-[14px] text-text-muted font-medium mb-6">Tienes <span className="font-black text-primary">{userStats.points} pts</span> disponibles.</p>
            
            <div className="flex flex-col gap-4">
              {redeemCatalog.map(item => {
                const canAfford = userStats.points >= item.cost;
                const isSuccess = successRedeem === item.id;

                return (
                  <div key={item.id} className={`flex items-center justify-between p-4 border rounded-xl transition-all ${isSuccess ? 'border-green-500 bg-green-50 dark:bg-green-500/10' : 'border-gray-200 dark:border-white/10 hover:border-primary/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSuccess ? 'bg-green-500 text-white' : `${item.bg} ${item.color}`}`}>
                        {isSuccess ? <CheckCircle2 size={24} /> : <item.icon size={24} />}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-black text-text-dark dark:text-white">{item.title}</h3>
                        <p className="text-[12px] font-bold text-primary">{item.cost} pts</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford || successRedeem !== null}
                      className={`px-5 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all ${
                        isSuccess ? 'bg-green-500 text-white shadow-md' :
                        canAfford ? 'bg-text-dark dark:bg-white text-white dark:text-text-dark hover:-translate-y-0.5 shadow-md' : 
                        'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSuccess ? '¡Canjeado!' : 'Canjear'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Truck(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
}