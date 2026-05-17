from rest_framework import serializers
from .models import Usuario, Cliente, PuntosCliente, InteraccionesCRM, Notificaciones

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Usuario
    """
    class Meta:
        model = Usuario
        fields = [
            'id_usuario', 'nombre', 'email', 'rol', 'telefono', 'activo',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id_usuario', 'date_joined', 'last_login']
        extra_kwargs = {
            'password_hash': {'write_only': True}
        }

class UsuarioCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear usuarios con validación de contraseña
    """
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = [
            'nombre', 'email', 'password', 'password_confirm', 'rol', 'telefono'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.username = validated_data.get('email') or validated_data.get('nombre')
        user.set_password(password)
        user.save()
        return user

class ClienteSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Cliente
    """
    class Meta:
        model = Cliente
        fields = [
            'id_cliente', 'nombre', 'telefono', 'email', 'direccion',
            'fecha_nacimiento', 'tipo_cliente', 'fecha_registro', 'activo'
        ]
        read_only_fields = ['id_cliente', 'fecha_registro']

class PuntosClienteSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo PuntosCliente
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)

    class Meta:
        model = PuntosCliente
        fields = [
            'id_puntos', 'id_cliente', 'cliente_nombre', 'saldo',
            'puntos_totales_ganados', 'fecha_actualizacion'
        ]
        read_only_fields = ['id_puntos', 'fecha_actualizacion']

class InteraccionesCRMSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo InteraccionesCRM
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)
    usuario_nombre = serializers.CharField(source='id_usuario.nombre', read_only=True)

    class Meta:
        model = InteraccionesCRM
        fields = [
            'id_interaccion', 'id_cliente', 'cliente_nombre', 'id_usuario',
            'usuario_nombre', 'canal', 'resumen', 'fecha_contacto'
        ]
        read_only_fields = ['id_interaccion', 'fecha_contacto']

class NotificacionesSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Notificaciones
    """
    cliente_nombre = serializers.CharField(source='id_cliente.nombre', read_only=True)
    usuario_origen_nombre = serializers.CharField(source='id_usuario_origen.nombre', read_only=True)

    class Meta:
        model = Notificaciones
        fields = [
            'id_notificacion', 'id_cliente', 'cliente_nombre', 'id_usuario_origen',
            'usuario_origen_nombre', 'titulo', 'mensaje', 'tipo', 'leido', 'fecha_envio'
        ]
        read_only_fields = ['id_notificacion', 'fecha_envio']