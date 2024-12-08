from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField


class Category(models.Model):
    id = models.CharField(max_length=200, primary_key=True)
    image = models.ImageField(upload_to="categories/")
    name = models.CharField(max_length=200)


class Product(models.Model):
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
    description = RichTextUploadingField(blank=True, null=True)
    ingredients = models.CharField(max_length=200, blank=True, null=True)
    price = models.PositiveIntegerField(default=0)
    weight = models.PositiveSmallIntegerField(blank=True, null=True)
    size = models.CharField(max_length=100, blank=True, null=True)


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name="images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="product-images/")
