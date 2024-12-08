import datetime
from orders.fuctions import *
from django.core.exceptions import ValidationError
from rest_framework.exceptions import APIException
from django.utils.translation import gettext_lazy as _


def unpaid_expired(order):
    qr = order_qr(order)
    now = datetime.datetime.now(datetime.timezone.utc)

    if order.status == "unpaid":
        return (True, False) if qr.expired > now else (True, True)
    return (False, None)


def can_change_payment_method(order, raise_exception=True):
    unpaid, expired = unpaid_expired(order)
    if unpaid and expired:
        return True

    # false
    if raise_exception:
        raise APIException("You can't change the payment method of this order")
    return False


def can_pay_with_qr(order):
    unpaid, expired = unpaid_expired(order)
    if unpaid and not expired:
        return True
    return False


def is_cancellable(order, raise_exception=True, raise_APIException=False):
    if order.status in ["unpaid", "paid"]:
        return True

    # false
    if raise_APIException:
        raise APIException("You can't cancell this order")

    if raise_exception:
        raise ValidationError(_("You can't cancell this order"))
    return False


def new_status_validation(order, new_status, raise_exception=True):
    old_status = order.status
    predescriptted_order = {
        "accepted": "paid",
        "done_shipped": "accepted",
        "completed": "done_shipped",
    }
    pre_status = predescriptted_order.get(new_status, "&*(%$&)*@")

    if old_status == pre_status:
        return True

    # false
    if raise_exception:
        raise ValidationError(_("Orders must be updated in the predescripted order"))
    return False
