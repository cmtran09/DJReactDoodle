from rest_framework import serializers
from .models import Bear, Country, Tag, Image


class NestedBearSerializer(serializers.ModelSerializer):
  # idential to cat but doesn't have owner or tag serializers on it (to intergrate things that relate to each other)

    class Meta:
        model = Bear
        fields = ('id', 'typeOfBear', 'designatedName',
                  'image', 'country', 'tags')


class NestedCountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = ('id', 'name')


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name')


class CountrySerializer(serializers.ModelSerializer):

    bears = NestedBearSerializer(many=True)

    class Meta:
        model = Country
        fields = ('id', 'name', 'bears')


class BearSerializer(serializers.ModelSerializer):

    country = NestedCountrySerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = Bear
        fields = ('id', 'typeOfBear', 'designatedName',
                  'image', 'country', 'tags')


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'image')
