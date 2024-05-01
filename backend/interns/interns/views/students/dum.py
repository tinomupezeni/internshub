from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3

# ... (existing imports)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_presigned_url(request):
    try:
        user = request.user
        filename = f"{user.id}_video.mp4"  # Adjust the filename as needed

        # Generate a pre-signed URL for S3 upload
        s3 = boto3.client("s3")
        presigned_url = s3.generate_presigned_url(
            "put_object",
            Params={"Bucket": "aws-interns", "Key": filename},
            ExpiresIn=3600,  # Set the expiration time (in seconds)
        )

        return JsonResponse({"presigned_url": presigned_url}, status=200)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"error": "An error occurred while generating the pre-signed URL"},
            status=500,
        )

# ... (existing upload_video view and other code)

