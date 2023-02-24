from django.urls import path
from django.contrib.auth import views as auth_views

app_name = 'core'

from . import views
from .forms import SigninForm

urlpatterns = [
    path('', views.index),
    path('logout/', views.logout, name="logout"),
    path('sign-up/', views.signup, name="signup"),
    path('sign-in/', auth_views.LoginView.as_view(template_name="core/login.html", authentication_form=SigninForm), name="signin")
]
