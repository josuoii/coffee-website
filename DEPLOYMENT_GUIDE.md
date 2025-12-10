# Deployment Guide - Coffee Website

This project is structured as a monorepo with separate frontend and backend that can be deployed independently.

## Project Structure

```
coffee-website/
├── frontend/          # React/Vite app → Deploy to Vercel
├── backend/           # Django app → Deploy to Heroku/Railway/Render
└── [docs]
```

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- Frontend code in `frontend/` directory

### Steps

1. **Connect Repository to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository (`coffee-website`)
   - Click "Import"

2. **Configure Build Settings**
   ```
   Framework: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Navigate to project settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = (your backend API URL, e.g., `https://coffee-api.herokuapp.com/api`)

4. **Deploy**
   - Vercel will automatically deploy on push to `main` branch

### Environment Variables
See `frontend/.env.example` for available variables.

---

## Backend Deployment (Heroku / Railway / Render)

### Prerequisites
- Hosting account (Heroku, Railway, Render, or similar)
- Python 3.12+
- PostgreSQL database

### Option A: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku login
   heroku create coffee-shop-api
   ```

3. **Add Database Add-on**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev -a coffee-shop-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key -a coffee-shop-api
   heroku config:set DEBUG=False -a coffee-shop-api
   heroku config:set ALLOWED_HOSTS=coffee-shop-api.herokuapp.com -a coffee-shop-api
   heroku config:set CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app -a coffee-shop-api
   ```

5. **Deploy**
   ```bash
   cd backend
   git push heroku main
   ```

6. **Run Migrations**
   ```bash
   heroku run python manage.py migrate -a coffee-shop-api
   heroku run python manage.py createsuperuser -a coffee-shop-api
   ```

### Option B: Deploy to Railway

1. **Connect to Railway**
   - Go to https://railway.app
   - Click "Deploy from GitHub"
   - Select your repository

2. **Create Project & Services**
   - Add PostgreSQL service
   - Add Web service pointing to `backend/` directory

3. **Configure Build & Start Commands**
   - Build: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
   - Start: `gunicorn coffee_shop.wsgi`

4. **Set Environment Variables**
   - In Railway project dashboard, set all variables from `backend/.env.example`

### Option C: Deploy to Render

1. **Connect Repository**
   - Go to https://render.com
   - Create New Web Service
   - Connect GitHub repository

2. **Configure Service**
   - Root Directory: `backend`
   - Runtime: Python 3.12
   - Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
   - Start Command: `gunicorn coffee_shop.wsgi`

3. **Add PostgreSQL Database**
   - Create PostgreSQL instance in same project
   - Set `DATABASE_URL` environment variable

4. **Set Other Environment Variables**
   - Configure all variables from `backend/.env.example`

---

## Configuration Files

### Frontend Files
- `frontend/vercel.json` - Vercel-specific build & routing configuration
- `frontend/.env.example` - Example environment variables
- `frontend/package.json` - Dependencies and build scripts

### Backend Files
- `backend/Procfile` - Process commands for Heroku
- `backend/runtime.txt` - Python version specification
- `backend/requirements.txt` - Python dependencies
- `backend/.env.example` - Example environment variables

---

## Environment Variables

### Frontend (`VITE_API_BASE_URL`)
- **Development**: `http://localhost:8000/api`
- **Production**: `https://your-backend-domain.com/api`

### Backend (see `backend/.env.example`)
- `SECRET_KEY` - Django secret key (generate one: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`)
- `DEBUG` - Set to `False` in production
- `ALLOWED_HOSTS` - Backend domain
- `CORS_ALLOWED_ORIGINS` - Frontend domain(s)
- `DATABASE_URL` - PostgreSQL connection string (auto-set by hosting provider)

---

## Testing Deployment

### Test Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

### Test Backend Locally
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

---

## Deployment Checklist

- [ ] Frontend pushed to GitHub `main` branch
- [ ] Backend pushed to GitHub `main` branch
- [ ] Vercel connected to GitHub and configured
- [ ] Backend hosting service created and configured
- [ ] Environment variables set in all services
- [ ] Database migrations run on backend
- [ ] API URL configured in frontend environment variables
- [ ] CORS settings configured in backend
- [ ] Test API endpoint from frontend
- [ ] Test login/authentication flow
- [ ] Monitor logs in hosting provider dashboards

---

## Useful Commands

### Heroku
```bash
heroku logs -a coffee-shop-api --tail       # Stream logs
heroku config -a coffee-shop-api             # View config vars
heroku run bash -a coffee-shop-api           # SSH into dyno
```

### Railway
```bash
railway login
railway status
railway logs
```

### Render
```bash
# View logs in Render dashboard (no CLI)
```

---

## Troubleshooting

### Frontend not loading backend data
- Check `VITE_API_BASE_URL` environment variable
- Check browser console for CORS errors
- Verify backend `CORS_ALLOWED_ORIGINS` includes frontend domain

### Backend database errors
- Verify `DATABASE_URL` is set correctly
- Ensure migrations have been run: `heroku run python manage.py migrate`
- Check database connection in hosting provider dashboard

### Static files not loading
- Run: `python manage.py collectstatic`
- Verify `STATIC_ROOT` and `STATIC_URL` in Django settings

---

## Support

For issues, check:
- Vercel docs: https://vercel.com/docs
- Heroku docs: https://devcenter.heroku.com
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
- Django docs: https://docs.djangoproject.com
