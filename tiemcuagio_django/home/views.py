from rest_framework import generics
from home.serializers import *
from home.models import *


class SliderRetreiveAPIClass(generics.RetrieveAPIView):
    serializer_class = SliderRetreiveSerializer
    queryset = Slider.objects.all()


class LogoRetreiveAPIClass(generics.RetrieveAPIView):
    serializer_class = LogoRetreiveSerializer
    queryset = Logo.objects.all()