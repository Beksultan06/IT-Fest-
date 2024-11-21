from django.shortcuts import render
from django.core.mail import send_mail

from app.base.utils import send_contact_email
from .models import  About, Services, Base, Landlord, Choices

def index(request):
    base_id = Base.objects.latest("id")
    landlord_all = Landlord.objects.all()
    choices_all = Choices.objects.all()
    return render(request, "index.html", locals())


def contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        zip_code = request.POST.get('zipcode')
        services = request.POST.get('services')
        message = request.POST.get('message')

        send_mail(
            'Cheff Contact',
            f"""Здравствуйте.
            Спасибо за обратную связь, мы скоро свами свяжемся.
            Ваше Имя: {name}
            Ваш email: {email}
            Ваш номер телефона: {phone}
            Ваш почтовый яндекс: {zip_code}
            Какую услугу вы желает: {services}
            Ваше сообщение: {message}...

            Если вы ошиблись при указании данных можете обратно зайти на сайт и оставить новый отзыв с исправленными
            данными! """,
            "noreply@somehost.local",
            ["nurlanuuulubeksultan@gmail.com"]
        )
        send_contact_email.delay(name, phone, email, zip_code, services, message)
    return render(request, 'contact/index.html', locals())


def about(request):
    about_id = About.objects.latest("id")
    about_all = Services.objects.all()
    return render(request, 'about/index.html', locals())

def book(request):
    return render(request, 'booking-payments/index.html', locals())