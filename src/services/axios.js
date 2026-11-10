import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/breadest-api/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Adjunta automáticamente el JWT en cada petición, si existe sesión iniciada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Si el backend responde 401 (token inválido/expirado/sesión cerrada),
// limpiamos la sesión local para que el resto de la app deje de creer
// que el usuario sigue autenticado.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    }
    return Promise.reject(error)
  }
)

export default api