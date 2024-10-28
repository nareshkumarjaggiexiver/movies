from rest_framework.serializers import ModelSerializer

from authentication.models import Movies


class MoviesDataSerializer(ModelSerializer):
    class Meta:
        model = Movies
        fields = "__all__"
