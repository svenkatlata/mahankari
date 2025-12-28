import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Column 1 — Brand Info */}
        <div>
          <h3 className="text-2xl font-medium text-white mb-4">
            Mahankari Threads & Tales
          </h3>
          <p className="text-gray-400">
            We celebrate India"s handloom heritage by supporting local artisans
            and promoting sustainable, vegan clothing alternatives.
          </p>
          <p className="text-gray-400">
            Each saree brought to you blends tradition, craftsmanship, and
            conscious fashion —
          </p>
          <p className="text-gray-400">
            keeping our culture alive, one weave at a time.
          </p>
        </div>

        {/* Column 2 — Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-(--color-secondary)" />
              <span>+91 82107 57108</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-(--color-secondary)" />
              <span>mahankari.hyd@gmail.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-(--color-secondary)" />
              <span>Manikonda, Hyderabad, India</span>
            </li>
          </ul>
        </div>

        {/* Column 3 — Social & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Stay Connected
          </h3>
          <p className="text-gray-400 mb-4">
            Follow us on social media for updates on new collections & offers.
          </p>
          <div className="flex space-x-4 mb-6">
            <a
              href=""
              className="hover:text-(--color-secondary) transition flex flex-row gap-2"
            >
              <FaInstagram size={22} />
              <span>mahankari.hyd</span>
            </a>
            {/* <a href="#" className="hover:text-(--color-secondary) transition">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="hover:text-(--color-secondary) transition">
              <FaTwitter size={22} />
            </a> */}
          </div>

          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              // handle subscribe logic here
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Enter your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="on"
              className="flex-1 px-3 bg-white py-2 text-(--color-primary) focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white hover:bg-(--color-accent) text-(--color-primary) px-4 py-2 font-medium transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Mahanya Threads & Tales. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
