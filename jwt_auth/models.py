from django.db import models

# Create your models here.

rom django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=50, null=True)
    age = models.IntegerField(null=True)
    email = models.EmailField(unique=True, db_index=True)