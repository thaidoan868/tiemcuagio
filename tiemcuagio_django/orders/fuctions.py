from user.models import Notification


def order_qr(order):
    return order.qr_set.all().order_by("-datetime").first()


def notify(order, new_status, message=""):
    # notifies user the new_status of the order

    notifications = {
        "customer_cancelled": f"Bạn đã hủy đơn bánh #{order.pk}",
        "admin_cancelled": f"Chúng tôi đã hủy đơn bánh #{order.pk} vì {message}",
        "paid": f"Đã tạo đơn #{order.pk}",
        "accepted": f"Admin đã chấp nhận đơn bánh #{order.pk}",
        "done_shipped": f"Đã làm xong và đang giao đơn bánh #{order.pk}",
        "completed": f"Đã giao đơn #{order.pk}",
    }
    if notifications.get(new_status):
        Notification(
            user=order.user,
            message=notifications[new_status],
        ).save()
