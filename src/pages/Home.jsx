import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductCard from '../components/ProductCard.jsx'
import panMainImg from '../assets/images/PanMain.jpg';
import { ROSCA_DE_REYES } from '../utils/seasons.jsx'
import { getBannerTemporada } from '../services/crud.js'

const FEATURED = [
  {
    name: 'Hogaza de masa madre',
    description: 'Fermentación de 24 horas, corteza crujiente.',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Concha clásica',
    description: 'Vainilla o chocolate, horneada en la mañana.',
    price: '$28',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Concha%20(pan%20dulce%20mexicano)%2002.JPG',
  },
  {
    name: 'Baguette de campo',
    description: 'Harina integral molida en piedra.',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Croissant de mantequilla',
    description: 'Hojaldrado a mano, 36 capas.',
    price: '$38',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
]

function Home() {
  // El banner únicamente depende del switch
  // del panel del Editor (banner_temporada_activo, tabla `configuraciones`).
  const [bannerActivo, setBannerActivo] = useState(false)
  const [cargandoBanner, setCargandoBanner] = useState(true)

  useEffect(() => {
    getBannerTemporada()
      .then(setBannerActivo)
      .catch(() => setBannerActivo(false))
      .finally(() => setCargandoBanner(false))
  }, [])

  // Mientras carga no mostramos nada (evita el parpadeo de "sí hay banner"
  // por una fracción de segundo si en realidad está desactivado).
  const season = !cargandoBanner && bannerActivo ? ROSCA_DE_REYES : null

  return (
    <>
      {/* Banner de temporada — controlado 100% por el switch del editor */}
      {season && (
        <div className="border-b-2 border-red-700 bg-red-700/10 px-6 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-700 sm:text-sm">
            {season.badge} · {season.description}
          </p>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-espresso/10 bg-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span
              className={`mb-5 inline-block border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                season ? 'border-red-700 text-red-700' : 'border-caramel text-caramel'
              }`}
            >
              {season ? season.badge : 'Horneado diario desde 1998'}
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-espresso sm:text-5xl lg:text-6xl">
              {season ? (
                season.title
              ) : (
                <>
                  Pan de verdad,
                  <br />
                  horneado como en casa
                </>
              )}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-espresso/70">
              {season
                ? season.description
                : 'En Trigo & Miel amasamos con harinas de molino local y tiempo: fermentación lenta, hornos de piedra y las recetas que nos enseñó nuestra abuela panadera.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={season ? season.ctaTo : '/menu'}
                className={`border-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition-colors ${
                  season
                    ? 'border-red-700 bg-red-700 hover:border-caramel hover:bg-caramel'
                    : 'border-espresso bg-espresso hover:border-caramel hover:bg-caramel'
                }`}
              >
                {season ? season.ctaLabel : 'Ver el menú'}
              </Link>
              <Link
                to="/nosotros"
                className="border-2 border-espresso px-6 py-3 text-sm font-semibold uppercase tracking-wide text-espresso transition-colors hover:border-caramel hover:text-caramel"
              >
                Nuestra historia
              </Link>
            </div>
          </div>

          {/* Retícula "canasta" — elemento firma del diseño, solo con bordes */}
          <div className="relative aspect-square w-full">
            <div className="h-full w-full overflow-hidden border border-espresso/20">
              <img
                src={panMainImg}
                alt="Pan Main"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute -bottom-4 -right-4 border-2 border-espresso bg-cream px-4 py-2 font-display text-sm font-semibold text-espresso">
              100% artesanal
            </span>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS (preview) */}
      <section className="border-b border-espresso/10 bg-wheat/20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-3">
          <SectionHeading
            eyebrow="Nuestro oficio"
            title="Tres generaciones amasando la misma receta"
            description="Cada mañana, antes de que salga el sol, nuestro equipo enciende el horno de piedra y empieza a formar el pan del día."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            <div className="border border-espresso/15 bg-cream p-6">
              <p className="font-display text-3xl font-bold text-caramel">27</p>
              <p className="mt-2 text-sm text-espresso/70">años horneando en el mismo barrio de Querétaro.</p>
            </div>
            <div className="border border-espresso/15 bg-cream p-6">
              <p className="font-display text-3xl font-bold text-caramel">12</p>
              <p className="mt-2 text-sm text-espresso/70">variedades de pan de masa madre disponibles cada semana.</p>
            </div>
            <div className="border border-espresso/15 bg-cream p-6">
              <p className="font-display text-3xl font-bold text-caramel">100%</p>
              <p className="mt-2 text-sm text-espresso/70">harinas de molino local, sin conservadores artificiales.</p>
            </div>
            <div className="border border-espresso/15 bg-cream p-6">
              <p className="font-display text-3xl font-bold text-caramel">5:00</p>
              <p className="mt-2 text-sm text-espresso/70">horas de la madrugada en que encendemos el horno.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="border-b border-espresso/10 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Lo más pedido" title="Nuestros favoritos de la semana" />
            <Link
              to="/menu"
              className="shrink-0 border-b-2 border-caramel pb-1 text-sm font-semibold uppercase tracking-wide text-caramel"
            >
              Ver menú completo →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((item) => (
              <ProductCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-roast">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
            ¿Se te antojó el pan recién horneado?
          </h2>
          <p className="max-w-md text-sm text-cream/70">
            Visítanos de martes a domingo o escríbenos para pedidos especiales,
            pasteles de cumpleaños y catering de eventos.
          </p>
          <Link
            to="/contacto"
            className="border-2 border-wheat px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-wheat hover:text-roast"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home