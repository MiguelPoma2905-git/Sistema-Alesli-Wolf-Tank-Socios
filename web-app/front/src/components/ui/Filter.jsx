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
            px-4 py-1.5 text-[13px] font-semibold border
            transition-all duration-200
            ${active === t
              ? 'bg-primary text-white border-primary'
              : 'border-border-light/40 text-text-muted hover:border-primary hover:text-primary'
            }
          `}
        >
          {t}
        </button>
      ))}

      {onSearch && (
        <div className="ml-auto flex items-center gap-2 bg-white dark:bg-[#151522] px-3 py-2 border border-border-light/30 dark:border-white/10">
          <Search size={14} className="text-text-muted" />
          <input
            value={searchValue}
            onChange={e => onSearch(e.target.value)}
            placeholder={placeholder}
            className="text-[12px] outline-none w-40 placeholder-text-muted bg-transparent"
          />
        </div>
      )}
    </div>
  )
}