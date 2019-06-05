# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from .serializers import SchoolSerializer, IspSerializer
from .models import School, Isp, Prob
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
    data = json.loads(request.body)

    schoolData = json.loads(json.loads(data["school"]))

    try:
        school = School.objects.get(ip = schoolData["query"])
        isp = Isp.objects.get(name = schoolData["isp"])
    except School.DoesNotExist:
        school = School(ip = schoolData["query"],
                        org = schoolData["org"],
                        city = schoolData["city"],
                        region = schoolData["region"],
                        country = schoolData["country"],
                        zip = schoolData["zip"],
                        lat = schoolData["lat"],
                        lon = schoolData["lon"],
                        timezone = schoolData["timezone"])
        school.save()
    except Isp.DoesNotExist:
        isp = Isp(address = "Unknown",
                  name = schoolData["isp"],
                  scrupulous = True)
        isp.save()
    

    prob = Prob(bandwidth = data["bandwidth"],
                school = school,
                isp = isp)
    
    prob.save()

    
    return Response("200")
