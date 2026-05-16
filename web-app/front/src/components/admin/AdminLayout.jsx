import { Outlet } from 'react-router-dom'
import { clsx } from 'clsx'
import { useApp } from '../../context/AppContext'
import AdminSidebar from './AdminSideBar'
import AdminTopNav from './AdminTopNav'

export default function AdminLayout() {
  const { dark } = useApp()

  return (
    <div className={clsx(
      'flex min-h-screen transition-colors duration-300',
      dark ? 'bg-gray-950' : 'bg-[#fcf5f3]'
    )}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopNav />
        <main className={clsx(
          'p-6 flex-1 transition-colors duration-300 admin-page',
          dark ? 'text-gray-100' : ''
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}