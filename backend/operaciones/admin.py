from django.contrib import admin
from .models import (
    Categoria, Proveedor, Material, Producto, ComposicionProducto,
    CampanasMarketing, Cupon, Pedido, DetallePedido, EntregasLogistica,
    TransaccionesFinancieras, TransaccionesPuntos
)

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['id_categoria', 'nombre', 'descripcion']
    search_fields = ['nombre']

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ['id_proveedor', 'nombre_empresa', 'contacto', 'telefono', 'activo']
    list_filter = ['activo']
    search_fields = ['nombre_empresa', 'contacto']

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['id_material', 'nombre', 'unidad_medida', 'stock_actual', 'stock_minimo', 'costo_unitario']
    list_filter = ['id_proveedor']
    search_fields = ['nombre']

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['id_producto', 'codigo', 'nombre', 'precio_venta', 'activo']
    list_filter = ['activo', 'id_categoria']
    search_fields = ['codigo', 'nombre']

@admin.register(ComposicionProducto)
class ComposicionProductoAdmin(admin.ModelAdmin):
    list_display = ['id_composicion', 'id_producto', 'id_material', 'cantidad_requerida']
    list_filter = ['id_producto']
    search_fields = ['id_producto__nombre', 'id_material__nombre']

@admin.register(CampanasMarketing)
class CampanasMarketingAdmin(admin.ModelAdmin):
    list_display = ['id_campania', 'nombre', 'estado', 'fecha_inicio', 'fecha_fin', 'presupuesto']
    list_filter = ['estado']
    search_fields = ['nombre']

@admin.register(Cupon)
class CuponAdmin(admin.ModelAdmin):
    list_display = ['id_cupon', 'codigo', 'tipo', 'valor', 'estado', 'fecha_expiracion']
    list_filter = ['tipo', 'estado']
    search_fields = ['codigo']

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id_pedido', 'id_cliente', 'estado', 'fecha_pedido', 'total_final']
    list_filter = ['estado', 'fecha_pedido']
    search_fields = ['id_cliente__nombre']

@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ['id_detalle', 'id_pedido', 'id_producto', 'cantidad', 'precio_unitario']
    list_filter = ['id_pedido']
    search_fields = ['id_producto__nombre']

@admin.register(EntregasLogistica)
class EntregasLogisticaAdmin(admin.ModelAdmin):
    list_display = ['id_entrega', 'id_pedido', 'estado_entrega', 'fecha_entrega_real']
    list_filter = ['estado_entrega']
    search_fields = ['id_pedido__id_cliente__nombre']

@admin.register(TransaccionesFinancieras)
class TransaccionesFinancierasAdmin(admin.ModelAdmin):
    list_display = ['id_transaccion', 'tipo', 'metodo_pago', 'monto', 'fecha']
    list_filter = ['tipo', 'metodo_pago', 'fecha']
    search_fields = ['id_cliente__nombre']

@admin.register(TransaccionesPuntos)
class TransaccionesPuntosAdmin(admin.ModelAdmin):
    list_display = ['id_transaccion_puntos', 'id_cliente', 'tipo', 'cantidad', 'fecha']
    list_filter = ['tipo', 'fecha']
    search_fields = ['id_cliente__nombre']