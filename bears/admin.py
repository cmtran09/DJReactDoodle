from django.contrib import admin
from .models import Bear, Tag, Country, Image
# Register your models here.

admin.site.register(Tag)
admin.site.register(Country)
admin.site.register(Bear)
admin.site.register(Image)
