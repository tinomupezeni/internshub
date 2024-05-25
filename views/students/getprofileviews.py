from django.http import JsonResponse
from interns.models import (
    Student,
    StudentProfileView,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_profile_views(request):
    if request.method == "GET":
        user = request.user
        student = Student.objects.get(user=user)

        # Get the companies that viewed the student's profile
        profile_views = StudentProfileView.objects.filter(student=student)

        # Create a list to hold company data
        companyData = []

        # Populate company data if there are matching companies
        if profile_views.exists():
            for view in profile_views:
                companyData.append(
                    {
                        "companyName": view.company.compName,
                        "companyEmail": view.company.compEmail,
                        "time": view.time,
                    }
                )

        return JsonResponse(companyData, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
