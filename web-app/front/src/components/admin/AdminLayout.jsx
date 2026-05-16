import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSideBar'
import AdminTopNav from './AdminTopNav'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#fcf5f3]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopNav />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
