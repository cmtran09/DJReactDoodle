# from rest_framework import serializers
# from .models import Image

# class ImageSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Image
#         fields = ('id', 'image')

from rest_framework import serializers
from .models import Image, Category, UserAnswer, CorrectAnswer
from django.contrib.auth import get_user_model
User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category')

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ('id', 'user_answer', 'date_guessed', 'user', 'image')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username') #got rid of fields: "name" and "age"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'correct_answer', 'user_drawn_image', 'date_drawn', 'user_artist')

class CorrectAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorrectAnswer
        fields = ('id', 'correct_answer', 'category', 'is_solved')

class PopulatedCorrectAnswerSerializer(CorrectAnswerSerializer):
    category = CategorySerializer(many=True)
    user_drawn_images = ImageSerializer(many=True)

class PopulatedImageSerializer(ImageSerializer):
    user_artist = UserSerializer()
    correct_answer = CorrectAnswerSerializer()

class PopulatedUserAnswerSerializer(UserAnswerSerializer):
    image = ImageSerializer()