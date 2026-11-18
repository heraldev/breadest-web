import api from './axios.js'
export async function createOrder(payload) {
  const { data } = await api.post('/pedidos', payload)
  return data
}
export async function getMyOrders() {
  const { data } = await api.get('/pedidos/mis-pedidos')
  return data
}
export async function getOrderById(id) {
  const { data } = await api.get(`/pedidos/${id}`)
  return data
}
export async function getAllOrders() {
  const { data } = await api.get('/pedidos')
  return data
}
export async function setOrderStatus(id, estado) {
  const { data } = await api.patch(`/pedidos/${id}/estado`, { estado })
  return data
}
export async function registerOrderPayment(id) {
  const { data } = await api.patch(`/pedidos/${id}/pago`)
  return data
}
