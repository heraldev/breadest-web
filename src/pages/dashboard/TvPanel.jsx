export default function TvPanel() {
  return (
    <section className="rounded-2xl border border-wheat/40 bg-cream p-8 shadow-lg">
      <span className="rounded-full bg-wheat/30 px-3 py-1 text-xs font-bold text-roast">
        Próximamente
      </span>

      <h2 className="mt-4 font-display text-2xl font-bold text-espresso">
        Contenido Smart TV
      </h2>

      <p className="mt-3 text-sm text-roast/75">
        Desde aquí podrás administrar imágenes, videos y
        promociones que se mostrarán en las pantallas Android TV
        de Trigo & Miel.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {['Imágenes promocionales', 'Videos', 'Programación de contenido']
          .map(item => (
            <div
              key={item}
              className="rounded-xl border border-wheat/50 bg-wheat/10 p-5 text-center text-sm font-semibold text-roast"
            >
              {item}
            </div>
          ))}
      </div>

      <p className="mt-5 text-xs text-roast/60">
        Módulo pendiente de implementar. No hay dispositivos
        conectados ni contenido publicado todavía.
      </p>
    </section>
  )
}