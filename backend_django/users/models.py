from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('client', 'Клиент'),
        ('service_organisation', 'Сервисная организация'),
        ('manager', 'Менеджер'),
    ]

    role = models.CharField('Роль пользователя', max_length=50, choices=ROLE_CHOICES, default='client')

    def __str__(self):
        return '{}'.format(f'{self.username} {self.role}')
