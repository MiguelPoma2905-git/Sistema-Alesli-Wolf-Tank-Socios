import { Search } from 'lucide-react'

/**
 * FilterBar  –  filter tabs + optional search
 */
export default function FilterBar({ tabs, active, onChange, onSearch, searchValue, placeholder = 'Buscar...' }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-5">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`
<<<<<<< HEAD
            px-4 py-1.5 rounded-full text-[13px] font-semibold border-[1.5px]
            transition-all duration-200
            ${active === t
              ? 'bg-gradient-to-r from-[#FF4DB8] to-[#A855F7] text-white border-transparent'
              : 'border-[rgba(255,77,184,0.2)] text-[#64748B] hover:border-[#FF4DB8] hover:text-[#FF4DB8]'
=======
            px-4 py-1.5 text-[13px] font-semibold border
            transition-all duration-200
            ${active === t
              ? 'bg-primary text-white border-primary'
              : 'border-border-light/40 text-text-muted hover:border-primary hover:text-primary'
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            }
          `}
        >
          {t}
        </button>
      ))}

      {onSearch && (
<<<<<<< HEAD
        <div className="ml-auto flex items-center gap-2 bg-white rounded-full px-3 py-2 border border-[rgba(255,77,184,0.15)] shadow-sm">
          <Search size={14} className="text-[#64748B]" />
=======
        <div className="ml-auto flex items-center gap-2 bg-white dark:bg-[#151522] px-3 py-2 border border-border-light/30 dark:border-white/10">
          <Search size={14} className="text-text-muted" />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          <input
            value={searchValue}
            onChange={e => onSearch(e.target.value)}
            placeholder={placeholder}
<<<<<<< HEAD
            className="text-[12px] outline-none w-40 placeholder-[#64748B] bg-transparent"
=======
            className="text-[12px] outline-none w-40 placeholder-text-muted bg-transparent"
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          />
        </div>
      )}
    </div>
  )
}