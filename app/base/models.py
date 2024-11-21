from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.
class Services(models.Model):
    name = models.CharField(
        max_length=155,
        verbose_name='Имя'
    )
    phone = models.CharField(
        max_length=50
    )
    email = models.EmailField()
    zip_code = models.CharField(
        max_length=155
    )
    services = models.CharField(
        max_length=155
    )
    descriptions = models.CharField(
        max_length=155
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Обратный связ услуг'