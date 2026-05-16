from django.db import models
from usuarios.models import Usuario, Cliente

class Categoria(models.Model):
    """
    Modelo para categorías de productos
    """
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'categorias'
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre


class Proveedor(models.Model):
    """
    Modelo para proveedores de materiales
    """
    id_proveedor = models.AutoField(primary_key=True)
    nombre_empresa = models.CharField(max_length=150)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'proveedores'
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'

    def __str__(self):
        return self.nombre_empresa


class Material(models.Model):
    """
    Modelo para materiales utilizados en productos
    """
    id_material = models.AutoField(primary_key=True)
    id_proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_proveedor')
    nombre = models.CharField(max_length=100)
    unidad_medida = models.CharField(max_length=20)
    stock_actual = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=5)
    costo_unitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'materiales'
        verbose_name = 'Material'
        verbose_name_plural = 'Materiales'

    def __str__(self):
        return f"{self.nombre} (Stock: {self.stock_actual})"


class Producto(models.Model):
    """
    Modelo para productos de la florería
    """
    id_producto = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_categoria')
    codigo = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    costo_estimado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    imagen_url = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'productos'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return f"{self.nombre} - Bs. {self.precio_venta}"


class ComposicionProducto(models.Model):
    """
    Modelo para la composición de materiales en productos
    """
    id_composicion = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    id_material = models.ForeignKey(Material, on_delete=models.CASCADE, db_column='id_material')
    cantidad_requerida = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'composicion_producto'
        verbose_name = 'Composición de Producto'
        verbose_name_plural = 'Composiciones de Productos'

    def __str__(self):
        return f"{self.id_producto.nombre} - {self.id_material.nombre}: {self.cantidad_requerida}"


class CampanasMarketing(models.Model):
    """
    Modelo para campañas de marketing
    """
    ESTADOS = [
        ('Activa', 'Activa'),
        ('Finalizada', 'Finalizada'),
        ('Cancelada', 'Cancelada'),
    ]

    id_campania = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    presupuesto = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=50, choices=ESTADOS, default='Activa')

    class Meta:
        db_table = 'campañas_marketing'
        verbose_name = 'Campaña de Marketing'
        verbose_name_plural = 'Campañas de Marketing'

    def __str__(self):
        return f"{self.nombre} ({self.estado})"


class Cupon(models.Model):
    """
    Modelo para cupones de descuento
    """
    TIPOS = [
        ('Porcentaje', 'Porcentaje'),
        ('Monto Fijo', 'Monto Fijo'),
    ]

    ESTADOS = [
        ('Activo', 'Activo'),
        ('Usado', 'Usado'),
        ('Expirado', 'Expirado'),
    ]

    id_cupon = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_cliente')
    id_campania = models.ForeignKey(CampanasMarketing, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_campania')
    codigo = models.CharField(max_length=50, unique=True)
    tipo = models.CharField(max_length=50, choices=TIPOS)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    puntos_requeridos = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=50, choices=ESTADOS, default='Activo')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_expiracion = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'cupones'
        verbose_name = 'Cupón'
        verbose_name_plural = 'Cupones'

    def __str__(self):
        return f"{self.codigo} - {self.tipo}: {self.valor}"


class Pedido(models.Model):
    """
    Modelo para pedidos de clientes
    """
    ESTADOS = [
        ('Pendiente', 'Pendiente'),
        ('En preparación', 'En preparación'),
        ('Listo', 'Listo'),
        ('En camino', 'En camino'),
        ('Entregado', 'Entregado'),
        ('Cancelado', 'Cancelado'),
    ]

    id_pedido = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_cliente')
    id_usuario_asignado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_usuario_asignado')
    id_cupon_aplicado = models.ForeignKey(Cupon, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_cupon_aplicado')
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    fecha_entrega = models.DateField()
    hora_entrega = models.TimeField(blank=True, null=True)
    direccion_entrega = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=50, choices=ESTADOS, default='Pendiente')
    total_original = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_final = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    nota_entrega = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'pedidos'
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return f"Pedido #{self.id_pedido} - {self.id_cliente.nombre}"

    def calcular_totales(self):
        """
        Calcula el total original y final del pedido basado en los detalles
        """
        from django.db.models import Sum

        # Calcular total original
        total_original = self.detallepedido_set.aggregate(
            total=Sum(models.F('cantidad') * models.F('precio_unitario'))
        )['total'] or 0

        self.total_original = total_original

        # Aplicar descuento si hay cupón
        total_final = total_original
        if self.id_cupon_aplicado and self.id_cupon_aplicado.estado == 'Activo':
            cupon = self.id_cupon_aplicado
            if cupon.tipo == 'Porcentaje':
                descuento = total_original * (cupon.valor / 100)
                total_final = total_original - descuento
            elif cupon.tipo == 'Monto Fijo':
                total_final = max(0, total_original - cupon.valor)

            # Marcar cupón como usado
            cupon.estado = 'Usado'
            cupon.save()

        self.total_final = total_final
        self.save()


