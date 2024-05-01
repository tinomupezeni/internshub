from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()


class PhoneBackend(ModelBackend):
    def authenticate(self, request, phone=None, otp=None, **kwargs):
        try:
            user = User.objects.get(Q(phone=phone))
        except User.DoesNotExist:
            return

        if user.check_otp(otp):
            return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
