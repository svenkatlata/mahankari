import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AccountOverview from "./pages/AccountOverview";
import Login from "./pages/Login";

import NavBar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AccountOverview />} />
      </Routes>
    </Router>
  );
}
