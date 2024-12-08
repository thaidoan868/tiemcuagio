from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Max
from django.utils.translation import gettext_lazy as _
from user.validators import *
from django.db.models.signals import post_save


def test(value):
    raise ValidationError(_("ERROR"))


class Level(models.Model):
    level = models.PositiveIntegerField()
    name = models.CharField(max_length=100)
    displayed_name = models.CharField(max_length=100, blank=True)
    outline_frame = models.ImageField(upload_to="frames/", blank=True, null=True)
    avatar_frame = models.ImageField(upload_to="frames/", blank=True, null=True)
    detail_avatar_frame = models.ImageField(upload_to="frames/", blank=True, null=True)
    purchased_amount = models.PositiveIntegerField()

    def clean(self):
        if self.pk == None:
            level_validator(self.level, Level)
            purchased_amount_validator(self.purchased_amount, Level)


class Notification(models.Model):
    user = models.ForeignKey(
        User, related_name="notifications", on_delete=models.CASCADE
    )
    message = models.CharField(max_length=500)
    read = models.BooleanField(default=False)
    datetime = models.DateTimeField(auto_now_add=True)


def get_min_level():
    return Level.objects.order_by("level").first().pk


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    full_name = models.CharField(
        max_length=40, blank=True, validators=[has_number_validator]
    )
    phone_number = models.BigIntegerField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True)
    psid = models.CharField(max_length=20, blank=True)
    level = models.ForeignKey(
        Level,
        default=get_min_level,
        on_delete=models.PROTECT,
    )
    avatar = models.ImageField(
        default="avatars/default-avatar.png", upload_to="avatars/", null=False, blank=False
    )


# creates a profile when a new user signs up
def create_profile(sender, instance, created, **kwargs):
    full_name = instance.get_full_name()
    if created:
        Profile.objects.create(user=instance, full_name=full_name)


post_save.connect(create_profile, sender=User)
