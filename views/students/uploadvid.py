from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from interns.models import StudentProject, Student
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
import boto3
from django.core.files.storage import default_storage
from django.db import transaction


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def upload_video(request):
    if request.method == "POST":
        data = request.data
        title = data.get("title")
        description = data.get("description")
        try:
            uploaded_file = request.FILES.get("file")
            if not uploaded_file:
                return JsonResponse({"error": "No file provided"}, status=400)
            user = request.user
            student = Student.objects.get(user=user)
            filename = f"{user.id}_{uploaded_file.name}"
            print(title, description, uploaded_file)
            if not title or not description:
                return JsonResponse(
                    {"error": "Title and description are required"}, status=400
                )

            if default_storage.save(filename, uploaded_file):
                print("video saved")
                with transaction.atomic():
                    student_project, created = StudentProject.objects.get_or_create(
                        student=student,
                        fileName=filename,
                        org_projectName=title,
                        description=description,
                    )

                    student_project.save()
            else:
                return JsonResponse({"error": "File upload failed"}, status=500)

            return JsonResponse(
                {"message": "successfully uploaded project"}, status=200
            )
        except Student.DoesNotExist:
            return JsonResponse({"error": "Student not found"}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse(
                {"error": "An error occurred while uploading, please try again"},
                status=500,
            )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
