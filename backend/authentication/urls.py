from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

from authentication import views

router = routers.DefaultRouter()

router.register(r"movies", views.MoviesDataViewSet, basename="movies")
app_name = "authentication"
urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="token_create"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + router.urls