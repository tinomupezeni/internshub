from django.urls import path
from django.contrib import admin
from interns.views import (
    signup_student, signup_company,
    # InternListAPIView, InternDetailAPIView,
    # PortfolioListAPIView, PortfolioDetailAPIView,
    # CompanyListAPIView, CompanyDetailAPIView,
    # DepartmentListAPIView, DepartmentDetailAPIView,
    # RequirementListAPIView, RequirementDetailAPIView,
    # SkillListAPIView, SkillDetailAPIView,SignupView,LoginView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/student/', signup_student, name='signup_student'),
    path('signup/company/', signup_company, name='signup_company'),
    # path('login/', LoginView.as_view()),
    # path('signup/', SignupView.as_view()),
    # path('interns/', InternListAPIView.as_view()),
    # path('interns/<int:pk>/', InternDetailAPIView.as_view()),
    # path('portfolios/', PortfolioListAPIView.as_view()),
    # path('portfolios/<int:pk>/', PortfolioDetailAPIView.as_view()),
    # path('companies/', CompanyListAPIView.as_view()),
    # path('companies/<int:pk>/', CompanyDetailAPIView.as_view()),
    # path('departments/', DepartmentListAPIView.as_view()),
    # path('departments/<int:pk>/', DepartmentDetailAPIView.as_view()),
    # path('requirements/', RequirementListAPIView.as_view()),
    # path('requirements/<int:pk>/', RequirementDetailAPIView.as_view()),
    # path('skills/', SkillListAPIView.as_view()),
    # path('skills/<int:pk>/', SkillDetailAPIView.as_view()),
]