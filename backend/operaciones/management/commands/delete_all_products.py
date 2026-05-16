from django.core.management.base import BaseCommand
from operaciones.models import Producto, ComposicionProducto, DetallePedido

class Command(BaseCommand):
    help = 'Elimina todos los productos del sistema'

    def handle(self, *args, **options):
        count = Producto.objects.count()
        if count == 0:
            self.stdout.write(self.style.WARNING('No hay productos para eliminar.'))
            return

        self.stdout.write(f'Se eliminarán {count} productos...')

        ComposicionProducto.objects.all().delete()
        DetallePedido.objects.all().delete()
        Producto.objects.all().delete()

        self.stdout.write(self.style.SUCCESS(f'✅ {count} productos eliminados correctamente.'))