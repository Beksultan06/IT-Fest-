from django.db import models
from ckeditor.fields import RichTextField

from app.base.constant import PARKING
# Create your models here.
class Contact(models.Model):
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
        verbose_name_plural = 'Обратный связ'

class About(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )
    title_intrested  = models.CharField(
        max_length=155,
        verbose_name='Заголовка заинтересованный'
    )
    title_services = models.CharField(
        max_length=155,
        verbose_name='Заголовка услуги'
    )
    our_history = models.CharField(
        max_length=155,
        verbose_name='Заголовка Историй'
    )
    our_desctiptions_history = RichTextField(
        verbose_name='Описание Историй'
    )
    our_locations = models.CharField(
        max_length=155,
        verbose_name='Заголовка локаций'
    )
    our_locations_descriptions = RichTextField(
        verbose_name='Описание локаций'
    )


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'О нас'

class Services(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Краткие Услуги'

class Base(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )
    title_parking = models.CharField(
        max_length=155,
        verbose_name='Заголовка парковки'
    )
    title_choices = models.CharField(
        max_length=155,
        verbose_name='Заголовка Выбора'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Настройка Главной страницы'

class Landlord(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    decriptions = RichTextField(
        verbose_name='Описание'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Арендодатель'

class Choices(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )
    photo = models.ImageField(
        upload_to='base/',
        verbose_name='Фото'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Зачем нужно выбрать нас'

class TypeCar(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )
    parking_space = models.CharField(
        max_length=155,
        verbose_name='Парковочное место'
    )
    parking_availble = models.CharField(
        max_length=155,
        verbose_name='Доступные места'
    )
    price = models.CharField(
        max_length=155,
        verbose_name='Цена'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Типы Транспорта'

class AddOptions(models.Model):
    title = models.CharField(
        max_length=155,
        verbose_name='Заголовка'
    )
    descriptions = RichTextField(
        verbose_name='Описание'
    )
    price = models.CharField(
        max_length=155,
        verbose_name='Цена'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Дополнительные опции'

    
class Book(models.Model):
    entry_date = models.DateTimeField(
        verbose_name='Дата входа'
    )
    entry_time = models.TimeField(
        verbose_name='Время входа'
    )
    select_parking = models.CharField(
        max_length=155,
        verbose_name='Выбрать парковку'
    )
    first_name = models.CharField(
        max_length=155,
        verbose_name='Имя'
    )
    last_name = models.CharField(
        max_length=155,
        verbose_name='Фамилия'
    )
    email = models.EmailField(
        verbose_name='Почта'
    )
    number = models.CharField(
        max_length=25,
        verbose_name='Номер телефона'
    )
    comments = models.TextField(
        verbose_name='Комментарий',
        null=True, blank=True
    )
    discount_code = models.CharField(
        max_length=155,
        verbose_name='Код скидки',
        blank=True, null=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.select_parking})"

    class Meta:
        verbose_name_plural = 'Бронирования'