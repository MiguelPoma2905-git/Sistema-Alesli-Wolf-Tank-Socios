from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import Usuario, Cliente, PuntosCliente, InteraccionesCRM, Notificaciones


@admin.register(Usuario)
class UsuarioAdmin(DjangoUserAdmin):
    # Mostrar columnas útiles en la lista
    list_display = ['id_usuario', 'nombre', 'email', 'rol', 'telefono', 'activo', 'is_staff', 'is_superuser']
    list_filter = ['rol', 'activo', 'is_staff', 'is_superuser']
    search_fields = ['nombre', 'email', 'telefono']

    # Campos que se muestran en la vista de detalles
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('nombre', 'telefono', 'rol')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas', {'fields': ('last_login', 'date_joined')}),
    )

    # Campos para el formulario de creación de usuarios en admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'rol', 'password1', 'password2'),
        }),
    )

    ordering = ('email',)

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id_cliente', 'nombre', 'telefono', 'email', 'tipo_cliente', 'activo']
    list_filter = ['tipo_cliente', 'activo', 'fecha_registro']
    search_fields = ['nombre', 'telefono', 'email']

@admin.register(PuntosCliente)
class PuntosClienteAdmin(admin.ModelAdmin):
    list_display = ['id_puntos', 'id_cliente', 'saldo', 'puntos_totales_ganados', 'fecha_actualizacion']
    list_filter = ['fecha_actualizacion']
    search_fields = ['id_cliente__nombre']

@admin.register(InteraccionesCRM)
class InteraccionesCRMAdmin(admin.ModelAdmin):
    list_display = ['id_interaccion', 'id_cliente', 'id_usuario', 'canal', 'fecha_contacto']
    list_filter = ['canal', 'fecha_contacto']
    search_fields = ['id_cliente__nombre', 'resumen']

@admin.register(Notificaciones)
class NotificacionesAdmin(admin.ModelAdmin):
    list_display = ['id_notificacion', 'id_cliente', 'titulo', 'tipo', 'leido', 'fecha_envio']
    list_filter = ['tipo', 'leido', 'fecha_envio']
    search_fields = ['titulo', 'mensaje']