import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { getProducts } from '../../services/productService.js'
import { createOrder, getMyOrders } from '../../services/orderService.js'

const money = (n) => Number(n).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
const dateFormat = (iso) => new Date(iso).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })

function minimumLocalDateTime() {
  const date = new Date(Date.now() + 2 * 60 * 60 * 1000 + 60_000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function Dashboard() {
  const { items, count, changeQuantity, removeItem, clearCart } = useCart()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('carrito')
  const [pickup, setPickup] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const load = useCallback(async () => {
    const [catalog, history] = await Promise.all([getProducts(), getMyOrders()])
    setProducts(catalog)
    setOrders(history)
  }, [])
  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([getProducts(), getMyOrders()]).then(([catalog, history]) => {
      if (active) { setProducts(catalog); setOrders(history) }
    }).catch(() => { if (active) setError('No se pudieron cargar los productos o pedidos') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const cartRows = useMemo(() => items.map(item => {
    const product = products.find(p => p.id === item.producto_id)
    return { ...item, product }
  }), [items, products])
  const problems = cartRows.filter(x => !x.product || x.cantidad > x.product.stock)
  const total = cartRows.reduce((acc, x) => acc + (x.product ? Math.round(Number(x.product.price) * 100) * x.cantidad : 0), 0) / 100

  async function confirmOrder() {
    if (!items.length || problems.length || !pickup || busy) return
    setError('')
    setSuccess(null)
    const date = new Date(pickup)
    if (Number.isNaN(date.getTime()) || date.getTime() < Date.now() + 2 * 3600000 || date.getTime() > Date.now() + 14 * 86400000) {
      setError('Selecciona fecha y hora entre 2 horas y 14 días desde ahora')
      return
    }
    setBusy(true)
    try {
      const order = await createOrder({
        fecha_recoleccion: date.toISOString(),
        items: items.map(x => ({ producto_id: x.producto_id, cantidad: x.cantidad }))
      })
      clearCart()
      setSuccess(order)
      setPickup('')
      setTab('carrito')
      try { await load() } catch { /* El pedido ya está confirmado; no ocultar el éxito si falla la actualización */ }
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo confirmar. Comprueba el stock y vuelve a intentar.')
      try { setProducts(await getProducts()) } catch { /* El mensaje de error original se conserva */ }
    } finally { setBusy(false) }
  }

  return <div className="min-h-screen bg-cream px-4 py-8 md:px-12">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-2xl border border-wheat/40 bg-wheat/10 p-5">
        <h1 className="font-display text-2xl font-bold text-espresso">Mi espacio de compras</h1>
        <p className="mt-1 text-sm text-roast/70">Prepara tu carrito y recoge tu pedido en la tienda.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setTab('carrito'); setError('') }} className={`rounded-xl px-5 py-2 text-sm font-semibold ${tab === 'carrito' ? 'bg-espresso text-cream' : 'border border-wheat text-espresso'}`}>Mi carrito ({count})</button>
          <button type="button" onClick={() => { setTab('pedidos'); setError('') }} className={`rounded-xl px-5 py-2 text-sm font-semibold ${tab === 'pedidos' ? 'bg-espresso text-cream' : 'border border-wheat text-espresso'}`}>Mis pedidos</button>
          <Link to="/menu" className="rounded-xl border border-wheat px-5 py-2 text-sm font-semibold text-espresso hover:bg-wheat/20">Seguir comprando</Link>
        </div>
      </div>
      {loading && <p>Cargando…</p>}
      {error && <p role="alert" className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {success && <div role="status" className="mb-7 rounded-xl border border-green-300 bg-green-50 p-5 text-green-900">
        <h2 className="font-display text-xl font-bold">¡Pedido registrado!</h2>
        <p className="mt-2">Código para recoger: <strong className="select-all text-xl">{success.codigo_recoleccion}</strong></p>
        <p className="mt-1 text-sm">Recolección: {dateFormat(success.fecha_recoleccion)}. Total: {money(success.total)}. Pago pendiente en sucursal.</p>
        <p className="mt-1 text-xs">Guarda este código. También aparecerá en Mis pedidos.</p>
      </div>}
      {!loading && tab === 'carrito' && <section>
        <h2 className="mb-5 font-display text-xl font-bold text-espresso">Productos seleccionados</h2>
        {!items.length ? <div className="rounded-2xl border border-wheat/40 p-8 text-center"><p>Tu carrito está vacío.</p><Link className="mt-3 inline-block text-caramel underline" to="/menu">Ver menú</Link></div> : <>
          <div className="space-y-4">{cartRows.map(({ producto_id, cantidad, product }) => <article key={producto_id} className="flex flex-wrap items-center gap-4 rounded-xl border border-wheat/40 bg-white/60 p-4">
            {product?.image && <img src={product.image} alt="" className="h-20 w-20 rounded-lg object-cover" />}
            <div className="min-w-[160px] flex-1"><h3 className="font-display font-semibold text-espresso">{product?.name || `Producto ${producto_id} no disponible`}</h3>
              <p className="text-xs text-roast/70">{product ? `${money(product.price)} por unidad · ${product.stock} disponibles` : 'Retíralo del carrito'}</p>
              {product && cantidad > product.stock && <p className="mt-1 text-xs text-red-700">Reduce la cantidad para continuar</p>}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Quitar una unidad" onClick={() => changeQuantity(producto_id, cantidad - 1, product?.stock ?? 0)} className="rounded border border-espresso/20 px-3 py-1">−</button>
              <span className="w-6 text-center tabular-nums">{cantidad}</span>
              <button type="button" aria-label="Agregar una unidad" disabled={!product || cantidad >= product.stock || cantidad >= 1000} onClick={() => changeQuantity(producto_id, cantidad + 1, product.stock)} className="rounded border border-espresso/20 px-3 py-1 disabled:opacity-40">+</button>
            </div>
            <div className="min-w-[90px] text-right font-semibold text-caramel">{money((product?.price || 0) * cantidad)}</div>
            <button type="button" className="text-sm text-red-700 underline" onClick={() => removeItem(producto_id)}>Eliminar</button>
          </article>)}</div>
          <div className="mt-6 rounded-2xl border border-wheat/40 bg-wheat/10 p-6">
            <div className="flex justify-between font-display text-xl font-bold text-espresso"><span>Total</span><span>{money(total)}</span></div>
            <p className="mt-2 text-sm text-roast/70">Solo recolección en tienda. El pago se realiza en sucursal.</p>
            <label htmlFor="fecha-recoleccion" className="mt-5 block text-sm font-semibold text-espresso">Fecha y hora de recolección</label>
            <input id="fecha-recoleccion" type="datetime-local" value={pickup} min={minimumLocalDateTime()} onChange={e => setPickup(e.target.value)} className="mt-2 block w-full max-w-sm rounded-lg border border-wheat bg-white p-3 text-espresso" />
            <p className="mt-2 text-xs text-roast/70">Mínimo 2 horas de anticipación; máximo 14 días. Verifica que la hora elegida esté dentro del horario de la sucursal.</p>
            <button type="button" disabled={busy || !pickup || problems.length > 0} onClick={confirmOrder} className="mt-5 w-full rounded-xl bg-espresso px-5 py-3 font-semibold text-cream hover:bg-roast disabled:opacity-50 sm:w-auto">{busy ? 'Confirmando…' : 'Confirmar pedido para recoger'}</button>
          </div>
        </>}
      </section>}
      {!loading && tab === 'pedidos' && <section>
        <h2 className="mb-5 font-display text-xl font-bold text-espresso">Mis pedidos</h2>
        {!orders.length && <p>No tienes pedidos registrados todavía.</p>}
        <div className="space-y-4">{orders.map(order => <article key={order.id} className="rounded-xl border border-wheat/40 bg-white/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-lg font-bold">Pedido #{order.id}</h3><strong className="text-caramel">{money(order.total)}</strong></div>
          <p className="mt-2 text-sm">Código: <strong className="select-all">{order.codigo_recoleccion}</strong></p>
          <p className="mt-1 text-sm">Recolección: {dateFormat(order.fecha_recoleccion)}</p>
          <p className="mt-1 text-sm">Estado: <strong>{order.estado.replaceAll('_', ' ')}</strong> · Pago: {order.estado_pago}</p>
        </article>)}</div>
      </section>}
    </div>
  </div>
}
