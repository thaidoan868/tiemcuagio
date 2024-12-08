import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver

from orders.models import OrderStatus
from money.models import WithdrawalRequestStatus
from money.models import Reason, BalanceFluctuation
from payment.models import *
from user.models import Notification


def present():
    return datetime.datetime.now(datetime.timezone.utc)


def expired(qr):
    now = present()
    return False if qr.expired > now else True


def order_payment_handler(qr, receipt):
    amount = receipt.transferAmount

    if amount <= qr.total_payment:
        qr.order.credit_card = amount
        qr.order.cash = qr.total_payment - amount
        message = ""
    else:
        qr.order.credit_card = qr.total_payment
        message = "Lưu ý: Bạn thanh toán nhiều hơn yêu cầu"

        # creates a balance fluctuation for the change of the order
        reason = Reason.objects.create(change=qr.order)
        BalanceFluctuation.objects.create(
            user=qr.order.user,
            amount=amount - qr.total_payment,
            reason=reason,
        )
    qr.order.save()

    OrderStatus.objects.create(
        order=qr.order,
        status="paid",
        message=message,
    )

    order = qr.order
    Notification.objects.create(
        user=order.user,
        message=f"Bạn vừa thanh toán điện tử đơn #{order.id}. {message}",
    )


def withdrawal_handler(qr, receipt):
    transferAmount = receipt.transferAmount

    if transferAmount <= qr.total_payment:
        amount = -transferAmount
        message = ""
    else:
        amount = -qr.total_payment
        message = "XXXXXX ERROR XXXXX: Admin have deposited more money than requested"

    # creates a balance fluctuation
    wr = qr.withdrawal_request
    reason = Reason.objects.create(withdrawal=wr)
    BalanceFluctuation.objects.create(
        user=wr.user,
        amount=amount,
        reason=reason,
    )

    WithdrawalRequestStatus.objects.create(
        withdrawal_request=wr,
        message=message,
        status="completed",
    )


@receiver(post_save, sender=Receipt)
def payment_handler(sender, instance, created, **kwargs):
    receipt = instance
    qr = Qr.objects.filter(pk=receipt.content).first()

    if created and qr and not expired(qr):
        if qr.order and receipt.transferType == "in":
            order_payment_handler(qr, receipt)
        if qr.withdrawal_request and receipt.transferType == "out":
            withdrawal_handler(qr, receipt)

        qr.expired = present()
        qr.status = "paid"
        qr.receipt = receipt
        qr.save()
