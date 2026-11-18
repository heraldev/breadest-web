import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import NavDropdown from './NavDropdown.jsx'
import {
  getStoredUser,
  isAuthenticated,
  logoutUser
} from '../services/authService.js'

const MENU_CATEGORIES = [
  { label: 'Panes de masa madre', to: '/menu#panes' },
  { label: 'Repostería dulce', to: '/menu#reposteria' },
  { label: 'Postres y tartas', to: '/menu#postres' },
  { label: 'Bebidas artesanales', to: '/menu#bebidas' },
]

const navLinkClasses = ({ isActive }) =>
  `border-b-2 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
    isActive
      ? 'border-caramel text-roast'
      : 'border-transparent text-espresso hover:border-caramel'
  }`

// Obtiene el usuario solo cuando existe una sesión local.
const readSession = () =>
  isAuthenticated() ? getStoredUser() : null

// Adapta los datos recibidos del backend.
const formatUser = (storedUser) => {
  if (!storedUser) return null

  const name = [
    storedUser.nombre || storedUser.name || '',
    storedUser.apellido_paterno || ''
  ].filter(Boolean).join(' ').trim() || 'Usuario'

  const email =
    storedUser.email || storedUser.correo || ''

  const rawRole =
    storedUser.rol ||
    storedUser.role ||
    storedUser.roles?.[0]

  const roleValue =
    typeof rawRole === 'string'
      ? rawRole
      : rawRole?.nombre || rawRole?.name || ''

  const normalizedRole = roleValue.toLowerCase()

  const role =
    normalizedRole.includes('admin')
      ? 'Administrador'
      : normalizedRole.includes('editor')
        ? 'Editor'
        : roleValue || 'Cliente'

  return { name, email, role }
}

