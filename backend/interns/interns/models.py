from django.db import models
from django.contrib.auth.models import User


# companies
class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default="123")
    compId = models.AutoField(primary_key=True)
    compName = models.CharField(max_length=250, default="Nash")
    compEmail = models.EmailField(
        max_length=250, unique=True, default="example@example.com"
    )


class Departments(models.Model):
    deptId = models.AutoField(primary_key=True)
    deptName = models.CharField(max_length=250)


class Requirement(models.Model):
    requirementId = models.AutoField(primary_key=True)
    requirement = models.CharField(max_length=250)


class DeptRequirement(models.Model):
    department = models.ForeignKey(Departments, on_delete=models.CASCADE)
    requirement = models.ForeignKey(Requirement, on_delete=models.CASCADE)


class CompDepartment(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE)


# student
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    studentId = models.AutoField(primary_key=True)
    studentName = models.CharField(max_length=100, default="John")
    studentSurname = models.CharField(max_length=100, default="Doe")
    studentEmail = models.EmailField(
        max_length=250, unique=True, default="example@example.com"
    )


class StudentCv(models.Model):
    student = models.OneToOneField("Student", on_delete=models.CASCADE, default="123")
    cvName = models.CharField(max_length=250, default="none")
