from django.db import models

class Products(models.Model):
    'products.apps.ApiConfig',
    descriptions = models.CharField(max_length=255, null=True)
    qty = models.IntegerField(default=0)
    unit = models.CharField(max_length=50, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    sell_price = models.DecimalField(max_digits=10, decimal_places=2)
    prod_pic = models.CharField(max_length=100, null=True)
    category = models.CharField(max_length=50, null=True)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    alert_level = models.IntegerField(default=0)
    critical_level = models.IntegerField(default=0)
    datecreated = models.DateTimeField()
    dateupdated = models.DateTimeField()