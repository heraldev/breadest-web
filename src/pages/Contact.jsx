import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import { sendContactForm } from '../services/contactService.js'

function Contact() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Obtener API Key de Google Maps
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const lat = "20.5880623"
  const lng = "-100.3880654"

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29970.83244438015!2d-98.77817585259929!3d20.119271485668055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d109fc06ef1ecb%3A0x5b1aef217f5a91f!2sPan%20La%20Villita!5e0!3m2!1ses-419!2smx!4v1786557382088!5m2!1ses-419!2smx`
  //const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=14`;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setEnviado(false)

    try {
      await sendContactForm(form)
      setEnviado(true)
      setForm({ nombre: '', correo: '', mensaje: '' }) // Limpiar campos tras éxito
    } catch (err) {
      setError(err.error || err.message || 'Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="border-b border-espresso/10 bg-wheat/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Hablemos"
            title="Visítanos o escríbenos"
            description="¿Pedidos especiales, pasteles de cumpleaños o catering para tu evento? Cuéntanos qué necesitas."
          />
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="border border-espresso/15 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5">
              <label className="block text-sm font-medium text-espresso">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="mt-2 w-full border border-espresso/20 bg-cream px-4 py-3 text-sm text-espresso outline-none focus:border-caramel"
                  placeholder="Tu nombre completo"
                />
              </label>
              <label className="block text-sm font-medium text-espresso">
                Correo
                <input
                  type="email"
                  name="correo"
                  required
                  value={form.correo}
                  onChange={handleChange}
                  className="mt-2 w-full border border-espresso/20 bg-cream px-4 py-3 text-sm text-espresso outline-none focus:border-caramel"
                  placeholder="tucorreo@ejemplo.com"
                />
              </label>
              <label className="block text-sm font-medium text-espresso">
                Mensaje
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  className="mt-2 w-full resize-none border border-espresso/20 bg-cream px-4 py-3 text-sm text-espresso outline-none focus:border-caramel"
                  placeholder="Cuéntanos qué necesitas..."
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="border-2 border-espresso bg-espresso px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:border-caramel hover:bg-caramel"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {enviado && (
                <p className="border border-caramel bg-wheat/30 px-4 py-3 text-sm text-roast">
                  ¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
                </p>
              )}

              {/* Mensaje de Error */}
              {error && (
                <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                  {error}
                </p>
              )}

            </div>
          </form>

          {/* Info + mapa placeholder */}
          <div className="flex flex-col gap-6">
            <div className="border border-espresso/15 p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-espresso">Datos de contacto</h3>
              <ul className="mt-4 space-y-3 text-sm text-espresso/80">
                <li><span className="font-medium text-caramel">Dirección:</span> Av. de la Panadería 123, Col. Centro, Querétaro, Qro.</li>
                <li><span className="font-medium text-caramel">Teléfono:</span> (442) 123 4567</li>
                <li><span className="font-medium text-caramel">Correo:</span> hola@trigoymiel.mx</li>
                <li><span className="font-medium text-caramel">Horario:</span> Martes a domingo, 7:00 a 20:00 h</li>
              </ul>
            </div>

            {/* Placeholder de mapa: se reemplaza por un mapa real cuando exista el backend */}
            <div className="relative flex aspect-video items-center justify-center border border-espresso/15 bg-wheat/30 overflow-hidden">
              {apiKey ? (
                <iframe
                  title="Ubicación en Google Maps"
                  src={mapUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                /* Layout de respaldo por si aún no detecta la API Key */
                <div className="relative flex h-full w-full items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="border border-espresso/10" />
                    ))}
                  </div>
                  <span className="relative border border-espresso bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-wide text-espresso">
                    Mapa próximamente
                  </span>
                </div>
              )}
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
