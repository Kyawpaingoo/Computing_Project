import urllib.parse
import requests
import os

from datetime import datetime, timedelta
from flask import Flask, redirect, request, jsonify, session, url_for

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

CLIENT_ID = 'b4e5e4bb045240f59e63c7ccd0611ea1'
CLIENT_SECRET = 'b3d68e9d44ad4a56a6b2af201c5144a2'
REDIRECT_URI = 'http://localhost:5000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'
SCOPE = 'user-library-read playlist-modify-private'

cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope=SCOPE,
    cache_handler=cache_handler,
    show_dialog=True
)

sp = Spotify(auth_manager=sp_oauth)
@app.route('/login')
def login():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        AUTH_URL = sp_oauth.get_authorize_url()
        session["token_info"] = sp_oauth.get_cached_token()
        return redirect(AUTH_URL)
    return redirect(url_for('get_playlists'))


@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    session["token_info"] = token_info
    return redirect(url_for('get_playlists'))
    
@app.route('/get_playlists')
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        AUTH_URL = sp_oauth.get_authorize_url()
        return redirect(AUTH_URL)
    
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']['spotify']) for pl in playlists['items']]
    playlists_html = '<br>'.join([f'{name}: {url}' for name, url in playlists_info])
    
    return playlists_html


@app.route('/generate')
def generate_playlists():
    token_info = session.get("token_info", None)
    if not token_info:
        return redirect("/login")

    sp = Spotify(auth=token_info["access_token"])
    user = sp.current_user()
    print(f'Current User: {user}')
    search_results = sp.search(q='Imagine Dragons', type='artist')
    print(f'Search Result: {search_results['artists']['items']}')
    # playlist = sp.user_playlist_create(user['id'], 'My Playlist', public=True)
    # print(f'Playlist: {playlist['name']}')
    return search_results

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    