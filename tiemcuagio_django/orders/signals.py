from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from orders.models import *
from orders.fuctions import *
from payment.functions import create_qr
from money.models import *
from user.functions import update_level


def cancell(order, canceller):
    if order.status == "paid" and order.payment_method == "credit_card":
        # creates a balance fluctuation
        reason = Reason.objects.create(**{canceller: order})
        BalanceFluctuation.objects.create(
            user=order.user,
            amount=order.credit_card,
            reason=reason,
        )

        # makes sure the current qr is expired
        qr = order_qr(order)
        qr.expired = datetime.datetime.now()
        qr.save()


@receiver(post_save, sender=OrderStatus)
def update_order_status(sender, instance, created, **kwargs):
    order = instance.order
    if created:
        order.status = instance.status

        if order.status == "paid" and order.payment_method == "cod":
            order.cash = order.total_payment

        elif order.status == "unpaid" and order.payment_method == "credit_card":
            create_qr(order)

        elif instance.status == "customer_cancelled":
            cancell(order, "customer_cancelled")

        elif instance.status == "admin_cancelled":
            cancell(order, "admin_cancelled")

        elif instance.status == "completed":
            update_level(order.user)

        order.save()
        if instance.status not in ["unpaid"]:
            notify(order, instance.status)
