from django.http import JsonResponse
from interns.models import CompDepartment, StudentProfile, Student, DeptRequirement
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_company_data(request):
    if request.method == "GET":
        user = request.user
        student = Student.objects.get(user=user)

        # Get the student's department
        student_department = StudentProfile.objects.get(student=student).department

        # Retrieve companies with the same department
        companies_with_same_department = CompDepartment.objects.filter(
            department=student_department
        )

        # Create a list to hold company data
        companyData = []

        # Populate company data if there are matching companies
        if companies_with_same_department.exists():
            for comp_dept in companies_with_same_department:
                company = comp_dept.company
                requirements = DeptRequirement.objects.filter(
                    department=student_department
                ).values_list("requirement__requirement", flat=True)
                companyData.append(
                    {
                        "companyName": company.compName,
                        "companyEmail": company.compEmail,
                        "requirements": list(requirements),
                    }
                )

        return JsonResponse(companyData, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
