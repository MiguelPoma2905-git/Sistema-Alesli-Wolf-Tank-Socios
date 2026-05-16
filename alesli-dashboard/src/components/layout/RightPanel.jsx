import { useToast } from '../../context/ToastContext'
import { AI_ITEMS, COLORS } from '../../data/mockData'

export default function RightPanel() {
  const { showToast } = useToast()

  const S = {
    panel: {
      width:300, minWidth:300,
      background:'#ffffff',
      borderLeft:'1px solid rgba(255,77,184,0.12)',
      overflowY:'auto', padding:'20px 16px',
      display:'flex', flexDirection:'column', gap:14,
      fontFamily:"'Poppins',sans-serif",
    },
    userCard: {
      display:'flex', alignItems:'center', gap:10, padding:14,
      background:'linear-gradient(135deg,rgba(255,77,184,0.08),rgba(168,85,247,0.06))',
      borderRadius:14, border:'1px solid rgba(255,77,184,0.12)',
    },
    avatar: {
      width:42, height:42, borderRadius:99,
      background:'linear-gradient(135deg,#FF4DB8,#A855F7)',
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', fontWeight:800, fontSize:15, flexShrink:0,
    },
    card: {
      background:'#ffffff', borderRadius:14,
      border:'1px solid rgba(0,0,0,0.06)',
      boxShadow:'0 1px 3px rgba(0,0,0,0.06)',
      overflow:'hidden',
    },
    cardTitleBar: {
      display:'flex', alignItems:'center', gap:8, padding:'8px 12px',
      background:'linear-gradient(135deg,#FF4DB8,#A855F7)',
    },
    cardTitle: {
      fontSize:11, fontWeight:700, color:'#1F2937', textTransform:'uppercase',
      letterSpacing:1, marginBottom:12, display:'flex', alignItems:'center', gap:7,
      padding:'14px 14px 0',
    },
    aiItem: {
      display:'flex', alignItems:'flex-start', gap:10,
      padding:'9px 14px', borderBottom:'1px solid rgba(0,0,0,0.05)',
    },
    aiIcon: {
      width:30, height:30, borderRadius:9, background:'#FCE7F3', color:'#FF4DB8',
      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:14,
    },
    paletteGrid: {
      display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, padding:'0 14px 14px',
    },
    swatch: {
      borderRadius:9, overflow:'hidden',
      border:'1px solid rgba(0,0,0,0.06)', cursor:'pointer',
      transition:'transform .15s',
    },
  }

  return (
    <aside style={S.panel} className="right-panel-hide">

      {/* User card */}
      <div style={S.userCard}>
        <div style={S.avatar}>AL</div>
        <div>
          <div style={{ fontSize:13, fontWeight:800, color:'#1F2937' }}>Aleslí Studio</div>
          <div style={{ fontSize:11, color:'#64748B', fontWeight:500 }}>Florista Principal · La Paz, Bolivia</div>
        </div>
      </div>

      {/* AI Instructions */}
      <div style={S.card}>
        <div style={S.cardTitleBar}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <span style={{ fontSize:11.5, fontWeight:800, color:'#fff', textTransform:'uppercase', letterSpacing:.8 }}>
            Indicaciones Clave para la IA
          </span>
        </div>
        {AI_ITEMS.map(item => (
          <div key={item.label} style={S.aiItem}>
            <div style={S.aiIcon}>{item.icon}</div>
            <div>
              <div style={{ fontSize:11.5, fontWeight:700, color:'#1F2937', marginBottom:2 }}>{item.label}</div>
              <div style={{ fontSize:10.5, color:'#64748B', lineHeight:1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Color Palette */}
      <div style={S.card}>
        <div style={S.cardTitle}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#FF4DB8" strokeWidth="2">
            <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
            <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
          </svg>
          Paleta de Colores Oficial
        </div>
        <div style={S.paletteGrid}>
          {COLORS.map(c => (
            <div key={c.name} style={S.swatch}
              onClick={() => { navigator.clipboard?.writeText(c.hex); showToast(`Color ${c.hex} copiado`, '🎨') }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ height:36, width:'100%', background:c.bg, borderBottom:c.dark?'1px solid #e5e7eb':'none' }} />
              <div style={{ padding:'4px 5px', background:'#fff' }}>
                <div style={{ fontSize:8.5, fontWeight:700, color:'#1F2937', lineHeight:1.2 }}>{c.name}</div>
                <div style={{ fontSize:8, color:'#64748B', fontFamily:'monospace' }}>{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}