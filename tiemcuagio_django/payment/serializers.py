import datetime
from rest_framework import serializers
from payment.models import Qr, Receipt
from urllib.parse import urlencode


class ReceiptSerializer(serializers.ModelSerializer):
    success = serializers.BooleanField(default=True)

    class Meta:
        model = Receipt
        fields = "__all__"


class QrStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qr
        fields = ["status"]


class QrPaymentSerializer(serializers.ModelSerializer):
    vietqr_url = serializers.SerializerMethodField(read_only=True)
    qr_status_url = serializers.HyperlinkedIdentityField(view_name="qr-status")

    class Meta:
        model = Qr
        fields = [
            # read_only
            "id",
            "vietqr_url",
            "qr_status_url",
            "expired",
        ]

    def get_vietqr_url(self, obj):
        now = datetime.datetime.now(datetime.timezone.utc)
        if obj.expired > now:
            template = "compact2"
            endpoint = f"https://img.vietqr.io/image/{obj.beneficiary_bank}-{obj.account_number}-{template}.jpg?"
            params = {
                "amount": obj.total_payment,
                "addInfo": obj.id,
                "accountName": obj.the_beneficiarys_name,
            }
            return endpoint + urlencode(params)


class QrSerializer(serializers.ModelSerializer):
    receipt = ReceiptSerializer()

    class Meta:
        model = Qr
        fields = "__all__"
