
import { useState } from 'react'

export default function DashboardLayout({
  title,
  subtitle,
  options,
  active,
  onChange,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-cream">

      {/* Barra lateral */}
      <aside className={`
        w-64 shrink-0 bg-espresso text-wheat
        ${mobileOpen ? 'block' : 'hidden'}
        md:block
      `}>
        <div className="sticky top-20 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-caramel">
            Trigo & Miel
          </p>

          <h2 className="mt-2 font-display text-xl font-bold">
            {title}
          </h2>

          <nav className="mt-8 flex flex-col gap-2" aria-label="Navegación del panel">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id)
                  setMobileOpen(false)
                }}
                aria-current={active === option.id ? 'page' : undefined}
                className={`
                  w-full rounded-xl px-4 py-3 text-left text-sm
                  font-semibold transition-colors
                  ${active === option.id
                    ? 'bg-caramel text-espresso'
                    : 'text-wheat hover:bg-roast'}
                `}
              >
                {option.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Contenido */}
      <div className="min-w-0 flex-1">
        <div className="border-b border-wheat/40 bg-cream px-5 py-5 md:px-10">
          <button
            type="button"
            className="mb-3 rounded-lg bg-espresso px-3 py-2 text-sm text-wheat md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? 'Cerrar menú' : '☰ Menú'}
          </button>

          <h1 className="font-display text-2xl font-bold text-espresso">
            {options.find((item) => item.id === active)?.label}
          </h1>

          <p className="mt-1 text-sm text-roast/70">
            {subtitle}
          </p>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
