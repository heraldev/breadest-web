import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { getStoredUser } from '../services/authService.js'

// Inserta <CartHeaderLink /> en Header.jsx, junto a los controles del usuario.
// Se renderiza solo si el usuario guardado tiene rol Usuario.
export default function CartHeaderLink() {
  const { count } = useCart()
  const user = getStoredUser()
  const roles = Array.isArray(user?.roles) ? user.roles : [user?.rol, user?.role]
  if (!roles.includes('Usuario')) return null
  return <Link to="/dashboard" aria-label={`Ir a mi carrito, ${count} productos`} title="Mi carrito" className="relative flex h-10 items-center gap-2 rounded-xl border border-wheat/50 px-3 text-espresso hover:bg-wheat/20">
    <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.5 13h12l2-9H6"/></svg>
    <span className="hidden text-xs font-semibold sm:inline">Carrito</span>
    {count > 0 && <span className="rounded-full bg-caramel px-1.5 text-[11px] font-bold text-cream">{count}</span>}
  </Link>
}
