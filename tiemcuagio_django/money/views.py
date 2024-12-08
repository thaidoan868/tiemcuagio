from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

from money.serializers import *
from money.models import BalanceFluctuation
from tiemcuagio_django.mixins import *
from tiemcuagio_django.functions import admin_owner_edit_permission


class BankAcountRetreiveUpdateAPIView(
    AuthenticationMixin, generics.RetrieveUpdateAPIView
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BankAccountSerializer
    queryset = BankAccount.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        user = self.request.user
        return BankAccount.objects.get(user=user)


class BalanceFluctuationListAPIView(
    AuthenticationMixin, UserQuerySetMixin, generics.ListAPIView
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BalanceFluctuationSerializer
    queryset = BalanceFluctuation.objects.all()


class WithdrawalRequestListCreateAPIView(
    AuthenticationMixin, UserQuerySetMixin, generics.ListCreateAPIView
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WithdrawalRequestListCreateSerializer
    queryset = WithdrawalRequest.objects.all()


class WithdrawalRequestRetrieveAPIView(
    AuthenticationMixin,
    OnlyAllowOwnerEditPermission,
    generics.RetrieveAPIView,
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WithdrawalRequestRetreiveSerializer
    queryset = WithdrawalRequest.objects.all()

class WithdrawalRequestCancellAPIView(AuthenticationMixin, generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WithdrawalRequestCancellSerializer

    def perform_create(self, serializer):
        # only the owner or admin can cancell the withdrawal request
        wr = serializer.validated_data["withdrawal_request"]
        admin_owner_edit_permission(self.request, wr)
        return super().perform_create(serializer)
