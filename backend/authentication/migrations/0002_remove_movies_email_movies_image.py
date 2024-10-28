# Generated by Django 4.2.16 on 2024-10-28 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="movies",
            name="email",
        ),
        migrations.AddField(
            model_name="movies",
            name="image",
            field=models.ImageField(default=1, upload_to="movies/"),
            preserve_default=False,
        ),
    ]
