import api from './axios'

/**
 * Registra un usuario nuevo. El backend asigna automáticamente el rol
 * "Usuario" y devuelve { mensaje, usuario }. No inicia sesión por sí solo.
 */
export const registerUser = async ({ nombre, email, password }) => {
  try {
    const response = await api.post('/auth/register', { nombre, email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Error al registrar usuario' }
  }
}

/**
 * Inicia sesión. Si el backend responde con éxito, guarda el token y los
 * datos del usuario (con sus roles/permisos) en localStorage.
 */
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    const { token, usuario } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Error al iniciar sesión' }
  }
}

/**
 * Cierra sesión: avisa al backend para invalidar el token (logout real,
 * no solo del lado del cliente) y limpia el localStorage sin importar
 * si la petición al servidor falla.
 */
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    // Aunque falle la petición (ej. sin conexión), igual cerramos localmente
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }
}

/** Trae el perfil actualizado (útil para refrescar roles/permisos). */
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Error al obtener el perfil' }
  }
}

/** Usuario guardado localmente (sin pegarle al backend). */
export const getStoredUser = () => {
  const raw = localStorage.getItem('usuario')
  return raw ? JSON.parse(raw) : null
}

/** Chequeo rápido y síncrono de si hay una sesión activa. */
export const isAuthenticated = () => Boolean(localStorage.getItem('token'))