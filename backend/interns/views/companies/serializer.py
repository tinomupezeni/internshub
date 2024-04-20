from rest_framework import serializers
from interns.models import Student
from companylogin import company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'  # Or choose specific fields

if company:
    serializer = CompanySerializer(company)
    student_data = serializer.data
