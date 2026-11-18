import { useState } from 'react'

import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import AdminEditorsPanel from './AdminEditorsPanel.jsx'
import OrdersPanel from '../dashboard/OrdersPanel.jsx'
import ProductsPanel from '../dashboard/ProductsPanel.jsx'
import SeasonPanel from '../dashboard/SeasonPanel.jsx'
import TvPanel from '../dashboard/TvPanel.jsx'

const options = [
  { id: 'editores', label: 'Gestión de Editores' },
  { id: 'pedidos', label: 'Despachar pedidos' },
  { id: 'productos', label: 'Catálogo de productos' },
  { id: 'temporada', label: 'Actualización de temporada' },
  { id: 'tv', label: 'Contenido TV' }
]

export default function AdminDashboard() {
  const [active, setActive] = useState('editores')

  return (
    <DashboardLayout
      title="Panel de Administrador"
      subtitle="Administración general de Trigo & Miel"
      options={options}
      active={active}
      onChange={setActive}
    >
      {active === 'editores' && <AdminEditorsPanel />}
      {active === 'pedidos' && <OrdersPanel />}
      {active === 'productos' && <ProductsPanel />}
      {active === 'temporada' && <SeasonPanel />}
      {active === 'tv' && <TvPanel />}
    </DashboardLayout>
  )
}
