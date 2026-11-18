import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App() {
  return <CartProvider>
    <div className="flex min-h-screen flex-col bg-cream font-body text-espresso antialiased">
      <Header />
      <main className="flex-1"><AppRoutes /></main>
      <Footer />
    </div>
  </CartProvider>
}
