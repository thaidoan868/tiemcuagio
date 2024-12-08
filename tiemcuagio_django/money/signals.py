from django.db.models.signals import post_save
from django.dispatch import receiver
from money.models import *
from payment.functions import create_qr
from money.fuctions import wr_notify


@receiver(post_save, sender=User)
def create_bank_acount(sender, instance, created, **kwargs):
    if created:
        BankAccount.objects.create(user=instance)


@receiver(post_save, sender=WithdrawalRequestStatus)
def create_status(sender, instance, created, **kwargs):
    if created:
        wr = instance.withdrawal_request
        wr.status = instance.status
        
        if wr.status == "accepted":
            create_qr(withdrawal_request=wr, weeks=2000)

        wr.save()
        if wr.status in ["admin_refused", "accepted", "completed"]:
            wr_notify(wr, wr.status)