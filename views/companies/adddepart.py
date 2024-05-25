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
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
@transaction.atomic
def add_department(request):
    if request.method == "POST":
        user = request.user
        data = request.data
        company = Company.objects.get(user=user)
        department_name = data.get("department")
        requirements = data.get("newRequirement")

        try:
            department, created = Departments.objects.get_or_create(
                deptName=department_name
            )

            compDepartment, created = CompDepartment.objects.get_or_create(
                company=company, department=department
            )

            for requirement in requirements:
                requirement_obj = Requirement.objects.create(requirement=requirement)
                DeptRequirement.objects.create(
                    department=department, requirement=requirement_obj
                )
            return JsonResponse({"message": "successfully added"})
        except Exception as e:

            return Response({"message": str(e)}, status=400)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
