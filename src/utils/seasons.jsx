/**
 * Contenido de la temporada especial de la panadería. El control de
 * SI se muestra o no ya no depende de la fecha: lo decide el switch
 * del panel del Editor (banner_temporada_activo en la tabla
 * `configuraciones` del backend). Ver Home.jsx.
 */
export const SEASONS_DATA = {
  'rosca-de-reyes': {
    id: 'rosca-de-reyes',
    badge: '❄️ Temporada Navideña y Reyes',
    title: 'La tradicional Rosca de Reyes y Panetones',
    description: 'Celebra en familia con nuestra receta artesanal con ate, higo y toque de azahar.',
    ctaLabel: 'Apartar mi Rosca',
    ctaTo: '/menu#navideno',
  },
}

export const ROSCA_DE_REYES = SEASONS_DATA['rosca-de-reyes']