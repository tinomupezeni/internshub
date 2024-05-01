from django.http import JsonResponse
from interns.models import Requirement, DeptRequirement
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
)
from rest_framework.decorators import api_view


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def update_requirements(request):
    if request.method == "POST":
        data = request.data
        try:
            for item in data:
                if "requirementId" in item:
                    # This is an existing requirement, so update it
                    req = Requirement.objects.get(pk=item["requirementId"])
                    req.requirement = item["requirement"]
                    req.save()
                elif "departmentId" in item:
                    # These are new requirements, so create them
                    for requirement in item["requirements"]:
                        req = Requirement.objects.create(requirement=requirement)
                        DeptRequirement.objects.create(
                            department_id=item["departmentId"], requirement=req
                        )

            return JsonResponse({"status": "success"})

        except Exception as e:
            print(e)
            return JsonResponse(
                {"message": "an internal error occured, please try again"}, status=404
            )
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)
