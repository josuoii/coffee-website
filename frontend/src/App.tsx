import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { RewardsPage } from '@/pages/RewardsPage';
import { AboutPage } from '@/pages/AboutPage';
import { StoresPage } from '@/pages/StoresPage';
import { LoginPage } from '@/pages/LoginPage';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminMenuPage } from '@/pages/admin/AdminMenuPage';
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from '@/pages/admin/AdminCustomersPage';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
              <Route path="/rewards" element={<Layout><RewardsPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/stores" element={<Layout><StoresPage /></Layout>} />
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Routes - Protected */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="menu" element={<AdminMenuPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="inventory" element={<div className="p-8"><h1 className="text-3xl font-bold">Inventory - Coming Soon</h1></div>} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="analytics" element={<div className="p-8"><h1 className="text-3xl font-bold">Analytics - Coming Soon</h1></div>} />
                <Route path="settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings - Coming Soon</h1></div>} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;