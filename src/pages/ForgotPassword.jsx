import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica para enviar correo de recuperación desde el backend
    console.log('Recuperar contraseña para:', email)
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-wheat/30 bg-cream p-8 shadow-xl shadow-espresso/5">
        
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-wheat/30 px-3 py-1 text-xs font-semibold tracking-wider text-roast uppercase">
            Seguridad de tu cuenta
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-espresso">
            Recuperar Contraseña
          </h1>
          <p className="mt-2 text-sm text-roast/80">
            Ingresa tu correo registrado y te enviaremos las instrucciones de restablecimiento.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                placeholder="ejemplo@trigoymiel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-espresso py-3.5 text-sm font-semibold tracking-wide text-wheat transition-all hover:bg-roast hover:shadow-lg hover:shadow-roast/20 active:scale-[0.99]"
            >
              Enviar Enlace de Recuperación
            </button>
          </form>
        ) : (
          <div className="rounded-xl border border-caramel/20 bg-wheat/20 p-6 text-center">
            <p className="font-display text-lg font-bold text-espresso">
              ¡Correo Enviado!
            </p>
            <p className="mt-2 text-xs text-roast">
              Si la dirección <span className="font-semibold">{email}</span> está registrada, recibirás las instrucciones en breve.
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-wheat/40 pt-6 text-center text-sm text-roast/80">
          <Link to="/login" className="font-semibold text-caramel hover:text-roast hover:underline">
            ← Volver al inicio de sesión
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword