from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import UploadFileForm
from django.views.generic import FormView

from django.conf import settings

from rest_framework.views import APIView  # get the APIView class from DRF
from rest_framework.response import Response  # get the Response class from DRF
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED

from .models import Bear, Country, Image
# get the BookSerializer
from .serializers import BearSerializer, CountrySerializer, ImageSerializer

# Create your views here.


class ListView(APIView):  # extend the APIView

    def get(self, _request):
        bears = Bear.objects.all()  # get all the books
        serializer = BearSerializer(bears, many=True)

        return Response(serializer.data)  # send the JSON to the client


class DetailView(APIView):  # extend the APIView

    def get(self, _request, pk):
        # get a book by id (pk means primary key)
        bear = Bear.objects.get(pk=pk)
        serializer = BearSerializer(bear)

        return Response(serializer.data)  # send the JSON to the client


class CountryListView(APIView):
  # whatever is passed in is the class that it's extending from
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


class ImageView(APIView):
    def get(self, request):
        images = Image.objects.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request):
        image = Image(image=request.FILES['file'])
        image.save()
        return Response('Success')


class HomePageView(ListView):
    model = Image
    template_name = 'home.hmtl'
