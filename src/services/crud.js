import api from './axios'

/* ==========================================================
   PANEL DE ADMINISTRADOR
   ========================================================== */

/** Lista solo los usuarios con rol "Editor" (para el panel de admin). */
export const getEditores = async () => {
  try {
    const response = await api.get('/usuarios', { params: { rol: 'Editor' } })
    return response.data.usuarios
  } catch (error) {
    throw error.response?.data || { error: 'Error al obtener los editores' }
  }
}

/**
 * Activa o desactiva el acceso de un usuario (ej. un editor).
 * Si activo = false, ese usuario deja de poder iniciar sesión
 * (tu backend ya valida `usuario.activo` dentro de /auth/login).
 */
export const cambiarEstadoUsuario = async (id, activo) => {
  try {
    const response = await api.patch(`/usuarios/${id}/estado`, { activo })
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Error al cambiar el estado del usuario' }
  }
}

/* ==========================================================
   PANEL DE EDITOR — banner de Pan de Muerto
   ========================================================== */

/**
 * Consulta si el banner de temporada está activo. Es pública
 * (sin token) porque también la usa el Home para decidir si lo muestra.
 */
export const getBannerTemporada = async () => {
  try {
    const response = await api.get('/configuracion/banner-temporada')
    return response.data.activo
  } catch (error) {
    throw error.response?.data || { error: 'Error al consultar el banner de temporada' }
  }
}

/** Activa o desactiva el banner de temporada (Editor o Administrador). */
export const actualizarBannerTemporada = async (activo) => {
  try {
    const response = await api.patch('/configuracion/banner-temporada', { activo })
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Error al actualizar el banner de temporada' }
  }
}