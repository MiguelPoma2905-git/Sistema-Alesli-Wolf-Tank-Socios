from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, F
from django.utils import timezone
from .models import (
    Categoria, Proveedor, Material, Producto, ComposicionProducto,
    CampanasMarketing, Cupon, Pedido, DetallePedido, EntregasLogistica,
    TransaccionesFinancieras, TransaccionesPuntos
)
from .serializers import (
    CategoriaSerializer, ProveedorSerializer, MaterialSerializer,
    ProductoSerializer, ComposicionProductoSerializer, CampanasMarketingSerializer,
    CuponSerializer, PedidoSerializer, PedidoCreateSerializer,
    DetallePedidoSerializer, EntregasLogisticaSerializer,
    TransaccionesFinancierasSerializer, TransaccionesPuntosSerializer
)

class CategoriaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de categorías
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de proveedores
    """
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    permission_classes = [IsAuthenticated]

class MaterialViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de materiales
    """
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def bajo_stock(self, request):
        """
        Obtener materiales con stock bajo
        """
        materiales = Material.objects.filter(stock_actual__lte=F('stock_minimo'))
        serializer = self.get_serializer(materiales, many=True)
        return Response(serializer.data)

class ProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de productos
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail=True, methods=['get'])
    def composicion(self, request, pk=None):
        """
        Obtener composición de materiales de un producto
        """
        producto = self.get_object()
        composicion = ComposicionProducto.objects.filter(id_producto=producto)
        serializer = ComposicionProductoSerializer(composicion, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def activos(self, request):
        """
        Obtener solo productos activos
        """
        productos = Producto.objects.filter(activo=True)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

class ComposicionProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de composición de productos
    """
    queryset = ComposicionProducto.objects.all()
    serializer_class = ComposicionProductoSerializer
    permission_classes = [IsAuthenticated]

class CampanasMarketingViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de campañas de marketing
    """
    queryset = CampanasMarketing.objects.all()
    serializer_class = CampanasMarketingSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def activas(self, request):
        """
        Obtener campañas activas
        """
        hoy = timezone.now().date()
        campanas = CampanasMarketing.objects.filter(
            estado='Activa',
            fecha_inicio__lte=hoy,
            fecha_fin__gte=hoy
        )
        serializer = self.get_serializer(campanas, many=True)
        return Response(serializer.data)

class CuponViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de cupones
    """
    queryset = Cupon.objects.all()
    serializer_class = CuponSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def activos(self, request):
        """
        Obtener cupones activos
        """
        hoy = timezone.now().date()
        cupones = Cupon.objects.filter(
            estado='Activo',
            fecha_expiracion__gte=hoy
        )
        serializer = self.get_serializer(cupones, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def usar(self, request, pk=None):
        """
        Marcar cupón como usado
        """
        cupon = self.get_object()
        if cupon.estado != 'Activo':
            return Response(
                {'error': 'El cupón no está activo'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cupon.estado = 'Usado'
        cupon.save()
        return Response({'status': 'Cupón marcado como usado'})

class PedidoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de pedidos
    """
    queryset = Pedido.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return PedidoCreateSerializer
        return PedidoSerializer

    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        """
        Cambiar estado de un pedido
        """
        pedido = self.get_object()
        nuevo_estado = request.data.get('estado')

        if nuevo_estado not in dict(Pedido.ESTADOS):
            return Response(
                {'error': 'Estado inválido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        pedido.estado = nuevo_estado
        pedido.save()
        return Response({'status': f'Estado cambiado a {nuevo_estado}'})

    @action(detail=False, methods=['get'])
    def por_estado(self, request):
        """
        Obtener pedidos filtrados por estado
        """
        estado = request.query_params.get('estado')
        if estado:
            pedidos = Pedido.objects.filter(estado=estado)
        else:
            pedidos = Pedido.objects.all()

        serializer = self.get_serializer(pedidos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def detalles(self, request, pk=None):
        """
        Obtener detalles de un pedido específico
        """
        pedido = self.get_object()
        detalles = DetallePedido.objects.filter(id_pedido=pedido)
        serializer = DetallePedidoSerializer(detalles, many=True)
        return Response(serializer.data)

class DetallePedidoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de detalles de pedidos
    """
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer
    permission_classes = [IsAuthenticated]

class EntregasLogisticaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de entregas y logística
    """
    queryset = EntregasLogistica.objects.all()
    serializer_class = EntregasLogisticaSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        """
        Cambiar estado de entrega
        """
        entrega = self.get_object()
        nuevo_estado = request.data.get('estado')

        if nuevo_estado not in dict(EntregasLogistica.ESTADOS_ENTREGA):
            return Response(
                {'error': 'Estado inválido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        entrega.estado_entrega = nuevo_estado
        if nuevo_estado == 'Entregado':
            entrega.fecha_entrega_real = timezone.now()
        entrega.save()
        return Response({'status': f'Estado de entrega cambiado a {nuevo_estado}'})

class TransaccionesFinancierasViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de transacciones financieras
    """
    queryset = TransaccionesFinancieras.objects.all()
    serializer_class = TransaccionesFinancierasSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """
        Obtener resumen financiero
        """
        fecha_desde = request.query_params.get('fecha_desde')
        fecha_hasta = request.query_params.get('fecha_hasta')

        queryset = TransaccionesFinancieras.objects.all()

        if fecha_desde:
            queryset = queryset.filter(fecha__date__gte=fecha_desde)
        if fecha_hasta:
            queryset = queryset.filter(fecha__date__lte=fecha_hasta)

        ingresos = queryset.filter(tipo='Ingreso').aggregate(total=Sum('monto'))['total'] or 0
        egresos = queryset.filter(tipo='Egreso').aggregate(total=Sum('monto'))['total'] or 0

        return Response({
            'ingresos_totales': ingresos,
            'egresos_totales': egresos,
            'balance': ingresos - egresos,
            'periodo': {
                'desde': fecha_desde,
                'hasta': fecha_hasta
            }
        })

class TransaccionesPuntosViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestión de transacciones de puntos
    """
    queryset = TransaccionesPuntos.objects.all()
    serializer_class = TransaccionesPuntosSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def por_cliente(self, request):
        """
        Obtener transacciones de puntos por cliente
        """
        cliente_id = request.query_params.get('cliente_id')
        if cliente_id:
            transacciones = TransaccionesPuntos.objects.filter(id_cliente_id=cliente_id)
            serializer = self.get_serializer(transacciones, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'cliente_id es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
