# Generated by Django 5.1.2 on 2024-11-17 08:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="slider",
            name="image",
        ),
        migrations.AddField(
            model_name="slider",
            name="name",
            field=models.CharField(default="Introduction", max_length=200),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="SliderImage",
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
                ("image", models.ImageField(upload_to="slider-images/")),
                (
                    "slider",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="home.slider",
                    ),
                ),
            ],
        ),
    ]
