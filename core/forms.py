from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
  class Meta:
    model = User
    fields = ('username', 'email', 'password1', 'password2')

  username = forms.CharField(widget=forms.TextInput(attrs={
    'placeholder': 'Seu nome de usuário',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))

  email = forms.CharField(widget=forms.EmailInput(attrs={
    'placeholder': 'Seu e-mail',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))

  password1 = forms.CharField(widget=forms.PasswordInput(attrs={
    'placeholder': 'Sua senha',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))

  password2 = forms.CharField(widget=forms.PasswordInput(attrs={
    'placeholder': 'Confirme a senha',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))

class SigninForm(AuthenticationForm):
  username = forms.CharField(widget=forms.TextInput(attrs={
    'placeholder': 'Seu nome de usuário',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))

  password = forms.CharField(widget=forms.PasswordInput(attrs={
    'placeholder': 'Sua senha',
    'class': 'w-full p-3 bg-[#ebebf1]'
  }))
