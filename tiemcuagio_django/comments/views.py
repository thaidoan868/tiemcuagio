from rest_framework import generics
from rest_framework import permissions, authentication

from products.models import Product
from comments.models import Comment, Reply
from comments.permissions import OnlyAllowOwnerEditPermission
from comments.serializers import (
    CommentListCreateSerializer,
    CommentUpdateDestroySerializer,
    ReplyListCreateSerializer,
    ReplyUpdateDestroySerializer,
)
from tiemcuagio_django.mixins import AuthenticationMixin


class ReplyListCreateAPIView(AuthenticationMixin, generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ReplyListCreateSerializer
    queryset = Reply.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        comment_pk = self.request.query_params.get("comment_pk", None)

        if comment_pk and comment_pk.isnumeric():
            comment_pk = int(comment_pk)
            comment_obj = generics.get_object_or_404(Comment, pk=comment_pk)
            qs = Reply.objects.filter(comment=comment_obj).order_by("datetime")

        return qs


class ReplyUpdateDestroyAPIView(
    AuthenticationMixin, generics.RetrieveUpdateDestroyAPIView
):
    permission_classes = [
        permissions.IsAuthenticated,
        OnlyAllowOwnerEditPermission,
    ]
    serializer_class = ReplyUpdateDestroySerializer
    queryset = Reply.objects.all()


class CommentListCreateAPIView(AuthenticationMixin, generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    serializer_class = CommentListCreateSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        product_pk = self.request.query_params.get("product_pk", None)

        if product_pk and product_pk.isnumeric():
            product_pk = int(product_pk)
            product_obj = generics.get_object_or_404(Product, pk=product_pk)
            qs = qs.filter(product=product_obj).order_by("-datetime")

        return qs


class CommentUpdateDestroyAPIView(
    AuthenticationMixin, generics.RetrieveUpdateDestroyAPIView
):
    permission_classes = [
        permissions.IsAuthenticated,
        OnlyAllowOwnerEditPermission,
    ]
    serializer_class = CommentUpdateDestroySerializer
    queryset = Comment.objects.all()
