from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django_verify_email import send_verification_email 

@api_view(["POST"])
@csrf_exempt
def send_verification_code(request):
    if request.method == "POST":
        email = request.data.get("email")

        # Send the verification email
        send_verification_email(request, email)

        return JsonResponse({"status": "Email verification link sent"})
