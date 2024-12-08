import datetime
from django.contrib.auth import get_user_model
from user.functions import purchased_amount
from user.serializers import PublicProfileSerializer
from user.models import *
from orders.models import *
from carts.models import *
from products.models import Category, Product, ProductImage


def productDescription():
    print("++++++++++++==")
    category = "sponge"
    cattegory = Category.objects.get(pk=category)
    products = Product.objects.filter(category=category)
    for product in products:
        product.description = """
"""
        product.save()
        print(product.name)


def run():
    image = ProductImage.objects.all().first()
    print(image.image)
