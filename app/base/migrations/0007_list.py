# Generated by Django 4.2.7 on 2024-11-21 20:33

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0006_base"),
    ]

    operations = [
        migrations.CreateModel(
            name="List",
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
                (
                    "title_choices",
                    models.CharField(
                        choices=[
                            (
                                "Удобный поиск парковочных мест в нужном районе",
                                "Удобный поиск парковочных мест в нужном районе",
                            ),
                            ("Динамичные цены", "Динамичные цены"),
                            (
                                "Паркуйтесь там, где вам удобно",
                                "Паркуйтесь там, где вам удобно",
                            ),
                        ],
                        max_length=50,
                        verbose_name="Тип под пункта",
                    ),
                ),
                ("title", models.CharField(max_length=155, verbose_name="Заголовка")),
                (
                    "descriptions",
                    ckeditor.fields.RichTextField(verbose_name="Описание"),
                ),
                (
                    "subpuncture_1",
                    models.CharField(max_length=155, verbose_name="Под пункт 1"),
                ),
                (
                    "subpuncture_2",
                    models.CharField(max_length=155, verbose_name="Под пункт 2"),
                ),
            ],
        ),
    ]