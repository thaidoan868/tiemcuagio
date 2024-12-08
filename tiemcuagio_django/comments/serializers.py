from rest_framework import serializers
from rest_framework import generics
from rest_framework.reverse import reverse

from comments.models import Comment, Reply
from user.serializers import PublicProfileSerializer
from user.models import Profile
from products.models import Product
from tiemcuagio_django.mixins import SerializerAutoAddUserMixin


class ReplyListCreateSerializer(
    SerializerAutoAddUserMixin, serializers.ModelSerializer
):
    user = PublicProfileSerializer(source="user.profile", read_only=True)
    edited = serializers.BooleanField(read_only=True)
    # user = serializers.SerializerMethodField(read_only=True)
    reply_edit_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reply
        fields = [
            # write_and_read
            "comment",
            "content",
            # read_only
            "user",
            "edited",
            "reply_edit_url",
            "id",
        ]

    # def get_user(self, obj):
    #     user_obj = Profile.objects.get(user=obj.user)
    #     return PublicProfileSerializer(user_obj).data

    def get_reply_edit_url(self, obj):
        # checks permission
        request = self.context.get("request", None)
        if obj.user == request.user:
            return reverse(
                "reply-edit",
                kwargs={"pk": obj.pk},
                request=request,
            )


class ReplyUpdateDestroySerializer(ReplyListCreateSerializer):
    class Meta:
        model = Reply
        fields = [
            # write_and_read
            "content",
            # read_only
            "user",
            "datetime",
            "edited",
            "id",
        ]

    def update(self, instance, validated_data):
        validated_data["edited"] = True

        return super().update(instance, validated_data)


class CommentListCreateSerializer(
    SerializerAutoAddUserMixin, serializers.ModelSerializer
):
    user = PublicProfileSerializer(source="user.profile", read_only=True)
    edited = serializers.BooleanField(read_only=True)
    edit_url = serializers.SerializerMethodField(read_only=True)
    reply_list_create_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = [
            # write_and_read
            "product",
            "content",
            # read_only
            "user",
            "edited",
            "edit_url",
            "reply_list_create_url",
            "datetime",
            "id",
        ]

    def get_edit_url(self, obj):
        request = self.context.get("request")
        if obj.user == request.user:
            return reverse(
                "comment-edit",
                kwargs={"pk": obj.pk},
                request=request,
            )

    def get_reply_list_create_url(self, obj):
        request = self.context.get("request")
        url = reverse(
            "reply-list-create",
            request=request,
        )
        url += f"?comment_pk={obj.id}"

        return url


class CommentUpdateDestroySerializer(CommentListCreateSerializer):
    class Meta:
        model = Comment
        fields = [
            # write_and_read
            "content",
            # read_only
            "user",
            "edited",
            "reply_list_create_url",
            "datetime",
            "id",
        ]

    def update(self, instance, validated_data):
        validated_data["edited"] = True

        return super().update(instance, validated_data)
