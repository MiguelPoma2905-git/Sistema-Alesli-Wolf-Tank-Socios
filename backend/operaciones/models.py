from django.db import models
from django.core.exceptions import ValidationError

# 1. El Cliente (Puntos y Preferencias)
class Cliente(models.Model):
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20, unique=True)
    preferencias = models.TextField(blank=True, null=True, help_text="Ej: Prefiere rosas rojas, alergias, etc.")
    puntos_acumulados = models.IntegerField(default=0)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - Puntos: {self.puntos_acumulados}"

# 2. El Cuaderno de Gastos Digital (Sustituye el manual)
class GastoDiario(models.Model):
    descripcion = models.CharField(max_length=255, help_text="Ej: Compra de cintas, bases sin proveedor fijo")
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    foto_recibo = models.ImageField(upload_to='recibos/', blank=True, null=True)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.descripcion} - Bs. {self.monto}"

# 3. El Catálogo Fijo
class Producto(models.Model):
    nombre = models.CharField(max_length=200, help_text="Ej: Arreglo de peluche con chocolates")
    precio_fijo = models.DecimalField(max_digits=10, decimal_places=2)
    costo_materiales_estimado = models.DecimalField(max_digits=10, decimal_places=2, help_text="Para calcular la ganancia real")
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

# 4. El Pedido (El núcleo del negocio)
class Pedido(models.Model):
    ESTADOS = (
        ('PENDIENTE', 'Pendiente'),
        ('PREPARACION', 'En Preparación'),
        ('ENTREGADO', 'Entregado'),
        ('CANCELADO', 'Cancelado'),
    )
    
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, related_name='pedidos')
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    
    # Finanzas del Pedido (Adelantos y Saldos)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    adelanto_pagado = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE')
    fecha_ingreso = models.DateField(auto_now_add=True)
    fecha_entrega = models.DateTimeField()
    
    # Control de Calidad (Regla del dueño)
    foto_comprobante_entrega = models.ImageField(upload_to='entregas/', blank=True, null=True, help_text="Obligatorio para marcar como entregado")
    
    @property
    def saldo_pendiente(self):
        return self.precio_venta - self.adelanto_pagado
        
    @property
    def ganancia_real_estimada(self):
        return self.precio_venta - self.producto.costo_materiales_estimado

    def clean(self):
        if self.estado == 'ENTREGADO' and not self.foto_comprobante_entrega:
            raise ValidationError('No se puede marcar como ENTREGADO sin la foto del arreglo de prueba de calidad.')

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente.nombre} - {self.estado}"