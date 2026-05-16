from rest_framework import serializers
from .models import (
    Categoria, Proveedor, Material, Producto, ComposicionProducto,
    CampanasMarketing, Cupon, Pedido, DetallePedido, EntregasLogistica,
    TransaccionesFinancieras, TransaccionesPuntos
)

class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Categoria
    """
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre', 'descripcion']
        read_only_fields = ['id_categoria']

class ProveedorSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Proveedor
    """
    class Meta:
        model = Proveedor
        fields = ['id_proveedor', 'nombre_empresa', 'contacto', 'telefono', 'activo']
        read_only_fields = ['id_proveedor']

class MaterialSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Material
    """
    proveedor_nombre = serializers.CharField(source='id_proveedor.nombre_empresa', read_only=True)

    class Meta:
        model = Material
        fields = [
            'id_material', 'id_proveedor', 'proveedor_nombre', 'nombre',
            'unidad_medida', 'stock_actual', 'stock_minimo', 'costo_unitario'
        ]
        read_only_fields = ['id_material']

class ProductoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Producto
    """
    categoria_nombre = serializers.CharField(source='id_categoria.nombre', read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id_producto', 'id_categoria', 'categoria_nombre', 'codigo',
            'nombre', 'descripcion', 'precio_venta', 'costo_estimado',
            'imagen_url', 'activo', 'stock'
        ]
        read_only_fields = ['id_producto']

class ComposicionProductoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo ComposicionProducto
    """
    producto_nombre = serializers.CharField(source='id_producto.nombre', read_only=True)
    material_nombre = serializers.CharField(source='id_material.nombre', read_only=True)

    class Meta:
        model = ComposicionProducto
        fields = [
            'id_composicion', 'id_producto', 'producto_nombre',
            'id_material', 'material_nombre', 'cantidad_requerida'
        ]
        read_only_fields = ['id_composicion']

class CampanasMarketingSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo CampanasMarketing
    """
    class Meta:
        model = CampanasMarketing
        fields = [
            'id_campania', 'nombre', 'fecha_inicio', 'fecha_fin',
            'presupuesto', 'descripcion', 'estado'
        ]
        read_only_fields = ['id_campania']

class CuponSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Cupon
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)
    campania_nombre = serializers.CharField(source='id_campania.nombre', read_only=True)

    class Meta:
        model = Cupon
        fields = [
            'id_cupon', 'id_cliente', 'cliente_nombre', 'id_campania',
            'campania_nombre', 'codigo', 'tipo', 'valor', 'puntos_requeridos',
            'estado', 'fecha_creacion', 'fecha_expiracion'
        ]
        read_only_fields = ['id_cupon', 'fecha_creacion']

class DetallePedidoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo DetallePedido
    """
    producto_nombre = serializers.CharField(source='id_producto.nombre', read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = DetallePedido
        fields = [
            'id_detalle', 'id_pedido', 'id_producto', 'producto_nombre',
            'cantidad', 'precio_unitario', 'subtotal'
        ]
        read_only_fields = ['id_detalle']

    def get_subtotal(self, obj):
        return obj.cantidad * obj.precio_unitario

class PedidoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Pedido
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)
    usuario_asignado_nombre = serializers.CharField(source='id_usuario_asignado.nombre', read_only=True)
    cupon_codigo = serializers.CharField(source='id_cupon_aplicado.codigo', read_only=True)
    detalles = DetallePedidoSerializer(source='detallepedido_set', many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = [
            'id_pedido', 'id_cliente', 'cliente_nombre', 'id_usuario_asignado',
            'usuario_asignado_nombre', 'id_cupon_aplicado', 'cupon_codigo',
            'fecha_pedido', 'fecha_entrega', 'hora_entrega', 'direccion_entrega',
            'estado', 'total_original', 'total_final', 'nota_entrega', 'detalles'
        ]
        read_only_fields = ['id_pedido', 'fecha_pedido']

class PedidoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear pedidos con detalles
    """
    detalles = DetallePedidoSerializer(many=True, write_only=True)

    class Meta:
        model = Pedido
        fields = [
            'id_cliente', 'id_usuario_asignado', 'id_cupon_aplicado',
            'fecha_entrega', 'hora_entrega', 'direccion_entrega',
            'nota_entrega', 'detalles'
        ]

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        pedido = Pedido.objects.create(**validated_data)

        # Crear detalles del pedido
        for detalle_data in detalles_data:
            DetallePedido.objects.create(id_pedido=pedido, **detalle_data)

        # Calcular totales
        pedido.calcular_totales()
        return pedido

class EntregasLogisticaSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo EntregasLogistica
    """
    pedido_cliente = serializers.CharField(source='id_pedido.id_cliente.nombre', read_only=True)
    delivery_nombre = serializers.CharField(source='id_delivery.nombre', read_only=True)

    class Meta:
        model = EntregasLogistica
        fields = [
            'id_entrega', 'id_pedido', 'pedido_cliente', 'id_delivery',
            'delivery_nombre', 'estado_entrega', 'fecha_entrega_real', 'foto_evidencia_url'
        ]
        read_only_fields = ['id_entrega']

class TransaccionesFinancierasSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo TransaccionesFinancieras
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)

    class Meta:
        model = TransaccionesFinancieras
        fields = [
            'id_transaccion', 'id_pedido', 'id_cliente', 'cliente_nombre',
            'tipo', 'metodo_pago', 'monto', 'fecha', 'descripcion'
        ]
        read_only_fields = ['id_transaccion', 'fecha']

class TransaccionesPuntosSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo TransaccionesPuntos
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)

    class Meta:
        model = TransaccionesPuntos
        fields = [
            'id_transaccion_puntos', 'id_cliente', 'cliente_nombre', 'id_pedido',
            'tipo', 'cantidad', 'fecha', 'descripcion'
        ]
        read_only_fields = ['id_transaccion_puntos', 'fecha']