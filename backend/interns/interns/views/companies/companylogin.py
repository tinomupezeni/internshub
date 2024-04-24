from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from django.contrib.auth.models import User
from interns.models import Company


@api_view(["POST"])
@permission_classes([AllowAny])
def login_company(request):
    if request.method == "POST":
        serializer = CompanyLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=email, password=password)
            if user is not None:
                company = Company.objects.get(user=user)
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({"token": token.key, "name": company.compName})
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        else:
            return JsonResponse({"error": serializer.errors}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


class CompanyLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        try:
            company = User.objects.get(username=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "email not found,please verify email and log in status above"
            )

        if not company.check_password(password):
            raise serializers.ValidationError("Invalid password.")

        return data
