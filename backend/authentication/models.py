import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)


# Create your models here.
class UserManager(BaseUserManager):
    """Custom user manager."""

    def create_user(self, validated_data):
        """Create a user."""
        if not validated_data.get("email"):
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(validated_data.get("email").lower()),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            phone_number=validated_data.get("phone_number", ""),
        )
        user.is_active = True
        user.email_verified = False

        user.set_password(validated_data.get("password"))
        user.save()
        return user

    def create_superuser(self, email, password):
        """Create a superuser."""
        super_user_obj = {
            "email": email.lower(),
            "password": password,
            "first_name": "Admin",
        }
        user = self.create_user(super_user_obj)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        return user


class CustomUser(AbstractBaseUser):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField("first name", max_length=50, null=True, blank=True)
    last_name = models.CharField("last name", max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)

    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Designates whether this user should be treated as active. "
                  "Deselect this instead of deleting accounts.",
    )
    is_superuser = models.BooleanField(
        "admin status",
        default=False,
        help_text="Designates whether this user should be treated as superuser. ",
    )
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return f"{self.uuid} | {self.email}"

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    class Meta:
        """Model meta data."""
        verbose_name = "user"
        verbose_name_plural = "users"


class Movies(models.Model):
    """Movie model."""
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to="movies/")
    title = models.CharField(max_length=256)
    publish_year = models.CharField(max_length=4)
    created_by = models.ForeignKey(
        CustomUser,
        related_name="created_%(class)s",
        on_delete=models.CASCADE,
        editable=False,
        help_text="who has created the record",
    )
    updated_by = models.ForeignKey(
        CustomUser,
        related_name="updated_%(class)s",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        editable=False,
        help_text="Who has updated this record",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Model meta data."""
        verbose_name = "Movie"
        verbose_name_plural = "Movies"
