from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from interns.models import Student
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import serializers

from interns.models import Student


class StudentLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        try:
            student = Student.objects.get(studentEmail=email)
        except Student.DoesNotExist:
            raise serializers.ValidationError("email not found")

        if not check_password(password, student.studentPassword):
            raise serializers.ValidationError("Invalid password.")

        return data


@api_view(["POST"])
@permission_classes([AllowAny])
def login_student(request):
    if request.method == "POST":
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():
            # User is authenticated, handle successful login
            return JsonResponse({"message": "Student login successful"})
        else:
            return JsonResponse({"error": serializer.errors}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


def get_student_by_email(email):
    try:
        student = Student.objects.get(studentEmail=email)
        return student
    except Student.DoesNotExist:
        return None  # Or handle the case where no student is found
