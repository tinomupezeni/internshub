import json
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from interns.models import Company
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_company(request):
    if request.method == "POST":
        try:

            data = request.data
            name = data.get("compName")
            email = data.get("compEmail")
            password = data.get("compPassword")

            hashed_password = make_password(password)

            company = Company.objects.create(
                compName=name, compEmail=email, compPassword=hashed_password
            )
            company.save()

            return Response(
                {"message": "Signup successful"}, status=status.HTTP_201_CREATED
            )
        except (ValidationError, json.JSONDecodeError) as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
