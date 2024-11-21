from django.contrib import admin
from app.base.models import Contact, About,Services, Base, Landlord, Choices
# Register your models here.
admin.site.register(Contact)
admin.site.register(About)
admin.site.register(Services)
admin.site.register(Base)
admin.site.register(Landlord)
admin.site.register(Choices)