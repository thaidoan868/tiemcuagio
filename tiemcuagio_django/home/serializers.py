from rest_framework import serializers
from home.models import *


class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImage
        fields = ["image"]


class SliderRetreiveSerializer(serializers.ModelSerializer):
    images = SliderImageSerializer(many=True)
    class Meta:
        model = Slider
        fields = "__all__"
    
    
class LogoRetreiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo
        fields = "__all__"