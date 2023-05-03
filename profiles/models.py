# from django.contrib.auth.models import User
from django.db import models

class Profiles(models.Model):
    'profiles.apps.ApiConfig',    
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=100, unique=True)
    mobileno = models.CharField(max_length=50, null=True)
    picture = models.CharField(max_length=200, null=True)
    qrcodeurl = models.CharField(max_length=200, null=True)
    isblocked =models.IntegerField(default=0)
    mailtoken =models.IntegerField(default=0)
    secretkey = models.CharField(max_length=70, null=True)


