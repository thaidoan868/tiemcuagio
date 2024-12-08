# Generated by Django 5.1.2 on 2024-11-13 02:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0006_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="category",
            field=models.ForeignKey(
                default="pastry",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="category",
                to="products.category",
            ),
        ),
    ]
