from rest_framework import serializers

from carts.models import Cart
from products.serializers import ProductBasicSerializer, ProductGeneralSerializer


class CartListCreateSerializer(serializers.ModelSerializer):
    product_detail = ProductGeneralSerializer(source="product", read_only=True)
    edit_url = serializers.HyperlinkedIdentityField(view_name="cart-update-destroy")

    class Meta:
        model = Cart
        fields = [
            # write_and_read
            "product",
            "quantity",
            # read_only
            "product_detail",
            "edit_url",
            "id",
            "chosen",
        ]
        read_only_fields = ["chosen"]

    def create(self, validated_data):
        user = self.context.get("request").user
        product = validated_data["product"]
        quantity = validated_data["quantity"]
        try:
            quantity += Cart.objects.get(user=user, product=product).quantity
        except:
            ...

        cart_obj, created = Cart.objects.update_or_create(
            defaults={"quantity": quantity},
            create_defaults={"user": user, "product": product, "quantity": quantity},
            user=user,
            product=product,
        )
        return cart_obj


class CartUpdateDestroySerializer(serializers.ModelSerializer):
    product = ProductBasicSerializer(read_only=True)
    quantity = serializers.IntegerField(min_value=1)

    class Meta:
        model = Cart
        fields = [
            # write_and_read
            "quantity",
            "chosen",
            # read_only
            "product",
        ]
