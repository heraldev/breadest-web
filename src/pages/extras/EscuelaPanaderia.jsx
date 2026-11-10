import { Link } from 'react-router-dom'

function EscuelaPanaderia() {
  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-10">
        
        <section className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel bg-wheat/20 px-3 py-1 rounded-full">
            Formación Artesanal
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            Escuela de Panadería T&M
          </h1>
          <p className="text-roast/80 text-lg max-w-2xl mx-auto">
            Aprende los secretos de la fermentación lenta, el cuidado de la masa madre y la técnica de la alta repostería.
          </p>
        </section>

        {/* Talleres */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-espresso border-b border-wheat/40 pb-2">
            Nuestros Cursos y Talleres
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-wheat/40 bg-cream p-5 rounded-xl space-y-2 shadow-sm">
              <span className="text-xs font-bold text-caramel">Nivel Principiante</span>
              <h3 className="font-display font-bold text-lg text-espresso">Iniciación a la Masa Madre</h3>
              <p className="text-xs text-roast/80">Crea tu propio cultivo de levadura salvaje y hornea tus primeras hogazas crujientes.</p>
              <p className="text-xs font-semibold text-espresso pt-2">Sábados (4 hrs de duración)</p>
            </div>

            <div className="border border-wheat/40 bg-cream p-5 rounded-xl space-y-2 shadow-sm">
              <span className="text-xs font-bold text-caramel">Nivel Intermedio</span>
              <h3 className="font-display font-bold text-lg text-espresso">Hoformatura y Laminados</h3>
              <p className="text-xs text-roast/80">Aprende la técnica de empaste para lograr croissants, croissants de almendra y chocolatines perfectos.</p>
              <p className="text-xs font-semibold text-espresso pt-2">Intensivo de Fin de Semana</p>
            </div>

            <div className="border border-wheat/40 bg-cream p-5 rounded-xl space-y-2 shadow-sm">
              <span className="text-xs font-bold text-caramel">Especialidad</span>
              <h3 className="font-display font-bold text-lg text-espresso">Panadería Tradicional Mexicana</h3>
              <p className="text-xs text-roast/80">Conchas artesanales, pan de muerto con agua de azahar y rosca de reyes en temporada.</p>
              <p className="text-xs font-semibold text-espresso pt-2">Talleres de Temporada</p>
            </div>
          </div>
        </div>

        {/* Inscripción */}
        <div className="bg-wheat/20 p-8 rounded-2xl text-center space-y-4">
          <h3 className="font-display text-xl font-bold text-espresso">¿Interesado en inscribirte o regalar un curso?</h3>
          <p className="text-sm text-roast/80">Impartimos clases presenciales con cupo limitado a 8 alumnos por taller para garantizar atención personalizada.</p>
          <Link
            to="/contacto"
            className="inline-block bg-espresso text-wheat px-6 py-2.5 rounded-xl font-semibold hover:bg-roast transition-colors text-sm"
          >
            Consultar Próximas Fechas
          </Link>
        </div>

      </div>
    </div>
  )
}

export default EscuelaPanaderia