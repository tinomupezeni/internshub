from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout_student(request):
    Token.objects.filter(user=request.user).delete()
    return Response({"message": "Logged out successfully"}, status=200)
