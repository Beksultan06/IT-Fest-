from django.urls import path
from app.base.views import index

urlpatterns = [
    path("", index, name='index'),
]
