import { Navigate } from 'react-router-dom'
import { isAuthenticated, getStoredUser } from '../services/auth.js'

function ProtectedRoute({ children, allowedRoles }) {
  // 1. Verificar si existe sesión activa
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // 2. Si la ruta especifica roles permitidos, evaluar contra los roles guardados en el usuario
  if (allowedRoles && allowedRoles.length > 0) {
    const user = getStoredUser()
    const userRoles = user?.roles || [] // Arreglo de strings: ['Administrador'], etc.

    // Comprobar si el usuario tiene al menos uno de los roles permitidos
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role))

    if (!hasAccess) {
      if (userRoles.includes('Administrador')) return <Navigate to="/admin" replace />
      if (userRoles.includes('Editor')) return <Navigate to="/editor" replace />
      return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

export default ProtectedRoute