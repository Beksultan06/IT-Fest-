from django.urls import path
from app.base.views import index, contact, about, book, services, services_dop

urlpatterns = [
    path("", index, name='index'),
    path('contact/', contact, name='contact'),
    path("about/", about, name='about'),
    path("book/", book, name='book'),
    path("services/", services, name='services'),
    path("services_dop/", services_dop, name='services_dop')
]