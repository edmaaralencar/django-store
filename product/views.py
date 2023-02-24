from django.shortcuts import render, get_object_or_404

from .models import Product

# Create your views here.
def product(request, pk):
  product = get_object_or_404(Product, pk=pk)

  context = {
    'product': product
  }

  return render(request, 'product/product.html', context)