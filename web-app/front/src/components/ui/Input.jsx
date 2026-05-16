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
<<<<<<< HEAD
        <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
          {label}{required && <span className="text-[#FF4DB8] ml-0.5">*</span>}
=======
        <label className="block text-[12px] font-bold text-text-dark dark:text-white mb-1.5">
          {label}{required && <span className="text-primary ml-0.5">*</span>}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        </label>
      )}
      <div className="relative">
        {icon && (
<<<<<<< HEAD
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px]">
=======
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            {icon}
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
<<<<<<< HEAD
            w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-[rgba(255,77,184,0.2)]
            bg-white text-[13px] text-[#1F2937] placeholder-[#64748B]
            transition-all duration-200
            focus:outline-none focus:border-[#FF4DB8] focus:ring-2 focus:ring-[#FF4DB8]/10
=======
            w-full px-3.5 py-2.5 border border-border-light/40 dark:border-white/10
            bg-white dark:bg-[#151522] text-[13px] text-text-dark dark:text-white placeholder-text-muted
            transition-all duration-200
            focus:outline-none focus:border-primary
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            ${icon ? 'pl-9' : ''}
            ${isPassword ? 'pr-10' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
<<<<<<< HEAD
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#FF4DB8]"
=======
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
<<<<<<< HEAD
      {hint && <p className="mt-1 text-[11px] text-[#64748B]">{hint}</p>}
=======
      {hint && <p className="mt-1 text-[11px] text-text-muted">{hint}</p>}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
    </div>
  )
}

/** Textarea variant */
export function Textarea({ label, required, placeholder, value, onChange, rows = 4, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
<<<<<<< HEAD
        <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
          {label}{required && <span className="text-[#FF4DB8] ml-0.5">*</span>}
=======
        <label className="block text-[12px] font-bold text-text-dark dark:text-white mb-1.5">
          {label}{required && <span className="text-primary ml-0.5">*</span>}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="
<<<<<<< HEAD
          w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-[rgba(255,77,184,0.2)]
          bg-white text-[13px] text-[#1F2937] placeholder-[#64748B] resize-y
          transition-all duration-200
          focus:outline-none focus:border-[#FF4DB8] focus:ring-2 focus:ring-[#FF4DB8]/10
=======
          w-full px-3.5 py-2.5 border border-border-light/40 dark:border-white/10
          bg-white dark:bg-[#151522] text-[13px] text-text-dark dark:text-white placeholder-text-muted resize-y
          transition-all duration-200
          focus:outline-none focus:border-primary
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        "
      />
    </div>
  )
}