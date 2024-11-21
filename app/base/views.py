from django.shortcuts import render, redirect
from .models import Services
from django.contrib import messages

def index(request):
    if request.method == "POST":
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        zip_code = request.POST.get("zipcode")
        services = request.POST.get("services")
        descriptions = request.POST.get("description")

        # Сохранение данных в модель
        service = Services(
            name=name,
            phone=phone,
            email=email,
            zip_code=zip_code,
            services=services,
            descriptions=descriptions
        )
        service.save()
        messages.success(request, "Ваш запрос успешно отправлен!")
        return redirect("index")

    return render(request, "index.html")
