import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Menú desplegable de escritorio para la sección "Menú".
 * Se abre al pasar el mouse o al hacer click/foco (accesible por teclado).
 */
function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef(null)

  const openMenu = () => {
    clearTimeout(closeTimeout.current)
    setOpen(true)
  }

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={closeMenu}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 border-b-2 border-transparent py-2 text-sm font-medium uppercase tracking-wide text-espresso transition-colors hover:border-caramel"
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="square" />
        </svg>
      </button>

      <div
        className={`absolute left-0 top-full z-30 w-64 border border-espresso/10 bg-cream shadow-none ${
          open ? 'block' : 'hidden'
        }`}
      >
        <ul className="divide-y divide-espresso/10">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block px-4 py-3 text-sm text-espresso transition-colors hover:bg-wheat/40 hover:text-roast"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NavDropdown
