from django.db import models


# Create your models here.
class Logo(models.Model):
    image = models.ImageField(upload_to="logo/")


class Slider(models.Model):
    name = models.CharField(max_length=200)


class SliderImage(models.Model):
    slider = models.ForeignKey(Slider, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="slider-images/")
