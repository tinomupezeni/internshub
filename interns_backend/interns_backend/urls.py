from django.urls import path
from django.contrib import admin
from interns.views import (
    signup_student, signup_company,login_student, login_company
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/student/', signup_student, name='signup_student'),
    path('signup/company/', signup_company, name='signup_company'),
    path('login/student/', login_student, name='login_student'),
    path('login/company/', login_company, name='login_company'),
]