# AGENTS.md — Alesli Floricultura ERP/CRM

## Stack

| Layer | Tech |
|---|---|
| Backend | Python 3.12, Django 6.0.5, DRF 3.14, SimpleJWT 5.5 |
| Frontend | React 19, Vite 8, Tailwind CSS 4, React Router 7, Framer Motion |
| Database | PostgreSQL (via psycopg[binary] 3.3) |
| Mobile | Not started — `apps/mobile/` is a placeholder |

## Project layout

```
apps/
  api/              — Django project (root: core/)
    core/           — settings.py, urls.py, wsgi.py, asgi.py
    usuarios/       — User, Cliente, PuntosCliente, InteraccionesCRM, Notificaciones
    operaciones/    — Producto, Categoria, Pedido, Proveedor, Material, etc.
    sql/            — Raw SQL setup + repair scripts
    media/          — Uploaded files
    .env            — DB credentials + Django config (gitignored)
    manage.py       — Django CLI entry point
  web/              — Vite + React SPA
    src/
      main.jsx      — App bootstrap (AppProvider → App)
      App.jsx       — Router + all routes
      context/      — AppContext, ToastContext
      pages/        — 12 page components
      components/   — layouts/, shared/, ui/, admin/
      services/     — API layer (axios, auth, productos, pedidos, etc.)
      utils/        — constants.js, helpers.js
  mobile/           — placeholder (.gitkeep only)
docs/               — Documentation
scripts/            — Automation scripts
```

## Development commands

### Backend (from `apps/api/`)
```bash
# Create + activate venv first
python -m venv venv
.\venv\Scripts\activate
# or on Unix: source venv/bin/activate

pip install -r requirements.txt   # install deps
python manage.py runserver        # dev server → http://127.0.0.1:8000
python manage.py makemigrations   # after model changes
python manage.py migrate          # apply migrations
python manage.py createsuperuser  # admin user
python test_db_connection.py      # verify PostgreSQL connection
```

### Frontend (from `apps/web/`)
```bash
npm install        # install deps
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Key architecture facts

- **Headless architecture**: Django REST API serves `http://localhost:8000/api/`, React SPA at `http://localhost:5173`
- **Auth**: JWT via SimpleJWT. Login at `POST /api/auth/token/`, refresh at `POST /api/auth/token/refresh/`. Custom login endpoint at `POST /api/usuarios/login/`
- **Custom user model**: `usuarios.Usuario` extends `AbstractUser`, uses `email` as `USERNAME_FIELD`. Roles: Administrador, Encargado, Delivery
- **CORS**: Backend whitelists `localhost:5173` and `localhost:3000` only
- **Permissions**: Most ViewSets require `IsAuthenticated`. Only `UsuarioViewSet.create` and `UsuarioViewSet.login` allow unauthenticated access
- **API endpoints**: All registered via DRF `DefaultRouter` under `/api/` — see `apps/api/core/urls.py` for all 16 registered routes
- **Tailwind v4**: Uses `@import "tailwindcss"` + `@theme` directives (no `tailwind.config.js`). Custom colors: `--color-primary: #FF4DB8`, etc. Dark mode via `.dark` class variant
- **Poppins font**: Loaded from Google Fonts in `index.html`
- **Database**: `alesli_db` on PostgreSQL. Schema available in `apps/api/sql/setup_database.sql`

## Conventions

- **Frontend API layer**: `apps/web/src/services/api.js` (axios instance), `apps/web/src/services/auth.js` (login/register/profile). Vite proxy at `/api` → `http://127.0.0.1:8000`
- **Session persistence**: JWT stored in `localStorage` (`access_token`, `refresh_token`). `AppContext` restores session on reload via `getProfile()`
- **No linter/formatter/typechecker configured** — no ESLint, Prettier, Ruff, or MyPy config exists (in the web app)
- **No test framework configured** — test files exist as stubs (`tests.py`) with no content. Write tests with Django's `unittest.TestCase` or `pytest` if you add one
- **No CI** — no GitHub Actions workflows
- **Commit style**: Spanish messages (e.g. "Django armado en estos módulos:")
- **Branch**: Main work on `feature/Boris` (per git history)
- **No codegen, migrations, or build artifacts** — migrations are in each app's `migrations/` dir
- **`.env` lives in `apps/api/`** — already in `.gitignore`. At minimum needs `DB_PASSWORD`
- **`node_modules/`** is gitignored

## Gotchas

- Always activate `venv` before Python commands (Python 3.12.10)
- Database must exist (`alesli_db`) and PostgreSQL must be running before `migrate` or `runserver`
- The `.env` file contains a default `SECRET_KEY` from `django-admin startproject` — change before production
- `apps/mobile/` is empty — placeholder for future mobile app
- If migrations get out of sync, the `django_content_type` table may need a `name` column added manually for Django 6.0 post-migration signals
