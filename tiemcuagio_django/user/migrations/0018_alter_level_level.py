# Generated by Django 5.1.2 on 2024-11-16 02:11

import user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0017_alter_level_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="level",
            name="level",
            field=models.PositiveIntegerField(validators=[user.models.test]),
        ),
    ]
