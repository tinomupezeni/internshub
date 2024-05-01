from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from interns.models import Student, StudentProfile
from django.db import transaction


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def signup_student(request):
    if request.method == "POST":
        data = request.data
        name = data.get("studentName")
        surname = data.get("studentSurname")
        email = data.get("studentEmail")
        password = data.get("studentPassword")

        # Find the student by email
        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:

            user = User.objects.create_user(
                username=email, first_name=name, last_name=surname, password=password
            )
            user.save()
            student = Student.objects.create(
                user=user, studentName=name, studentSurname=surname, studentEmail=email
            )
            student.save()
            
            stud = Student.objects.get(user=user)
            studentProfile = StudentProfile.objects.create(
                student=stud,
                institution=None,
                program=None,
                introduction=None,
                department=None,
            )
            studentProfile.save()

            return Response(
                {"message": "Signup successful"}, status=status.HTTP_201_CREATED
            )
        else:
            return JsonResponse({"error": "email already exist"}, status=400)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )
