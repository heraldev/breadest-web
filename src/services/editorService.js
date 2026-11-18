import api from './axios.js'

export async function getBannerTemporada() {
  try {
    const { data } = await api.get(
      '/configuracion/banner-temporada'
    )
    return data.activo
  } catch (error) {
    throw error.response?.data || {
      error: 'Error al consultar el banner'
    }
  }
}

export async function actualizarBannerTemporada(activo) {
  try {
    const { data } = await api.patch(
      '/configuracion/banner-temporada',
      { activo }
    )
    return data
  } catch (error) {
    throw error.response?.data || {
      error: 'Error al actualizar el banner'
    }
  }
}