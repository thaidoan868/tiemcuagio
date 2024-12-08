from django.contrib import admin
from home.models import *


# Register your models here.
class SliderImageInline(admin.TabularInline):
    model = SliderImage
    extra = 1


# @admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    inlines = [SliderImageInline]


# admin.site.register(Logo)
