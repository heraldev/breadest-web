import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../../services/auth.js'
import {
  getBannerTemporada,
  actualizarBannerTemporada,
  getEditores,
  cambiarEstadoUsuario,
} from '../../services/crud.js'

function EditorDashboard() {
  const navigate = useNavigate()
  const storedUser = getStoredUser()

  // Datos del editor en sesión
  const user = {
    name: storedUser ? `${storedUser.nombre || storedUser.name || 'Editor'}`.trim() : 'Editor',
    email: storedUser?.email || storedUser?.correo || 'editor@trigoymiel.com',
    role: 'Editor'
  }

  const [seasonActive, setSeasonActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // --- Estado de la sección "Gestión de Usuarios" (la que debe bloquearse) ---
  const [editores, setEditores] = useState([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(true)
  const [errorUsuarios, setErrorUsuarios] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    getBannerTemporada()
      .then(setSeasonActive)
      .catch((err) => setError(err.error || 'No se pudo cargar el estado del banner'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Esta petición usa el mismo endpoint que el panel de Administrador.
    // Con rol "Editor" el backend la rechaza con 403 antes de devolver datos:
    // el switch de esta tarjeta nunca llega a tener con qué funcionar.
    getEditores()
      .then(setEditores)
      .catch((err) => setErrorUsuarios(err.error || 'No se pudo cargar el listado de usuarios'))
      .finally(() => setLoadingUsuarios(false))
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    navigate('/login')
  }

  const handleToggle = async () => {
    const nuevoEstado = !seasonActive
    setSaving(true)
    setError('')

    // Actualización optimista
    setSeasonActive(nuevoEstado)

    try {
      await actualizarBannerTemporada(nuevoEstado)
    } catch (err) {
      setSeasonActive(!nuevoEstado) // revertir si falla
      setError(err.error || 'No se pudo actualizar el banner de temporada')
    } finally {
      setSaving(false)
    }
  }

  // Intenta cambiar el estado de un usuario. Con rol Editor esto también
  // debería fallar con 403 (falta el permiso "usuarios.gestionar"),
  // aunque el switch esté ahí y sea clickeable.
  const toggleEditorStatus = async (editor) => {
    const nuevoEstado = !editor.active
    setUpdatingId(editor.id)
    setErrorUsuarios('')

    try {
      await cambiarEstadoUsuario(editor.id, nuevoEstado)
      setEditores((prev) =>
        prev.map((e) => (e.id === editor.id ? { ...e, active: nuevoEstado } : e))
      )
    } catch (err) {
      setErrorUsuarios(err.error || 'No tienes permiso para realizar esta acción')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:px-12">
      
      {/* HEADER / PERFIL DEL EDITOR */}
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
              <span className="rounded-full bg-wheat/30 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-roast uppercase">
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

      <div className="mx-auto flex max-w-2xl flex-col gap-8">

        {/* SECCIÓN: CONTROL DE TEMPORADA (esto sí lo puede hacer el Editor) */}
        <main className="rounded-2xl border border-wheat/40 bg-cream p-8 shadow-xl shadow-espresso/5">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-wheat/30 px-3 py-1 text-xs font-semibold tracking-wider text-roast uppercase">
              Panel de Control del Editor
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-espresso">
              Actualización de Temporada
            </h2>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* TARJETA DEL SWITCH */}
          <div className="mt-8 rounded-xl border border-wheat/50 bg-wheat/10 p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-espresso text-base">
                Especial Navidad
              </h3>
              <p className="text-xs text-roast/70">
                {loading ? 'Consultando estado actual...' : 'Estado actual del banner'}
              </p>
            </div>

            {/* Switch interactivo de Temporada */}
            <button
              type="button"
              onClick={handleToggle}
              disabled={loading || saving}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-caramel/40 disabled:cursor-not-allowed disabled:opacity-60 ${
                seasonActive ? 'bg-caramel' : 'bg-wheat/60'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-cream transition-transform shadow-md ${
                  seasonActive ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* PREVIEW DEL ESTADO EN TIEMPO REAL */}
          <div className="mt-6 rounded-xl border border-dashed border-wheat/60 p-4 text-center">
            <p className="text-xs font-medium text-roast/70 uppercase tracking-wider mb-2">
              Vista Previa del Estado
            </p>
            {seasonActive ? (
              <div className="rounded-lg bg-caramel/10 border border-caramel/30 p-3 text-caramel font-bold text-sm">
                ❄️ La temporada está <strong>ACTIVA</strong>. Los usuarios ven la promoción de Roscas
              </div>
            ) : (
              <div className="rounded-lg bg-wheat/20 border border-wheat/40 p-3 text-roast/80 font-bold text-sm">
                🍞 La temporada está <strong>INACTIVA</strong>. El sitio muestra solo el menú habitual.
              </div>
            )}
          </div>
        </main>

        {/* SECCIÓN: GESTIÓN DE USUARIOS (esto NO lo puede hacer el Editor) */}
        <section className="rounded-2xl border border-wheat/40 bg-cream p-8 shadow-xl shadow-espresso/5">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-wheat/30 px-3 py-1 text-xs font-semibold tracking-wider text-roast uppercase">
              Fuera de tu nivel de acceso
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-espresso">
              Gestión de Usuarios
            </h2>
            <p className="mt-2 text-sm text-roast/80">
              Este control existe en la interfaz, pero tu rol (Editor) no tiene
              el permiso <code className="rounded bg-wheat/30 px-1.5 py-0.5 text-xs">usuarios.gestionar</code>.
              El backend debe rechazarlo aunque el botón sea visible aquí.
            </p>
          </div>

          {loadingUsuarios ? (
            <p className="py-6 text-center text-sm text-roast/70">Consultando permisos...</p>
          ) : errorUsuarios ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-8.25 3.75h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-red-700">Acceso denegado por el backend</p>
              <p className="mt-1 text-xs text-red-600">{errorUsuarios}</p>
            </div>
          ) : editores.length === 0 ? (
            <p className="py-6 text-center text-sm text-roast/70">No hay editores registrados.</p>
          ) : (
            /* Si algún día el rol Editor sí obtuviera el permiso, esta
               tabla ya queda lista y funcional, igual que en Admin. */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-espresso">
                <thead>
                  <tr className="border-b border-wheat/40 bg-wheat/10 text-xs font-semibold uppercase tracking-wider text-roast">
                    <th className="px-4 py-3">Usuario</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                    <th className="px-4 py-3 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wheat/20">
                  {editores.map((editor) => (
                    <tr key={editor.id}>
                      <td className="px-4 py-3 font-semibold">{editor.name}</td>
                      <td className="px-4 py-3 text-center">
                        {editor.active ? 'Permitido' : 'Bloqueado'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => toggleEditorStatus(editor)}
                          disabled={updatingId === editor.id}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60 ${
                            editor.active ? 'bg-caramel' : 'bg-wheat/60'
                          }`}
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
        </section>
      </div>
    </div>
  )
}

export default EditorDashboard