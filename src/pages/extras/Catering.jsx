import { Link } from 'react-router-dom'

function Catering() {
  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        
        <section className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel bg-wheat/20 px-3 py-1 rounded-full">
            Banquetes & Mesas Dulces
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            Eventos y Catering
          </h1>
          <p className="text-roast/80 text-lg max-w-2xl mx-auto">
            Hacemos que tus celebraciones inolvidables tengan la calidez y el sabor único de la panadería de autor.
          </p>
        </section>

        {/* Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-wheat/40 bg-cream p-6 rounded-2xl space-y-3 shadow-sm">
            <h2 className="font-display text-xl font-bold text-espresso">Mesas de Pan y Quesos</h2>
            <p className="text-sm text-roast/80 leading-relaxed">
              Estaciones rústicas con hogazas de masa madre cortadas al momento, variadas focaccias horneadas con hierbas finas, quesos artesanales, mermeladas caseras y frutos secos. Ideal para bodas y cócteles.
            </p>
          </div>

          <div className="border border-wheat/40 bg-cream p-6 rounded-2xl space-y-3 shadow-sm">
            <h2 className="font-display text-xl font-bold text-espresso">Coffee Breaks Corporativos</h2>
            <p className="text-sm text-roast/80 leading-relaxed">
              Selección de mini repostería (croissants, danesas, galletería fina) acompañada de termos de café de especialidad y jugos naturales para reuniones de trabajo y congresos.
            </p>
          </div>
        </div>

        {/* Cotización */}
        <div className="bg-wheat/20 p-8 rounded-2xl text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-espresso">Planifiquemos tu Evento</h2>
          <p className="text-sm text-roast/80">Atendemos eventos desde 20 hasta 300 personas. Cotizamos a la medida de tu presupuesto.</p>
          <Link
            to="/contacto"
            className="inline-block bg-espresso text-wheat px-6 py-2.5 rounded-xl font-semibold hover:bg-roast transition-colors text-sm"
          >
            Solicitar Cotización de Evento
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Catering