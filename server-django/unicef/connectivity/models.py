# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Isp(models.Model):
  address = models.CharField(max_length=40, unique=True)
  scrupulous = models.BooleanField()

class School(models.Model):
  name = models.CharField(max_length=60)
  ip = models.CharField(max_length=16)
  connectivity = models.IntegerField()
  Isp = models.ForeignKey('Isp', on_delete=models.SET_NULL, null=True)





