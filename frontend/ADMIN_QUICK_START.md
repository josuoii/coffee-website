# 🎯 Quick Start - Admin System

## Login Credentials
```
Email: admin@kacip.com
Password: admin123
```

## Access Points

### 1. Login Page
```
http://localhost:5173/login
```

### 2. Admin Dashboard
```
http://localhost:5173/admin
```

## Navigation Flow

```
Homepage (/)
    ↓
Click User Icon (Header)
    ↓
Login Page (/login)
    ↓
Enter Credentials or Click "Fill Demo Credentials"
    ↓
Click "Sign In"
    ↓
Admin Dashboard (/admin)
    ↓
Use Sidebar to Navigate:
    - Dashboard (Overview & Stats)
    - Menu Items (Manage Menu)
    - Orders (Track Orders)
    - Inventory (Coming Soon)
    - Customers (Coming Soon)
    - Analytics (Coming Soon)
    - Settings (Coming Soon)
```

## Admin Features

### ✅ Dashboard
- Total Revenue, Orders, Customers, Menu Items
- Today's Overview
- Recent Orders
- Popular Items

### ✅ Menu Management
- View all menu items
- Search & Filter
- Edit items
- Delete items
- Toggle availability
- Add new items

### ✅ Orders Management
- View all orders
- Search & Filter
- Update order status
- View order details
- Track order statistics

## Sidebar Features
- **Collapsible** - Click arrow to minimize/maximize
- **User Info** - Shows logged-in admin details
- **Navigation** - Quick access to all admin pages
- **Logout** - Safely logout from admin panel

## Header Integration
- **Shield Icon** - Quick access to admin panel (for admins only)
- **User Icon** - Login/Account access
- **Mobile Menu** - Includes admin panel link

---

**Note:** Server must be running on `http://localhost:5173`
Run: `npm run dev` in the frontend directory
