from payment.models import Qr
from user.models import Notification


def wr_qr(wr):
    return Qr.objects.filter(withdrawal_request=wr).order_by("-datetime").first()


def wr_notify(wr, new_status):
    # notifies new status of withdrawal request
    notifications = {
        "admin_refused": "Admin đã từ chối yêu cầu rút tiền của bạn",
        "accepted": "Đã chấp nhận yêu cầu rút tiền",
        "completed": "Rút tiền thành công!",
    }
    if notifications.get(new_status):
        Notification.objects.create(
            user=wr.user,
            message=notifications[new_status],
        )
