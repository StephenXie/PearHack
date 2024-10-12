from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("api/upload_file", views.upload_file),
]
