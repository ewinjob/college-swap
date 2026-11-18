import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import AdminUsers from './admin/Users';
import AdminReports from './admin/Reports';

function App() {
  return (
    <Routes>
      {/* 🌴 Public / Student Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="auth" element={<Auth />} />
      </Route>

      {/* 👑 Admin Routes - Works on BOTH /admin and /ghost */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      <Route path="/ghost" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
