/**
 * Tarjeta de producto. Muestra una fotografía real ajustada al
 * contenedor cuadrado (object-cover), manteniendo la misma
 * estructura y estilos que el resto del sitio.
 *
 * Evento "destacar contenido mediante el puntero": al pasar el mouse
 * (o hacer foco por teclado) sobre la tarjeta, se combinan tres señales
 * visuales simultáneas: 1) el borde exterior se engruesa a color caramelo,
 * 2) la fotografía hace zoom suave, 3) aparece una capa oscura con la
 * etiqueta "Ver detalle" deslizándose hacia arriba. Todo con clases
 * `group-hover:` de Tailwind, sin JavaScript adicional.
 */
function ProductCard({ name, description, price, image }) {
  return (
    <article
      tabIndex={0}
      className="group border-2 border-espresso/15 bg-cream outline-none transition-colors duration-200 hover:border-caramel focus-visible:border-caramel"
    >
      <div className="relative aspect-square overflow-hidden bg-wheat/50">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
        />
        {/* Capa que resalta el contenido al pasar el puntero */}
        <div className="absolute inset-0 flex items-end bg-espresso/0 p-3 transition-colors duration-300 group-hover:bg-espresso/40 group-focus-visible:bg-espresso/40">
          <span className="translate-y-3 border-2 border-cream bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-espresso opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Ver detalle
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 border-t border-espresso/15 p-4">
        <div>
          <h3 className="font-display text-base font-semibold text-espresso">{name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-espresso/60">{description}</p>
        </div>
        <span className="shrink-0 font-display text-sm font-semibold text-caramel">{price}</span>
      </div>
    </article>
  )
}

export default ProductCard