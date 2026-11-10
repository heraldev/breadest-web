import api from './axios'

/**
 * Envía la información del formulario de contacto al backend.
 * @param {Object} formData - { nombre, correo, mensaje }
 */
export const sendContactForm = async (formData) => {
  try {
    const response = await api.post('/contacto', formData)
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'No se pudo enviar el mensaje. Intenta más tarde.' }
  }
}