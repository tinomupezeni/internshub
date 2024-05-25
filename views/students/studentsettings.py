from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from interns.models import Student, StudentProfile, Departments, Institution
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
@transaction.atomic
def settings_student(request):
    if request.method == "POST":
        try:
            user = request.user
            student = Student.objects.get(user=user)
            data = request.data
            # Initialize variables with default values
            program = None
            intro = None
            department = None
            institution = None
            if "studyProgram" in data:
                program = data["studyProgram"]

            if "intro" in data:
                intro = data["intro"]

            if "departmentId" in data:
                department = data["departmentId"]

            if "institutionId" in data:
                institution = data["institutionId"]

            student_profile, created = StudentProfile.objects.get_or_create(student=student)

            # Set attributes only if the corresponding variables are present
            if "studyProgram" in data:
                student_profile.program = program

            if "intro" in data:
                student_profile.introduction = intro

            if "departmentId" in data:
                department_id = data["departmentId"]
                try:
                    department = Departments.objects.get(deptId=department_id)
                    student_profile.department = department
                except Departments.DoesNotExist:
                    pass

            if "institutionId" in data:
                institution_id = data["institutionId"]
                try:
                    institution = Institution.objects.get(instId=institution_id)
                    student_profile.institution = institution
                except Institution.DoesNotExist:
                    pass

            student_profile.save()


            return JsonResponse(
                {"message": "Student profile updated successfully."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return JsonResponse({"error": "an internal error occured"}, status=400)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )
