import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ id, name, description, price, image, stock, category }) {
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState('')
  const { items, addItem } = useCart()
  const inCart = items.find(item => item.producto_id === id)?.cantidad || 0
  const remaining = Math.max(0, stock - inCart)
  const noStock = stock === 0
  const maxSelection = Math.min(remaining, 1000)

  const handleAdd = () => {
    const selected = Math.min(quantity, maxSelection)
    if (selected > 0 && addItem({ id, stock }, selected)) {
      setFeedback(`${selected} agregado(s) al carrito`)
      setQuantity(1)
    } else setFeedback('Ya tienes todas las unidades disponibles en el carrito')
  }
  return (
    <article className="group flex h-full flex-col overflow-hidden border-2 border-espresso/15 bg-cream transition-colors hover:border-caramel">
      <div className="relative aspect-square overflow-hidden bg-wheat/50">
        {image ? <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /> :
          <div className="flex h-full items-center justify-center text-sm text-espresso/50">Sin imagen</div>}
        <span className="absolute left-3 top-3 bg-cream/90 px-3 py-1 text-xs text-espresso">{category}</span>
        {noStock && <span className="absolute right-3 top-3 bg-espresso px-3 py-1 text-xs text-cream">Agotado</span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-espresso/15 p-4">
        <h3 className="font-display text-base font-semibold text-espresso">{name}</h3>
        <p className="flex-1 text-xs leading-relaxed text-espresso/60">{description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-bold text-caramel">${Number(price).toFixed(2)}</span>
          <span className="text-xs text-espresso/70">{remaining} disponibles</span>
        </div>
        <div className="flex items-center justify-between gap-3" aria-label={`Cantidad de ${name}`}>
          <button type="button" aria-label={`Quitar una unidad de ${name}`} disabled={quantity <= 1 || remaining === 0} onClick={() => { setQuantity(q => Math.max(1, q - 1)); setFeedback('') }} className="rounded border border-espresso/20 px-3 py-1 disabled:opacity-40">−</button>
          <span className="font-semibold tabular-nums">{remaining ? Math.min(quantity, maxSelection) : 0}</span>
          <button type="button" aria-label={`Agregar una unidad de ${name}`} disabled={quantity >= maxSelection} onClick={() => { setQuantity(q => Math.min(maxSelection, q + 1)); setFeedback('') }} className="rounded border border-espresso/20 px-3 py-1 disabled:opacity-40">+</button>
        </div>
        <button type="button" onClick={handleAdd} disabled={remaining === 0} className="w-full rounded-lg bg-espresso px-3 py-2.5 text-sm font-semibold text-cream hover:bg-roast disabled:cursor-not-allowed disabled:opacity-50">{remaining ? 'Agregar al carrito' : 'Sin existencias'}</button>
        <p aria-live="polite" className="min-h-4 text-xs text-espresso/70">{feedback}</p>
      </div>
    </article>
  )
}
