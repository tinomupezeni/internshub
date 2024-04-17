from django.db import models

class Company(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='company')
    compName = models.CharField(max_length=100, default='Nash')
    compEmail = models.EmailField(max_length=100,unique=True, default='example@example.com')
    compPassword = models.CharField(max_length=100, default='123')
    confirmPassword = models.CharField(max_length=100, default='123')

class Student(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    studentName = models.CharField(max_length=100 , default='John')
    studentSurname = models.CharField(max_length=100, default='Doe')
    studentEmail = models.EmailField(max_length=100,unique=True, default='example@example.com')
    studentPassword = models.CharField(max_length=100 , default='123')
    confirmPasswordSt = models.CharField(max_length=100 , default='123')




# class User(models.Model):
#   email = models.CharField(unique=True)
#   password=models.CharField(max_length=100)
#   role = models.CharField(max_length=10, choices=[('student', 'Student'), ('company', 'Company')], default='student')
#   is_active = models.BooleanField(default=True)
#   is_staff = models.BooleanField(default=False)
#   is_superuser = models.BooleanField(default=False)


# class Intern(models.Model):
#     id=models.AutoField(primary_key=True)
#     name = models.CharField(max_length=200)
#     email = models.CharField(unique=True)

# class Portfolio(models.Model):
#     intern = models.ForeignKey(Intern, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     video_url = models.URLField()

# class Company(models.Model):
#     name = models.CharField(max_length=200)
#     conduct = models.TextField()  
#     location = models.CharField(max_length=200, blank=True) 

# class Department(models.Model):
#     company = models.ForeignKey(Company, on_delete=models.CASCADE)
#     name = models.CharField(max_length=200)

# class Requirement(models.Model):
#     department = models.ForeignKey(Department, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     description = models.TextField()

# class Skill(models.Model):
#     name = models.CharField(max_length=200)
#     description = models.TextField(blank=True)

# class InternSkill(models.Model):
#     intern = models.ForeignKey(Intern, on_delete=models.CASCADE)
#     skill = models.ForeignKey(Skill, on_delete=models.CASCADE)

# class PortfolioSkill(models.Model):
#     portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
#     skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
