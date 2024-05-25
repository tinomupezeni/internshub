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
    compPhone = models.CharField(
        max_length=250, null=False, default="+123456789"
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
    studentPhone = models.CharField(
        max_length=250, null=False, default="+1234567890"
    )


class Institution(models.Model):
    instId = models.AutoField(primary_key=True)
    instName = models.CharField(max_length=550)


class StudentProfile(models.Model):
    student = models.OneToOneField("Student", on_delete=models.CASCADE, default="123")
    institution = models.ForeignKey(
        Institution, on_delete=models.CASCADE, null=True, blank=True
    )
    program = models.CharField(max_length=250, null=True, blank=True)
    introduction = models.CharField(max_length=1000, null=True, blank=True)
    department = models.ForeignKey(
        Departments, on_delete=models.CASCADE, null=True, blank=True
    )

class StudentCv(models.Model):
    student = models.OneToOneField("Student", on_delete=models.CASCADE, default="123")
    cvName = models.CharField(max_length=250, default="none")
 
class StudentProject(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    fileName = models.CharField(max_length=250, default="none")
    org_projectName = models.CharField(max_length=250, default="none")
    description= models.CharField(max_length=250, default="none")
    
class StudentProfileView(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    time = models.DateTimeField()