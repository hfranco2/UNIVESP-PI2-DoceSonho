from django.shortcuts import render

# Aqui eu crio minhas views, primeira eu defino a home e depois defino o cart


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
    
def cart(request, *args, **kwargs):
    return render(request, 'frontend/cart.html')