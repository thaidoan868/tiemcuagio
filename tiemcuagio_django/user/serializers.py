from django.shortcuts import get_object_or_404
from rest_framework.reverse import reverse
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from user.models import *
from user.functions import purchased_amount, account_balance
from orders.models import Order


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"


class NotificationListSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    ids = serializers.ListField(
        allow_empty=False,
        child=serializers.IntegerField(min_value=0),
        write_only=True,
    )

    class Meta:
        model = Notification
        fields = [
            # write_only_fields
            "ids",
            # read_only_fields
            "id",
            "message",
            "read",
            "date",
        ]
        read_only_fields = fields[1:]

    def create(self, validated_data):
        user = self.context.get("request").user
        ids = validated_data["ids"]
        objs = []
        for id in ids:
            obj = get_object_or_404(Notification, pk=id)
            if obj.user != user:
                raise PermissionDenied("You are not the owner of this notification")
            objs.append(obj)

        for obj in objs:
            obj.read = True
            obj.save()

        return Notification.objects.all().first()

    def get_date(self, obj):
        return obj.datetime.strftime("%d/%m/%y")


class ProfileNavbarSerializer(serializers.ModelSerializer):
    carts = serializers.SerializerMethodField()
    notifications = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "full_name",
            "avatar",
            "carts",
            "notifications",
        ]

    def get_carts(self, obj):
        return obj.user.carts.all().count()

    def get_notifications(self, obj):
        return obj.user.notifications.filter(read=False).count()


class PrivateProfileSerializer(serializers.ModelSerializer):
    level = LevelSerializer(read_only=True)
    processing_orders = serializers.SerializerMethodField()
    balance_fluctuations_url = serializers.SerializerMethodField()
    account_balance = serializers.SerializerMethodField()
    purchased_amount = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            # write_and_read
            "full_name",
            "phone_number",
            "address",
            "avatar",
            # read_only
            "level",
            "processing_orders",
            "purchased_amount",
            "account_balance",
            "balance_fluctuations_url",
        ]
        read_only_fields = ["psid"]

    def get_processing_orders(self, obj):
        orders = Order.objects.filter(user=obj.user)
        processing_order = 0

        for order in orders:
            if order.status in ["paid", "done_shipped", "accepted"]:
                processing_order += 1
        return processing_order

    def get_purchased_amount(self, obj):
        return purchased_amount(obj.user)

    def get_balance_fluctuations_url(self, obj):
        request = self.context.get("request", None)
        if request is not None:
            return reverse("user-balance-fluctuation", request=request)

    def get_account_balance(self, obj):
        return account_balance(obj.user)


class PublicProfileSerializer(serializers.ModelSerializer):
    level = LevelSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            "avatar",
            "full_name",
            "level",
        ]
        read_only_fields = ["full_name", "avatar"]
