"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Importar ViewSets
from usuarios.views import (
    UsuarioViewSet, ClienteViewSet, PuntosClienteViewSet,
    InteraccionesCRMViewSet, NotificacionesViewSet
)
from operaciones.views import (
    CategoriaViewSet, ProveedorViewSet, MaterialViewSet, ProductoViewSet,
    ComposicionProductoViewSet, CampanasMarketingViewSet, CuponViewSet,
    PedidoViewSet, DetallePedidoViewSet, EntregasLogisticaViewSet,
    TransaccionesFinancierasViewSet, TransaccionesPuntosViewSet
)

# Crear router
router = DefaultRouter()

# Registrar rutas de usuarios
router.register(r'usuarios', UsuarioViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'puntos-cliente', PuntosClienteViewSet)
router.register(r'interacciones-crm', InteraccionesCRMViewSet)
router.register(r'notificaciones', NotificacionesViewSet)

# Registrar rutas de operaciones
router.register(r'categorias', CategoriaViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'materiales', MaterialViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'composicion-productos', ComposicionProductoViewSet)
router.register(r'campanas-marketing', CampanasMarketingViewSet)
router.register(r'cupones', CuponViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'detalles-pedido', DetallePedidoViewSet)
router.register(r'entregas-logistica', EntregasLogisticaViewSet)
router.register(r'transacciones-financieras', TransaccionesFinancierasViewSet)
router.register(r'transacciones-puntos', TransaccionesPuntosViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # JWT Authentication endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API documentation (opcional)
    path('api-auth/', include('rest_framework.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
