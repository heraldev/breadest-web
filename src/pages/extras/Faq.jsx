import { useState } from 'react'

const FAQS = [
  {
    q: '¿Qué diferencia a la masa madre del pan comercial?',
    a: 'Nuestra masa madre utiliza únicamente harina, agua y fermentación natural con levaduras salvajes durante más de 24 horas. Esto mejora la digestibilidad, otorga un sabor ligeramente ácido característico y preserva el pan de forma natural sin conservadores.'
  },
  {
    q: '¿Con cuánto tiempo de anticipación debo hacer un pedido grande?',
    a: 'Recomendamos realizar pedidos mayores a 20 piezas con al menos 48 horas de anticipación para asegurar su producción en el lote del día.'
  },
  {
    q: '¿Ofrecen opciones sin gluten o veganas?',
    a: 'Contamos con una variedad de panes veganos (sin lácteos ni huevo). Por la naturaleza de nuestro taller artesanal donde manejamos harina de trigo constantemente, no podemos garantizar productos 100% libres de trazas de gluten para celíacos.'
  },
  {
    q: '¿Cómo debo conservar mi pan de masa madre en casa?',
    a: 'Te sugerimos guardarlo en una bolsa de tela o papel a temperatura ambiente con el lado cortado hacia abajo. Evita el refrigerador. Para conservarlo por semanas, puedes rebanarlo y congelarlo; solo necesitas rebanar y calentar directamente en tostadora.'
  },
  {
    q: '¿Realizan envíos a domicilio?',
    a: 'Sí, contamos con entregas locales en el área metropolitana de Querétaro para pedidos realizados a través de nuestro sitio web o plataforma telefónica.'
  }
]

function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-3xl space-y-8">
        
        <section className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel bg-wheat/20 px-3 py-1 rounded-full">
            Ayuda & Soporte
          </span>
          <h1 className="font-display text-4xl font-bold text-espresso">
            Preguntas Frecuentes
          </h1>
          <p className="text-roast/80 text-sm">
            Resolvemos tus dudas sobre nuestro pan, ingredientes, conservación y pedidos.
          </p>
        </section>

        {/* Accordion */}
        <div className="space-y-4 pt-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-wheat/40 rounded-xl bg-wheat/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-espresso hover:bg-wheat/20 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-caramel font-bold text-xl ml-2">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-sm text-roast/90 leading-relaxed border-t border-wheat/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Faq
