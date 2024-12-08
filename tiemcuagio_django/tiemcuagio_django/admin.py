from django.contrib import admin
from orders.admin import OrderAdmin
from orders.models import Order
from products.admin import ProductAdmin
from products.models import Product, Category
from home.admin import SliderAdmin
from home.models import Logo, Slider
from money.admin import WithdrawalRequestAdmin
from money.models import WithdrawalRequest
from user.models import Level


class AdminPanelArea(admin.AdminSite):
    site_header = "Tiệm của Gió admin"
    site_title = "Admin"


admin_panel = AdminPanelArea(name="AdminPanel")
admin_panel.register(Order, OrderAdmin)
admin_panel.register(Product, ProductAdmin)
admin_panel.register(Category)
admin_panel.register(Logo)
admin_panel.register(Slider, SliderAdmin)
admin_panel.register(WithdrawalRequest, WithdrawalRequestAdmin)
admin_panel.register(Level)


admin.site.site_title = "Admin"
admin.site.index_title = "All models"
admin.site.site_header = "Tiemcuagio Admin"
