# PythonAnywhere Deployment Guide - Coffee Website Backend

This guide provides step-by-step instructions to deploy the Django backend on PythonAnywhere.

## Prerequisites

- PythonAnywhere account (https://www.pythonanywhere.com)
- GitHub repository with coffee-website project
- Your PythonAnywhere account should be a paid plan for custom domain support (optional for development)

---

## Step 1: Create a PythonAnywhere Account & Web App

1. Go to https://www.pythonanywhere.com and create an account
2. Login to your dashboard
3. Navigate to **Web** → **Add a new web app**
4. Choose your domain (e.g., `yourusername.pythonanywhere.com`)
5. Select **Manual configuration**
6. Choose **Python 3.10** (or latest available)
7. Click "Next"

---

## Step 2: Clone Your Repository

1. Open **Bash console** in PythonAnywhere
2. Clone your GitHub repository:

```bash
cd ~
git clone https://github.com/josuoii/coffee-website.git
cd coffee-website/backend
```

3. Create a Python virtual environment:

```bash
mkvirtualenv --python=/usr/bin/python3.10 coffee_venv
pip install -r requirements.txt
```

---

## Step 3: Configure Django Settings for PythonAnywhere

Edit `backend/coffee_shop/settings.py` and add your PythonAnywhere domain:

```python
# Add your PythonAnywhere domain to ALLOWED_HOSTS
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com', 'localhost', '127.0.0.1']

# Set DEBUG to False in production
DEBUG = False

# CORS settings - add your frontend domain
CORS_ALLOWED_ORIGINS = [
    'https://your-frontend-domain.vercel.app',
    'http://yourusername.pythonanywhere.com',
]

# Static files configuration for PythonAnywhere
STATIC_URL = '/static/'
STATIC_ROOT = '/home/yourusername/coffee-website/backend/static'
```

---

## Step 4: Collect Static Files

In the PythonAnywhere bash console:

```bash
cd ~/coffee-website/backend
workon coffee_venv
python manage.py collectstatic --noinput
```

---

## Step 5: Set Up Database

PythonAnywhere provides SQLite by default. For production, you can use MySQL:

### Option A: SQLite (Development/Small projects)
The default `db.sqlite3` works fine. Just run migrations:

```bash
cd ~/coffee-website/backend
workon coffee_venv
python manage.py migrate
python manage.py createsuperuser
```

### Option B: MySQL (Production)

1. In PythonAnywhere dashboard, go to **Databases**
2. Create a new MySQL database (record the details)
3. Update `backend/.env` with DATABASE_URL:

```bash
mysql://yourusername:password@yourusername.mysql.pythonanywhere-services.com/yourusername$dbname
```

4. Run migrations:

```bash
python manage.py migrate
```

---

## Step 6: Configure WSGI File

In PythonAnywhere, navigate to **Web** → **Your web app** → **WSGI configuration file**

Update the WSGI file to point to your Django app:

```python
import os
import sys

# Add project directory to path
path = '/home/yourusername/coffee-website/backend'
if path not in sys.path:
    sys.path.insert(0, path)

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'coffee_shop.settings'

# Import and use Django's WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

---

## Step 7: Set Environment Variables

PythonAnywhere loads environment variables from a `.env` file in your home directory.

1. Create `.env` file in `/home/yourusername/`:

```bash
nano /home/yourusername/.env
```

2. Add your environment variables:

```bash
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourusername.pythonanywhere.com,localhost
DATABASE_URL=sqlite:////home/yourusername/coffee-website/backend/db.sqlite3
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,http://yourusername.pythonanywhere.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

3. Update `backend/coffee_shop/settings.py` to load from `.env`:

```python
from pathlib import Path
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv('/home/yourusername/.env')

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default')
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
```

---

## Step 8: Configure Web App in PythonAnywhere

1. Go to **Web** tab in PythonAnywhere
2. Click on your web app
3. Set **Virtualenv path**: `/home/yourusername/.virtualenvs/coffee_venv`
4. Set **WSGI configuration file**: `/var/www/yourusername_pythonanywhere_com_wsgi.py`
5. Scroll down and click **Reload**

---

## Step 9: Test Your Setup

### Test the admin panel:
```
https://yourusername.pythonanywhere.com/admin/
```

### Test an API endpoint:
```bash
curl https://yourusername.pythonanywhere.com/api/products/
```

### Check logs:
Go to **Web** → **Error log** and **Server log** to debug any issues

---

## Step 10: Update Frontend Configuration

In your frontend's `.env` or Vercel environment variables, set:

```
VITE_API_BASE_URL=https://yourusername.pythonanywhere.com/api
```

---

## Managing Your App

### Pull Latest Changes
```bash
cd ~/coffee-website
git pull origin main
cd backend
pip install -r requirements.txt
python manage.py migrate
```

### Reload After Changes
Go to **Web** → Click on your app → Click **Reload**

### Update Dependencies
```bash
workon coffee_venv
pip install -r requirements.txt
```

---

## Troubleshooting

### Issue: 502 Bad Gateway
- Check **Error log** in Web tab
- Ensure WSGI file is correctly configured
- Verify virtualenv path is correct
- Run: `python manage.py check`

### Issue: Static files not loading (404)
```bash
python manage.py collectstatic --noinput
```

### Issue: Database errors
```bash
# Check database migration status
python manage.py migrate --list

# Run pending migrations
python manage.py migrate
```

### Issue: Module not found errors
- Ensure virtualenv is activated: `workon coffee_venv`
- Check `requirements.txt` is installed: `pip list`
- Verify Python path in WSGI file

### Issue: CORS errors
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`
- Ensure frontend domain is included
- Test with curl: `curl -H "Origin: https://yourdomain" https://yourusername.pythonanywhere.com/api/`

---

## Upgrade PythonAnywhere Plan

For custom domains and more features:
1. Go to **Account** → **Billing**
2. Upgrade to Paid plan
3. Add your custom domain in **Web** → **Web apps** → **Add domain**

---

## Useful Resources

- PythonAnywhere Docs: https://help.pythonanywhere.com/
- Django on PythonAnywhere: https://help.pythonanywhere.com/pages/DeployingDjango
- Custom Domains: https://help.pythonanywhere.com/pages/OwnDomains
- Environment Variables: https://help.pythonanywhere.com/pages/environment-variables

---

## Summary

Your backend is now deployed on PythonAnywhere at:
- **URL**: `https://yourusername.pythonanywhere.com/api/`
- **Admin Panel**: `https://yourusername.pythonanywhere.com/admin/`

Frontend (Vercel) ↔ Backend (PythonAnywhere) are now fully connected!
