from rest_framework import serializers
from products.models import *
from rest_framework.reverse import reverse


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image"]


class ProductBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
        ]


class ProductGeneralSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name="product-detail")
    add_to_cart_url = serializers.SerializerMethodField(read_only=True)
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "images",
            "detail_url",
            "add_to_cart_url",
        ]

    def get_add_to_cart_url(self, obj):
        request = self.context.get("request")
        url = reverse("add-to-cart", request=request)
        url += f"?product_pk={obj.pk}"

        return url


class ProductDetailSerializer(serializers.ModelSerializer):
    comment_list_create_url = serializers.SerializerMethodField(read_only=True)
    images = ProductImageSerializer(many=True)
    add_to_cart_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "category",
            "id",
            "name",
            "price",
            "images",
            "description",
            "ingredients",
            "weight",
            "size",
            "comment_list_create_url",
            "add_to_cart_url",
        ]

    def get_comment_list_create_url(self, obj):
        request = self.context.get("request", None)
        if request is None:
            return None
        url = reverse("comment-list-create", request=request)
        url += f"?product_pk={obj.id}"
        return url

    def get_add_to_cart_url(self, obj):
        request = self.context.get("request")
        url = reverse("add-to-cart", request=request)
        url += f"?product_pk={obj.pk}"

        return url


class CategoryListSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name="category-retreive")

    class Meta:
        model = Category
        fields = ["detail_url"]


class CategoryRetreiveSerializer(serializers.ModelSerializer):
    products = ProductGeneralSerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"
