from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

import json

from product.models import Product

# Create your views here.
@login_required
def cart(request):
  return render(request, 'cart/cart.html')

def getItemsFromCart(request):
  data = json.loads(request.body)

  products = []

  for item in data:
    id = int(item['id'])
    quantity = item['quantity']

    product = get_object_or_404(Product, pk=id)

    product_data = {
      'name': product.name,
      'image': product.image.url,
      'id:': product.id,
      'price': product.price,
      'description': product.description,
      'total': product.price * quantity,
      'quantity': quantity
    }
    products.append(product_data)

  return JsonResponse(products, safe=False)