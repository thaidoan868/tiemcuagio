from django.shortcuts import render, redirect
from django.contrib import auth


def home(request, *args, **kwargs):
    return render(request, "home.html")


def logout(request, *args, **kwargs):
    auth.logout(request)
    return redirect("/")
