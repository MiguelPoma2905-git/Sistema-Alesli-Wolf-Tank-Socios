import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import RightPanel from '../components/layout/RightPanel'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Poppins',sans-serif" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:98, display:'none' }}
          className="mobile-overlay-active" />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        <TopNav onMenuToggle={() => setSidebarOpen(s => !s)} />

        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
          <main style={{ flex:1, padding:'28px 24px', overflowY:'auto', minWidth:0, background:'#FFF9FC' }}>
            <Outlet />
          </main>
          <RightPanel />
        </div>
      </div>

      <style>{`
        @media(max-width:1280px) { .right-panel-hide { display:none !important; } }
        @media(max-width:900px)  {
          .mobile-menu-btn { display:flex !important; }
          .mobile-overlay-active { display:block !important; }
        }
        @media(max-width:600px)  { main { padding: 16px !important; } }
      `}</style>
    </div>
  )
}