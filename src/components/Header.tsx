import ThemeToggle from './ThemeToggle'

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-orange/10 dark:border-slate-800/60 bg-makan-cream/85 dark:bg-slate-900/85 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center shrink-0 text-lg select-none">
          🍜
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-black text-makan-brown dark:text-white text-[17px] tracking-tight">
            MakanHub
          </span>
          <span className="text-[11px] font-semibold text-makan-brown-2 dark:text-slate-400 leading-tight">
            by Map72
          </span>
        </div>
        <div className="flex-1" />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
