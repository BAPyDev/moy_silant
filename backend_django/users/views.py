from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


@api_view(['GET'])
def some_request(request):
    print('This user is: ', request.user)
    print(request.user.is_authenticated)
    return Response(status=status.HTTP_200_OK, data={'data': 'Вот так'})


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        if not serializer.is_valid():
            return Response({'authenticated': False})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'id': user.pk,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.first_name,
            'token': token.key,
            'role': user.role,
            'authenticated': True,
        })
