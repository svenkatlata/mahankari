import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AccountOverview from "./pages/AccountOverview";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";

import NavBar from "./components/Navbar";
import ScrollToTop from "./components/ScrolltoTop";
import ProductDetails from "./pages/ProductDetails";
import ProductListing from "./pages/ProductListing";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <div className="pt-27"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AccountOverview />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/products/:productInfo"
          element={<ProductDetails />}
        />
        <Route
          path="/collections/:productsListing"
          element={<ProductListing />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
