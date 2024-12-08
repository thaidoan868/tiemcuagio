from django.urls import path
from carts import views


urlpatterns = [
    path(
        "list_create_increase/",
        views.CartListCreateAPIView.as_view(),
        name="add-to-cart",
    ),
    path(
        "<int:pk>/update_destroy/",
        views.CartUpdateDestroyAPIView.as_view(),
        name="cart-update-destroy",
    ),
]
