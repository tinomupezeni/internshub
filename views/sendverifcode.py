from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
import interns.credentials as credentials
from rest_framework.decorators import api_view

@api_view(["POST"])
@csrf_exempt
def send_verification_code(request):
    if request.method == "POST":
        phonenumber = request.data.get("phoneNumber")
        print(phonenumber)

        account_sid = credentials.twilioaccountSid
        auth_token = credentials.twilioauthToken
        client = Client(account_sid, auth_token)

        verification = client.verify.services(
            credentials.twilioserviceSid
        ).verifications.create(to=phonenumber, channel="sms")

        return JsonResponse({"status": "Phone verification code sent"})
