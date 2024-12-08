from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.exceptions import APIException

from payment.functions import create_qr
from payment.models import Qr
from payment.serializers import QrPaymentSerializer
from user.serializers import *
from user.functions import account_balance
from orders.models import Order
from orders.serializers import OrderSerializer
from orders.fuctions import *

from money.models import *
from money.fuctions import *
from money.validators import *


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        exclude = ["user"]


class BalanceFluctuationSerializer(serializers.ModelSerializer):
    reason = serializers.SerializerMethodField()

    class Meta:
        model = BalanceFluctuation
        exclude = ["user"]

    def get_account_reason(self, account_reason):
        reason_attrs = ["change", "customer_cancelled", "admin_cancelled", "withdrawal"]
        for reason_attr in reason_attrs:
            reason_obj = getattr(account_reason, reason_attr)
            if reason_obj:
                return (reason_attr, reason_obj)

    def get_reason(self, obj):
        request = self.context.get("request")
        (reason_attr, reason_obj) = self.get_account_reason(obj.reason)

        if isinstance(reason_obj, Order):
            order = reason_obj
            reason_url = reverse(
                "order-detail", kwargs={"pk": order.pk}, request=request
            )
            qr = order_qr(order)

        if isinstance(reason_obj, WithdrawalRequest):
            wr = reason_obj
            reason_url = reverse(
                "withdrawal-request-detail", kwargs={"pk": wr.pk}, request=request
            )
            qr = wr_qr(wr)

        if qr is None:
            qr_url = None
        else:
            qr_url = reverse("qr-detail", kwargs={"pk": qr.pk}, request=request)
        data = {
            reason_attr: reason_url,
            "qr_detail_url": qr_url,
        }

        return data


class WithdrawalRequestStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalRequestStatus
        fields = "__all__"
        # exclude = ["withdrawal_request"]


class WithdrawalRequestGetInfo:
    def user(self):
        return self.context.get("request").user

    def request(self):
        return self.context.get("request")


class WithdrawalRequestSerializer(
    WithdrawalRequestGetInfo, serializers.ModelSerializer
):
    def create_withdrawal_request(self, validated_data):
        user = self.user()
        validated_data["user"] = user
        validated_data["withdrawal_amount"] = account_balance(user)
        return super().create(validated_data)

    def create_wr_status(self, wr, status, message=""):
        return WithdrawalRequestStatus.objects.create(
            withdrawal_request=wr,
            status=status,
            message=message,
        )


class WithdrawalRequestListCreateSerializer(WithdrawalRequestSerializer):
    message = serializers.CharField(allow_blank="True", write_only=True)
    detail_url = serializers.HyperlinkedIdentityField(
        view_name="withdrawal-request-detail"
    )

    class Meta:
        model = WithdrawalRequest
        fields = [
            # write_only
            "message",
            "beneficiary_bank",
            "account_number",
            "the_beneficiarys_name",
            # read_only
            "id",
            "withdrawal_amount",
            "status",
            "detail_url",
        ]
        write_only_fields = [
            "beneficiary_bank",
            "account_number",
            "the_beneficiarys_name",
        ]
        extra_kwargs = {field: {"write_only": True} for field in write_only_fields}
        read_only_fields = ["withdrawal_amount", "status"]

    def create(self, validated_data):
        message = validated_data.pop("message", "")

        if can_create_wr(self.user()):
            wr = self.create_withdrawal_request(validated_data)
            self.create_wr_status(wr, "waiting", message)
            return wr


class WithdrawalRequestRetreiveSerializer(WithdrawalRequestSerializer):
    wr_statuses = WithdrawalRequestStatusSerializer(read_only=True, many=True)
    cancell_url = serializers.SerializerMethodField()
    qr_urls = serializers.SerializerMethodField()

    class Meta:
        model = WithdrawalRequest
        fields = [
            # read_only
            "id",
            "beneficiary_bank",
            "account_number",
            "the_beneficiarys_name",
            "withdrawal_amount",
            "wr_statuses",
            "cancell_url",
            "qr_urls",
        ]

    def get_cancell_url(self, obj):
        if is_cancellable(obj, raise_exception=False):
            url = reverse("withdrawal-request-cancell", request=self.request())
            return url + f"?pk={obj.pk}"

    def get_qr_urls(self, obj):
        if qr_is_available(obj):
            qr = wr_qr(obj)
            return QrPaymentSerializer(qr, context=self.context).data


class WithdrawalRequestCancellSerializer(WithdrawalRequestSerializer):
    class Meta:
        model = WithdrawalRequestStatus
        fields = [
            "withdrawal_request",
            "message",
        ]

    def create(self, validated_data):
        wr = validated_data["withdrawal_request"]

        if is_cancellable(wr):
            validated_data["status"] = "customer_cancelled"
            return super().create(validated_data)
