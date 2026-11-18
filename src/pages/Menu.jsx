import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getCategories, getProducts } from '../services/productService.js'

export default function Menu() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let mounted = true
    Promise.all([getCategories(), getProducts()]).then(([c, p]) => {
      if (mounted) { setCategories(c); setProducts(p) }
    }).catch(() => { if (mounted) setError('No se pudo cargar el catálogo. Intenta recargar la página.') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
  return <>
    <section className="border-b border-espresso/10 bg-wheat/20"><div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading eyebrow="Nuestro menú" title="Todo lo que sale de nuestro horno" description="Elige tus productos favoritos y recógelos en nuestra sucursal de Querétaro." />
    </div></section>
    {loading && <p className="mx-auto max-w-6xl px-6 py-12">Cargando productos…</p>}
    {error && <p role="alert" className="mx-auto max-w-6xl px-6 py-12 text-red-700">{error}</p>}
    {!loading && !error && categories.map((cat, index) => {
      const items = products.filter(p => p.category_id === cat.id)
      if (!items.length) return null
      return <section key={cat.id} id={cat.slug} className={`scroll-mt-24 border-b border-espresso/10 ${index % 2 === 0 ? 'bg-cream' : 'bg-cream/60'}`}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow={cat.eyebrow || cat.name} title={cat.title || cat.name} description={cat.description || ''} />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(item => <ProductCard key={item.id} {...item} />)}
          </div>
        </div>
      </section>
    })}
    {!loading && !error && !products.length && <p className="mx-auto max-w-6xl px-6 py-12">No hay productos disponibles actualmente.</p>}
  </>
}
