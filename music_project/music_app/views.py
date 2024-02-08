from django.shortcuts import render
from .credentials import REDIRECT_URL, CLIENTS_ID, CLIENTS_SECRECT
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

class AUthURL(APIView):
    def get(self, request, fornat=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
        url = Request('GET', 'https://account.spotify.com/authorize',parama={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri':REDIRECT_URL,
            'client_id': CLIENTS_ID,
        }).prepare().url
        
        return Response({'url':url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')
    
    response = post('https://accounts.spotify.com/api/token',data={
        'grant_type': 'authorization_code',
        'code':code,
        'redirect_uri': REDIRECT_URL,
        'client_id':CLIENTS_ID,
        'client_secrect': CLIENTS_SECRECT
    }).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expries_in')
    error = response.get('error')

