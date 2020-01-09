
from django.urls import path
from .views import ListView, DetailView, CountryListView, ImageView, HomePageView

urlpatterns = [
    path('', ListView.as_view()),
    path('<int:pk>/', DetailView.as_view()),
    path('countries/', CountryListView.as_view()),
    path('images/', ImageView.as_view()),
]