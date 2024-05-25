from twilio.rest import Client
from django.http import JsonResponse
import interns.credentials as credentials
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt


@api_view(["POST"])
@csrf_exempt
def verify_code(request):
    if request.method == "POST":
        phonenumber = request.data.get("phoneNumber")
        code = request.data.get("code")
        print(phonenumber, code)
        account_sid = credentials.twilioaccountSid
        auth_token = credentials.twilioauthToken
        client = Client(account_sid, auth_token)

        verification_check = client.verify.services(
            credentials.twilioserviceSid
        ).verification_checks.create(to=phonenumber, code=code)

        return JsonResponse({"valid": verification_check.status == "approved"})

    return JsonResponse({"error": "Invalid request"}, status=400)
