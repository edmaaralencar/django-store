from django.urls import path

from . import views

app_name = 'product'

urlpatterns = [
  path('<int:pk>/', views.product, name="detail")
]
