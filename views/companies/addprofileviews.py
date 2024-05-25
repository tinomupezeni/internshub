from django.utils import timezone
from django.http import JsonResponse
from interns.models import Company, StudentProfileView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_or_update_profile_view(request, student_id):
    if request.method == "POST":
        user = request.user
        company = Company.objects.get(user=user)

        # Check if the company has already viewed the student's profile
        profile_view, created = StudentProfileView.objects.get_or_create(
            student_id=student_id, company=company, defaults={"time": timezone.now()}
        )

        # If the profile view already exists, update the timestamp
        if not created:
            profile_view.time = timezone.now()
            profile_view.save()

        return JsonResponse({"message": "Profile view added or updated successfully"})

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
