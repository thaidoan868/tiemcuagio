from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.exceptions import APIException

from payment.serializers import QrPaymentSerializer
from carts.models import Cart
from money.models import *

from orders.fuctions import *
from orders.models import *
from django.utils.translation import gettext_lazy as _


class OrderStatusSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderStatus
        fields = [
            "status",
            "message",
            "date",
        ]

    def get_date(self, obj):
        return obj.datetime.strftime("%d/%m")


class OrderedProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderedProduct
        fields = [
            # write_only
            "order",
            # write_and_read
            "product",
            "quantity",
            # read_only
            "name",
            "price",
            "total_money",
        ]
        extra_kwargs = {"order": {"write_only": True}}
        read_only_fields = [
            "name",
            "price",
            "total_money",
        ]


class OrderSerializer(serializers.ModelSerializer):
    """
    Base class for all other order serializers
    """

    def request(self):
        return self.context.get("request")

    def create_order(self, validated_data, *args):
        user = self.request().user
        cart_objs = Cart.objects.filter(user=user, chosen=True)
        if cart_objs.first() == None:
            raise APIException("Cart can't be empty")
        # creates the order
        validated_data["user"] = user
        order = super().create(validated_data)

        # converts cart objects to ordered products

        for cart_obj in cart_objs:
            OrderedProduct.objects.create(
                order=order, product=cart_obj.product, quantity=cart_obj.quantity
            )
            cart_obj.delete()

        # total_payment = all ordered products of the order
        total_payment = 0
        for ordered_product in order.products.all():
            total_payment += ordered_product.total_money

        order.total_payment = total_payment
        order.save()
        return order

    def cod_setup(self, order, message=""):
        OrderStatus.objects.create(order=order, status="paid", message=message)
        return order

    def credit_card_setup(self, order, message=""):
        OrderStatus.objects.create(order=order, status="unpaid", message=message)
        return order


class OrderListCreateSerializer(OrderSerializer):
    # read_only
    detail_url = serializers.HyperlinkedIdentityField(view_name="order-detail")
    date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = [
            # write_only
            "name",
            "phone_number",
            "address",
            "print_invoice",
            # write_and_read
            "message",
            "payment_method",
            # read_only
            "id",
            "date",
            "status",
            "total_payment",
            "detail_url",
        ]
        write_only_fields = [
            "name",
            "phone_number",
            "address",
            "print_invoice",
        ]
        extra_kwargs = {field: {"write_only": True} for field in write_only_fields}
        read_only_fields = [
            "date",
            "status",
            "title",
            "total_payment",
            "detail_url",
        ]

    def create(self, validated_data):
        order = self.create_order(validated_data)

        if validated_data["payment_method"] == "cod":
            return self.cod_setup(order)
        if validated_data["payment_method"] == "credit_card":
            return self.credit_card_setup(order)

    def get_date(self, obj):
        return obj.date.strftime("%d/%m/%Y")


class OrderRetreiveSerializer(OrderSerializer):
    date = serializers.SerializerMethodField(read_only=True)
    order_statuses = OrderStatusSerializer(many=True)
    products = OrderedProductSerializer(many=True)
    qr_urls = serializers.SerializerMethodField(read_only=True)
    change_payment_method_url = serializers.SerializerMethodField(read_only=True)
    cancell_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = [
            # read_only
            "id",
            "title",
            "name",
            "phone_number",
            "address",
            "print_invoice",
            "payment_method",
            "cash",
            "credit_card",
            "total_payment",
            "products",
            "order_statuses",
            "qr_urls",
            "change_payment_method_url",
            "cancell_url",
            "date",
            "message",
            # "update_url",
        ]

    def get_qr_urls(self, obj):
        if can_pay_with_qr(obj):
            qr = order_qr(obj)
            return QrPaymentSerializer(qr, context=self.context).data

    def get_change_payment_method_url(self, obj):
        if can_change_payment_method(obj, raise_exception=False):
            return reverse(
                "order-change-payment-method",
                kwargs={"pk": obj.pk},
                request=self.request(),
            )

    def get_cancell_url(self, obj):
        if is_cancellable(obj, raise_exception=False):
            url = reverse("order-cancell", request=self.request())
            return url + f"?pk={obj.pk}"

    def get_date(self, obj):
        return obj.date.strftime("%d/%m")


class OrderCancellSerializer(OrderSerializer):
    message = serializers.CharField(allow_blank=True)

    class Meta:
        model = OrderStatus
        fields = [
            # write_and_read
            "order",
            "message",
            # read_only
            "status",
        ]
        read_only_fields = [
            "status",
        ]

    def create(self, validated_data):
        if is_cancellable(validated_data["order"], raise_APIException=True):
            validated_data["status"] = "customer_cancelled"
            return super().create(validated_data)


class OrderUpdatePaymentMethodSerializer(OrderSerializer):
    class Meta:
        model = Order
        fields = ["payment_method"]

    def update(self, order, validated_data):
        payment_method = validated_data["payment_method"]

        if can_change_payment_method(order):
            if payment_method == "cod":
                self.cod_setup(order)
            elif payment_method == "credit_card":
                self.credit_card_setup(order)
            return super().update(order, validated_data)
