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


@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
@transaction.atomic
def delete_department(request, dept_id):
    if request.method == "DELETE":
        user = request.user
        data = request.data
        company = Company.objects.get(user=user)

        try:
            department = Departments.objects.get(deptId=dept_id)
            compDepartment = CompDepartment.objects.get(
                company=company, department=department
            )

            DeptRequirement.objects.filter(
                department=compDepartment.department
            ).delete()

            compDepartment.delete()

            return JsonResponse(
                {"message": "Department and its requirements successfully deleted"},
                status=200,
            )

        except (CompDepartment.DoesNotExist, Departments.DoesNotExist):
            return JsonResponse({"message": "Department not found"}, status=404)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)
