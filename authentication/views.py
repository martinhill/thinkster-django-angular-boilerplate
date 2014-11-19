from django.contrib.auth.models import User
from rest_framework import generics
from authentication.serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status, views
from rest_framework.response import Response
import json


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                serialized = UserSerializer(user)

                return Response(serialized.data)
            else:
                return Response({
                    'error': 'Awkward! Your account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'error': 'Looks like your username or password is wrong. :('
            }, status=status.HTTP_400_BAD_REQUEST)
