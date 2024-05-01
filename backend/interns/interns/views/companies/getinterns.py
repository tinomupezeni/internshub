from django.http import JsonResponse
from interns.credentials import AI_KEY
from interns.models import CompDepartment, Company, StudentProfile, StudentProject
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
def get_interns_data(request):
    if request.method == "GET":
        user = request.user
        company = Company.objects.get(user=user)

        # Get the company's department
        company_department = CompDepartment.objects.get(company=company)

        # Retrieve students with the same department
        students_with_same_department = StudentProfile.objects.filter(
            department=company_department.department
        )

        # Create a dictionary to hold student data
        studentData = {
            "department_name": company_department.department.deptName,
            "students": [],
        }

        # Populate student data if there are matching students
        if students_with_same_department.exists():
            for student_profile in students_with_same_department:
                student = student_profile.student
                student_projects = StudentProject.objects.filter(
                    student=student
                ).values_list("description", flat=True)

                systemMessageContent = (
                    "give a positive summary of 30 words highlighting the specific skills the student has as they relate to this department :"
                    + company_department.department.deptName
                    + " based on student's project descriptions "
                    + ", ".join(student_projects)
                )

                systemMessage = {
                    "role": "system",
                    "content": systemMessageContent,
                }

                response = requests.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {AI_KEY}"},
                    json={
                        "model": "gpt-3.5-turbo",
                        "n": 3,
                        "messages": [systemMessage],
                    },
                )

                summary = response.json()["choices"][0]["message"]["content"]

                studentData["students"].append(
                    {
                        "studentName": student.studentName,
                        "studentId": student.studentId,
                        "studentSurname": student.studentSurname,
                        "studentEmail": student.studentEmail,
                        "program": student_profile.program,
                        "institution": student_profile.institution.instName,
                        "summary": summary,
                    }
                )

        return JsonResponse(studentData, safe=False)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
