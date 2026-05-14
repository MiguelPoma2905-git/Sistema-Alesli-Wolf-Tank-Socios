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
        <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
          {label}{required && <span className="text-[#FF4DB8] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px]">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-[rgba(255,77,184,0.2)]
            bg-white text-[13px] text-[#1F2937] placeholder-[#64748B]
            transition-all duration-200
            focus:outline-none focus:border-[#FF4DB8] focus:ring-2 focus:ring-[#FF4DB8]/10
            ${icon ? 'pl-9' : ''}
            ${isPassword ? 'pr-10' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#FF4DB8]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="mt-1 text-[11px] text-[#64748B]">{hint}</p>}
    </div>
  )
}

/** Textarea variant */
export function Textarea({ label, required, placeholder, value, onChange, rows = 4, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
          {label}{required && <span className="text-[#FF4DB8] ml-0.5">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="
          w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-[rgba(255,77,184,0.2)]
          bg-white text-[13px] text-[#1F2937] placeholder-[#64748B] resize-y
          transition-all duration-200
          focus:outline-none focus:border-[#FF4DB8] focus:ring-2 focus:ring-[#FF4DB8]/10
        "
      />
    </div>
  )
}