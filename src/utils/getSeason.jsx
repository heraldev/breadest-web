/**
 * Evento basado en periodo (calendario): detecta si la fecha actual cae
 * dentro de una temporada especial de la panadería y devuelve el contenido
 * que debe reemplazar al hero/banner por defecto.
 *
 * Regla activa: Pan de Muerto, del 20 de octubre al 2 de noviembre.
 *
 * Modo de prueba para documentación/evidencia: como la fecha real puede no
 * caer en esas fechas cuando tomes tus capturas, puedes forzar la temporada
 * agregando "?temporada=dia-de-muertos" a la URL, ej:
 *   http://localhost:5173/?temporada=dia-de-muertos
 * Esto NO afecta el comportamiento automático real, solo permite
 * previsualizarlo para la evidencia.
 */
export function getActiveSeason() {
  const params = new URLSearchParams(window.location.search)
  const forced = params.get('temporada')

  const now = new Date()
  const month = now.getMonth() + 1 // getMonth() es 0-indexado
  const day = now.getDate()

  //funcion para determinar si es temporada de pan de muerto calendarizacion
  const isDiaDeMuertos =
    forced === 'dia-de-muertos' || (month === 10 && day >= 20) || (month === 11 && day <= 2)

  if (isDiaDeMuertos) {
    return {
      id: 'dia-de-muertos',
      badge: 'Temporada de Pan de Muerto',
      title: (
        <>
          Pan de muerto,
          <br />
          recién horneado
        </>
      ),
      description:
        'Naranja, azahar y un toque de canela: nuestra receta de temporada, disponible del 20 de octubre al 2 de noviembre.',
      ctaLabel: 'Pedir pan de muerto',
      ctaTo: '/menu#reposteria',
    }
  }

  return null
}
