# Generated by Django 4.2.7 on 2024-11-21 20:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0007_list"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="list",
            options={"verbose_name_plural": "Список"},
        ),
        migrations.AddField(
            model_name="list",
            name="subpuncture_3",
            field=models.CharField(
                default=1, max_length=155, verbose_name="Под пункт 3"
            ),
            preserve_default=False,
        ),
    ]
