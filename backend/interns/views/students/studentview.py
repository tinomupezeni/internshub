from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from interns.models import Student


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_student(request):
    if request.method == "POST":
        data = request.data
        name = data.get("studentName")
        surname = data.get("studentSurname")
        email = data.get("studentEmail")
        password = data.get("studentPassword")

        # Find the student by email
        try:
            student = Student.objects.get(studentEmail=email)
        except Student.DoesNotExist:

            hashed_password = make_password(password)

            student = Student.objects.create(
                studentName=name,
                studentSurname=surname,
                studentEmail=email,
                studentPassword=hashed_password,
            )
            student.save()

            return Response(
                {"message": "Signup successful"}, status=status.HTTP_201_CREATED
            )
        else:
            return JsonResponse({"error": "email already exist"}, status=400)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )
