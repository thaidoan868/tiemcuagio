# Generated by Django 5.1.2 on 2024-11-13 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0014_rename_title_level_name_level_avatar_frame_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="level",
            name="level",
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name="level",
            name="purchased_amount",
            field=models.PositiveIntegerField(),
        ),
    ]