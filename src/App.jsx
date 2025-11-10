import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AccountOverview from "./pages/AccountOverview";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";

import NavBar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import ProductListing from "./pages/ProductListing";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="pt-31"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AccountOverview />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/product-details/:productInfo"
          element={<ProductDetails />}
        />
        <Route path="/collections/" element={<ProductListing />} />
      </Routes>
      <Footer />
    </Router>
  );
}
