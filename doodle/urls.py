from django.urls import path
from .views import ImageView, UserView, UserAnswerView, CategoryView, CorrectAnswerView, DetailImageView, DetailAnswerView

urlpatterns = [
    # path('', ListView.as_view()),
    # path('<int:pk>/', DetailView.as_view()),
    path('images/', ImageView.as_view()),
    path('users/', UserView.as_view()),
    path('useranswers/', UserAnswerView.as_view()),
    path('categories/', CategoryView.as_view()),
    path('answers/', CorrectAnswerView.as_view()),
    path('images/<int:pk>/', DetailImageView.as_view()),
    path('answers/<int:pk>/', DetailAnswerView.as_view())
]