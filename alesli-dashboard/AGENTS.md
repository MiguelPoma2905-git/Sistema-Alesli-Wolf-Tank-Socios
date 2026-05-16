```txt
# AGENTS.md

# ============================================================================
# PROYECTO: FLORERÍA ALESLÍ DASHBOARD
# STACK: React + Vite + TailwindCSS v4
# ============================================================================

OBJETIVO DEL PROYECTO

Este proyecto es un dashboard administrativo moderno para la empresa
"Florería Aleslí".

El sistema está enfocado SOLO en frontend/UI por ahora.

La interfaz debe verse:
- elegante
- moderna
- limpia
- premium
- femenina/profesional
- responsive
- altamente modular

Inspiración visual:
- dashboards SaaS modernos
- Stripe
- Linear
- Notion
- Shopify Admin
- soft pink gradients
- glassmorphism ligero
- tarjetas limpias
- bordes suaves
- tipografía minimalista

NO usar diseños antiguos tipo Bootstrap clásico.

==============================================================================
STACK TECNOLÓGICO
==============================================================================

- React
- Vite
- React Router DOM
- TailwindCSS v4
- Lucide React Icons
- Context API
- clsx

NO usar:
- Bootstrap
- Material UI
- jQuery
- CSS inline innecesario

==============================================================================
IMPORTANTE: TAILWIND V4
==============================================================================

El proyecto usa TailwindCSS v4.

En src/index.css usar:

@import "tailwindcss";

NO usar sintaxis vieja de Tailwind v3:

@tailwind base;
@tailwind components;
@tailwind utilities;

==============================================================================
IMPORTANTE SOBRE @apply
==============================================================================

Tailwind v4 NO permite:

@apply btn;

sobre clases custom.

SOLO usar utilities oficiales dentro de @apply.

Ejemplo correcto:

@apply flex items-center rounded-xl;

Ejemplo incorrecto:

@apply btn;

==============================================================================
ESTRUCTURA DEL PROYECTO
==============================================================================

src/

assets/
Recursos estáticos

components/
Componentes reutilizables

components/layout/
Layout principal
Sidebar
TopNav

components/ui/
Botones
Inputs
Modals
Dropdowns
Toast
Badges

components/charts/
Gráficos y analytics

components/shared/
Componentes compartidos

context/
Context API global

data/
Mock data
Configuraciones
Datos simulados

hooks/
Custom hooks

pages/
Páginas principales del dashboard

routes/
Configuración React Router

utils/
helpers.js
constants.js

==============================================================================
REGLAS DE ARQUITECTURA
==============================================================================

1. COMPONENTES PEQUEÑOS

Evitar componentes gigantes.

Separar:
- cards
- tablas
- filtros
- widgets
- stats
- modals

en componentes reutilizables.

------------------------------------------------------------------------------
2. EVITAR DUPLICACIÓN
------------------------------------------------------------------------------

Si algo se repite:
crear componente reusable.

------------------------------------------------------------------------------
3. USAR CONSTANTES CENTRALIZADAS
------------------------------------------------------------------------------

Usar:

ROUTES.PRODUCTOS

NO:

"/productos"

------------------------------------------------------------------------------
4. EXPORT DEFAULT EN PAGES
------------------------------------------------------------------------------

Ejemplo:

function Dashboard() {
  return <div>Dashboard</div>
}

export default Dashboard

------------------------------------------------------------------------------
5. EVITAR LÓGICA PESADA EN PAGES
------------------------------------------------------------------------------

Las pages deben:
- ensamblar componentes
- manejar layout
- organizar secciones

La lógica compleja va en:
- hooks/
- utils/
- context/

==============================================================================
DISEÑO VISUAL
==============================================================================

PALETA PRINCIPAL

- pink
- soft pink
- purple accents

COLORES SECUNDARIOS

- white
- gray
- muted tones

Evitar:
- colores muy saturados
- negro puro
- interfaces agresivas

==============================================================================
ESTILO VISUAL
==============================================================================

Usar:
- rounded-2xl
- sombras suaves
- spacing amplio
- hover animations
- transiciones suaves
- tarjetas flotantes
- gradientes suaves
- iconografía minimalista

==============================================================================
SIDEBAR
==============================================================================

Sidebar moderno:
- compacto
- elegante
- hover states
- active states
- iconos Lucide
- badges suaves

NO usar:
- bordes pesados
- efectos antiguos
- sombras oscuras

==============================================================================
TOPNAV
==============================================================================

Topbar limpia:
- buscador
- usuario
- notificaciones
- breadcrumbs opcionales
- acciones rápidas

Minimalista.

==============================================================================
DASHBOARD
==============================================================================

Dashboard debe incluir:
- KPI cards
- tablas modernas
- actividad reciente
- estadísticas
- widgets
- analytics
- estados visuales

==============================================================================
RESPONSIVE
==============================================================================

Mobile-first.

Debe verse bien en:
- desktop
- laptop
- tablet
- mobile

Sidebar colapsable en mobile.

==============================================================================
CÓDIGO
==============================================================================

Preferir:
- claridad
- modularidad
- clean code

Evitar:
- código excesivamente complejo
- overengineering
- anidaciones profundas

==============================================================================
ICONOS
==============================================================================

Usar:
- lucide-react

Mantener consistencia visual.

==============================================================================
ANIMACIONES
==============================================================================

Usar:
- transition-all
- duration-200
- hover:-translate-y-px
- fades suaves

Evitar animaciones exageradas.

==============================================================================
OBJETIVO UI/UX
==============================================================================

La interfaz debe sentirse:
- premium
- rápida
- limpia
- moderna
- elegante
- usable
- profesional

No debe parecer:
- template genérico
- bootstrap admin viejo
- dashboard corporativo anticuado

==============================================================================
ESTADO ACTUAL DEL PROYECTO
==============================================================================

Actualmente ya funcionan:
- React
- Vite
- TailwindCSS v4
- React Router
- Sidebar
- Layout
- Context API
- navegación básica

Actualmente se está optimizando:
- UI
- estilos
- modularidad
- pages
- componentes

==============================================================================
IMPORTANTE PARA GENERACIÓN DE COMPONENTES
==============================================================================

Cuando generes componentes:

- usar React functional components
- usar TailwindCSS v4
- usar clases limpias
- mantener diseño consistente
- evitar dependencias innecesarias
- usar spacing consistente
- usar typography moderna

==============================================================================
PREFERENCIAS DE ESTILO DE CÓDIGO
==============================================================================

- imports ordenados
- componentes separados
- evitar archivos gigantes
- nombres claros
- evitar magic numbers
- comentarios solo cuando aporten valor

==============================================================================
OBJETIVO FINAL
==============================================================================

Crear un dashboard administrativo premium,
moderno y escalable para Florería Aleslí,
con calidad visual tipo SaaS profesional.
```
