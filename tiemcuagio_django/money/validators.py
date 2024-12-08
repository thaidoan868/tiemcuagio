from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import APIException

from user.functions import account_balance


def can_create_wr(user, raise_exception=True):
    # account balance > 10,000vnd
    if account_balance(user) < 10000:
        if raise_exception:
            raise APIException(
                "You can not create a withdrawal request because your account balance is too low or you have an outstanding withdrawal request."
            )
        return False

    # one user can make only one withdrawal request  at a time
    for wr in user.withdrawal_requests.all():
        if wr.status in ["waiting", "accepted"]:
            if raise_exception:
                raise APIException(
                    "You can not create a withdrawal request because your account balance is too low or you have an outstanding withdrawal request."
                )
            return False
    return True


def is_cancellable(wr, raise_exception=True):
    if wr.status == "waiting":
        return True
    if raise_exception:
        raise ValidationError(_("This request can't be cancelled"))
    return False


def is_updatable(wr, raise_exception=True):
    if wr.status == "waiting":
        return True
    if raise_exception:
        raise ValidationError(_("This withdrawal request is not updatable."))
    return False


def qr_is_available(wr):
    if wr.status == "accepted":
        return True
    return False
