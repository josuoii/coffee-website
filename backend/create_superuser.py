import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coffee_shop.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
if not User.objects.filter(email='admin@coffee.com').exists():
    User.objects.create_superuser(
        email='admin@coffee.com',
        password='admin123',
        username='admin',
        first_name='Admin',
        last_name='User'
    )
    print("Superuser created successfully!")
else:
    print("Superuser already exists.")