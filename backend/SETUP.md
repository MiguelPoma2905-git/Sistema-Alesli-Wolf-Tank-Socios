# 🚀 Setup del Backend - Alesli Florería

## ✅ Paso 1: Dependencias Instaladas

Se han instalado todas las dependencias del backend:

```
Django==6.0.5
djangorestframework==3.14.0
djangorestframework-simplejwt==5.5.1
psycopg[binary]==3.3.4
python-dotenv==1.0.1
Pillow==11.0.0
django-cors-headers==4.3.1
```

**Verificar instalación:**
```bash
pip list
```

---

## ✅ Paso 2: Configuración de Entorno (`.env`)

Se creó el archivo `.env` en `backend/.env` con las siguientes variables:

```env
# PostgreSQL
DB_ENGINE=django.db.backends.postgresql
DB_NAME=alesli_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres  # ← CAMBIAR ESTO
DB_HOST=localhost
DB_PORT=5432

# Django
DEBUG=True
SECRET_KEY=django-insecure-#o_bj)y9s7=^elx8d=fisr^y$zc=&l$#h%(ve66ru+3($$o1$o
```

**❗ IMPORTANTE:** Reemplaza `tu_contraseña_postgres` con tu contraseña real.

---

## ✅ Paso 3: Configuración de Django (`settings.py`)

Se actualizó `core/settings.py` para:
- ✅ Cargar variables de entorno (`python-dotenv`)
- ✅ Configurar PostgreSQL dinámicamente
- ✅ Configurar Django REST Framework con JWT
- ✅ Habilitar CORS para el frontend (React en puerto 5173)
- ✅ Permitir peticiones desde `localhost:5173` y `localhost:3000`

---

## 📋 Paso 4: Crear Base de Datos en PostgreSQL

### Opción A: Usando pgAdmin (Interfaz Gráfica)

1. Abre **pgAdmin** en tu navegador (generalmente `http://localhost:5050`)
2. Inicia sesión
3. Clic derecho en "Databases" → "Create" → "Database"
4. Nombre: `alesli_db`
5. Owner: `postgres`
6. Click "Save"

### Opción B: Usando Terminal

```bash
# Conectar a PostgreSQL
psql -U postgres

# En la terminal de PostgreSQL, crear la BD:
CREATE DATABASE alesli_db OWNER postgres;

# Salir
\q
```

---

## 🗂️ Paso 5: Importar Estructura de BD

Una vez creada la base de datos, importa la estructura:

```bash
psql -U postgres -d alesli_db -f backend/setup_database.sql
```

---

## 🔧 Paso 6: Crear Modelos Django

Se deben crear los modelos Django basados en la estructura SQL en:
- `operaciones/models.py` - para tablas operacionales
- `usuarios/models.py` - para usuarios

**Ejemplo para usuarios/models.py:**
```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(models.Model):
    ROLES = [
        ('Administrador', 'Administrador'),
        ('Encargado', 'Encargado'),
        ('Delivery', 'Delivery'),
    ]
    
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    rol = models.CharField(max_length=50, choices=ROLES)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    activo = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'usuarios'
```

---

## 🧪 Paso 7: Verificar Conexión a BD

```bash
cd backend

# Ejecutar migraciones (si existen)
python manage.py migrate

# Crear superusuario (opcional para admin)
python manage.py createsuperuser

# Ejecutar servidor de desarrollo
python manage.py runserver
```

Si ves `Starting development server at http://127.0.0.1:8000/`, la conexión fue exitosa ✅

---

## 📱 Paso 8: Crear Endpoints API

Crear vistas en `operaciones/views.py` y `usuarios/views.py` usando Django REST Framework:

```python
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
```

---

## 🔗 Paso 9: Conectar URLs

En `core/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import UsuarioViewSet
from operaciones.views import ProductoViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

---

## 🎨 Paso 10: Conectar Frontend

En `web-app/front/src/utils/constants.js`:

```javascript
export const API_BASE_URL = 'http://localhost:8000/api';
```

Ejemplo en componente React:
```javascript
const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/productos/`);
    const data = await response.json();
    setProducts(data);
};
```

---

## 🔐 Variables de Entorno

Archivo `.env` debe estar en la carpeta `backend/`:

```
backend/
├── .env  ← Aquí
├── manage.py
├── core/
└── ...
```

**Nunca commitear `.env` a GitHub (ya está en `.gitignore`)**

---

## 📝 Resumen de Archivos Creados

- ✅ `.env` - Variables de entorno
- ✅ `.gitignore` - Archivos a ignorar en Git
- ✅ `requirements.txt` - Dependencias Python
- ✅ `setup_database.sql` - Script SQL para crear tablas
- ✅ `core/settings.py` - Configuración actualizada

---

## 🚨 Próximos Pasos

1. [ ] Cambiar contraseña en `.env`
2. [ ] Crear base de datos `alesli_db` en PostgreSQL
3. [ ] Importar `setup_database.sql`
4. [ ] Crear modelos en `usuarios/models.py` y `operaciones/models.py`
5. [ ] Crear serializers en `usuarios/serializers.py` y `operaciones/serializers.py`
6. [ ] Crear vistas (ViewSets) en `usuarios/views.py` y `operaciones/views.py`
7. [ ] Configurar URLs en `core/urls.py`
8. [ ] Probar endpoints en `http://localhost:8000/api/`
9. [ ] Conectar frontend a backend

---

## 📞 Comandos Útiles

```bash
# Entrar a carpeta backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver

# Hacer migraciones (después de cambiar modelos)
python manage.py makemigrations

# Ver endpoints disponibles
python manage.py showurls  # Requiere django-extensions
```

---

**¡Listo! Continúa con el paso siguiente cuando hayas completado los anteriores.** 🎉
