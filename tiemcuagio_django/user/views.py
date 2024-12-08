from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import permissions

from user.serializers import *
from tiemcuagio_django.mixins import *


class ProfileNavbarAPIView(AuthenticationMixin, generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileNavbarSerializer

    def get_object(self):
        return self.request.user.profile


class ProfileRetrieveUpdateAPIView(
    ProfileNavbarAPIView, generics.RetrieveUpdateAPIView
):
    permission_classes = [
        permissions.IsAuthenticated,
        OnlyAllowOwnerEditPermission,
    ]
    serializer_class = PrivateProfileSerializer


class NotificationListEditAPIView(
    AuthenticationMixin, UserQuerySetMixin, generics.ListCreateAPIView
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationListSerializer

    def get_queryset(self):
        return self.request.user.notifications.order_by("-datetime")[:15]


class RanksListAPIView(generics.ListAPIView):
    serializer_class = PublicProfileSerializer

    def get_queryset(self):
        qs = []
        amount_and_user = []
        users = get_user_model().objects.all()
        for user in users:
            amount = purchased_amount(user)
            amount_and_user.append((amount, user))

        amount_and_user = sorted(amount_and_user, key=lambda x: x[0], reverse=True)
        for i in range(3):
            user = amount_and_user[i][1]
            qs.append(user.profile)

        return qs
