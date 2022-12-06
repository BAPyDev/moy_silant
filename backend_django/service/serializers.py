from rest_framework import serializers

from .models import Machine


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = [
            'factory_number',
            'machine_model',
            'engine_model',
            'engine_number',
            'transmission_model',
            'transmission_number',
            'driving_bridge_model',
            'driving_bridge_number',
            'controlled_bridge_model',
            'controlled_bridge_number',
            'delivery_contract',
            'date_of_shipment',
            'consignee',
            'delivery_address',
            'complete_set',
            'client',
            'service_company',
        ]
        depth = 1
    print()