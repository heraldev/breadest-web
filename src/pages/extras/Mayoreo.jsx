import { Link } from 'react-router-dom'

function Mayoreo() {
  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        
        <section className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel bg-wheat/20 px-3 py-1 rounded-full">
            Servicios B2B
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            Venta al Mayoreo
          </h1>
          <p className="text-roast/80 text-lg max-w-2xl mx-auto">
            Suministramos pan artesanal de la más alta calidad a restaurantes, hoteles, cafeterías y banqueteras en Querétaro y zonas conurbadas.
          </p>
        </section>

        {/* Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-2">
            <h3 className="font-display font-bold text-lg text-espresso">Entregas Diarias Tempranas</h3>
            <p className="text-sm text-roast/80">Horneamos durante la madrugada para entregar pan fresco directamente en tu establecimiento antes de la apertura.</p>
          </div>

          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-2">
            <h3 className="font-display font-bold text-lg text-espresso">Recetas Personalizadas</h3>
            <p className="text-sm text-roast/80">Desarrollamos bollos para hamburguesas, baguettes o barras de pan con gramajes ajustados a la medida de tu menú.</p>
          </div>

          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-2">
            <h3 className="font-display font-bold text-lg text-espresso">Precios Competitivos</h3>
            <p className="text-sm text-roast/80">Esquema de precios escalonados y volúmenes con atractivos márgenes de ganancia para tu negocio.</p>
          </div>

          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-2">
            <h3 className="font-display font-bold text-lg text-espresso">Control de Calidad Consistente</h3>
            <p className="text-sm text-roast/80">Estandarización estricta mediante fermentación controlada para asegurar el mismo sabor y textura siempre.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-roast text-cream p-8 rounded-2xl text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-wheat">Solicita un Muestrario para tu Negocio</h2>
          <p className="text-sm text-cream/80">Ponte en contacto con nuestro equipo de ventas corporativas y agenda una prueba de producto sin compromiso.</p>
          <a
            href="mailto:hola@trigoymiel.mx?subject=Solicitud%20de%20Cotización%20Mayoreo"
            className="inline-block bg-caramel text-espresso font-bold px-6 py-2.5 rounded-xl hover:bg-wheat transition-colors text-sm"
          >
            Contactar Ventas
          </a>
        </section>

      </div>
    </div>
  )
}

export default Mayoreo
