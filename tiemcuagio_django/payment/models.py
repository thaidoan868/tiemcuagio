import uuid

from django.db import models

from orders.models import Order
from money.models import WithdrawalRequest
from money.models import bank_choices
from tiemcuagio_django.functions import list_to_choices


class Receipt(models.Model):
    gateway = models.CharField(max_length=20)
    transactionDate = models.DateTimeField()
    code = models.CharField(max_length=50, null=True)
    content = models.CharField(max_length=200)
    transferType = models.CharField(max_length=5)
    transferAmount = models.PositiveIntegerField()
    accumulated = models.CharField(max_length=100)
    subAccount = models.CharField(max_length=100, blank=True)
    referenceCode = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    success = models.BooleanField(blank=True, default=True)




class Qr(models.Model):
    statuses = ["unpaid", "paid"]
    status_choices = list_to_choices(statuses)

    def create_uuid():
        return uuid.uuid4().hex

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    withdrawal_request = models.ForeignKey(
        WithdrawalRequest, blank=True, null=True, on_delete=models.CASCADE
    )
    order = models.ForeignKey(Order, blank=True, null=True, on_delete=models.CASCADE)
    receipt = models.OneToOneField(
        Receipt, blank=True, null=True, on_delete=models.PROTECT
    )
    expired = models.DateTimeField()
    beneficiary_bank = models.CharField(max_length=50, choices=bank_choices)
    account_number = models.CharField(max_length=20)
    the_beneficiarys_name = models.CharField(max_length=50)
    total_payment = models.PositiveIntegerField(default=0)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10, choices=status_choices, default=statuses[0]
    )
