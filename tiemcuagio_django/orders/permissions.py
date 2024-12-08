from rest_framework.exceptions import PermissionDenied


def is_owner(obj, user):
    if obj.user == user:
        return True
    else:
        raise PermissionDenied(
            detail=f"You are not the owner of the obj with id {obj.pk}"
        )
