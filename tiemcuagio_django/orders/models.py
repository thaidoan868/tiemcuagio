import datetime
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import User
from products.models import Product
from orders.validators import *

from tiemcuagio_django.functions import list_to_choices

statuses = [
    "unpaid",
    "paid",
    "customer_cancelled",
    "admin_cancelled",
    "accepted",
    "done_shipped",
    "completed",
]
status_choices = list_to_choices(statuses)


class Order(models.Model):
    paymen_methods = ["cod", "credit_card"]
    paymen_methods_choices = list_to_choices(paymen_methods)

    title = models.CharField(max_length=30)
    user = models.ForeignKey(User, related_name="orders", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13)
    address = models.CharField(max_length=100)
    print_invoice = models.BooleanField(default=True)
    message = models.TextField(blank=True, null=True)

    payment_method = models.CharField(choices=paymen_methods_choices, max_length=15)
    cash = models.PositiveIntegerField(default=0)
    credit_card = models.PositiveIntegerField(default=0)
    total_payment = models.PositiveIntegerField(default=0)

    status = models.CharField(max_length=20, choices=status_choices, blank=True)
    date = models.DateField(auto_now_add=True)

    def save(self, **kwargs):
        if self.pk:
            # sets title: don_n_dd-mm
            today = datetime.date.today()
            nth_order = Order.objects.filter(date=today).count()
            today = today.strftime("%d-%m")
            self.title = f"don_{nth_order}_ngay_{today}"
        super().save(**kwargs)


class OrderedProduct(models.Model):
    order = models.ForeignKey(Order, related_name="products", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200, blank=True)
    price = models.PositiveIntegerField(blank=True, null=True)
    quantity = models.PositiveSmallIntegerField()
    total_money = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["order", "product"], name="unique_ordered_product"
            )
        ]

    def save(self, **kwargs):
        self.name = self.product.name
        self.price = self.product.price
        self.total_money = self.product.price * self.quantity
        return super().save(**kwargs)


class OrderStatus(models.Model):

    order = models.ForeignKey(
        Order, related_name="order_statuses", on_delete=models.CASCADE
    )
    datetime = models.DateTimeField(auto_now_add=True)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=status_choices)

    def clean(self):
        if self.status == "admin_cancelled":
            if is_cancellable(self.order):
                return super().clean()

        elif self.status in ["accepted", "done_shipped", "completed"]:
            if new_status_validation(self.order, self.status):
                return super().clean()

        raise ValidationError(
            _(
                "Status must be either admin_cancelled, accepted, done_shipped or completed"
            )
        )


def get_sentinel_product(): ...
