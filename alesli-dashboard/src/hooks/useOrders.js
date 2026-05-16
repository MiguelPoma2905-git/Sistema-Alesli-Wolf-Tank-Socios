import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'

export function useOrders() {
  const { orders } = useApp()
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [page,         setPage]         = useState(1)
  const PER_PAGE = 7

  const filtered = useMemo(() => {
    let data = orders
    if (statusFilter !== 'Todos') data = data.filter(o => o.status === statusFilter)
    if (search.trim())            data = data.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase())        ||
      o.client.toLowerCase().includes(search.toLowerCase())    ||
      o.arrangement.toLowerCase().includes(search.toLowerCase())
    )
    return data
  }, [orders, search, statusFilter])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (q) => { setSearch(q); setPage(1) }
  const handleFilter = (s) => { setStatusFilter(s); setPage(1) }

  return {
    data: paginated,
    total: filtered.length,
    page, totalPages, setPage,
    search, setSearch: handleSearch,
    statusFilter, setStatusFilter: handleFilter,
  }
}