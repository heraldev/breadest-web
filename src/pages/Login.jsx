import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth.js'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(formData)
      const userRoles = data.usuario?.roles || [] // Devuelve p. ej. ['Administrador']

      // Redirección basada en los nombres de los roles que retorna el backend
      if (userRoles.includes('Administrador')) {
        navigate('/admin')
      } else if (userRoles.includes('Editor')) {
        navigate('/editor')
      } else {
        navigate('/dashboard') // Usuario / Cliente
      }
    } catch (err) {
      setError(err.error || 'No se pudo iniciar sesión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-wheat/30 bg-cream p-8 shadow-xl shadow-espresso/5">

        {/* Encabezado */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-wheat/30 px-3 py-1 text-xs font-semibold tracking-wider text-roast uppercase">
            Bienvenido de vuelta
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-espresso">
            Iniciar Sesión
          </h1>
          <p className="mt-2 text-sm text-roast/80">
            Ingresa a tu cuenta para gestionar tus pedidos
          </p>
        </div>

        {/* Error del backend (credenciales inválidas, servidor caído, etc.) */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-espresso">
                Contraseña
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-caramel transition-colors hover:text-roast hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
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
            {loading ? 'Entrando...' : 'Entrar a mi cuenta'}
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <div className="mt-8 border-t border-wheat/40 pt-6 text-center text-sm text-roast/80">
          ¿Aún no tienes una cuenta?{' '}
          <Link to="/register" className="font-semibold text-caramel hover:text-roast hover:underline">
            Regístrate aquí
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login