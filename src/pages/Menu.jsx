import SectionHeading from '../components/SectionHeading.jsx'
import ProductCard from '../components/ProductCard.jsx'

const CATEGORIES = [
  {
    id: 'panes',
    eyebrow: 'Panes de masa madre',
    title: 'Pan del día',
    description: 'Horneados cada mañana en horno de piedra, con fermentación de 18 a 24 horas.',
    items: [
      {
        name: 'Hogaza de masa madre',
        description: 'Corteza crujiente, miga alveolada.',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Baguette de campo',
        description: 'Harina integral molida en piedra.',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Pan de centeno',
        description: 'Denso y ligeramente ácido.',
        price: '$70',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chapata de aceitunas',
        description: 'Con aceitunas negras y romero.',
        price: '$65',
        image: 'https://images.unsplash.com/photo-1667386773920-c73f3b02a3d6?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'reposteria',
    eyebrow: 'Repostería dulce',
    title: 'Piezas dulces',
    description: 'La vitrina de siempre: conchas, cuernitos y pan dulce tradicional.',
    items: [
      {
        name: 'Concha clásica',
        description: 'Vainilla o chocolate.',
        price: '$28',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Concha%20(pan%20dulce%20mexicano)%2002.JPG',
      },
      {
        name: 'Croissant de mantequilla',
        description: 'Hojaldrado a mano, 36 capas.',
        price: '$38',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Cuernito relleno',
        description: 'Relleno de cajeta o nutella.',
        price: '$35',
        image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Orejas de hojaldre',
        description: 'Caramelizadas al horno.',
        price: '$25',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'postres',
    eyebrow: 'Postres y tartas',
    title: 'Para compartir',
    description: 'Tartas y pasteles horneados por pedido, ideales para celebrar.',
    items: [
      {
        name: 'Tarta de limón',
        description: 'Merengue tostado a soplete.',
        price: '$55',
        image: 'https://images.unsplash.com/photo-1670819916757-e8d5935a6c65?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Pastel de zanahoria',
        description: 'Con betún de queso crema.',
        price: '$60',
        image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Brownie de chocolate',
        description: 'Con nuez de la región.',
        price: '$32',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Cheesecake horneado',
        description: 'Base de galleta artesanal.',
        price: '$58',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'bebidas',
    eyebrow: 'Bebidas artesanales',
    title: 'Para acompañar',
    description: 'Café de grano local, tostado en pequeños lotes, y bebidas de temporada.',
    items: [
      {
        name: 'Café de olla',
        description: 'Con piloncillo y canela.',
        price: '$32',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Capuchino',
        description: 'Grano 100% arábica local.',
        price: '$38',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chocolate de metate',
        description: 'Batido a mano, receta tradicional.',
        price: '$40',
        image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Limonada de romero',
        description: 'Refrescante, hecha al momento.',
        price: '$30',
        image: 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
]

function Menu() {
  return (
    <>
      <section className="border-b border-espresso/10 bg-wheat/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Nuestro menú"
            title="Todo lo que sale de nuestro horno"
            description="Elaboramos todo en el obrador de Querétaro. Las cantidades son limitadas: cuando se acaba el pan del día, se acabó."
          />
        </div>
      </section>

      {CATEGORIES.map((cat, index) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`scroll-mt-24 border-b border-espresso/10 ${index % 2 === 0 ? 'bg-cream' : 'bg-cream/60'}`}
        >
          <div className="mx-auto max-w-6xl px-6 py-16">
            <SectionHeading eyebrow={cat.eyebrow} title={cat.title} description={cat.description} />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cat.items.map((item) => (
                <ProductCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default Menu