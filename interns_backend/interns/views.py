# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import BasePermission, IsAuthenticated
# from .models import Intern, Portfolio, Company, Department, Requirement, Skill
# from .serializers import InternSerializer, PortfolioSerializer, CompanySerializer, DepartmentSerializer, RequirementSerializer, SkillSerializer

# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
# from .models import Student, Company
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Student, Company

@csrf_exempt
def signup_student(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        status = data.get('status')
        student_name = data.get('studentName')
        student_email = data.get('studentEmail')
        student_password = data.get('studentPassword')
        confirm_password = data.get('confirmPassword')
        
        if student_password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
        
        student = Student.objects.create(
            status=status, 
            studentName=student_name, 
            studentEmail=student_email, 
            studentPassword=student_password
        )
        
        return JsonResponse({'message': 'Signup successful'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def signup_company(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8')) 
        status = data.get('status')
        comp_name = data.get('compName')
        comp_email = data.get('compEmail')
        comp_password = data.get('compPassword')
        confirm_password = data.get('confirmPassword')
        
        if comp_password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
        
        company = Company.objects.create(
            status=status, 
            compName=comp_name, 
            compEmail=comp_email, 
            compPassword=comp_password
        )
        
        return JsonResponse({'message': 'Signup successful'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_student(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(studentEmail=email, studentPassword=password)
        
        if user is not None:
            return JsonResponse({'message': 'Student login successful'})
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_company(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')
        
        # Authenticate the company
        user = authenticate(compEmail=email, compPassword=password)
        
        if user is not None:
            return JsonResponse({'message': 'Company login successful'})
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# class SignupView(APIView):
#     def post(self, request):
#         serializer = SignupSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Custom Permissions
# class IsIntern(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'intern'

# class IsCompany(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'company'

# class IsAuthenticatedAndNotInternOrCompany(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role not in ['intern', 'company']

# # Utility function for filtering objects based on user role
# def get_filtered_objects(user):
#     if user.role == 'intern':
#         return Intern.objects.filter(pk=user.id)
#     elif user.role == 'company':
#         return Company.objects.filter(pk=user.id)
#     else:
#         return None

# # Intern Views
# class InternListAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_objects = get_filtered_objects(request.user)
#         if user_objects is None:
#             return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
#         serializer = InternSerializer(user_objects, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = InternSerializer(data=request.data)
#         if serializer.is_valid():
#             role = request.data.get('role')
#             department = request.data.get('department')
#             if role == 'intern':
#                 # Ensure the department matches the department of the company creating the intern
#                 company_department = request.user.company.department
#                 if department == company_department:
#                     serializer.save(role=role, department=department)
#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response({'error': 'Invalid department'}, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class InternDetailAPIView(APIView):
#     def get(self, request, pk):
#         try:
#             intern = Intern.objects.get(pk=pk)
#             serializer = InternSerializer(intern)
#             return Response(serializer.data)
#         except Intern.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             intern = Intern.objects.get(pk=pk)
#             serializer = InternSerializer(intern, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Intern.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             intern = Intern.objects.get(pk=pk)
#             intern.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Intern.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

# class PortfolioListAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_objects = get_filtered_objects(request.user)
#         if user_objects is None:
#             return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
#         if request.user.role == 'intern':
#             portfolios = Portfolio.objects.filter(intern=request.user)
#         elif request.user.role == 'company':
#             portfolios = Portfolio.objects.filter(intern__department=request.user.company.department)
#         serializer = PortfolioSerializer(portfolios, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = PortfolioSerializer(data=request.data)
#         if serializer.is_valid():
#             if request.user.role == 'intern':
#                 # Associate the portfolio with the current user (intern)
#                 serializer.save(intern=request.user)
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             elif request.user.role == 'company':
#                 # Company is creating a portfolio for an intern, ensure intern exists and is in the same department
#                 intern_id = request.data.get('intern')
#                 intern = Intern.objects.filter(id=intern_id, department=request.user.company.department).first()
#                 if intern:
#                     serializer.save(intern=intern)
#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response({'error': 'Invalid intern or department'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class PortfolioDetailAPIView(APIView):
#     def get(self, request, pk):
#         try:
#             portfolio = Portfolio.objects.get(pk=pk)
#             serializer = PortfolioSerializer(portfolio)
#             return Response(serializer.data)
#         except Portfolio.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             portfolio = Portfolio.objects.get(pk=pk)
#             serializer = PortfolioSerializer(portfolio, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Portfolio.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             portfolio = Portfolio.objects.get(pk=pk)
#             portfolio.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Portfolio.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

# class CompanyListAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_objects = get_filtered_objects(request.user)
#         if user_objects is None:
#             return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
#         if request.user.role == 'company':
#             company = Company.objects.get(pk=request.user.id)
#             serializer = CompanySerializer(company)
#         elif request.user.role == 'intern':
#             companies = Company.objects.filter(department=request.user.department)
#             serializer = CompanySerializer(companies, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = CompanySerializer(data=request.data)
#         if serializer.is_valid():
#             role = request.data.get('role')
#             department = request.data.get('department')
#             if role == 'company':
#                 # Ensure department matches the intern's department if intern is creating a company
#                 if request.user.role == 'intern' and department != request.user.department:
#                     return Response({'error': 'Invalid department'}, status=status.HTTP_400_BAD_REQUEST)
#                 serializer.save(role=role, department=department)
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             else:
#                 return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CompanyDetailAPIView(APIView):
#     def get(self, request, pk):
#         try:
#             company = Company.objects.get(pk=pk)
#             serializer = CompanySerializer(company)
#             return Response(serializer.data)
#         except Company.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             company = Company.objects.get(pk=pk)
#             serializer = CompanySerializer(company, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Company.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             company = Company.objects.get(pk=pk)
#             company.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Company.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

# # Department Views
# class DepartmentListAPIView(APIView):
#     def get(self, request):
#         departments = Department.objects.all()
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = DepartmentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DepartmentDetailAPIView(APIView):
#     def get(self, request, pk):
#         try:
#             department = Department.objects.get(pk=pk)
#             serializer = DepartmentSerializer(department)
#             return Response(serializer.data)
#         except Department.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             department = Department.objects.get(pk=pk)
#             serializer = DepartmentSerializer(department, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Department.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             department = Department.objects.get(pk=pk)
#             department.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Department.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)


# # Requirement Views
# class RequirementListAPIView(APIView):

#     def get(self, request):
#         requirements = Requirement.objects.all()
#         serializer = RequirementSerializer(requirements, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = RequirementSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RequirementDetailAPIView(APIView):

#     def get(self, request, pk):
#         try:
#             requirement = Requirement.objects.get(pk=pk)
#             serializer = RequirementSerializer(requirement)
#             return Response(serializer.data)
#         except Requirement.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             requirement = Requirement.objects.get(pk=pk)
#             serializer = RequirementSerializer(requirement, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Requirement.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             requirement = Requirement.objects.get(pk=pk)
#             requirement.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Requirement.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)


# class SkillListAPIView(APIView):

#     def get(self, request):
#         skills = Skill.objects.all()
#         serializer = SkillSerializer(skills, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = SkillSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SkillDetailAPIView(APIView):
#     def get(self, request, pk):
#         try:
#             skill = Skill.objects.get(pk=pk)
#             serializer = SkillSerializer(skill)
#             return Response(serializer.data)
#         except Skill.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)


#     def put(self, request, pk):
#         try:
#             skill = Skill.objects.get(pk=pk)
#             serializer = SkillSerializer(skill, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Skill.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

