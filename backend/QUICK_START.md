# Quick Start Script for Backend

## Create Superuser
```bash
python manage.py createsuperuser
```

**Enter these details:**
- Email: `admin@kacip.com`
- Username: `admin`
- Password: `admin123`
- Password (again): `admin123`

## Run Backend Server
```bash
python manage.py runserver
```

Backend will be available at: http://localhost:8000

## Test API Endpoints

### 1. Django Admin
http://localhost:8000/admin/
- Login with admin@kacip.com / admin123

### 2. API Endpoints
- http://localhost:8000/api/products/products/ - Products list
- http://localhost:8000/api/products/categories/ - Categories list
- http://localhost:8000/api/auth/login/ - Login endpoint

## Add Sample Products

Via Django Admin:
1. Go to http://localhost:8000/admin/
2. Login
3. Click "Products" → "Add Product"
4. Fill in details and save

## Frontend Setup

1. Create `.env` file in frontend folder:
```
VITE_API_URL=http://localhost:8000/api
```

2. Run frontend:
```bash
cd frontend
npm run dev
```

3. Test login at: http://localhost:5173/admin/login

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### CORS Errors
Already configured in settings.py for localhost:5173

### 401 Unauthorized
- Clear localStorage
- Login again
- Check token in Network tab
