# Kacip Coffee - Modern Coffee Shop Website

A beautiful, modern, and fully responsive coffee shop website inspired by Zus Coffee, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Multi-page Application** with React Router
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** using Framer Motion
- **Type-Safe** with TypeScript
- **Modern UI Components** with Shadcn/UI
- **Coffee-Themed Design System**

### Pages
1. **Home** - Hero section, features, popular items, and CTA
2. **Menu** - Filterable menu with search, categories, and nutrition info
3. **Stores** - Store locator with city filtering and Google Maps integration
4. **Rewards** - Loyalty program with tiers and benefits
5. **About** - Company story, values, and timeline

### Design Highlights
- ✨ **Premium Coffee Theme** - Warm browns, creams, and gold accents
- 🎨 **Custom Fonts** - Inter (sans-serif) + Playfair Display (headings)
- 🌊 **Smooth Animations** - Scroll-triggered and hover effects
- 📱 **Mobile-Optimized** - Hamburger menu, touch-friendly
- 🎯 **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest version with modern hooks
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast build tool

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Design System** - Coffee-themed colors and utilities
- **Responsive Grid** - Mobile, tablet, and desktop layouts

### Libraries
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set
- **Shadcn/UI** - High-quality UI components

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   └── Footer.tsx       # Footer with links
│   │   └── ui/                  # Shadcn UI components
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── MenuPage.tsx         # Menu with filters
│   │   ├── StoresPage.tsx       # Store locator
│   │   ├── RewardsPage.tsx      # Loyalty program
│   │   └── AboutPage.tsx        # About us
│   ├── data/
│   │   ├── menu.ts              # Menu items data
│   │   └── stores.ts            # Store locations
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles + design system
├── public/
│   └── images/                  # Image assets
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Dependencies
```

## 🎨 Design System

### Color Palette
```css
/* Coffee Browns */
--coffee-dark: hsl(25, 47%, 25%)
--coffee-medium: hsl(25, 47%, 35%)
--coffee-light: hsl(30, 40%, 92%)
--coffee-cream: hsl(35, 55%, 88%)
--coffee-gold: hsl(45, 100%, 51%)
```

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, modern)
- **Sizes**: Responsive scale from mobile to desktop

### Components
- **Cards**: Hover lift effect with shadow
- **Buttons**: Gradient backgrounds with smooth transitions
- **Animations**: Fade-in, slide-up, and scroll-triggered

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5174
```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎯 Best Practices Implemented

### Code Quality
- ✅ **TypeScript** - Full type coverage
- ✅ **ESLint** - Code linting and formatting
- ✅ **Component Composition** - Reusable, modular components
- ✅ **Custom Hooks** - Shared logic extraction
- ✅ **Clean Code** - Readable, maintainable, well-documented

### Performance
- ✅ **Code Splitting** - Route-based lazy loading
- ✅ **Optimized Images** - Proper sizing and lazy loading
- ✅ **Minimal Bundle** - Tree-shaking and minification
- ✅ **Fast Builds** - Vite's lightning-fast HMR

### Accessibility
- ✅ **Semantic HTML** - Proper heading hierarchy
- ✅ **ARIA Labels** - Screen reader support
- ✅ **Keyboard Navigation** - Full keyboard accessibility
- ✅ **Color Contrast** - WCAG AA compliant

### SEO
- ✅ **Meta Tags** - Proper title and descriptions
- ✅ **Semantic Structure** - Clear content hierarchy
- ✅ **Fast Loading** - Optimized performance
- ✅ **Mobile-Friendly** - Responsive design

## 🔧 Customization

### Adding New Menu Items

Edit `src/data/menu.ts`:

```typescript
{
  id: 'new-drink',
  name: 'New Drink',
  description: 'Description here',
  category: 'coffee',
  price: 5.50,
  image: '/images/new-drink.jpg',
  isPopular: true,
}
```

### Adding New Stores

Edit `src/data/stores.ts`:

```typescript
{
  id: 'new-store',
  name: 'Store Name',
  address: 'Full Address',
  city: 'City',
  state: 'State',
  zipCode: '12345',
  phone: '+60 3-1234 5678',
  coordinates: { lat: 3.1234, lng: 101.1234 },
  hours: { /* ... */ },
  features: ['wifi', 'parking'],
}
```

### Changing Colors

Edit `src/index.css` CSS variables:

```css
:root {
  --coffee-medium: hsl(25, 47%, 35%);
  --coffee-gold: hsl(45, 100%, 51%);
  /* ... */
}
```

## 🌟 Features Inspired by Zus Coffee

1. **Clean, Modern Design** - Minimalist aesthetic
2. **Mobile-First** - Optimized for all devices
3. **Rewards Program** - Tiered loyalty system
4. **Store Locator** - Easy-to-find locations
5. **Menu Customization** - Drink personalization
6. **Brand Identity** - Strong coffee-themed design

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔮 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order placement system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Social media integration
- [ ] Blog/News section
- [ ] Multi-language support

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email hello@kacipcoffee.com or visit our stores.

---

**Built with ❤️ and ☕ by the Kacip Coffee Team**
