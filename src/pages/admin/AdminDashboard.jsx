import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../../services/auth.js'
import { getEditores, cambiarEstadoUsuario } from '../../services/crud.js'

function AdminDashboard() {
  const navigate = useNavigate()
  const storedUser = getStoredUser()

  // Datos del administrador en sesión
  const user = {
    name: storedUser ? `${storedUser.nombre || storedUser.name || 'Administrador'}`.trim() : 'Administrador',
    email: storedUser?.email || storedUser?.correo || 'admin@trigoymiel.com',
    role: 'Administrador'
  }

  const [editors, setEditors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const cargarEditores = async () => {
    setLoading(true)
    setError('')
    try {
      const usuarios = await getEditores()
      // El backend devuelve {id, nombre, email, activo, creado_en}; lo
      // adaptamos a la forma que ya usa esta tabla (name, role, active).
      setEditors(
        usuarios.map((u) => ({
          id: u.id,
          name: u.nombre,
          email: u.email,
          role: 'Editor',
          active: Boolean(u.activo),
        }))
      )
    } catch (err) {
      setError(err.error || 'No se pudieron cargar los editores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarEditores()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    navigate('/login')
  }

  // Alterna el estado activo/inactivo del editor contra el backend real
  const toggleStatus = async (editor) => {
    const nuevoEstado = !editor.active
    setUpdatingId(editor.id)
    setError('')

    // Actualización optimista: se ve instantáneo en la UI
    setEditors((prev) =>
      prev.map((e) => (e.id === editor.id ? { ...e, active: nuevoEstado } : e))
    )

    try {
      await cambiarEstadoUsuario(editor.id, nuevoEstado)
    } catch (err) {
      // Si falla en el servidor, revertimos el cambio visual
      setEditors((prev) =>
        prev.map((e) => (e.id === editor.id ? { ...e, active: !nuevoEstado } : e))
      )
      setError(err.error || 'No se pudo actualizar el estado del editor')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:px-12">
      
      {/* HEADER / PERFIL DEL ADMINISTRADOR */}
      <header className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-wheat/40 bg-wheat/10 p-6 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso font-display text-xl font-bold text-wheat shadow">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold text-espresso md:text-2xl">
                ¡Hola, {user.name}!
              </h1>
              <span className="rounded-full bg-caramel/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-caramel uppercase">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-roast/80">{user.email}</p>
          </div>
        </div>

        {/* Botón Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="flex h-11 items-center gap-2 rounded-xl bg-espresso px-4 text-xs font-semibold tracking-wider text-wheat transition-all hover:bg-roast shadow-sm"
        >
          <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Cerrar Sesión</span>
        </button>
      </header>

      {/* SECCIÓN PRINCIPAL: TABLA DE EDITORES */}
      <main className="rounded-2xl border border-wheat/40 bg-cream p-6 shadow-xl shadow-espresso/5">
        <div className="mb-6 flex flex-col justify-between gap-2 border-b border-wheat/30 pb-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-espresso">
              Gestión de Editores
            </h2>
            <p className="text-sm text-roast/80">
              Activa o desactiva las cuentas de los editores para controlar su acceso al sistema.
            </p>
          </div>
          <span className="self-start rounded-lg bg-wheat/30 px-3 py-1 text-xs font-semibold text-roast">
            Total Editores: {editors.length}
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="py-10 text-center text-sm text-roast/70">Cargando editores...</p>
        ) : editors.length === 0 ? (
          <p className="py-10 text-center text-sm text-roast/70">
            Todavía no hay usuarios con rol Editor registrados.
          </p>
        ) : (
          /* TABLA DE USUARIOS EDITORES */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-espresso">
              <thead>
                <tr className="border-b border-wheat/40 bg-wheat/10 text-xs font-semibold uppercase tracking-wider text-roast">
                  <th className="px-4 py-3.5">Usuario</th>
                  <th className="px-4 py-3.5">Correo Electrónico</th>
                  <th className="px-4 py-3.5">Rol</th>
                  <th className="px-4 py-3.5 text-center">Estado de Acceso</th>
                  <th className="px-4 py-3.5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wheat/20">
                {editors.map((editor) => (
                  <tr key={editor.id} className="transition-colors hover:bg-wheat/5">
                    <td className="px-4 py-4 font-semibold text-espresso">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wheat/40 text-xs font-bold text-roast">
                          {editor.name.charAt(0)}
                        </div>
                        {editor.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-roast/80">{editor.email}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-wheat/20 px-2 py-1 text-xs font-medium text-roast">
                        {editor.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                          editor.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${editor.active ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        {editor.active ? 'Permitido' : 'Bloqueado'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {/* Switch interactivo */}
                      <button
                        type="button"
                        onClick={() => toggleStatus(editor)}
                        disabled={updatingId === editor.id}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-caramel/40 disabled:cursor-not-allowed disabled:opacity-60 ${
                          editor.active ? 'bg-caramel' : 'bg-wheat/60'
                        }`}
                        title={editor.active ? 'Desactivar acceso' : 'Activar acceso'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-cream transition-transform shadow-md ${
                            editor.active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard