from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Usuario, Cliente, PuntosCliente, InteraccionesCRM, Notificaciones
from .serializers import (
    UsuarioSerializer, UsuarioCreateSerializer, ClienteSerializer,
    PuntosClienteSerializer, InteraccionesCRMSerializer, NotificacionesSerializer
)

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de usuarios
    """
    queryset = Usuario.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer

    def get_permissions(self):
        if self.action in ['create', 'login']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Endpoint para login de usuarios
        """
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email y contraseña son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UsuarioSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        else:
            return Response(
                {'error': 'Credenciales inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )

    @action(detail=False, methods=['get'])
    def profile(self, request):
        """
        Obtener perfil del usuario autenticado
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de clientes
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def puntos(self, request, pk=None):
        """
        Obtener puntos de un cliente específico
        """
        cliente = self.get_object()
        try:
            puntos = PuntosCliente.objects.get(id_cliente=cliente)
            serializer = PuntosClienteSerializer(puntos)
            return Response(serializer.data)
        except PuntosCliente.DoesNotExist:
            return Response(
                {'error': 'Cliente no tiene registro de puntos'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['get'])
    def interacciones(self, request, pk=None):
        """
        Obtener interacciones CRM de un cliente
        """
        cliente = self.get_object()
        interacciones = InteraccionesCRM.objects.filter(id_cliente=cliente)
        serializer = InteraccionesCRMSerializer(interacciones, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def notificaciones(self, request, pk=None):
        """
        Obtener notificaciones de un cliente
        """
        cliente = self.get_object()
        notificaciones = Notificaciones.objects.filter(id_cliente=cliente)
        serializer = NotificacionesSerializer(notificaciones, many=True)
        return Response(serializer.data)

class PuntosClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de puntos de clientes
    """
    queryset = PuntosCliente.objects.all()
    serializer_class = PuntosClienteSerializer
    permission_classes = [IsAuthenticated]

class InteraccionesCRMViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de interacciones CRM
    """
    queryset = InteraccionesCRM.objects.all()
    serializer_class = InteraccionesCRMSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)

class NotificacionesViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de notificaciones
    """
    queryset = Notificaciones.objects.all()
    serializer_class = NotificacionesSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def no_leidas(self, request):
        """
        Obtener notificaciones no leídas del usuario autenticado
        """
        if hasattr(request.user, 'cliente'):
            notificaciones = Notificaciones.objects.filter(
                id_cliente=request.user.cliente,
                leido=False
            )
        else:
            notificaciones = Notificaciones.objects.none()

        serializer = self.get_serializer(notificaciones, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def marcar_leida(self, request, pk=None):
        """
        Marcar una notificación como leída
        """
        notificacion = self.get_object()
        notificacion.leido = True
        notificacion.save()
        return Response({'status': 'Notificación marcada como leída'})
