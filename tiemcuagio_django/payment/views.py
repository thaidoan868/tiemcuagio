from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from payment.models import Qr
from payment.serializers import *
from payment.permissions import HasAPIKey
from tiemcuagio_django.mixins import AuthenticationMixin


class QrStatusAPIView(AuthenticationMixin, generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QrStatusSerializer
    queryset = Qr.objects.all()

    def get_object(self):
        # permissions checking
        qr = super().get_object()
        user = self.request.user
        owner_of_qr = qr.order.user if qr.order else qr.withdrawal_request.user

        if user == owner_of_qr or user.is_staff:
            return qr
        else:
            raise PermissionDenied()


class QrRetreiveAPIView(QrStatusAPIView):
    serializer_class = QrSerializer


class SePayWebhookAPIView(generics.CreateAPIView):
    permission_classes = [HasAPIKey]
    serializer_class = ReceiptSerializer
