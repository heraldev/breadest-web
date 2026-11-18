import api from './axios.js'

export async function getProducts() {
  const { data } = await api.get('/productos')
  return data
}

export async function getCategories() {
  const { data } = await api.get('/productos/categorias')
  return data
}

export async function getAdminProducts() {
  const { data } = await api.get('/productos/admin')
  return data
}

export async function createProduct(payload) {
  const { data } = await api.post('/productos', payload)
  return data
}

export async function updateProduct(id, payload) {
  const { data } = await api.patch(`/productos/${id}`, payload)
  return data
}

export async function deactivateProduct(id) {
  const { data } = await api.delete(`/productos/${id}`)
  return data
}