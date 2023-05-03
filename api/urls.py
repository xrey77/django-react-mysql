from django.contrib import admin
from django.urls import path, include
from core.views import front

from . import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# import debug_toolbar
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', front, name='front'),
    path('', include('profiles.urls')),
    path('', include('products.urls')),
    
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()