from django.urls import path
from .views import AUthURL

urlpatterns = [
    path('/get-auth-url', AUthURL.as_view()),
    
]