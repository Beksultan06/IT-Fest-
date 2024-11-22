from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail

from app.base.utils import send_contact_email
from .models import  About, Services, Base, Landlord, Choices, Book
from datetime import datetime

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
    if request.method == "POST":
        try:
            # Получаем данные из формы
            entry_datetime = request.POST.get('cpbs_entry_date')
            exit_datetime = request.POST.get('cpbs_exit_date')
            entry_time = request.POST.get('cpbs_entry_time')  # Время входа

            # Проверяем, что поля заполнены
            if not entry_datetime or not exit_datetime or not entry_time:
                return HttpResponse("Ошибка: Все поля даты и времени должны быть заполнены.", status=400)

            # Преобразуем строки в формат datetime и time
            entry_datetime = datetime.strptime(entry_datetime, "%Y-%m-%dT%H:%M")
            exit_datetime = datetime.strptime(exit_datetime, "%Y-%m-%dT%H:%M")

            # Получаем другие данные
            select_parking = request.POST.get('cpbs_location_id', 'Не выбрано')
            first_name = request.POST.get('first_name', 'Не указано')
            last_name = request.POST.get('last_name', 'Не указано')
            email = request.POST.get('email', 'Не указано')
            number = request.POST.get('number', 'Не указано')
            comments = request.POST.get('comments', '')
            discount_code = request.POST.get('discount_code', '')

            # Сохраняем данные в модель Book
            Book.objects.create(
                entry_date=entry_datetime,
                entry_time=entry_datetime.time(),  # Время из entry_datetime
                select_parking=select_parking,
                first_name=first_name,
                last_name=last_name,
                email=email,
                number=number,
                comments=comments,
                discount_code=discount_code
            )

            # Перенаправление на страницу подтверждения
            return redirect('index')

        except ValueError as e:
            # Обработка ошибок преобразования даты и времени
            return HttpResponse(f"Ошибка: {e}", status=400)

    return render(request, 'booking-payments/index.html')