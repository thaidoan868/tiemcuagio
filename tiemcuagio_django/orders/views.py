from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import APIException

from orders.models import Order
from orders.serializers import *
from money.models import *
from tiemcuagio_django.mixins import *
from tiemcuagio_django.functions import (
    admin_owner_edit_permission,
    admin_edit_permission,
)


class OrderListCreateAPIView(
    AuthenticationMixin, UserQuerySetMixin, generics.ListCreateAPIView
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderListCreateSerializer
    queryset = Order.objects.all().order_by("-id")
    allow_staff_view = False


class OrderRetreiveAPIView(AuthenticationMixin, generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, OnlyAllowOwnerEditPermission]
    serializer_class = OrderRetreiveSerializer
    queryset = Order.objects.all()


class OrderCancellAPIView(AuthenticationMixin, generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderCancellSerializer

    def perform_create(self, serializer):
        # only the owner or admin can cancell the order
        order = serializer.validated_data["order"]
        admin_owner_edit_permission(self.request, order)

        return super().perform_create(serializer)


class OrderChangePaymentMethodAPIView(AuthenticationMixin, generics.UpdateAPIView):
    permission_classes = [OnlyAllowOwnerEditPermission]
    serializer_class = OrderUpdatePaymentMethodSerializer
    queryset = Order.objects.all()
