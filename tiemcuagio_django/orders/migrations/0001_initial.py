# Generated by Django 5.1.2 on 2024-10-23 13:45

import django.db.models.deletion
import orders.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("products", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=30)),
                ("name", models.CharField(max_length=50)),
                ("phone_number", models.PositiveBigIntegerField()),
                ("address", models.CharField(max_length=100)),
                ("print_invoice", models.BooleanField(default=True)),
                (
                    "payment_method",
                    models.CharField(
                        choices=[("cod", "cod"), ("credit_card", "credit_card")],
                        max_length=15,
                    ),
                ),
                ("cash", models.PositiveIntegerField(default=0)),
                ("credit_card", models.PositiveIntegerField(default=0)),
                ("date", models.DateField(auto_now_add=True)),
                ("total_payment", models.PositiveIntegerField(default=0)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OrderStatus",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                ("message", models.TextField(blank=True, null=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("unpaid", "unpaid"),
                            ("paid", "paid"),
                            ("customer_cancelled", "customer_cancelled"),
                            ("admin_cancelled", "admin_cancelled"),
                            ("accepted", "accepted"),
                            ("done_shipped", "done_shipped"),
                            ("completed", "completed"),
                        ],
                        default="unpaid",
                        max_length=20,
                    ),
                ),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="statuses",
                        to="orders.order",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OrderedProduct",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("price", models.PositiveIntegerField()),
                ("quantity", models.PositiveSmallIntegerField()),
                ("total_money", models.PositiveIntegerField()),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="products",
                        to="orders.order",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=models.SET(orders.models.get_sentinel_product),
                        to="products.product",
                    ),
                ),
            ],
            options={
                "constraints": [
                    models.UniqueConstraint(
                        fields=("order", "product"), name="unique_ordered_product"
                    )
                ],
            },
        ),
    ]
