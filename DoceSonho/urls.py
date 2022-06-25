"""DoceSonho URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from . import views
from Portfolio import views as Portfolio
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('views/', views.index, name='index'), ##use react for index
    re_path('views/'r'^$', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('listBolo/', Portfolio.listBolo),
    path('listDoce/', Portfolio.listDoce),
    path('bolos/', Portfolio.bolo_show),
    path('listQuitute/', Portfolio.listQuitute),
    path('listCategoria/', Portfolio.listCategoria),
    path('',include('frontend.urls')),
    path('cart/',include('frontend.urls')),
    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
