from django.urls import path
from .views import ImageView

urlpatterns = [
    # path('', ListView.as_view()),
    # path('<int:pk>/', DetailView.as_view()),
    path('images/', ImageView.as_view()),
]