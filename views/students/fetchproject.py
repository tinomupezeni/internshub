from django.http import HttpResponse, JsonResponse
from botocore.exceptions import ClientError
import boto3
import interns.credentials as credentials
from interns.models import StudentProject
from interns.models import Student
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_videos(request):
    if request.method == "GET":
        try:
            student = Student.objects.get(user=request.user)

            student_videos = StudentProject.objects.filter(student=student)
            s3 = boto3.client(
                "s3",
                aws_access_key_id=credentials.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=credentials.AWS_SECRET_ACCESS_KEY,
                region_name=credentials.AWS_DEFAULT_REGION,
            )
            presigned_urls = []
            for video in student_videos:
                # Generate presigned URL for each video
                presigned_url = s3.generate_presigned_url(
                    ClientMethod="get_object",
                    Params={
                        "Bucket": "aws-interns",
                        "Key": video.fileName,  #
                    },
                    ExpiresIn=3600,
                )
                video_data = {
                    "url": presigned_url,
                    "description": video.description,
                    "project_name": video.org_projectName,
                }
                presigned_urls.append(video_data)

            return JsonResponse({"presigned_urls": presigned_urls})

        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                return HttpResponse(status=404)
            else:
                return HttpResponse(status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)
