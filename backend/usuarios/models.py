from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    """
    Modelo para usuarios del sistema
    """
    ROLES = [
        ('admin', 'admin'),
        ('encargad@', 'encargad@'),
        ('cliente', 'cliente'),
    ]

    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=50, choices=ROLES)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    activo = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'nombre']

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return f"{self.nombre} ({self.rol})"

    @property
    def id(self):
        return self.id_usuario


class Cliente(models.Model):
    """
    Modelo para clientes del sistema
    """
    TIPOS_CLIENTE = [
        ('Regular', 'Regular'),
        ('Premium', 'Premium'),
        ('VIP', 'VIP'),
    ]

    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    tipo_cliente = models.CharField(max_length=50, choices=TIPOS_CLIENTE, default='Regular')
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'clientes'
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'

    def __str__(self):
        return f"{self.nombre} - {self.tipo_cliente}"


class PuntosCliente(models.Model):
    """
    Modelo para el sistema de puntos de los clientes
    """
    id_puntos = models.AutoField(primary_key=True)
    id_cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE, db_column='id_cliente')
    saldo = models.IntegerField(default=0)
    puntos_totales_ganados = models.IntegerField(default=0)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'puntos_cliente'
        verbose_name = 'Puntos Cliente'
        verbose_name_plural = 'Puntos Clientes'

    def __str__(self):
        return f"Puntos de {self.id_cliente.nombre}: {self.saldo}"


class InteraccionesCRM(models.Model):
    """
    Modelo para interacciones con clientes (CRM)
    """
    CANALES = [
        ('WhatsApp', 'WhatsApp'),
        ('Llamada', 'Llamada'),
        ('Correo', 'Correo'),
        ('Presencial', 'Presencial'),
    ]

    id_interaccion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='id_cliente')
    id_usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_usuario')
    canal = models.CharField(max_length=50, choices=CANALES)
    resumen = models.TextField()
    fecha_contacto = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'interacciones_crm'
        verbose_name = 'Interacción CRM'
        verbose_name_plural = 'Interacciones CRM'

    def __str__(self):
        return f"{self.canal} - {self.id_cliente.nombre}"


class Notificaciones(models.Model):
    """
    Modelo para notificaciones del sistema
    """
    TIPOS = [
        ('Pedido', 'Pedido'),
        ('Promocion', 'Promoción'),
        ('Recordatorio', 'Recordatorio'),
        ('Puntos', 'Puntos'),
    ]

    id_notificacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='id_cliente')
    id_usuario_origen = models.ForeignKey(Usuario, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_usuario_origen')
    titulo = models.CharField(max_length=100)
    mensaje = models.TextField()
    tipo = models.CharField(max_length=50, choices=TIPOS)
    leido = models.BooleanField(default=False)
    fecha_envio = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notificaciones'
        verbose_name = 'Notificación'
        verbose_name_plural = 'Notificaciones'

    def __str__(self):
        return f"{self.tipo}: {self.titulo}"