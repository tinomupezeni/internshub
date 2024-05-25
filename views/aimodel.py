import pickle
# from ai_model.service import predict
from interns.models import CompDepartment, StudentProfile, Student, DeptRequirement
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def predict_view(request):
    if request.method == "GET":
        user = request.user
        student = Student.objects.get(user=user)

        student_profile = StudentProfile.objects.get(student=student)
        student_program = student_profile.program if student_profile else None
        student_department = StudentProfile.objects.get(student=student).department

        model_filename = "ai_model/recommendation_model.pkl"

        # Function to make recommendations based on study program
        def recommend_projects(study_program, top_n=5):
            # Load the model
            with open(model_filename, "rb") as file:
                vectorizer, similarity_matrix, df = pickle.load(file)

            # Find the index of the given study program
            study_program_index = df[df["study_program"] == study_program].index[0]

            # Get the similarity scores for the given study program
            study_program_similarities = similarity_matrix[study_program_index]

            # Sort the similarity scores in descending order
            sorted_indices = study_program_similarities.argsort()[::-1]

            # Get the top recommended projects
            top_projects = df.loc[sorted_indices[:top_n], "project_description"]

            return top_projects.tolist()

        # Make recommendations for a specific study program
        study_program = "Software Engineering"
      #   student_program = student_program
        recommended_projects = recommend_projects(study_program)

        print(f"Top recommended projects for study program '{study_program}':")
        for project_description in recommended_projects:
            print(f"- {project_description}")

    return JsonResponse(recommended_projects, safe=False)
