import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Menu from '../pages/Menu.jsx'
import Contact from '../pages/Contact.jsx'

/**
 * Rutas centrales del sitio.
 * Cualquier vista nueva se agrega aquí y se importa desde /src/pages.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  )
}

export default AppRoutes
