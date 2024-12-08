from django.contrib import admin
from django.db import models
from django.forms import Textarea
from money.models import *


# Register your models here.
class WrStatusInline(admin.TabularInline):
    model = WithdrawalRequestStatus
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


# @admin.register(WithdrawalRequest)
class WithdrawalRequestAdmin(admin.ModelAdmin):
    inlines = [WrStatusInline]
    list_display = ["user", "withdrawal_amount", "status"]
    list_filter = ["date", "status"]
    fields = [
        "user",
        "beneficiary_bank",
        "account_number",
        "the_beneficiarys_name",
        "withdrawal_amount",
        "status",
        "date",
    ]
    readonly_fields = fields

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=...):
        return False


# admin.site.register(
#     [
#         BankAccount,
#         WithdrawalRequest,
#         WithdrawalRequestStatus,
#         Reason,
#         BalanceFluctuation,
#     ]
# ) 
