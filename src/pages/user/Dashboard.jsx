import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredUser, logoutUser } from '../../services/auth.js'

// Datos mock estáticos de los panes para presentación visual
const BAKERY_ITEMS = [
    {
        id: 1,
        name: 'Concha de Vainilla Tradicional',
        category: 'Pan Dulce',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
        description: 'Receta artesanal con costra crujiente de azúcar y mantequilla purísima.'
    },
    {
        id: 2,
        name: 'Croissant de Mantequilla',
        category: 'Repostería',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
        description: 'Hojaldre elaborado con 24 capas doradas, suave por dentro.'
    },
    {
        id: 3,
        name: 'Pan de Muerto Tradicional',
        category: 'Temporada',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600&auto=format&fit=crop',
        description: 'Aromatizado con flor de azahar, naranja natural y un toque de canela.'
    },
    {
        id: 4,
        name: 'Baguette Rústica de Masa Madre',
        category: 'Pan Salado',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=600&auto=format&fit=crop',
        description: 'Corteza crujiente y miga alvéolada con 18 hrs de fermentación.'
    },
    {
        id: 5,
        name: 'Dona Glaseada de Miel',
        category: 'Pan Dulce',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop',
        description: 'Esponjosa masa frita recubierta con glaseado artesanal de miel pura.'
    },
    {
        id: 6,
        name: 'Chocolatín Hojaldrado',
        category: 'Repostería',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop',
        description: 'Relleno de dos barras de chocolate amargo 70% cacao.'
    }
]

function Dashboard() {
    const navigate = useNavigate()

    // Leemos los datos reales guardados en localStorage tras el login
    const storedUser = getStoredUser()

    // Datos del usuario con valores por defecto por si falta algún campo
    const user = {
        name: storedUser ? `${storedUser.nombre || storedUser.name || 'Usuario'} ${storedUser.apellido_paterno || ''}`.trim() : 'Cliente',
        email: storedUser?.email || storedUser?.correo || 'correo@ejemplo.com',
        role: storedUser?.rol || storedUser?.role || 'Cliente'
    }

    // Estado para contador en el carrito (visual)
    const [cartCount, setCartCount] = useState(0)

    // Usamos tu función asíncrona de logoutUser()
    const handleLogout = async () => {
        await logoutUser()
        navigate('/login')
    }

    const handleAddToCart = (item) => {
        setCartCount(prev => prev + 1)
    }

    return (
        <div className="min-h-screen bg-cream px-4 py-8 md:px-12">

            {/* HEADER / PERFIL DEL USUARIO CON ACCIONES */}
            <header className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-wheat/40 bg-wheat/10 p-6 shadow-sm md:flex-row md:items-center">

                {/* Info del usuario */}
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso font-display text-xl font-bold text-wheat shadow">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-display text-xl font-bold text-espresso md:text-2xl">
                                ¡Hola, {user.name}!
                            </h1>
                            <span className="rounded-full bg-wheat/30 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-roast uppercase">
                                {user.role}
                            </span>
                        </div>
                        <p className="text-xs text-roast/80">{user.email}</p>
                    </div>
                </div>

                {/* Botones de Acción Rápidos en la Esquina */}
                <div className="flex w-full items-center justify-end gap-3 md:w-auto">

                    {/* Botón 1: Favoritos / Notificaciones (Demostrativo) */}
                    <button
                        type="button"
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-wheat/50 bg-cream text-espresso transition-all hover:bg-wheat/20"
                        title="Lista de Deseos"
                    >
                        <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    {/* Botón 2: Carrito de Compras (Demostrativo) */}
                    <button
                        type="button"
                        className="relative flex h-11 items-center gap-2.5 rounded-xl border border-wheat/50 bg-cream px-4 text-xs font-semibold uppercase tracking-wider text-espresso transition-all hover:bg-wheat/20"
                    >
                        <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="hidden sm:inline">Carrito</span>
                        {cartCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-caramel text-[11px] font-bold text-cream">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Botón 3: Cerrar Sesión */}
                    <button
                        onClick={handleLogout}
                        className="flex h-11 items-center gap-2 rounded-xl bg-espresso px-4 text-xs font-semibold tracking-wider text-wheat transition-all hover:bg-roast shadow-sm"
                    >
                        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="hidden sm:inline">Cerrar Sesión</span>
                    </button>

                </div>
            </header>

            {/* SECCIÓN PRINCIPAL: CATÁLOGO DE PANES */}
            <section>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-espresso">
                            Panes y Repostería Disponible
                        </h2>
                        <p className="text-sm text-roast/80">
                            Selecciona tus productos favoritos recién horneados hoy.
                        </p>
                    </div>
                </div>

                {/* GRID DE CARDS */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {BAKERY_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-wheat/30 bg-cream shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-espresso/10"
                        >
                            {/* Imagen del Pan */}
                            <div className="relative h-48 w-full overflow-hidden bg-wheat/20">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold text-espresso backdrop-blur-sm">
                                    {item.category}
                                </span>
                            </div>

                            {/* Contenido de la Card */}
                            <div className="flex flex-1 flex-col justify-between p-5">
                                <div>
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-display text-lg font-bold text-espresso">
                                            {item.name}
                                        </h3>
                                        <span className="font-display text-lg font-bold text-caramel">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-xs text-roast/80 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Botón Agregar a la lista */}
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(item)}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-espresso bg-espresso py-2.5 text-xs font-semibold tracking-wider text-wheat transition-all hover:bg-roast active:scale-[0.98]"
                                >
                                    <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                        <path d="M12 4v16m8-8H4" />
                                    </svg>
                                    Agregar a mi pedido
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Dashboard