from django.contrib import admin
from .models import CustomUser, Movies


# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "uuid",
        "email",
        "is_staff",
        "is_active",
        "is_superuser",
        "created_at",
        "updated_at",
    ]


@admin.register(Movies)
class MoviesAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "uuid",
        "image",
        "title",
        "publish_year",
        "created_by",
        "created_at",
        "created_at",
        "updated_at",
    ]
