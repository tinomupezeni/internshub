from django.http import JsonResponse
from botocore.exceptions import BotoCoreError, ClientError
import boto3

def get_secret(request):
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name="eu-north-1"
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId='ai-key'
        )
    except ClientError as e:
        raise e
    else:
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            secret = base64.b64decode(get_secret_value_response['SecretBinary'])

    return JsonResponse({'secret': secret})
