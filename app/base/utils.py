from celery import shared_task
from django.core.mail import send_mail
from .models import Contact

@shared_task
def send_contact_email(name, phone, email, zip_code, services, descriptions):
    Contact.objects.create(name=name, phone=phone, email=email, zip_code=zip_code, services=services, descriptions=descriptions)
    