from django.contrib.auth.models import User
from rest_framework import generics, permissions
from authentication.serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):
    # permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
