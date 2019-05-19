# serializers.py
from rest_framework import serializers

from .models import School, Isp

class IspSerializer(serializers.HyperlinkedModelSerializer):

    lookup_field = 'address'
    class Meta:
        model = Isp
        fields = ('scrupulous')

class SchoolSerializer(serializers.HyperlinkedModelSerializer):

    lookup_field = 'ip'
    class Meta:
        model = School
        fields = ('name', 'ip', 'connectivity')