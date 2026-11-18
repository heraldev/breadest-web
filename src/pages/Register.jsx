import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService.js'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastNamePaternal: '',
    lastNameMaternal: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validación rápida en cliente, alineada con la del backend
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setLoading(true)
    try {
      // El backend guarda un solo campo "nombre": lo armamos aquí
      const nombreCompleto = [
        formData.firstName,
        formData.lastNamePaternal,
        formData.lastNameMaternal,
      ]
        .filter(Boolean)
        .join(' ')

      await registerUser({
        nombre: nombreCompleto,
        email: formData.email,
        password: formData.password,
      })

      // El registro no inicia sesión automáticamente (el backend no
      // devuelve token en /register), así que mandamos a login.
      navigate('/login', { state: { registrado: true } })
    } catch (err) {
      setError(err.error || 'No se pudo completar el registro. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-wheat/30 bg-cream p-8 shadow-xl shadow-espresso/5">
        
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-wheat/30 px-3 py-1 text-xs font-semibold tracking-wider text-roast uppercase">
            Únete a Trigo & Miel
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-espresso">
            Crear una Cuenta
          </h1>
          <p className="mt-2 text-sm text-roast/80">
            Regístrate para realizar tus pedidos de forma rápida y personalizada
          </p>
        </div>

        {/* Error del backend (correo duplicado, validación, servidor caído, etc.) */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Fila 1: Nombre */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
              Nombre(s)
            </label>
            <input
              type="text"
              required
              placeholder="Ej. María Fernanda"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
            />
          </div>

          {/* Fila 2: Apellidos (Paterno y Materno en 2 columnas) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
                Apellido Paterno
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Hernández"
                value={formData.lastNamePaternal}
                onChange={(e) => setFormData({ ...formData, lastNamePaternal: e.target.value })}
                className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
                Apellido Materno
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Cruz"
                value={formData.lastNameMaternal}
                onChange={(e) => setFormData({ ...formData, lastNameMaternal: e.target.value })}
                className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
              />
            </div>
          </div>

          {/* Fila 3: Correo */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="ejemplo@trigoymiel.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
            />
          </div>

          {/* Fila 4: Contraseña */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-espresso">
              Contraseña
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="Crea una contraseña segura (mín. 8 caracteres)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border border-wheat bg-cream/50 px-4 py-3 text-sm text-espresso placeholder-roast/40 transition-all focus:border-caramel focus:bg-cream focus:outline-none focus:ring-2 focus:ring-caramel/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-espresso py-3.5 text-sm font-semibold tracking-wide text-wheat transition-all hover:bg-roast hover:shadow-lg hover:shadow-roast/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <div className="mt-8 border-t border-wheat/40 pt-6 text-center text-sm text-roast/80">
          ¿Ya tienes una cuenta registrada?{' '}
          <Link to="/login" className="font-semibold text-caramel hover:text-roast hover:underline">
            Inicia sesión aquí
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register