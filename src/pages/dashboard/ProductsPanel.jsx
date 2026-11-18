
import { useEffect, useState } from 'react'
import {
  getCategories,
  getAdminProducts,
  createProduct,
  updateProduct,
  deactivateProduct
} from '../../services/productService.js'

const EMPTY = {
  category_id: '',
  name: '',
  description: '',
  price: '',
  image: '',
  stock: '0',
  active: true
}

export default function ProductsPanel() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function load() {
    try {
      const [items, cats] = await Promise.all([
        getAdminProducts(),
        getCategories()
      ])
      setProducts(items)
      setCategories(cats)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar productos')
    }
  }

  useEffect(() => {
    load()
  }, [])

  function edit(product) {
    setEditingId(product.id)
    setForm({
      category_id: String(product.category_id),
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      image: product.image || '',
      stock: String(product.stock),
      active: Boolean(product.active)
    })
  }

  function reset() {
    setForm(EMPTY)
    setEditingId(null)
  }

  async function save(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    const payload = {
      category_id: Number(form.category_id),
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: form.price,
      image: form.image.trim() || null,
      stock: Number(form.stock),
      active: form.active
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }

      reset()
      await load()
      setMessage('Producto guardado correctamente')
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  async function deactivate(product) {
    if (!window.confirm(`¿Desactivar ${product.name}?`)) return

    try {
      setError('')
      setMessage('')
      await deactivateProduct(product.id)
      await load()
      setMessage('Producto desactivado')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al desactivar')
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-wheat/40 bg-cream p-6 shadow-lg">
        <h2 className="font-display text-2xl font-bold text-espresso">
          {editingId ? 'Editar producto' : 'Registrar producto'}
        </h2>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
            {message}
          </p>
        )}

        <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            required
            maxLength={150}
            placeholder="Nombre del producto"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-wheat p-3"
          />

          <select
            required
            value={form.category_id}
            onChange={e => setForm({ ...form, category_id: e.target.value })}
            className="rounded-lg border border-wheat p-3"
          >
            <option value="">Selecciona categoría</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            required
            type="number"
            min="0"
            max="99999999.99"
            step="0.01"
            placeholder="Precio"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="rounded-lg border border-wheat p-3"
          />

          <input
            required
            type="number"
            min="0"
            max="1000000"
            step="1"
            placeholder="Stock"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
            className="rounded-lg border border-wheat p-3"
          />

          <input
            type="url"
            maxLength={1000}
            placeholder="URL de imagen (opcional)"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            className="rounded-lg border border-wheat p-3 md:col-span-2"
          />

          <textarea
            maxLength={5000}
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="rounded-lg border border-wheat p-3 md:col-span-2"
          />

          <label className="flex items-center gap-2 text-sm text-espresso">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm({ ...form, active: e.target.checked })}
            />
            Producto activo
          </label>

          <div className="flex gap-3 md:col-span-2">
            <button
              disabled={saving}
              className="rounded-lg bg-espresso px-5 py-3 font-semibold text-wheat disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar producto'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-wheat px-5 py-3 text-espresso"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-wheat/40 bg-cream p-6 shadow-lg">
        <h2 className="mb-5 font-display text-xl font-bold text-espresso">
          Productos registrados
        </h2>

        <div className="space-y-3">
          {products.map(product => (
            <div
              key={product.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-wheat/40 p-4"
            >
              <div>
                <p className="font-semibold text-espresso">{product.name}</p>
                <p className="text-sm text-roast/70">
                  ${Number(product.price).toFixed(2)}
                  {' · '}Stock: {product.stock}
                  {' · '}{product.active ? 'Activo' : 'Inactivo'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => edit(product)}
                  className="rounded-lg bg-wheat/40 px-4 py-2 text-sm text-espresso"
                >
                  Editar
                </button>

                {product.active && (
                  <button
                    onClick={() => deactivate(product)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700"
                  >
                    Desactivar
                  </button>
                )}
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-sm text-roast/70">No hay productos registrados.</p>
          )}
        </div>
      </div>
    </section>
  )
}
