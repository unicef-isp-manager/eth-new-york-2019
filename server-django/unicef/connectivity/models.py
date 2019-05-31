# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Prob(models.Model):
  bandwidth = models.FloatField()
  timestamp = models.DateTimeField(auto_now_add=True)
  school = models.ForeignKey('School', on_delete=models.CASCADE)
  isp = models.ForeignKey('Isp', on_delete=models.CASCADE)

  def __str__(self): 
    return self.timestamp

class Isp(models.Model):
  address = models.CharField(max_length=40)
  name = models.CharField(max_length=120, null=True)
  scrupulous = models.BooleanField()

  def __str__(self): 
    return self.name

class School(models.Model):
  ip = models.CharField(max_length=40, null=True)
  org = models.CharField(max_length=120, null=True)
  city = models.CharField(max_length=120, null=True)
  region = models.CharField(max_length=120, null=True)
  country = models.CharField(max_length=120, null=True)
  zip = models.CharField(max_length=40, null=True)
  lat = models.FloatField(default=0.0)
  lon = models.FloatField(default=0.0)
  timezone = models.CharField(max_length=120, null=True)

  def __str__(self):
    return self.city +", " + self.region






