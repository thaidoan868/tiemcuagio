import datetime
from payment.models import Qr
from tiemcuagio_django.settings import ADMIN_BANK_ACCOUNT


def create_qr(order=None, withdrawal_request=None, expired=15, weeks=0):
    if order is None and withdrawal_request is None:
        raise Exception("Both order and withdrawal_request can not be None")
    if order and withdrawal_request:
        raise Exception("One qr is created for only one reason.")

    now = datetime.datetime.now()
    mins = datetime.timedelta(minutes=expired, weeks=weeks)
    total_payment = (
        order.total_payment if order else withdrawal_request.withdrawal_amount
    )
    qr = Qr(
        order=order,
        withdrawal_request=withdrawal_request,
        expired=now + mins,
        beneficiary_bank=ADMIN_BANK_ACCOUNT["beneficiary_bank"],
        account_number=ADMIN_BANK_ACCOUNT["account_number"],
        the_beneficiarys_name=ADMIN_BANK_ACCOUNT["the_beneficiarys_name"],
        total_payment=total_payment,
    )
    qr.save()
    return qr
