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


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
@transaction.atomic
def delete_requirement(request, req_id):
    if request.method == "DELETE":
        try:
            requirement = Requirement.objects.get(requirementId=req_id)

            DeptRequirement.objects.filter(requirement=requirement).delete()

            Requirement.objects.filter(requirementId=req_id).delete()

            return JsonResponse(
                {"message": "requirement successfully deleted"},
                status=200,
            )

        except:
            return JsonResponse({"message": "failed to delete requirement"}, status=404)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)
