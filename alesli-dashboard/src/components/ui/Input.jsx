import { useState } from 'react'
import { Eye, EyeOff, Search } from 'lucide-react'

export default function Input({ label, required, type = 'text', placeholder, value, onChange, className = '', hint, prefix, suffix }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType  = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="label">
          {label}{required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-400 text-[14px]">{prefix}</span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input ${prefix ? 'pl-8' : ''} ${isPassword || suffix ? 'pr-10' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 text-gray-400 hover:text-pink-500 transition-colors"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
        {suffix && !isPassword && (
          <span className="absolute right-3 text-gray-400">{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Buscar órdenes...' }) {
  return (
    <div className="relative flex items-center">
      <Search size={14} className="absolute left-3 text-gray-400" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9 max-w-[280px]"
      />
    </div>
  )
}

export function Textarea({ label, required, placeholder, value, onChange, rows = 3, className = '' }) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="label">
          {label}{required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="input resize-y"
      />
    </div>
  )
}

export function Select({ label, required, value, onChange, options = [], className = '' }) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="label">
          {label}{required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
      )}
      <select value={value} onChange={onChange} className="input">
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}