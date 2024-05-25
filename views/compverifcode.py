from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse
import interns.credentials as credentials
from interns.models import Company
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
@csrf_exempt
def comp_login_code(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            company = Company.objects.get(user=request.user)
            phonenumber = company.compPhone

            account_sid = credentials.twilioaccountSid
            auth_token = credentials.twilioauthToken
            client = Client(account_sid, auth_token)

            verification = client.verify.services(
                credentials.twilioserviceSid
            ).verifications.create(to=phonenumber, channel="sms")

            return JsonResponse({"status": "Phone verification code sent"})
        return JsonResponse({"error": "user unauthorized"}, status=401)


@api_view(["POST"])
@csrf_exempt
def verify_comp_login_code(request):
    if request.method == "POST":
        company = Company.objects.get(user=request.user)
        phonenumber = company.compPhone
        code = request.data

        account_sid = credentials.twilioaccountSid
        auth_token = credentials.twilioauthToken
        client = Client(account_sid, auth_token)

        verification_check = client.verify.services(
            credentials.twilioserviceSid
        ).verification_checks.create(to=phonenumber, code=code)
        if verification_check.status == "approved":
            response = {
                "name": company.compName,
                "email": company.compEmail,
            }
        return JsonResponse(response, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)
