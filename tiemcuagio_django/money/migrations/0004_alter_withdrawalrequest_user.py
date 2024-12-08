# Generated by Django 5.1.2 on 2024-10-24 07:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("money", "0003_alter_withdrawalrequest_user"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="withdrawalrequest",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="withdrawal_requests",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
