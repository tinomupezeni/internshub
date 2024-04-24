from django.http import JsonResponse
from django.db import transaction

from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from interns.models import CompDepartment
from interns.models import Requirement
from interns.models import Departments
from interns.models import DeptRequirement
from interns.models import Company
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
                    req.requirement.requirement
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
