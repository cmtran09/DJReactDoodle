from django.contrib import admin
from .models import Image, CorrectAnswer, Category
# Register your models here.

admin.site.register(Image)
admin.site.register(CorrectAnswer)
admin.site.register(Category)