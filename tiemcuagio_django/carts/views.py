from rest_framework import generics
from rest_framework import authentication, permissions

from carts.serializers import CartListCreateSerializer, CartUpdateDestroySerializer
from carts.models import Cart
from products.models import Product
from tiemcuagio_django.permissions import OnlyAllowOwnerEditPermission
from tiemcuagio_django.mixins import AuthenticationMixin, UserQuerySetMixin


class CartListCreateAPIView(AuthenticationMixin, UserQuerySetMixin, generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartListCreateSerializer
    queryset = Cart.objects.all()


class CartUpdateDestroyAPIView(AuthenticationMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        OnlyAllowOwnerEditPermission,
    ]
    serializer_class = CartUpdateDestroySerializer
    queryset = Cart.objects.all()
