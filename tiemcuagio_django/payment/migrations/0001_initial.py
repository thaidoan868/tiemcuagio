# Generated by Django 5.1.2 on 2024-10-23 13:45

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("money", "0001_initial"),
        ("orders", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Receipt",
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
                ("gateway", models.CharField(max_length=20)),
                ("transactionDate", models.DateTimeField()),
                ("code", models.CharField(max_length=50, null=True)),
                ("content", models.CharField(max_length=200)),
                ("transferType", models.CharField(max_length=5)),
                ("transferAmount", models.PositiveIntegerField()),
                ("accumulated", models.CharField(max_length=100)),
                ("subAccount", models.CharField(blank=True, max_length=100)),
                ("referenceCode", models.CharField(blank=True, max_length=100)),
                ("description", models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Qr",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("expired", models.DateTimeField()),
                (
                    "beneficiary_bank",
                    models.CharField(
                        choices=[
                            ("VPBank", "VPBank"),
                            ("BIDV", "BIDV"),
                            ("Vietcombank", "Vietcombank"),
                            ("VietinBank", "VietinBank"),
                            ("MBBANK", "MBBANK"),
                            ("ACB", "ACB"),
                            ("SHB", "SHB"),
                            ("Techcombank", "Techcombank"),
                            ("Agribank", "Agribank"),
                            ("HDBank", "HDBank"),
                            ("LienVietPostBank", "LienVietPostBank"),
                            ("VIB", "VIB"),
                            ("SeABank", "SeABank"),
                            ("VBSP", "VBSP"),
                            ("TPBank", "TPBank"),
                            ("OCB", "OCB"),
                            ("MSB", "MSB"),
                            ("Sacombank", "Sacombank"),
                            ("SCB", "SCB"),
                            ("VDB", "VDB"),
                            ("Nam A Bank", "Nam A Bank"),
                            ("ABBANK", "ABBANK"),
                            ("PVcomBank", "PVcomBank"),
                            ("Bac A Bank", "Bac A Bank"),
                            ("UOB", "UOB"),
                            ("Woori", "Woori"),
                            ("HSBC", "HSBC"),
                            ("SCBVL", "SCBVL"),
                            ("PBVN", "PBVN"),
                            ("SHBVN", "SHBVN"),
                            ("NCB", "NCB"),
                            ("VietABank", "VietABank"),
                            ("Viet Capital Bank", "Viet Capital Bank"),
                            ("DongA Bank", "DongA Bank"),
                            ("Vietbank", "Vietbank"),
                            ("ANZVL", "ANZVL"),
                            ("OceanBank", "OceanBank"),
                            ("CIMB", "CIMB"),
                            ("Kienlongbank", "Kienlongbank"),
                            ("IVB", "IVB"),
                            ("BAOVIET Bank", "BAOVIET Bank"),
                            ("SAIGONBANK", "SAIGONBANK"),
                            ("Co-opBank", "Co-opBank"),
                            ("GPBank", "GPBank"),
                            ("VRB", "VRB"),
                            ("CB", "CB"),
                            ("HLBVN", "HLBVN"),
                            ("PG Bank", "PG Bank"),
                        ],
                        max_length=50,
                    ),
                ),
                ("account_number", models.CharField(max_length=20)),
                ("the_beneficiarys_name", models.CharField(max_length=50)),
                ("total_payment", models.PositiveIntegerField(default=0)),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                (
                    "status",
                    models.CharField(
                        choices=[("unpaid", "unpaid"), ("paid", "paid")],
                        default="unpaid",
                        max_length=10,
                    ),
                ),
                (
                    "order",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="orders.order",
                    ),
                ),
                (
                    "withdrawal_request",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="money.withdrawalrequest",
                    ),
                ),
                (
                    "receipt",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="payment.receipt",
                    ),
                ),
            ],
        ),
    ]