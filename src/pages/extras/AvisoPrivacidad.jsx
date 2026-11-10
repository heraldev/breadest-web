function AvisoPrivacidad() {
  return (
    <div className="min-h-screen bg-cream text-espresso px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <header className="border-b border-wheat/40 pb-6 text-center space-y-2">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-espresso">
            Aviso de Privacidad Integral
          </h1>
          <p className="text-xs text-roast/70 uppercase tracking-widest">
            Última actualización: 15 de Agosto de 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-roast/90 leading-relaxed">
          
          {/* Identidad */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">1. Identidad y Domicilio del Responsable</h2>
            <p>
              <strong>Trigo & Miel Panadería S.A. de C.V.</strong> (en lo sucesivo denominada como "Trigo & Miel"), con domicilio ubicado en Av. de la Panadería 123, Colonia Centro, Querétaro, Qro., C.P. 76000, es la responsable del tratamiento, uso y protección de sus datos personales, en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
            </p>
          </section>

          {/* Datos Recabados */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">2. Datos Personales que Recabamos</h2>
            <p>Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Datos de identificación:</strong> Nombre completo, correo electrónico, teléfono de contacto.</li>
              <li><strong>Datos de entrega:</strong> Dirección fiscal y/o domicilio de entrega de pedidos.</li>
              <li><strong>Datos financieros y de facturación:</strong> Registro Federal de Contribuyentes (RFC), razón social, domicilio fiscal y datos de tarjetas de crédito/débito para el procesamiento de pagos (procesados a través de pasarelas de pago cifradas y seguras).</li>
            </ul>
          </section>

          {/* Finalidades */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">3. Finalidades del Tratamiento de Datos</h2>
            <p>Sus datos personales serán utilizados para las siguientes <strong>finalidades primarias</strong> (necesarias para prestar el servicio):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Procesar, preparar y entregar sus pedidos de panadería, repostería y catering.</li>
              <li>Gestión de pagos, emisión de comprobantes fiscales y facturación electrónica.</li>
              <li>Proveer atención a clientes, dudas, aclaraciones y soporte sobre pedidos.</li>
              <li>Administración y autenticación de cuentas de usuario en nuestra plataforma web.</li>
            </ul>
            <p className="pt-2">De manera adicional, utilizaremos su información personal para las siguientes <strong>finalidades secundarias</strong>:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Envío de promociones, boletines de novedades, invitaciones a talleres de la Escuela de Panadería T&M y felicitaciones de cumpleaños.</li>
              <li>Evaluación de la calidad de nuestros productos y encuestas de satisfacción.</li>
            </ul>
            <p className="text-xs text-roast/70 pt-1">
              * Si no desea que sus datos personales sean tratados para estas finalidades secundarias, puede enviarnos un correo indicándolo a <span className="text-caramel font-semibold">hola@trigoymiel.mx</span>.
            </p>
          </section>

          {/* Transferencias */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">4. Transferencia de Datos Personales</h2>
            <p>
              Trigo & Miel se compromete a no transferir ni compartir su información personal con terceros sin su consentimiento previo, salvo las excepciones previstas en el artículo 37 de la LFPDPPP, incluyendo transferencias a empresas de mensajería y pasarelas de pago indispensables para completar sus transacciones.
            </p>
          </section>

          {/* Derechos ARCO */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">5. Derechos ARCO y Revocación del Consentimiento</h2>
            <p>
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos <strong>ARCO</strong>.
            </p>
            <p>
              Para ejercer cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva enviando un correo electrónico al Departamento de Privacidad en <span className="text-caramel font-semibold">hola@trigoymiel.mx</span> indicando:
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Nombre del titular y correo electrónico para comunicarle la respuesta.</li>
              <li>Documentos oficiales que acrediten su identidad (INE o Pasaporte).</li>
              <li>Descripción clara y precisa de los datos personales respecto de los que busca ejercer alguno de los derechos ARCO.</li>
            </ol>
          </section>

          {/* Cookies */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">6. Uso de Cookies y Tecnologías de Rastreo</h2>
            <p>
              Le informamos que en nuestra página de Internet utilizamos cookies y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de Internet, para brindarle un mejor servicio y experiencia de navegación en nuestra página.
            </p>
          </section>

          {/* Cambios al aviso */}
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-espresso">7. Cambios al Aviso de Privacidad</h2>
            <p>
              El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de nuestras propias necesidades operativas. Cualquier modificación será publicada directamente en nuestro sitio web oficial.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}

export default AvisoPrivacidad