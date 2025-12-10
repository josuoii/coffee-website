# ☕ Coffee Website - Kacip

A modern, premium coffee shop website built with React, TypeScript, and Vite.

## 🌟 Features

- **Beautiful UI/UX**: Modern design with smooth animations using Framer Motion
- **Admin Dashboard**: Complete admin panel for managing menu, orders, and customers
- **Responsive Design**: Works perfectly on all devices
- **Shopping Cart**: Full cart functionality with toast notifications
- **Authentication**: Admin login system with protected routes
- **Menu Management**: Easy-to-use interface for managing coffee menu items

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📦 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

This project is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the following build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

For detailed deployment instructions, see `.agent/workflows/deploy-vercel.md`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── contexts/       # React contexts (Auth, Cart, Toast)
│   ├── data/           # Static data
│   ├── types/          # TypeScript type definitions
│   ├── lib/            # Utility functions
│   └── assets/         # Images and static assets
├── public/             # Public assets
└── dist/               # Production build (generated)
```

## 🔐 Admin Access

The admin panel can be accessed at `/admin/login`. 

Default credentials (for demo):
- Email: admin@kacip.com
- Password: admin123

## 🎨 Color Scheme

The website uses a chocolate-themed color palette:
- Dark Chocolate: `#3E2723`, `#5D4037`
- Milk Chocolate: `#6D4C41`
- Light Chocolate: `#8D6E63`, `#A1887F`
- Cream: `#D7CCC8`, `#EFEBE9`

## 📝 License

This project is private and proprietary.

## 👨‍💻 Developer

Built with ❤️ by Hazim
