# Generated by Django 5.1.2 on 2024-12-03 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0010_remove_orderstatus_displayed_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="message",
            field=models.TextField(blank=True, null=True),
        ),
    ]
