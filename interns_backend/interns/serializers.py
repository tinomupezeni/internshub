from rest_framework import serializers
from .models import Student, Portfolio, Company, Department, Requirement, Skill, InternSkill, PortfolioSkill
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ['status', 'studentName', 'studentSurname', 'studentEmail', 'studentPassword', 'confirmPasswordSt']


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ['status', 'compName', 'compEmail', 'compPassword', 'confirmPassword']


# class InternSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Intern
#         fields = '__all__'

# class PortfolioSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Portfolio
#         fields = '__all__'
# class CompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         fields = '__all__'
# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'
# class RequirementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Requirement
#         fields = '__all__'
# class SkillSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Skill
#         fields = '__all__'
# class InternSkillSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = InternSkill
#         fields = '__all__'
# class PortfolioSkillSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PortfolioSkill
#         fields = '__all__'