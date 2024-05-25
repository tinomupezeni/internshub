from django.http import JsonResponse
from interns.credentials import AI_KEY
import boto3
import interns.credentials as credentials
from interns.models import StudentCv, Student, StudentProfile, StudentProject
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
import requests


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_interns_potfolio(request, studentId):
    if request.method == "GET":
        student = Student.objects.get(studentId=studentId)

        student_videos = StudentProject.objects.filter(student=student)
        student_cv = StudentCv.objects.get(student=student)

        s3 = boto3.client(
            "s3",
            aws_access_key_id=credentials.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=credentials.AWS_SECRET_ACCESS_KEY,
            region_name=credentials.AWS_DEFAULT_REGION,
        )
        presigned_urls = []
        for video in student_videos:
            presigned_url = s3.generate_presigned_url(
                ClientMethod="get_object",
                Params={
                    "Bucket": "aws-interns",
                    "Key": video.fileName,  
                },
                ExpiresIn=3600,
            )
            video_data = {
                "url": presigned_url,
                "description": video.description,
                "project_name": video.org_projectName,
            }
            presigned_urls.append(video_data)

            # Generate presigned URL
            cv_url = s3.generate_presigned_url(
                ClientMethod="get_object",
                Params={
                    "Bucket": "aws-interns",
                    "Key": student_cv.cvName,
                },
                ExpiresIn=3600,
            )

        # Create a dictionary to hold student data
        studentData = {
            "name": student.studentName,
            "surname": student.studentSurname,
            "email": student.studentEmail,
            "cv": cv_url,
            "student_projects": presigned_urls,
        }

        return JsonResponse(studentData, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
