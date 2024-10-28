from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin
)
from rest_framework.pagination import LimitOffsetPagination

from authentication.models import Movies
from authentication.serializers import MoviesDataSerializer


class MoviesDataViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, UpdateModelMixin):
    serializer_class = MoviesDataSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Movies.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
