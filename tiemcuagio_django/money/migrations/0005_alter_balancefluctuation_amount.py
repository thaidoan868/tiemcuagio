# Generated by Django 5.1.2 on 2024-10-25 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("money", "0004_alter_withdrawalrequest_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="balancefluctuation",
            name="amount",
            field=models.IntegerField(),
        ),
    ]
