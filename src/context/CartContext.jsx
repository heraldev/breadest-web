import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'breadest_carrito_v1'

function initialCart() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(value)) return []
    return value.filter(x => Number.isSafeInteger(x.producto_id) && x.producto_id > 0 &&
      Number.isSafeInteger(x.cantidad) && x.cantidad > 0).slice(0, 40)
  } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialCart)
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }, [items])

  function addItem(product, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1 || product.stock < 1) return false
    const existing = items.find(x => x.producto_id === product.id)?.cantidad || 0
    if (existing + quantity > product.stock) return false
    setItems(prev => {
      const other = prev.filter(x => x.producto_id !== product.id)
      return [...other, { producto_id: product.id, cantidad: existing + quantity }]
    })
    return true
  }
  function changeQuantity(productId, quantity, stock) {
    if (!Number.isInteger(quantity) || !Number.isInteger(stock)) return
    setItems(prev => quantity <= 0 ? prev.filter(x => x.producto_id !== productId) :
      prev.map(x => x.producto_id === productId ? { ...x, cantidad: Math.min(quantity, Math.max(0, stock)) } : x)
        .filter(x => x.cantidad > 0))
  }
  const removeItem = (id) => setItems(prev => prev.filter(x => x.producto_id !== id))
  const clearCart = () => setItems([])
  const count = items.reduce((total, x) => total + x.cantidad, 0)
  const value = useMemo(() => ({ items, count, addItem, changeQuantity, removeItem, clearCart }), [items, count])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart debe estar dentro de CartProvider')
  return value
}
