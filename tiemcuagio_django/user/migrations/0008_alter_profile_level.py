# Generated by Django 5.1.2 on 2024-11-06 07:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0007_profile_level"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="level",
            field=models.ForeignKey(
                default=3, on_delete=django.db.models.deletion.PROTECT, to="user.level"
            ),
        ),
    ]
