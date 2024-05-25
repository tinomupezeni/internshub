from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from interns.models import StudentProfile, Institution, Departments, Student
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_student_profile(request):
    if request.method == "GET":
        student = Student.objects.get(user=request.user)
        try:
            student_profile = StudentProfile.objects.get(student=student)
            try:
                department_id = student_profile.department
                if department_id:
                    depart = Departments.objects.get(deptId=department_id.deptId)
                else:
                    depart = None
            except Departments.DoesNotExist:
                depart = None
            try:
                inst_id = student_profile.institution
                if inst_id:
                    inst = Institution.objects.get(instId=inst_id.instId)
                else:
                    inst = None
            except Institution.DoesNotExist:
                inst = None
            student_data = {
                "program": student_profile.program,
                "introduction": student_profile.introduction,
            }

            if depart is not None:
                student_data["department"] = depart.deptName
            else:
                student_data["department"] = None

            if inst is not None:
                student_data["institution"] = inst.instName
            else:
                student_data["institution"] = None

            allInsts = Institution.objects.all()
            allDepartments = Departments.objects.all()
            department_data = [
                {
                    "departmentId": department.deptId,
                    "department": department.deptName,
                }
                for department in allDepartments
            ]
            inst_data = [
                {
                    "institutionId": institution.instId,
                    "institution": institution.instName,
                }
                for institution in allInsts
            ]

            combined_data = {
                "student_profile": student_data,
                "institutions": inst_data,
                "departments": department_data,
            }

            return JsonResponse(combined_data, safe=False)

        except StudentProfile.DoesNotExist:
            return JsonResponse({"error": "Student profile not found."}, status=405)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
