import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/**
 * Input  –  supports type='password' with visibility toggle
 */
export default function Input({
  label,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  hint,
  icon,
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType  = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[12px] font-bold text-text-dark dark:text-white mb-1.5">
          {label}{required && <span className="text-primary ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-3.5 py-2.5 border border-border-light/40 dark:border-white/10
            bg-white dark:bg-[#151522] text-[13px] text-text-dark dark:text-white placeholder-text-muted
            transition-all duration-200
            focus:outline-none focus:border-primary
            ${icon ? 'pl-9' : ''}
            ${isPassword ? 'pr-10' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="mt-1 text-[11px] text-text-muted">{hint}</p>}
    </div>
  )
}

/** Textarea variant */
export function Textarea({ label, required, placeholder, value, onChange, rows = 4, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[12px] font-bold text-text-dark dark:text-white mb-1.5">
          {label}{required && <span className="text-primary ml-0.5">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="
          w-full px-3.5 py-2.5 border border-border-light/40 dark:border-white/10
          bg-white dark:bg-[#151522] text-[13px] text-text-dark dark:text-white placeholder-text-muted resize-y
          transition-all duration-200
          focus:outline-none focus:border-primary
        "
      />
    </div>
  )
}