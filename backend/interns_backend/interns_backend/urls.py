from django.urls import path
from django.contrib import admin
from interns.views.companies.companylogin import login_company
from interns.views.students.studentlogin import login_student
from interns.views.companies.companyviews import signup_company
from interns.views.students.studentview import signup_student
from interns.views.aikeyview import get_secret
from interns.views.students.fetchcv import download_pdf
from interns.views.students.uploadcv import upload_pdf
from interns.views.csrftoken import get_csrf_token
from interns.views.companies.adddepart import add_department
from interns.views.companies.getdept import get_compdept_data
from interns.views.companies.deletedept import delete_department

urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/student/", signup_student, name="signup_student"),
    path("login/student/", login_student, name="login_student"),
    path("student/cv/", download_pdf, name="fetch_cv"),
    path("student/upload-cv/", upload_pdf, name="upload_cv"),
    path("student/upload-cv/token/", get_csrf_token, name="upload_cv_token"),
    # -----------------companies
    path("login/company/", login_company, name="login_company"),
    path("signup/company/", signup_company, name="signup_company"),
    path("company/add-department/", add_department, name="add_department"),
    path("company/get-department/", get_compdept_data, name="add_department"),
    path("company/delete-department/", delete_department, name="delete_department"),
    # --------------random
    path("ai-key/", get_secret, name="ai_key"),
]
