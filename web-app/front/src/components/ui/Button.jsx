export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
<<<<<<< HEAD
  // Base sólida con animación de presionado (active:scale-95)
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-pink-light dark:hover:bg-white/5',
    green: 'bg-gradient-to-r from-success to-emerald-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    ghost: 'text-text-muted hover:text-primary hover:bg-pink-light dark:hover:bg-white/5',
=======
  const base = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 border'

  const variants = {
    primary: 'bg-primary text-white border-primary hover:bg-accent hover:border-accent shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    green: 'bg-success text-white border-success shadow-md hover:shadow-lg hover:opacity-90',
    ghost: 'border-transparent text-text-muted hover:text-primary',
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-[11px]',
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-6 py-2.5 text-[14px]',
    lg: 'px-8 py-3 text-[16px]',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}