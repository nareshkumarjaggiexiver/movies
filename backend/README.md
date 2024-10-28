# MOVIES

### Install

```shell
# create env
pyenv virtualenv 3.9.6 movieenv
# enable env
pyenv activate movieenv
# install requirements
pip install -r requirements.txt
```

### Run Locally

```shell
# run migrations
python manage.py migrate
# run server
python manage.py runserver 0:8000
```

## Admin Panel

- Go to http://localhost:8000/admin/ to open admin pannel
- Credentials for login are:
  - **User:** admin@gmail.com
  - **Password:** admin
