from django.contrib import admin
from products.models import *


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3


class ProductAdmin(admin.ModelAdmin):
    list_display = ["category", "name"]
    inlines = [ProductImageInline]


# admin.site.register(Product, ProductAdmin)
# admin.site.register(Category)
