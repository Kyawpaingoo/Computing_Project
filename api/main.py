import urllib.parse
import requests
import os

from datetime import datetime, timedelta
from flask import Flask, redirect, request, jsonify, session, url_for, render_template
from flask_cors import CORS

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

app = Flask(__name__)
CORS(app);
app.config['SECRET_KEY'] = os.urandom(64)

CLIENT_ID = 'b662abba80f941099b7ff7c6a11e23cb'
CLIENT_SECRET = '5d3cf4646ee94850a1c0a67b3810a1a5'
REDIRECT_URI = 'http://localhost:5000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'
SCOPE = 'user-library-read playlist-read-private'
# SCOPE = "user-library-read user-library-modify"

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
    else:
        access_token = sp_oauth.get_cached_token()
        #return jsonify({'redirect_url': 'http://localhost:5174/'})
        return jsonify({'success':True, 'access_token': access_token})


@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    session["token_info"] = token_info
    return redirect(url_for('get_playlists'))
   

    
@app.route('/get_playlists', methods=['GET'])
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        AUTH_URL = sp_oauth.get_authorize_url()
        return redirect(AUTH_URL)
    
    playlists = sp.current_user_playlists()
    playlists_info = playlists_info = [(pl['name'], pl.get('external_urls', {}).get('spotify', '')) for pl in playlists['items']]
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

@app.route('/save_tracks')
def get_saved_tracks():
    all_saved_tracks = []
    all_playlist_tracks = []
    # Use current_user_playlists to get all playlists (limit 50 initially)
    results = sp.current_user_playlists(limit=50)
    playlists = results["items"]

    # Iterate through playlists and get tracks from each
    for playlist in playlists:
        playlist_id = playlist["id"]
        playlist_tracks = sp.playlist_tracks(playlist_id)
        tracks = playlist_tracks["items"]
        all_playlist_tracks.extend(tracks)

    return jsonify(all_playlist_tracks)
   

@app.route('/logout',methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    