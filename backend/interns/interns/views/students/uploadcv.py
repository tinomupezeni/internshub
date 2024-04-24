from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from interns.models import StudentCv
from interns.models import Student
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import default_storage
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def upload_pdf(request):
    if request.method == "POST":
        try:
            uploaded_file = request.FILES["file"]
            user = request.user
            student = Student.objects.get(user=user)
            filename = f"{user.id}_{uploaded_file.name}"

            default_storage.save(filename, uploaded_file)

            student_cv, created = StudentCv.objects.get_or_create(student=student)
            student_cv.cvName = filename
            student_cv.save()

            return JsonResponse(
                {"message": "File uploaded successfully!", "id": filename}
            )
        except Exception as e:
            print(e)
            return JsonResponse(
                {"error": "an error occured while uploading, please try again"},
                status=400,
            )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
