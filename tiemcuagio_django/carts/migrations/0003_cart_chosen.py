# Generated by Django 5.1.2 on 2024-11-28 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("carts", "0002_alter_cart_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="cart",
            name="chosen",
            field=models.BooleanField(blank=True, default=False),
        ),
    ]