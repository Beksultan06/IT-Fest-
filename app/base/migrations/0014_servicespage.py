# Generated by Django 4.2.7 on 2024-11-22 01:07

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0013_alter_book_options_remove_book_add_options_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ServicesPage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=155, verbose_name="Заголовка")),
                (
                    "descriptions",
                    ckeditor.fields.RichTextField(verbose_name="Описание"),
                ),
                (
                    "title_choices",
                    models.CharField(max_length=155, verbose_name="Заголовка выбора"),
                ),
            ],
            options={
                "verbose_name_plural": "Наши Услуги",
            },
        ),
    ]