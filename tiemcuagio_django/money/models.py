from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import User

from tiemcuagio_django.functions import list_to_choices, get_deleted_user
from orders.models import Order

from money.validators import *

banks = [
    "VPBank",
    "BIDV",
    "Vietcombank",
    "VietinBank",
    "MBBANK",
    "ACB",
    "SHB",
    "Techcombank",
    "Agribank",
    "HDBank",
    "LienVietPostBank",
    "VIB",
    "SeABank",
    "VBSP",
    "TPBank",
    "OCB",
    "MSB",
    "Sacombank",
    "SCB",
    "VDB",
    "Nam A Bank",
    "ABBANK",
    "PVcomBank",
    "Bac A Bank",
    "UOB",
    "Woori",
    "HSBC",
    "SCBVL",
    "PBVN",
    "SHBVN",
    "NCB",
    "VietABank",
    "Viet Capital Bank",
    "DongA Bank",
    "Vietbank",
    "ANZVL",
    "OceanBank",
    "CIMB",
    "Kienlongbank",
    "IVB",
    "BAOVIET Bank",
    "SAIGONBANK",
    "Co-opBank",
    "GPBank",
    "VRB",
    "CB",
    "HLBVN",
    "PG Bank",
]
bank_choices = list_to_choices(banks)

statuses = [
    "waiting",
    "customer_cancelled",
    "admin_refused",
    "accepted",
    "completed",
]
status_choices = list_to_choices(statuses)


class BankAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    beneficiary_bank = models.CharField(max_length=20, blank=True, choices=bank_choices)
    account_number = models.CharField(max_length=20, blank=True)
    the_beneficiarys_name = models.CharField(max_length=50, blank=True)



class WithdrawalRequest(models.Model):
    user = models.ForeignKey(
        User, related_name="withdrawal_requests", on_delete=models.CASCADE
    )
    beneficiary_bank = models.CharField(max_length=20, choices=bank_choices)
    account_number = models.CharField(max_length=20)
    the_beneficiarys_name = models.CharField(max_length=50)
    withdrawal_amount = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20, choices=status_choices, blank=True
    )
    date = models.DateField(auto_now_add=True)


class WithdrawalRequestStatus(models.Model):
    withdrawal_request = models.ForeignKey(
        WithdrawalRequest, related_name="wr_statuses", on_delete=models.CASCADE
    )
    message = models.TextField(blank=True, null=True)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=status_choices
    )
    def clean(self):
        if self.status == "admin_refused":
            if is_cancellable(self.withdrawal_request):
                return super().clean()

        elif self.status == "accepted":
            if is_updatable(self.withdrawal_request):
                return super().clean()
            
        raise ValidationError( _( "Status must be either admin_refused or accepted"))


def get_sentinal_order():
    return Order.objects.get(user=get_deleted_user())


def get_sentinal_withdrawal_request():
    deleted_user = get_deleted_user()
    return WithdrawalRequest.objects.get(user=deleted_user)


class Reason(models.Model):
    change = models.ForeignKey(
        Order,
        related_name="change",
        blank=True,
        null=True,
        on_delete=models.SET(get_sentinal_order),
    )
    customer_cancelled = models.ForeignKey(
        Order,
        blank=True,
        null=True,
        related_name="customer_cancelled",
        on_delete=models.SET(get_sentinal_order),
    )
    admin_cancelled = models.ForeignKey(
        Order,
        blank=True,
        null=True,
        related_name="admin_cancelled",
        on_delete=models.SET(get_sentinal_order),
    )
    withdrawal = models.ForeignKey(
        WithdrawalRequest,
        blank=True,
        null=True,
        on_delete=models.SET(get_sentinal_withdrawal_request),
    )


class BalanceFluctuation(models.Model):
    user = models.ForeignKey(
        User, related_name="balance_fluctuations", on_delete=models.CASCADE
    )
    amount = models.IntegerField()
    reason = models.OneToOneField(Reason, on_delete=models.PROTECT)
    datetime = models.DateTimeField(auto_now_add=True)
