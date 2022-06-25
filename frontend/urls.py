from django.urls import path
from .views import index
from .views import cart
# Aqui eu importo do views.py as const com o render das urls
urlpatterns = [
    path('',index),
    path('cart/',cart)
]