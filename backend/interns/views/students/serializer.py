from rest_framework import serializers
from interns.models import Student
from studentlogin import student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'  # Or choose specific fields

if student:
    serializer = StudentSerializer(student)
    student_data = serializer.data
