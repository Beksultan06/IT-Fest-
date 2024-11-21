from django.urls import path
from app.base.views import index, contact, about, book

urlpatterns = [
    path("", index, name='index'),
    path("contact/", contact, name='contact'),
    path("about/", about, name='about'),
    path("book/", book, name='book')
]