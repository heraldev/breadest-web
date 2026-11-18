import { useState } from 'react'
import { getEditores } from '../../services/adminService.js'

export default function EditorUsersDemo() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function probarAcceso() {
    setLoading(true)
    setResult('')

    try {
      await getEditores()
      setResult('Acceso concedido por el backend.')
    } catch (err) {
      setResult(
        `Acceso denegado: ${err.error || 'No tienes autorización'}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-wheat/40 bg-cream p-8 shadow-lg">
      <h2 className="font-display text-2xl font-bold text-espresso">
        Gestión de Usuarios
      </h2>

      <p className="mt-3 text-sm text-roast/70">
        Esta sección demuestra el control de acceso RBAC.
        El rol Editor no tiene autorización para gestionar
        cuentas de usuarios.
      </p>

      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="font-semibold text-red-800">
          Permiso requerido: usuarios.gestionar
        </p>

        <p className="mt-2 text-sm text-red-700">
          El listado de usuarios está protegido por el rol
          Administrador en el backend.
        </p>
      </div>

      <button
        type="button"
        onClick={probarAcceso}
        disabled={loading}
        className="mt-5 rounded-lg bg-espresso px-4 py-3 text-sm font-semibold text-wheat disabled:opacity-50"
      >
        {loading ? 'Consultando...' : 'Probar acceso al módulo'}
      </button>

      {result && (
        <p className="mt-4 rounded-lg bg-wheat/20 p-3 text-sm text-roast">
          {result}
        </p>
      )}
    </section>
  )
}