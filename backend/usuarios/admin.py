from django.contrib import admin
from .models import Usuario, Cliente, PuntosCliente, InteraccionesCRM, Notificaciones

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['id_usuario', 'nombre', 'email', 'rol', 'telefono', 'activo']
    list_filter = ['rol', 'activo']
    search_fields = ['nombre', 'email', 'telefono']

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