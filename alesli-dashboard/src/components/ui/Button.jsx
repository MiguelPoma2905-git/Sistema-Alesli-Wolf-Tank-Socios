import { clsx } from 'clsx'

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'btn bg-red-50 text-red-600 hover:bg-red-100',
  success:   'btn bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:-translate-y-px shadow-sm',
}
const SIZES = {
  xs: 'px-2.5 py-1 text-[11px]',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'px-6 py-3 text-[15px]',
}

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  full     = false,
  disabled = false,
  type     = 'button',
  onClick,
  className = '',
  icon,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'btn',
        VARIANTS[variant],
        SIZES[size],
        full && 'w-full',
        className,
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}