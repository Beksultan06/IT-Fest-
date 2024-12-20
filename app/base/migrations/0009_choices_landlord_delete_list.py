# Generated by Django 4.2.7 on 2024-11-21 21:11

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0008_alter_list_options_list_subpuncture_3"),
    ]

    operations = [
        migrations.CreateModel(
            name="Choices",
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
                ("photo", models.ImageField(upload_to="base/", verbose_name="Фото")),
            ],
            options={
                "verbose_name_plural": "Зачем нужно выбрать нас",
            },
        ),
        migrations.CreateModel(
            name="Landlord",
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
                ("decriptions", ckeditor.fields.RichTextField(verbose_name="Описание")),
            ],
            options={
                "verbose_name_plural": "Арендодатель",
            },
        ),
        migrations.DeleteModel(
            name="List",
        ),
    ]
