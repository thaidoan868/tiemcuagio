from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db.models import Max


def has_number_validator(value):
    for char in value:
        if char.isdigit():
            raise ValidationError(_("Chuỗi không được chứa số!"))


def level_validator(level, LevelModel):
    max_level = LevelModel.objects.aggregate(Max("level", default=-1))["level__max"]

    if level != max_level + 1:
        raise ValidationError(
            _("Level phải theo thứ tự, level tiếp theo phải là: %(new_level)s"),
            params={"new_level": max_level + 1},
        )


def purchased_amount_validator(amount, LevelModel):
    max_amount = LevelModel.objects.aggregate(Max("purchased_amount", default=-1))[
        "purchased_amount__max"
    ]

    if amount and amount <= max_amount:
        raise ValidationError(
            _("Số tiền đã mua phải lớn hơn %(max_amount)s"),
            params={"max_amount": max_amount},
        )
