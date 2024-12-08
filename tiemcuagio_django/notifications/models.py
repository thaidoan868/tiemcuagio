from django.db import models
from django.contrib.auth.models import User
import uuid


class FacebookConnecting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expired = models.DateTimeField()


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
