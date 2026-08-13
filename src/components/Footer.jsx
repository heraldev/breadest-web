import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'

function Footer() {
  return (
    <footer className="border-t border-wheat/20 bg-roast text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 border-b border-wheat/20 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          <span className="flex h-10 w-10 items-center justify-center border-2 border-wheat font-display text-lg font-bold">
            T&amp;M
          </span>
          <p className="mt-4 font-display text-xl font-semibold">Trigo &amp; Miel</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            Horneamos pan de masa madre y repostería artesanal todos los días,
            con harinas de molino local y fermentación lenta. Desde 1998,
            cada pieza sale del horno con las manos de nuestro equipo.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-wheat">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex gap-3">
              <span className="text-caramel">Dirección</span>
              <span>Av. de la Panadería 123, Col. Centro, Querétaro, Qro.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel">Teléfono</span>
              <a href="tel:+524421234567" className="hover:text-wheat">
                (442) 123 4567
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel">Correo</span>
              <a href="mailto:hola@trigoymiel.mx" className="hover:text-wheat">
                hola@trigoymiel.mx
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-caramel">Horario</span>
              <span>Mar–Dom, 7:00 a 20:00 h</span>
            </li>
          </ul>
        </div>

        {/* Páginas hermanas */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-wheat">
            Páginas hermanas
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>
              <a href="#" className="hover:text-wheat">Cafetería Trigo &amp; Miel</a>
            </li>
            <li>
              <a href="#" className="hover:text-wheat">Escuela de Panadería T&amp;M</a>
            </li>
            <li>
              <a href="#" className="hover:text-wheat">Venta al mayoreo</a>
            </li>
            <li>
              <a href="#" className="hover:text-wheat">Eventos y catering</a>
            </li>
          </ul>
        </div>

        {/* Páginas complementarias */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-wheat">
            Páginas complementarias
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>
              <Link to="/nosotros" className="hover:text-wheat">Nuestra historia</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-wheat">Menú completo</Link>
            </li>
            <li>
              <a href="#" className="hover:text-wheat">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#" className="hover:text-wheat">Aviso de privacidad</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-6 px-6 py-6 sm:flex-row">
        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} Trigo &amp; Miel Panadería. Todos los derechos reservados.
        </p>
        <SocialIcons />
      </div>
    </footer>
  )
}

export default Footer
