import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Menu from '../pages/Menu.jsx'
import Contact from '../pages/Contact.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'

// Páginas Extras (Footer)
import Cafeteria from '../pages/extras/Cafeteria.jsx'
import EscuelaPanaderia from '../pages/extras/EscuelaPanaderia.jsx'
import Mayoreo from '../pages/extras/Mayoreo.jsx'
import Catering from '../pages/extras/Catering.jsx'
import Faq from '../pages/extras/Faq.jsx'
import AvisoPrivacidad from '../pages/extras/AvisoPrivacidad.jsx'

// Vistas Privadas
import Dashboard from '../pages/user/Dashboard.jsx'
import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import EditorDashboard from '../pages/editor/EditorDashboard.jsx'

import ProtectedRoute from '../components/ProtectedRoute.jsx'

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas Principales */}
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contacto" element={<Contact />} />

      {/* Rutas Públicas Extras (Footer) */}
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="/escuela" element={<EscuelaPanaderia />} />
      <Route path="/mayoreo" element={<Mayoreo />} />
      <Route path="/catering" element={<Catering />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />

      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Ruta Usuario Cliente */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Usuario']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta Editor */}
      <Route
        path="/editor"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Editor']}>
            <EditorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta Administrador */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes