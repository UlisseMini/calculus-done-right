
# https://github.com/googleapis/google-auth-library-python/pull/785#issuecomment-1003826915
from google.oauth2 import _id_token_async
from google.auth import exceptions
from google.auth import jwt
from six.moves import http_client
import json

async def _fetch_certs(request, certs_url):
    response = await request(certs_url, method="GET")

    if response.status != http_client.OK:
        raise exceptions.TransportError(
            "Could not fetch certificates at {}".format(certs_url)
        )

    data = await response.content()
    return json.loads(data.decode('utf-8'))

_id_token_async._fetch_certs = _fetch_certs


