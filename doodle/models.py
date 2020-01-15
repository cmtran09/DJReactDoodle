## from django.db import models

## ## Create your models here.

## class Image(models.Model):
##     image = models.ImageField(upload_to='pics')

from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
## Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=20)

    def __str__(self):
        return f'Category: {self.category}'

class CorrectAnswer(models.Model):
    correct_answer = models.CharField(max_length=50)
    category = models.ManyToManyField(Category, related_name='doodle')
    ## user_drawn_image set blank as field will be empty before anyone attempts to draw this word
    # user_drawn_images = models.ManyToManyField(Image, related_name='doodle1', blank=True)
    is_solved = models.BooleanField(default=False)

    def __str__(self):
        return f'Correct Answer = {self.correct_answer}'


class Image(models.Model):
    user_drawn_image = models.ImageField(upload_to='pics', null=True)
    correct_answer = models.ForeignKey(CorrectAnswer, related_name='doodle', on_delete=models.CASCADE, null=True)
    ## SET_NULL: Set the field to NULL if the related director is deleted
    ## blank because people my yet to guess
    # guesses = models.ForeignKey(UserAnswer, related_name='doodle', max_length=50, blank=True)
    date_drawn = models.DateTimeField(auto_now_add=True)
    user_artist = models.ForeignKey(User, related_name='doodle', on_delete=models.CASCADE, null=True)   #
    ## CASCADE - When the referenced object is deleted, also delete the objects that have references to it

class UserAnswer(models.Model):
    user_answer = models.CharField(max_length=50)
    date_guessed = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='doodle1', on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, related_name='doodle', on_delete=models.CASCADE)

    def __str__(self):
        return f'User Guess = {self.user_answer}'


