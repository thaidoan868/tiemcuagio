from django.urls import path
from home import views

urlpatterns = [
    path("<int:pk>/slider/", views.SliderRetreiveAPIClass.as_view()),
    path("<int:pk>/logo/", views.LogoRetreiveAPIClass.as_view()),
]
