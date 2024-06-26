from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from interns.models import Student
from django.contrib.auth.models import User
# from interns.views.expiringtoken import ExpiringToken
from django.db import transaction

from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
@permission_classes([AllowAny])
def login_student(request):
    if request.method == "POST":
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=email, password=password)
            if user is not None:
                student = Student.objects.get(user=user)
                refresh = RefreshToken.for_user(user)  
                phonenumber = student.studentPhone[-4:]
                response = {
                    "refresh": str(refresh),
                    "token": str(refresh.access_token),
                    "phoneNumber": phonenumber,
                }
                return JsonResponse(response, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        else:
            return JsonResponse({"error": serializer.errors}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


class StudentLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "email not found,please verify email and log in status above or if you haven't signed up please do so"
            )

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid password.")

        return data
