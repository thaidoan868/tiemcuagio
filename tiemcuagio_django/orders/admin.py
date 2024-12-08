from django.contrib import admin
from orders.models import Order, OrderedProduct, OrderStatus
from django.db import models
from django.forms import Textarea


# Register your models here.
class OrderedProductInline(admin.TabularInline):
    model = OrderedProduct
    extra = 0

    def has_add_permission(self, request, obj):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class OrderStatusInline(admin.TabularInline):
    model = OrderStatus
    extra = 0
    fields = ["status", "message", "datetime"]
    readonly_fields = ["datetime"]
    formfield_overrides = {
        models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 40})},
    }

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# @admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderStatusInline, OrderedProductInline]
    list_display = ["title", "status", "total_payment"]
    list_filter = ("date", "status")
    fields = [
        "title",
        "user",
        "name",
        "phone_number",
        "address",
        "print_invoice",
        "payment_method",
        "cash",
        "credit_card",
        "total_payment",
        "status",
        "date",
    ]
    readonly_fields = fields

    # def has_add_permission(self, request):
    #     return False

    # def has_delete_permission(self, request, obj=None):
    #     return False


# admin.site.register([OrderedProduct])
