from django.shortcuts import render, redirect
from django.contrib.auth import logout as authLogout

from product.models import Product
from .forms import SignupForm

# Create your views here.
def index(request):
  products = Product.objects.all()

  context = {
    'products': products
  }

  return render(request, 'core/index.html', context)

def signup(request):
  if request.method == 'POST':
    form = SignupForm(request.POST)
  
    if form.is_valid():
      form.save()

      return redirect('/')
  else:
    form = SignupForm()

  context = {
    'form': form
  }

  return render(request, 'core/register.html', context)

def logout(request):
  authLogout(request)
  return redirect('/')