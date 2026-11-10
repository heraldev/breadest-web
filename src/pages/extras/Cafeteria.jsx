import { Link } from 'react-router-dom'

function Cafeteria() {
  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Banner principal */}
        <section className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel bg-wheat/20 px-3 py-1 rounded-full">
            Experiencia en Tienda
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            Cafetería Trigo & Miel
          </h1>
          <p className="text-roast/80 text-lg max-w-2xl mx-auto">
            Un espacio cálido diseñado para disfrutar el aroma del pan recién horneado acompañado de café de especialidad mexicano.
          </p>
        </section>

        {/* Sección Informativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-3">
            <h2 className="font-display text-xl font-bold text-espresso">Barra de Café de Especialidad</h2>
            <p className="text-sm text-roast/80 leading-relaxed">
              Trabajamos de la mano con pequeños productores de Veracruz, Chiapas y Oaxaca. Nuestros métodos de extracción resaltan los tonos a avellana, chocolate y caramelo que maridan a la perfección con nuestra bollería artesanal.
            </p>
          </div>

          <div className="bg-wheat/10 p-6 rounded-2xl border border-wheat/30 space-y-3">
            <h2 className="font-display text-xl font-bold text-espresso">Menú de Salón & Desayunos</h2>
            <p className="text-sm text-roast/80 leading-relaxed">
              Desde tostadas de masa madre con aguacate y huevo pochado, hasta panes franceses brioche bañado en miel orgánica. Ofrecemos opciones saladas y dulces preparadas al momento.
            </p>
          </div>
        </div>

        {/* Horarios y Ubicación */}
        <section className="bg-roast text-cream p-8 rounded-2xl text-center space-y-4 shadow-lg">
          <h2 className="font-display text-2xl font-bold text-wheat">Visítanos en Nuestra Sucursal Principal</h2>
          <p className="text-sm text-cream/80">
            Av. de la Panadería 123, Col. Centro, Querétaro, Qro.
          </p>
          <p className="text-sm text-caramel font-semibold">
            Martes a Domingo: 7:00 a 20:00 h
          </p>
          <div className="pt-2">
            <Link
              to="/contacto"
              className="inline-block bg-caramel text-espresso font-bold px-6 py-2.5 rounded-xl hover:bg-wheat transition-colors text-sm"
            >
              Cómo llegar
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Cafeteria