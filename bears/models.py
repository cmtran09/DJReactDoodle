from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.name}'


class Country(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'


class Bear(models.Model):
    typeOfBear = models.CharField(max_length=50)
    designatedName = models.CharField(max_length=50)
    image = models.CharField(max_length=500)

    country = models.ForeignKey(Country, related_name='bears', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='bears')

    def __str__(self):
        return f'{self.typeOfBear} - {self.designatedName}'

class Image(models.Model):
    image = models.ImageField(upload_to='pics') #check
    