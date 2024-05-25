from django.http import JsonResponse
from django.db.models import Q
from interns.models import CompDepartment
from interns.models import Departments
from interns.models import DeptRequirement
from interns.models import Company
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_compdept_data(request):
    if request.method == "GET":
        user = request.user
        company = Company.objects.get(user=user)

        compDepartments = CompDepartment.objects.filter(company=company)
        compDepartment_data = [
            {
                "departmentId": compDepartment.department.deptId,
                "department": compDepartment.department.deptName,
                "requirements": [
                    {
                        "requirementId": req.requirement.requirementId,
                        "requirement": req.requirement.requirement,
                    }
                    for req in DeptRequirement.objects.filter(
                        department=compDepartment.department
                    )
                ],
            }
            for compDepartment in compDepartments
        ]

        return JsonResponse(compDepartment_data, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_alldepts_data(request):
    if request.method == "GET":
        user = request.user
        company = Company.objects.get(user=user)

        compDepartments = CompDepartment.objects.filter(company=company)
        allDepartments = Departments.objects.all()

        # Get departments not in compDepartments
        departments_not_in_compDepartments = allDepartments.exclude(
            deptId__in=[
                compDepartment.department.deptId for compDepartment in compDepartments
            ]
        )

        department_data = [
            {
                "departmentId": department.deptId,
                "department": department.deptName,
            }
            for department in departments_not_in_compDepartments
        ]

        return JsonResponse(department_data, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
