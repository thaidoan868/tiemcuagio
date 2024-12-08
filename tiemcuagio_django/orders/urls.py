from django.urls import path
from orders import views


urlpatterns = [
    path(
        "list_create/",
        views.OrderListCreateAPIView.as_view(),
        name="order-list-create",
    ),
    path(
        "<int:pk>/detail",
        views.OrderRetreiveAPIView.as_view(),
        name="order-detail",
    ),
    path(
        "cancell/",
        views.OrderCancellAPIView.as_view(),
        name="order-cancell",
    ),
    path(
        "api/order/<int:pk>/change_payment_method/",
        views.OrderChangePaymentMethodAPIView.as_view(),
        name="order-change-payment-method",
    ),
]
