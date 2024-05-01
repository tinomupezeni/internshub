from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from interns.models import Company


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_company(request):
    if request.method == "POST":
        data = request.data
        name = data.get("compName")
        email = data.get("compEmail")
        password = data.get("compPassword")

        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            user = User.objects.create_user(
                username=email, first_name=name, password=password
            )
            user.save()

            company = Company.objects.create(
                user=user,
                compName=name,
                compEmail=email,
            )
            company.save()

            return Response(
                {"message": "Signup successful"}, status=status.HTTP_201_CREATED
            )
        else:
            return JsonResponse({"error": "email already exist"}, status=400)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
