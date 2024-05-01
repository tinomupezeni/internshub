from interns.credentials import AI_KEY
from django.http import JsonResponse
from interns.models import CompDepartment, StudentProfile, Student, DeptRequirement
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
import requests


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_projects_data(request):
    if request.method == "GET":
        user = request.user
        student = Student.objects.get(user=user)

        student_program = StudentProfile.objects.get(student=student).program
        student_department = StudentProfile.objects.get(student=student).department

        # Retrieve companies with the same department
        companies_with_same_department = CompDepartment.objects.filter(
            department=student_department
        )

        systemMessageContent = (
            "Suggest 3 "
            + student_program
            + " projects for Zimbabwe interns, listing only the project name and skills gained."
        )

        if companies_with_same_department.exists():
            for comp_dept in companies_with_same_department:
                company = comp_dept.company
                requirements = DeptRequirement.objects.filter(
                    department=student_department
                ).values_list("requirement__requirement", flat=True)
                systemMessageContent += (
                    " The projects should meet the following company requirements if they apply to the student program: "
                    + ", ".join(requirements)
                    + "."
                )

        systemMessage = {
            "role": "system",
            "content": systemMessageContent,
        }

        aiProjects = []
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {AI_KEY}"},
            json={
                "model": "gpt-3.5-turbo",
                "n": 3,
                "messages": [systemMessage],
            },
        )

        projects = response.json()["choices"][0]["message"]["content"].split("\n\n")

        for project in projects:
            aiProjects.append({"project": project.strip()})

        return JsonResponse(aiProjects, safe=False)
