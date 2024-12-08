from rest_framework import permissions
from rest_framework import authentication


class UserQuerySetMixin:
    user_field = "user"
    allow_staff_view = True

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        lookup_data = {}
        lookup_data[self.user_field] = user
        qs = super().get_queryset(*args, **kwargs)

        if self.allow_staff_view and user.is_staff:
            return qs
        return qs.filter(**lookup_data)


class OnlyAllowOwnerEditPermission(permissions.BasePermission):
    allow_staff_edit = True

    def has_object_permission(self, request, view, obj):
        user = request.user

        if self.allow_staff_edit and user.is_staff:
            return True
        if user == obj.user:
            return True
        return False


class AuthenticationMixin:
    authentication_classes = [
        authentication.TokenAuthentication,
        authentication.SessionAuthentication,
        #authentication.RemoteUserAuthentication,
    ]


class SerializerAutoAddUserMixin:
    user_field = "user"

    def create(self, validated_data):
        user = self.context.get("request").user
        validated_data[self.user_field] = user

        return super().create(validated_data)
