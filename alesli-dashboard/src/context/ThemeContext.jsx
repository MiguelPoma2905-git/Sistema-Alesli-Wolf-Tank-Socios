@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { font-family: 'Inter', sans-serif; }
  body {
    background-color: #FFF9FC;
    color: #1F2937;
    min-height: 100vh;
    transition: background-color 0.3s, color 0.3s;
  }
  body.dark {
    background-color: #0F172A;
    color: #F8FAFC;
  }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #FCE7F3; border-radius: 4px; }
  .dark ::-webkit-scrollbar-thumb { background: #334155; }
}

@layer components {
  .card {
    @apply bg-white dark:bg-dark-card rounded-2xl border border-brand-border dark:border-dark-border shadow-card;
  }
  .btn-primary {
    @apply flex items-center gap-2 px-5 py-3 rounded-xl font-poppins font-semibold text-sm text-white
           transition-all duration-200 shadow-pink hover:shadow-pink-hover hover:-translate-y-0.5 active:scale-95
           cursor-pointer border-none;
    background: linear-gradient(135deg, #FF4DB8, #E84393);
  }
  .btn-secondary {
    @apply flex items-center gap-2 px-5 py-3 rounded-xl font-poppins font-semibold text-sm
           bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border
           text-brand-text dark:text-dark-text transition-all duration-200
           hover:border-pink-primary hover:text-pink-primary cursor-pointer;
  }
  .nav-item {
    @apply flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-poppins font-medium text-xs
           transition-all duration-200 cursor-pointer border-none bg-transparent
           text-brand-text dark:text-dark-muted hover:bg-pink-soft dark:hover:bg-dark-card2;
  }
  .sidebar-link {
    @apply flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-poppins font-medium
           text-brand-muted dark:text-dark-muted transition-all duration-200 cursor-pointer
           hover:bg-pink-soft dark:hover:bg-dark-card2 hover:text-pink-primary;
  }
  .input-field {
    @apply w-full bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border
           rounded-xl px-4 py-2.5 text-sm text-brand-text dark:text-dark-text
           placeholder:text-brand-muted focus:outline-none focus:border-pink-primary
           focus:ring-2 focus:ring-pink-soft transition-all duration-200;
  }
  .module-card {
    @apply card p-4 flex flex-col items-center gap-2 cursor-pointer
           transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-pink-primary;
  }
  .table-row {
    @apply border-b border-brand-border dark:border-dark-border transition-colors duration-150
           hover:bg-brand-bg dark:hover:bg-dark-card2 cursor-pointer;
  }
}