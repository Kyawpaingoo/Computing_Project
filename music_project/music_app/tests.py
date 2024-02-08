from django.db import models

class SpotifyTokenm(models.Model):
    user = models.CharField(max_lenght=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

# Create your tests here.
