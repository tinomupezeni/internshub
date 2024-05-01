from django.conf import settings
from django.db import models
from django.utils import timezone
from rest_framework.authtoken.models import Token as DefaultTokenModel
from rest_framework.authentication import (
    TokenAuthentication as DefaultTokenAuthentication,
)
from rest_framework.exceptions import AuthenticationFailed


class ExpiringToken(DefaultTokenModel):
    expires = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.expires = timezone.now() + settings.TOKEN_EXPIRE_TIME
        super().save(*args, **kwargs)





class ExpiringTokenAuthentication(DefaultTokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related("user").get(key=key)
        except model.DoesNotExist:
            raise AuthenticationFailed("Invalid token")

        if not token.user.is_active:
            raise AuthenticationFailed("User inactive or deleted")

        if token.expires < timezone.now():
            raise AuthenticationFailed("Token has expired")

        return (token.user, token)
