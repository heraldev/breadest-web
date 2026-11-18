
import { useState } from 'react'

import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import SeasonPanel from '../dashboard/SeasonPanel.jsx'
import OrdersPanel from '../dashboard/OrdersPanel.jsx'
import TvPanel from '../dashboard/TvPanel.jsx'
import EditorUsersDemo from './EditorUsersDemo.jsx'

const options = [
  { id: 'temporada', label: 'Actualización de temporada' },
  { id: 'pedidos', label: 'Despachar pedidos' },
  { id: 'tv', label: 'Contenido TV' },
  { id: 'usuarios', label: 'Gestión de Usuarios (Demo)' }
]

export default function EditorDashboard() {
  const [active, setActive] = useState('temporada')

  return (
    <DashboardLayout
      title="Panel de Editor"
      subtitle="Operaciones y contenido de Trigo & Miel"
      options={options}
      active={active}
      onChange={setActive}
    >
      {active === 'temporada' && <SeasonPanel />}
      {active === 'pedidos' && <OrdersPanel />}
      {active === 'tv' && <TvPanel />}
      {active === 'usuarios' && <EditorUsersDemo />}
    </DashboardLayout>
  )
}
