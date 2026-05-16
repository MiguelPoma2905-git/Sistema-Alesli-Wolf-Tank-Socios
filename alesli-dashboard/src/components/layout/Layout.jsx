import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'
import TopNav from './TopNav'

function Layout() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">
        <TopNav />

        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default Layout