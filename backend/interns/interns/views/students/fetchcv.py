from django.http import HttpResponse, JsonResponse
from botocore.exceptions import ClientError
import boto3
import interns.credentials as credentials
from interns.models import StudentCv
from interns.models import Student
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def download_pdf(request):
    if request.method == "GET":
        try:
            student = Student.objects.get(user=request.user)
            student_cv = StudentCv.objects.get(student=student)
            s3 = boto3.client(
                "s3",
                aws_access_key_id=credentials.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=credentials.AWS_SECRET_ACCESS_KEY,
                region_name=credentials.AWS_DEFAULT_REGION,
            )
            # Generate presigned URL
            presigned_url = s3.generate_presigned_url(
                ClientMethod="get_object",
                Params={
                    "Bucket": "aws-interns",
                    "Key": student_cv.cvName,
                },
                ExpiresIn=3600,
            )

            # Return JSON response with presigned URL
            return JsonResponse({"presigned_url": presigned_url})

        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                return HttpResponse(status=404)  # File not found
            else:
                return HttpResponse(status=500)  # Internal server error

    return JsonResponse({"error": "Invalid request method"}, status=400)
