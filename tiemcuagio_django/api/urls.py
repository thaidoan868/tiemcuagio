from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("auth/", obtain_auth_token),
    path("user/", include("user.urls")),
    path("products/", include("products.urls")),
    path("comments/", include("comments.urls")),
    path("carts/", include("carts.urls")),
    path("orders/", include("orders.urls")),
    path("payment/", include("payment.urls")),
    path("money/", include("money.urls")),
    path("home/", include("home.urls")),
]
