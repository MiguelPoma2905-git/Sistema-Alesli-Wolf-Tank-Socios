from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Perfil(models.Model):
    # Tus 3 Verdades Básicas (Roles)
    ROLES = (
        ('CLIENTE', 'Cliente Usuario'),
        ('GESTOR', 'Gestor/a'),
        ('ADMIN', 'Administrador'),
    )
    
    # Puente directo al núcleo de Django
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    rol = models.CharField(max_length=10, choices=ROLES, default='CLIENTE')
    telefono = models.CharField(max_length=20, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - Rol: {self.rol}"

# Automatización (Magia Pura): Cuando se crea un User, se crea su Perfil instantáneamente.
@receiver(post_save, sender=User)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)

@receiver(post_save, sender=User)
def guardar_perfil_usuario(sender, instance, **kwargs):
    instance.perfil.save()