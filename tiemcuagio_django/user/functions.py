from user.models import Notification, Level
from django.db.models import Max


def account_balance(user):
    balance_fluctuations = user.balance_fluctuations.all()
    total_amount = 0

    for balance_fluctuation in balance_fluctuations:
        total_amount += balance_fluctuation.amount

    return total_amount


def purchased_amount(user):
    orders = user.orders.all()
    total_amount = 0

    for order in orders:
        status = order.order_statuses.all().order_by("-datetime").first()
        if status.status == "completed":
            total_amount += order.total_payment

    return total_amount


def can_update_level(level):
    max_level = Level.objects.aggregate(Max("level"))["level__max"]
    if level >= max_level:
        return False
    return True


def update_level(user):
    amount = purchased_amount(user)
    current_level = user.profile.level.level

    if can_update_level(current_level):
        next_level = Level.objects.get(level=current_level + 1)
        next_level_amount = next_level.purchased_amount

        if amount >= next_level_amount:
            user.profile.level = next_level
            user.profile.save()
            Notification(
                user=user,
                message=f"Bạn vừa trở thành '{next_level.name}' của tiệm",
            ).save()
