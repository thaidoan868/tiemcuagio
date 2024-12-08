from django.urls import path
from payment import views


urlpatterns = [
    path("<str:pk>/qr_status/", views.QrStatusAPIView.as_view(), name="qr-status"),
    path("sepaywebhook/", views.SePayWebhookAPIView.as_view()),
    path("<str:pk>/qr_detail/", views.QrRetreiveAPIView.as_view(), name="qr-detail"),
]
