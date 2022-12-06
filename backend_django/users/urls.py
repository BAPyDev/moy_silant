from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.some_request),
    path('api-token/', views.CustomAuthToken.as_view()),
]
