from django.db import models

class Category(models.Model):
  name = models.CharField(max_length=255)

  class Meta:
    ordering = ('name',)
    verbose_name_plural = "Categories"

  def __str__(self):
    return self.name

class Product(models.Model):
  category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
  name = models.CharField(max_length=255)
  description = models.TextField()
  price = models.FloatField()
  image = models.ImageField(upload_to='products/')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name