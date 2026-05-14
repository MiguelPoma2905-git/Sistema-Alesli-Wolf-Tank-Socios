from django.contrib import admin
from .models import Cliente, GastoDiario, Producto, Pedido

admin.site.register(Cliente)
admin.site.register(GastoDiario)
admin.site.register(Producto)
admin.site.register(Pedido)