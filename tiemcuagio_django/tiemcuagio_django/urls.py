"""
URL configuration for tiemcuagio_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from tiemcuagio_django import settings, views
from tiemcuagio_django.admin import admin_panel

urlpatterns = [
    path("django/admin/", admin.site.urls),
    path("django/accounts/", include("allauth.urls")),
    path("django/", views.home),
    path("django/logout", views.logout),
    path("django/api/", include("api.urls")),
    path("django/ckeditor/", include("ckeditor_uploader.urls")),
    path("django/admin_panel/", admin_panel.urls),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
