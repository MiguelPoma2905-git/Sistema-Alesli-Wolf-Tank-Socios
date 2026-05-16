import { useState, useRef, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'

export default function Dropdown({ items = [], trigger }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div onClick={e => { e.stopPropagation(); setOpen(o => !o) }}>
        {trigger ?? (
          <button className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all">
            <MoreVertical size={16} />
          </button>
        )}
      </div>

      {/* Menu */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-100 rounded-xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] min-w-[160px] z-50 animate-pop-in overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-gray-100 my-1" />
            ) : (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setOpen(false) }}
                className={`
                  w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-medium
                  transition-colors duration-150 text-left
                  ${item.danger
                    ? 'text-red-500 hover:bg-red-50'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                  }
                `}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}