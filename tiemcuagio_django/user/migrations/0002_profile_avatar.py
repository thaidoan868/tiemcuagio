# Generated by Django 5.1.2 on 2024-11-03 00:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="avatar",
            field=models.ImageField(
                blank=True, upload_to="", verbose_name="default-avatar.png"
            ),
        ),
    ]
