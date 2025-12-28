import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Slideshow from "./pages/Slideshow";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import Shipments from "./pages/Shipments";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Support from "./pages/Support";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/AddProduct";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="slideshow" element={<Slideshow />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="users" element={<Users />} />
          <Route path="support" element={<Support />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
