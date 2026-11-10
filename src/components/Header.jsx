import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import NavDropdown from './NavDropdown.jsx'

const MENU_CATEGORIES = [
  { label: 'Panes de masa madre', to: '/menu#panes' },
  { label: 'Repostería dulce', to: '/menu#reposteria' },
  { label: 'Postres y tartas', to: '/menu#postres' },
  { label: 'Bebidas artesanales', to: '/menu#bebidas' },
]

const navLinkClasses = ({ isActive }) =>
  `border-b-2 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'border-caramel text-roast' : 'border-transparent text-espresso hover:border-caramel'
  }`

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center border-2 border-espresso font-display text-lg font-bold text-espresso">
            T&M
          </span>
          <span className="font-display text-xl font-semibold leading-none text-espresso">
            Trigo &amp; Miel
            <span className="block font-body text-[11px] font-normal uppercase tracking-[0.2em] text-caramel">
              Panadería artesanal
            </span>
          </span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClasses} end>
            Inicio
          </NavLink>
          <NavLink to="/nosotros" className={navLinkClasses}>
            Nosotros
          </NavLink>
          <NavDropdown label="Menú" items={MENU_CATEGORIES} />
          <NavLink to="/contacto" className={navLinkClasses}>
            Contacto
          </NavLink>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {/* Botón Clarito / Secundario: Iniciar Sesión */}
          <Link
            to="/login"
            className="rounded-lg border border-espresso/20 bg-wheat/20 px-4 py-2 text-sm font-medium tracking-wide text-espresso transition-all hover:bg-wheat/40 hover:text-caramel"
          >
            Iniciar Sesión
          </Link>

          {/* Botón Café / Principal: Registrarme */}
          <Link
            to="/register"
            className="rounded-lg bg-espresso px-4 py-2 text-sm font-medium tracking-wide text-caramel shadow-sm transition-all hover:bg-espresso/90 hover:shadow"
          >
            Registrarme
          </Link>
        </div>


        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-espresso/30 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-espresso stroke-2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="square" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {mobileOpen && (
        <div className="border-t border-espresso/10 bg-cream md:hidden">
          <nav className="flex flex-col divide-y divide-espresso/10">
            <Link
              to="/"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>

            <Link
              to="/nosotros"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
              onClick={() => setMobileOpen(false)}
            >
              Nosotros
            </Link>

            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
                aria-expanded={mobileMenuExpanded}
                onClick={() => setMobileMenuExpanded((v) => !v)}
              >
                Menú
                <svg
                  viewBox="0 0 24 24"
                  className={`h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform ${mobileMenuExpanded ? 'rotate-180' : ''
                    }`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="square" />
                </svg>
              </button>
              {mobileMenuExpanded && (
                <ul className="bg-wheat/20">
                  {MENU_CATEGORIES.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block px-10 py-2.5 text-sm text-espresso/80 hover:text-caramel"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to="/contacto"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
              onClick={() => setMobileOpen(false)}
            >
              Contacto
            </Link>

            {/* Botones de Autenticación para Móvil */}
            <div className="flex flex-col gap-3 px-6 py-4">
              {/* Botón Clarito / Secundario: Iniciar Sesión */}
              <Link
                to="/login"
                className="w-full rounded-lg border border-espresso/20 bg-wheat/20 py-2.5 text-center text-sm font-medium tracking-wide text-espresso transition-all hover:bg-wheat/40 hover:text-caramel"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar Sesión
              </Link>

              {/* Botón Café / Principal: Registrarme */}
              <Link
                to="/register"
                className="w-full rounded-lg bg-espresso py-2.5 text-center text-sm font-medium tracking-wide text-caramel shadow-sm transition-all hover:bg-espresso/90 hover:shadow"
                onClick={() => setMobileOpen(false)}
              >
                Registrarme
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
