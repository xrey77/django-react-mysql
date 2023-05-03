from rest_framework.response import Response
from rest_framework.decorators import api_view
from products.models import Products
from django.http import JsonResponse
import math

@api_view(['GET'])
def getProducts(request):    
    totalpage=None    
    page = int(request.query_params.get('page'))
    totalrecs= Products.objects.values().count()
    perpage = 10
    
    # CALCULATE TOTAL PAGES
    totalpage = math.ceil(float(totalrecs) / perpage)
    offset = (page - 1) * perpage
    print(offset)
    
    products = list(Products.objects.values().order_by('id')[offset:offset+perpage])
    return JsonResponse({'page': page,'totpages': totalpage, 'products': products})
