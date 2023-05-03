from django.urls import path, include
from . import views

urlpatterns = [
    path('api/getallproducts', views.getProducts, name="getallproducts"),
    
]
