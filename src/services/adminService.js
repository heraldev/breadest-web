import api from './axios.js'

export async function getEditores() {
  try {
    const { data } = await api.get('/usuarios', {
      params: { rol: 'Editor' }
    })
    return data.usuarios
  } catch (error) {
    throw error.response?.data || {
      error: 'Error al obtener los editores'
    }
  }
}

export async function cambiarEstadoUsuario(id, activo) {
  try {
    const { data } = await api.patch(
      `/usuarios/${id}/estado`,
      { activo }
    )
    return data
  } catch (error) {
    throw error.response?.data || {
      error: 'Error al cambiar el estado del usuario'
    }
  }
}