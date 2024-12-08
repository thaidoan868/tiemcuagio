from django.contrib.auth.models import User
from rest_framework.exceptions import PermissionDenied


def list_to_choices(list):
    choices = {}
    for item in list:
        choices[item] = item
    return choices


def get_deleted_user():
    return User.objects.get(username="deleted_user")


def get_parent_obj(*args, class_view_instance, model, url_pk_keyword="pk"):
    from rest_framework import generics

    filter = {}
    filter["pk"] = class_view_instance.kwargs[url_pk_keyword]
    parent_qs = model.objects.all()

    parent_obj = generics.get_object_or_404(parent_qs, **filter)
    return parent_obj


def admin_owner_edit_permission(request, obj):
    user = request.user
    if user.is_staff or user == obj.user:
        return True
    else:
        raise PermissionDenied()


def admin_edit_permission(request, obj):
    user = request.user
    if user.is_staff:
        return True
    else:
        raise PermissionDenied()
