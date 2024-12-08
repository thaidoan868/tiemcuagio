from rest_framework import generics
from rest_framework import permissions

from products.serializers import *
from products.models import Product


class ProductListAPIView(generics.ListAPIView):
    # pagination
    serializer_class = ProductGeneralSerializer
    queryset = Product.objects.all()


class ProductOverviewAPIView(generics.RetrieveAPIView):
    # pagination
    serializer_class = ProductGeneralSerializer
    queryset = Product.objects.all()


class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()


class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategoryListSerializer
    queryset = Category.objects.all()


class CategoryRetreiveAPIView(generics.RetrieveAPIView):
    serializer_class = CategoryRetreiveSerializer
    queryset = Category.objects.all()
