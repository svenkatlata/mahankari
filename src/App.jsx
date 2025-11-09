import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AccountOverview from './pages/AccountOverview';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';

import NavBar from './components/Navbar';

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
      </Routes>
      <Footer />
    </Router>
  );
}
