from django.urls import path, re_path
from .views import Home, Assets

urlpatterns = [
    path('', Home.as_view(), name='home'),
    # path('/draw', Home.as_view(), name='draw'),
    re_path(r'^(?P<filename>[\w\.]+)$', Assets.as_view(), name='assets'),
    # I believe this allows us to access the images (once deployed) since they are outside of the dist folder
      # path('', index)
]



