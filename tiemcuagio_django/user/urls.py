from django.urls import path
from user import views


urlpatterns = [
    path("retrieve_update/", views.ProfileRetrieveUpdateAPIView.as_view()),
    path("navbar/", views.ProfileNavbarAPIView.as_view()),
    path("notifications/", views.NotificationListEditAPIView.as_view()),
    path("ranks/", views.RanksListAPIView.as_view()),
]
