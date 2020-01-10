from django.urls import path
from .views import ImageView, UserView, UserAnswerView, CategoryView, CorrectAnswerView

urlpatterns = [
    # path('', ListView.as_view()),
    # path('<int:pk>/', DetailView.as_view()),
    path('images/', ImageView.as_view()),
    path('users/', UserView.as_view()),
    path('useranswers/', UserAnswerView.as_view()),
    path('categories/', CategoryView.as_view()),
    path('answers/', CorrectAnswerView.as_view()),
]