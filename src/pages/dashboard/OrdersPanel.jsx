
import { useEffect, useState } from 'react'
import {
  getAllOrders,
  setOrderStatus,
  registerOrderPayment
} from '../../services/orderService.js'

const NEXT = {
  pendiente: ['confirmado', 'cancelado'],
  confirmado: ['en_preparacion', 'cancelado'],
  en_preparacion: ['listo', 'cancelado'],
  listo: ['entregado', 'cancelado'],
  entregado: [],
  cancelado: []
}

const LABELS = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_preparacion: 'En preparación',
  listo: 'Listo para recoger',
  entregado: 'Entregado',
  cancelado: 'Cancelado'
}

const currency = (value) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(Number(value))

export default function OrdersPanel() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [workingId, setWorkingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function loadOrders(showLoading = true) {
    if (showLoading) setLoading(true)
    setError('')

    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch (err) {
      setError(err.error || 'No se pudieron cargar los pedidos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  async function updateStatus(order, estado) {
    if (
      estado === 'cancelado' &&
      !window.confirm('¿Cancelar este pedido?')
    ) return

    setWorkingId(order.id)
    setError('')
    setMessage('')

    try {
      await setOrderStatus(order.id, estado)
      await loadOrders(false)
      setMessage('Estado actualizado correctamente')
    } catch (err) {
      setError(err.error || 'No se pudo actualizar el pedido')
    } finally {
      setWorkingId(null)
    }
  }

  async function payOrder(order) {
    if (!window.confirm('¿Confirmas que se recibió el pago en sucursal?')) {
      return
    }

    setWorkingId(order.id)
    setError('')
    setMessage('')

    try {
      await registerOrderPayment(order.id)
      await loadOrders(false)
      setMessage('Pago registrado correctamente')
    } catch (err) {
      setError(err.error || 'No se pudo registrar el pago')
    } finally {
      setWorkingId(null)
    }
  }

  return (
    <section className="rounded-2xl border border-wheat/40 bg-cream p-5 shadow-lg md:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-espresso">
            Despacho de pedidos
          </h2>
          <p className="text-sm text-roast/70">
            Confirma, prepara y entrega pedidos de los clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadOrders()}
          disabled={loading}
          className="rounded-lg bg-espresso px-4 py-2 text-sm font-semibold text-wheat disabled:opacity-50"
        >
          Actualizar pedidos
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          {message}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-center text-roast/70">
          Cargando pedidos...
        </p>
      ) : orders.length === 0 ? (
        <p className="py-10 text-center text-roast/70">
          No hay pedidos registrados.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-wheat/20 text-espresso">
              <tr>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Pago</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-wheat/30">
              {orders.map(order => {
                const nextStates = (NEXT[order.estado] || []).filter(
                  estado => (
                    !(estado === 'entregado' && order.estado_pago !== 'pagado') &&
                    !(estado === 'cancelado' && order.estado_pago === 'pagado')
                  )
                )

                return (
                  <tr key={order.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-bold text-espresso">
                        #{order.id}
                      </p>
                      <p className="text-xs text-roast/60">
                        {order.codigo_recoleccion}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-roast">
                      {order.cliente}
                    </td>

                    <td className="px-4 py-4 font-semibold text-espresso">
                      {currency(order.total)}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-caramel/15 px-3 py-1 text-xs font-bold text-espresso">
                        {LABELS[order.estado] || order.estado}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-roast">
                        {order.estado_pago === 'pagado'
                          ? 'Pagado'
                          : 'Pendiente'}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-36 flex-col gap-2">
                        {order.estado === 'listo' &&
                          order.estado_pago === 'pendiente' && (
                          <button
                            type="button"
                            disabled={workingId === order.id}
                            onClick={() => payOrder(order)}
                            className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Registrar pago
                          </button>
                        )}

                        {nextStates.map(estado => (
                          <button
                            key={estado}
                            type="button"
                            disabled={workingId === order.id}
                            onClick={() => updateStatus(order, estado)}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold disabled:opacity-50 ${
                              estado === 'cancelado'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-espresso text-wheat'
                            }`}
                          >
                            {estado === 'cancelado'
                              ? 'Cancelar pedido'
                              : `Marcar: ${LABELS[estado]}`}
                          </button>
                        ))}

                        {nextStates.length === 0 &&
                          !(order.estado === 'listo' &&
                            order.estado_pago === 'pendiente') && (
                          <span className="text-xs text-roast/60">
                            Sin acciones pendientes
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
