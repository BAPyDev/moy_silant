from django.contrib import admin
from .models import Machine, MachineModelReference, EngineModelReference, TransmissionModelReference, \
    DrivingBridgeModelReference, ControlledBridgeModelReference, Maintenance, TypeOfMaintenanceReference, \
    MaintenanceOrganisationReference, Complaint, FailureNodeReference, RecoveryMethodReference

admin.site.register(Machine)
admin.site.register(MachineModelReference)
admin.site.register(EngineModelReference)
admin.site.register(TransmissionModelReference)
admin.site.register(DrivingBridgeModelReference)
admin.site.register(ControlledBridgeModelReference)

admin.site.register(Maintenance)
admin.site.register(TypeOfMaintenanceReference)
admin.site.register(MaintenanceOrganisationReference)

admin.site.register(Complaint)
admin.site.register(FailureNodeReference)
admin.site.register(RecoveryMethodReference)
