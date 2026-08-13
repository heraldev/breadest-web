import SectionHeading from '../components/SectionHeading.jsx'

const TIMELINE = [
  {
    year: '1998',
    title: 'Doña Herminia abre el primer mostrador',
    text: 'Con un horno de piedra y tres recetas familiares, Trigo & Miel nace en una esquina del centro de Querétaro.',
  },
  {
    year: '2006',
    title: 'Llega la masa madre',
    text: 'Empezamos a cultivar nuestro propio fermento, sustituyendo la levadura comercial en la mayoría de los panes.',
  },
  {
    year: '2014',
    title: 'Segundo horno y taller de repostería',
    text: 'El crecimiento nos permite sumar un horno de piedra adicional y una línea completa de pasteles y postres.',
  },
  {
    year: '2023',
    title: 'Tercera generación al frente',
    text: 'Los nietos de Doña Herminia toman la batuta, manteniendo las recetas originales y sumando nuevas variedades.',
  },
]

const VALUES = [
  { title: 'Tiempo, no atajos', text: 'Dejamos que la masa fermente el tiempo que necesita, nunca menos.' },
  { title: 'Ingredientes de origen local', text: 'Trabajamos con molinos y productores de la región de Querétaro.' },
  { title: 'Oficio a mano', text: 'Formamos cada pieza a mano, del amasado al greñado final.' },
  { title: 'Puertas abiertas', text: 'Nuestro obrador puede visitarse: nos gusta mostrar cómo se hace el pan.' },
]

function About() {
  return (
    <>
      <section className="border-b border-espresso/10 bg-wheat/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Nuestra historia"
            title="De un mostrador familiar a la panadería del barrio"
            description="Trigo & Miel comenzó como el sueño de una sola persona con un horno de piedra. Hoy seguimos horneando con las mismas manos de siempre: las de nuestra gente."
          />
        </div>
      </section>

      {/* Línea de tiempo — aquí sí aplica numerar, porque es una secuencia real */}
      <section className="border-b border-espresso/10 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 divide-y divide-espresso/15 border border-espresso/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {TIMELINE.map((item) => (
              <div key={item.year} className="p-6">
                <span className="font-display text-2xl font-bold text-caramel">{item.year}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-b border-espresso/10 bg-roast">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Lo que nos guía"
            title="Nuestros valores en el obrador"
            description=""
          />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-wheat/20 bg-wheat/20 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-roast p-6">
                <h3 className="font-display text-base font-semibold text-wheat">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
