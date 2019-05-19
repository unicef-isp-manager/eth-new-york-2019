# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from .serializers import SchoolSerializer, IspSerializer
from .models import School, Isp
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
# Create your views here.


@api_view(['GET'])
def get_isp_status(request, pk):
    try:
        isp = Isp.objects.get(address=pk)
        return Response(isp.scrupulous)
    except:
        pass
    return Response(False)

@api_view(['POST'])
def update_school_connectivity(request):
    ip = json.loads(request.body)['ip']
    school = School.objects.get(ip = ip)
    school.connectivity+=1
    school.save()
    return Response({"message": "Got some data!"})