function Header() {
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)
  const [storedUser, setStoredUser] = useState(readSession)
  const [loggingOut, setLoggingOut] = useState(false)

  const user = formatUser(storedUser)

  // React se actualiza cuando cambia la sesión.
  useEffect(() => {
    const syncSession = () => {
      setStoredUser(readSession())
    }

    // Cambios en la misma pestaña.
    window.addEventListener('auth-changed', syncSession)

    // Cambios en otras pestañas.
    window.addEventListener('storage', syncSession)

    return () => {
      window.removeEventListener('auth-changed', syncSession)
      window.removeEventListener('storage', syncSession)
    }
  }, [])

  // Cierra el menú móvil al navegar.
  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileMenuExpanded(false)
  }

  // Cierre de sesión global.
  const handleLogout = async () => {
    if (loggingOut) return

    setLoggingOut(true)

    try {
      await logoutUser()
    } finally {
      setStoredUser(null)
      closeMobileMenu()
      setLoggingOut(false)
      navigate('/login', { replace: true })
    }
  }

  const getDashboardPath = () => {
    if (!user) return '/login'

    const roles = Array.isArray(user.roles)
      ? user.roles.map((rol) =>
          typeof rol === 'string' ? rol : rol.nombre
        )
      : [user.role || user.rol].filter(Boolean)

    // Prioridad: Administrador > Editor > Usuario
    if (roles.includes('Administrador')) return '/admin'
    if (roles.includes('Editor')) return '/editor'
    if (roles.includes('Usuario')) return '/dashboard'

    return '/'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">

        {/* LOGO */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={closeMobileMenu}
        >
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

        {/* NAVEGACIÓN ESCRITORIO */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClasses} end>
            Inicio
          </NavLink>

          <NavLink to="/nosotros" className={navLinkClasses}>
            Nosotros
          </NavLink>

          <NavDropdown
            label="Menú"
            items={MENU_CATEGORIES}
          />

          <NavLink to="/contacto" className={navLinkClasses}>
            Contacto
          </NavLink>
        </nav>

        {/* LADO DERECHO ESCRITORIO */}
        <div className="hidden items-center gap-3 md:flex">

        {user ? (
          <>
            {/* Avatar: acceso al dashboard según el rol */}
            <Link
              to={getDashboardPath()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso text-wheat shadow-sm transition-all duration-200 hover:scale-105 hover:bg-caramel hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
              title={`Ir a mi panel (${user.role || user.rol || 'Usuario'})`}
              aria-label="Ir a mi panel de usuario"
            >
              {/* Icono de usuario */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>
            </Link>

            {/* Datos del usuario */}
            <div className="flex min-w-0 max-w-44 flex-col">
              <span
                className="truncate text-sm font-semibold text-espresso"
                title={user.name}
              >
                {user.name}
              </span>

              <span
                className="truncate text-xs text-roast/70"
                title={user.email}
              >
                {user.email}
              </span>

              {/* Rol */}
              <span className="mt-1 w-fit rounded-full bg-caramel/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-roast">
                {user.role}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-espresso px-3 text-xs font-semibold text-wheat shadow-sm transition-all hover:bg-roast disabled:cursor-not-allowed disabled:opacity-60"
              title="Cerrar sesión"
            >
              <svg
                className="h-4 w-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span>
                {loggingOut ? 'Saliendo...' : 'Salir'}
              </span>
            </button>
          </>
        ) : (
          <>
            {/* Visitante: Iniciar sesión */}
            <Link
              to="/login"
              className="rounded-lg border border-espresso/20 bg-wheat/20 px-4 py-2 text-sm font-medium tracking-wide text-espresso transition-all hover:bg-wheat/40 hover:text-caramel"
            >
              Iniciar Sesión
            </Link>

            {/* Visitante: Registro */}
            <Link
              to="/register"
              className="rounded-lg bg-espresso px-4 py-2 text-sm font-medium tracking-wide text-caramel shadow-sm transition-all hover:bg-espresso/90 hover:shadow"
            >
              Registrarme
            </Link>
          </>
        )}
        </div>

        {/* HAMBURGUESA MÓVIL */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-espresso/30 md:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-espresso stroke-2"
          >
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="square"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="square"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <div className="border-t border-espresso/10 bg-cream md:hidden">
          <nav className="flex flex-col divide-y divide-espresso/10">

            {/* PERFIL MÓVIL */}
            {user && (
              <div className="flex items-center gap-3 bg-wheat/15 px-6 py-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-espresso font-display text-xl font-bold text-wheat">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-espresso">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-roast/70">
                    {user.email}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-caramel/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-roast">
                    {user.role}
                  </span>
                </div>
              </div>
            )}

            <Link
              to="/"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
              onClick={closeMobileMenu}
            >
              Inicio
            </Link>

            <Link
              to="/nosotros"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-espresso"
              onClick={closeMobileMenu}
            >
              Nosotros
            </Link>

            {/* CATEGORÍAS */}
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
                  className={`h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform ${
                    mobileMenuExpanded ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="square"
                  />
                </svg>
              </button>

              {mobileMenuExpanded && (
                <ul className="bg-wheat/20">
                  {MENU_CATEGORIES.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block px-10 py-2.5 text-sm text-espresso/80 hover:text-caramel"
                        onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
            >
              Contacto
            </Link>

            {/* AUTENTICACIÓN MÓVIL */}
            <div className="flex flex-col gap-3 px-6 py-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-espresso py-3 text-sm font-semibold text-wheat transition-all hover:bg-roast disabled:opacity-60"
                >
                  <svg
                    className="h-4 w-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>

                  {loggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full rounded-lg border border-espresso/20 bg-wheat/20 py-2.5 text-center text-sm font-medium tracking-wide text-espresso transition-all hover:bg-wheat/40"
                    onClick={closeMobileMenu}
                  >
                    Iniciar Sesión
                  </Link>

                  <Link
                    to="/register"
                    className="w-full rounded-lg bg-espresso py-2.5 text-center text-sm font-medium tracking-wide text-caramel shadow-sm transition-all hover:bg-espresso/90"
                    onClick={closeMobileMenu}
                  >
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
