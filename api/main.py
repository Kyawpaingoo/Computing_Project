import urllib.parse
import requests

from datetime import datetime, timedelta
from flask import Flask, redirect, request, jsonify, session


app = Flask(__name__)
app.secret_key = '4db482ba6ff8435689df84bd17109ed0'

CLIENT_ID = '2163cea1be834ab8be8e02cdeed00712'
CLIENT_SECRET = '4db482ba6ff8435689df84bd17109ed0'
REDIRECT_URI = 'http://127.0.0.1:5000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'

@app.route('/')
def index():
    return "Welcome to Spotify <a href='/login'>Login</a>"

@app.route('/login')
def login():
    scope = 'user-read-private user-read-email'
    
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URI,
        'show_dialog': True #set user to login again, set false or delete to save user login
    }
    
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    
    return redirect(auth_url)

@app.route('/callback')
def callback():
    if 'error' in request.args:
        return jsonify({'error': request.args['error']})
    
    if 'code' in request.args:
        req_body={
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secrect': CLIENT_SECRET
        }
        
        response = requests.post(TOKEN_URL, data=req_body)
        token_info = response.json()
        
        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']
        
        return redirect('/playlists')
    
@app.route('/playlists')
def get_playtlists():
    if 'access_token' not in session:
        return redirect('/login') #if expried, it redirects to login page
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('/refresh-token') #if current time is greater than expire time it redirects to refresh-token url

    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }
    
    response = requests.get(API_BASE_URL + 'me/playlists', headers=headers) #it response current login user playlist with access_token 
    playlists = response.json() #playlist will be converted in to json format
    
    return jsonify(playlists)

@app.route('/refresh-token')
def refresh_token():
    if 'refresh_token' not in session:
        return redirect('/login') #if access token expires, redirect to login page
    
    if datetime.now().timestamp() > session['expires_at']:
        req_body = {
            'grant_type': 'refresh_token',
            'refresh_token': session['refresh_token'],
            'client_id': CLIENT_ID,
            'client_secrect': CLIENT_SECRET
        }
        
        response = requests.post(TOKEN_URL, data=req_body)
        new_token_info = response.json()
        
        session['access_token'] = new_token_info['access_token']
        session['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']
        
        return redirect('/playlists')
    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    