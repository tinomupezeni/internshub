from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.middleware.csrf import get_token


@csrf_protect
def get_csrf_token(request):
    if request.method == "GET":
        csrf_token = get_token(request)
        return JsonResponse({"csrf_token": csrf_token})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
