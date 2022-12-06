from django.db import models
from users.models import CustomUser


class Machine(models.Model):
    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

    factory_number = models.CharField('Зав. № машины', max_length=75, unique=True)
    machine_model = models.ForeignKey(
        'MachineModelReference',
        verbose_name='Модель машины',
        on_delete=models.CASCADE,
        related_name='machine_model'
    )

    engine_model = models.ForeignKey(
        'EngineModelReference',
        verbose_name='Модель двигателя',
        on_delete=models.CASCADE,
        related_name='engine_model'
    )
    engine_number = models.CharField('Зав. № двигателя', max_length=100, blank=True, null=True)

    transmission_model = models.ForeignKey(
        'TransmissionModelReference',
        verbose_name='Модель трансмиссии',
        on_delete=models.CASCADE,
        related_name='transmission_model',
        blank=True,
        null=True
    )
    transmission_number = models.CharField('Зав. № трансмиссии', max_length=100, unique=True, blank=True, null=True)

    driving_bridge_model = models.ForeignKey(
        'DrivingBridgeModelReference',
        verbose_name='Модель ведущего моста',
        on_delete=models.CASCADE,
        related_name='driving_bridge_model',
        blank=True,
        null=True
    )
    driving_bridge_number = models.CharField('Зав. № ведущего моста', max_length=100, blank=True, null=True)

    controlled_bridge_model = models.ForeignKey(
        'ControlledBridgeModelReference',
        verbose_name='Модель управляемого моста',
        on_delete=models.CASCADE,
        related_name='controlled_bridge_model',
        blank=True,
        null=True
    )
    controlled_bridge_number = models.CharField('Зав. № управляемого моста', max_length=100, blank=True, null=True)

    delivery_contract = models.CharField('Договор поставки №, дата', max_length=250, blank=True, null=True)
    date_of_shipment = models.DateTimeField('Дата отгрузки с завода', blank=True, null=True)
    consignee = models.CharField('Грузополучатель (конечный потребитель)', max_length=250, blank=True, null=True)
    delivery_address = models.CharField('Адрес поставки (эксплуатации)', max_length=250, blank=True, null=True)
    complete_set = models.CharField('Комплектация (доп. опции)', max_length=250, blank=True, null=True)

    client = models.ForeignKey(
        CustomUser,
        verbose_name='Клиент',
        on_delete=models.CASCADE,
        related_name='client_machine',
        blank=True,
        null=True
    )
    service_company = models.ForeignKey(
        CustomUser,
        verbose_name='Cервисная компания',
        on_delete=models.CASCADE,
        related_name='service_company',
        blank=True,
        null=True
    )

    def __str__(self):
        return '{}'.format(f'{self.machine_model} {self.factory_number}')


class MachineModelReference(models.Model):
    class Meta:
        verbose_name = 'Модель машины'
        verbose_name_plural = 'Справочник моделей машин'

    name = models.CharField('Модель', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class EngineModelReference(models.Model):
    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Справочник моделей двигателей'

    name = models.CharField('Модель', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class TransmissionModelReference(models.Model):
    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Справочник моделей трансмиссий'

    name = models.CharField('Модель', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class DrivingBridgeModelReference(models.Model):
    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Справочник моделей ведущего моста'

    name = models.CharField('Модель', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class ControlledBridgeModelReference(models.Model):
    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Справочник моделей управляемого моста'

    name = models.CharField('Модель', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class Maintenance(models.Model):
    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Технические обслуживания'

    type_of_maintenance = models.ForeignKey(
        'TypeOfMaintenanceReference',
        verbose_name='Вид технического обслуживания',
        on_delete=models.CASCADE,
        related_name='type_of_maintenance'
    )

    date_of_maintenance = models.DateTimeField('Дата проведения ТО', auto_created=True)
    operating_time = models.DecimalField('Наработка, м/час', max_digits=11, decimal_places=2)

    order_number = models.CharField('№ заказ-наряда', max_length=100, unique=True)
    order_date = models.DateTimeField('Дата заказ-наряда')

    machine = models.ForeignKey(
        'Machine',
        verbose_name='Машина',
        related_name='maintenance_machine',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return '{}'.format(f'{self.order_number} {self.type_of_maintenance}')


class TypeOfMaintenanceReference(models.Model):
    class Meta:
        verbose_name = 'Вид технического обслуживания'
        verbose_name_plural = 'Справочник видов ТО'

    name = models.CharField('Вид ТО', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class MaintenanceOrganisationReference(models.Model):
    class Meta:
        verbose_name = 'Уполномоченная в ТО организация'
        verbose_name_plural = 'Справочник уполномоченных в ТО организаций'

    name = models.CharField('Наименование', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class Complaint(models.Model):
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'

    date_of_refusal = models.DateTimeField('Дата отказа', null=True, blank=True)
    operating_time = models.DecimalField('Наработка, м/час', max_digits=11, decimal_places=2)

    failure_node = models.ForeignKey(
        'FailureNodeReference',
        verbose_name='Узел отказа',
        on_delete=models.CASCADE,
        related_name='failure_node',
    )
    failure_description = models.CharField('Описание отказа', max_length=250, null=True, blank=True)

    recovery_method = models.ForeignKey(
        'RecoveryMethodReference',
        verbose_name='Способ восстановления',
        on_delete=models.CASCADE,
        related_name='recovery_method',
    )

    parts_used = models.TextField('Используемые запасные части', max_length=1000, blank=True, null=True)
    date_of_restoration = models.DateTimeField('Дата восстановления', blank=True, null=True)
    equipment_downtime = models.IntegerField('Время простоя техники (Часов)', default=0)

    machine = models.ForeignKey(
        'Machine',
        verbose_name='Машина',
        on_delete=models.CASCADE,
        related_name='complaint',
    )

    def get_equipment_downtime(self):
        # self.equipment_downtime = self.date_of_refusal - self.date_of_restoration
        result = self.date_of_restoration - self.date_of_refusal
        self.equipment_downtime = result.seconds // 3600
        self.save()
        return self.equipment_downtime

    def __str__(self):
        return '{}'.format(f'{self.date_of_refusal} {self.machine}')


class FailureNodeReference(models.Model):
    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Справочник узлов отказа'

    name = models.CharField('Наименование узла', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')


class RecoveryMethodReference(models.Model):
    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Справочник способов восстановления'

    name = models.CharField('Наименование узла', max_length=150, unique=True)
    description = models.TextField('Описание', max_length=5000, null=True, blank=True)

    def __str__(self):
        return '{}'.format(f'{self.name}')
