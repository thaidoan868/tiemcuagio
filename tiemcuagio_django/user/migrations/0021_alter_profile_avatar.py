# Generated by Django 5.1.2 on 2024-12-07 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0020_level_detail_avatar_frame"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="avatar",
            field=models.ImageField(
                default="avatars/default-avatar.png", upload_to="avatars/"
            ),
        ),
    ]
