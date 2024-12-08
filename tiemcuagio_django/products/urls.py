from django.urls import path
from products import views

urlpatterns = [
    path("category/", views.CategoryListAPIView.as_view()),
    path(
        "category/<str:pk>/retreive/",
        views.CategoryRetreiveAPIView.as_view(),
        name="category-retreive",
    ),
    path(
        "<int:pk>/",
        views.ProductDetailAPIView.as_view(),
        name="product-detail",
    ),
    path(
        "<int:pk>/overview/",
        views.ProductOverviewAPIView.as_view(),
    ),
]