class DetallePedido(models.Model):
    """
    Modelo para detalles de pedidos (productos en cada pedido)
    """
    id_detalle = models.AutoField(primary_key=True)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='id_pedido')
    id_producto = models.ForeignKey(Producto, on_delete=models.RESTRICT, db_column='id_producto')
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'detalle_pedido'
        verbose_name = 'Detalle de Pedido'
        verbose_name_plural = 'Detalles de Pedidos'

    def __str__(self):
        return f"{self.id_pedido.id_pedido} - {self.id_producto.nombre} x{self.cantidad}"


class EntregasLogistica(models.Model):
    """
    Modelo para entregas y logística
    """
    ESTADOS_ENTREGA = [
        ('Asignado', 'Asignado'),
        ('En Ruta', 'En Ruta'),
        ('Entregado', 'Entregado'),
        ('Fallido', 'Fallido'),
    ]

    id_entrega = models.AutoField(primary_key=True)
    id_pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, db_column='id_pedido')
    id_delivery = models.ForeignKey(Usuario, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_delivery')
    estado_entrega = models.CharField(max_length=50, choices=ESTADOS_ENTREGA, default='Asignado')
    fecha_entrega_real = models.DateTimeField(blank=True, null=True)
    foto_evidencia_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'entregas_logistica'
        verbose_name = 'Entrega Logística'
        verbose_name_plural = 'Entregas Logísticas'

    def __str__(self):
        return f"Entrega #{self.id_entrega} - {self.estado_entrega}"


class TransaccionesFinancieras(models.Model):
    """
    Modelo para transacciones financieras
    """
    TIPOS = [
        ('Ingreso', 'Ingreso'),
        ('Egreso', 'Egreso'),
    ]

    METODOS_PAGO = [
        ('Efectivo', 'Efectivo'),
        ('QR', 'QR'),
        ('Transferencia', 'Transferencia'),
        ('Tarjeta', 'Tarjeta'),
        ('Billetera Móvil', 'Billetera Móvil'),
    ]

    id_transaccion = models.AutoField(primary_key=True)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_pedido')
    id_cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_cliente')
    tipo = models.CharField(max_length=50, choices=TIPOS)
    metodo_pago = models.CharField(max_length=50, choices=METODOS_PAGO)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'transacciones_financieras'
        verbose_name = 'Transacción Financiera'
        verbose_name_plural = 'Transacciones Financieras'

    def __str__(self):
        return f"{self.tipo} - Bs. {self.monto}"


class TransaccionesPuntos(models.Model):
    """
    Modelo para transacciones de puntos
    """
    TIPOS = [
        ('Ganancia', 'Ganancia'),
        ('Canje', 'Canje'),
    ]

    id_transaccion_puntos = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='id_cliente')
    id_pedido = models.ForeignKey(Pedido, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_pedido')
    tipo = models.CharField(max_length=50, choices=TIPOS)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'transacciones_puntos'
        verbose_name = 'Transacción de Puntos'
        verbose_name_plural = 'Transacciones de Puntos'

    def __str__(self):
        return f"{self.tipo} - {self.cantidad} puntos"
        if self.estado == 'ENTREGADO' and not self.foto_comprobante_entrega:
            raise ValidationError('No se puede marcar como ENTREGADO sin la foto del arreglo de prueba de calidad.')

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente.nombre} - {self.estado}"