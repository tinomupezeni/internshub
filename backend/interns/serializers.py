from rest_framework import serializers
from .models import Student, Company


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "name", "surname", "email"]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "email"]


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
