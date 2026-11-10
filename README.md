# Trigo & Miel · Breadest

Sitio web de una panadería artesanal con backend propio de autenticación y control de acceso por roles y permisos (RBAC).

## Tecnologías
- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router, Axios
- **Backend:** Node.js, Express, MySQL (`mysql2`), JWT, `bcryptjs`, `helmet`, `express-rate-limit`

## Funciones
- Landing pública: Inicio, Nosotros, Menú, Contacto (con mapa de Google)
- Registro, inicio y cierre de sesión (JWT con lista negra de tokens)
- **Administrador:** activa o desactiva cuentas de Editor
- **Editor:** activa o desactiva el banner de temporada del Home
- Rutas protegidas por rol y permiso, validadas en el backend

## Estructura
```
breadest/
├── breadest-f/          # Frontend (components, pages, routes, services, utils)
└── breadest-backend/    # Backend (config, controllers, middlewares, models, routes, services, sql)
```


## Roles
| Rol | Alcance |
|---|---|
| Administrador | Todos los permisos |
| Editor | Productos, pedidos y configuración del sitio |
| Usuario | Consulta de productos y sus pedidos |

> Todo registro público entra como *Usuario*. El primer Administrador se asigna manualmente en `usuario_rol`.
