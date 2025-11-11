import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import logo1 from "../assets/logo1.png";
import { IoChevronDown, IoMenu } from "react-icons/io5";
import { PiShoppingCartSimple, PiHeart, PiUser } from "react-icons/pi";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const mobileMenuRef = useRef(null);
  const sareeDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "block";
      mobileMenuRef.current.style.transform = "translateX(0)";
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "none";
      mobileMenuRef.current.style.transform = "translateX(-100%)";
    }
  };

  const openSareeDropdown = () => {
    if (sareeDropdownRef.current) {
      sareeDropdownRef.current.style.display = "block";
      sareeDropdownRef.current.style.transform = "translateX(0)";
    }
  };
  const closeSareeDropdown = () => {
    if (sareeDropdownRef.current) {
      sareeDropdownRef.current.style.display = "none";
      sareeDropdownRef.current.style.transform = "translateX(-100%)";
    }
  };
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        isTop ? "shadow-none" : "shadow-lg bg-white/80 backdrop-blur-md "
      } transition-shadow duration-300`}
    >
      <div className="flex justify-center bg-(--color-topbar) text-(--color-secondary) font-(family-name:--font-primary) px-6 py-2 sm:px-10 text-sm border-none items-center">
        <span className="animate-pulse tracking-wider text-center leading-none">
          🚚 FREE SHIPPING AVAILABLE FOR ORDERS WITHIN INDIA!!
        </span>
      </div>
      <div className="flex bg-(--color-primary) px-4 py-3 sm:px-10 justify-between items-center text-(--color-secondary)">
        <Link to="/">
          <img src={logo1} alt="Mahankari" className="h-14" />
        </Link>

        <nav className="relative">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex justify-between">
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <Link to="/" className="tracking-wider leading-none">
                HOME
              </Link>
            </li>
            <li className="flex items-center relative group hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <a
                onClick={openSareeDropdown}
                onBlur={closeSareeDropdown}
                onMouseEnter={openSareeDropdown}
                onMouseLeave={closeSareeDropdown}
                href="#"
                className="flex justify-between gap-1 items-center m-0"
              >
                <span className="tracking-wider leading-none">SAREES</span>
                <IoChevronDown />
              </a>
              <ul
                id="SareeDropdown"
                ref={sareeDropdownRef}
                className="absolute left-0 top-full hidden w-56 flex-col bg-(--color-primary) text-(--color-secondary) shadow-lg z-50 group-hover:flex p-2"
              >
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Chennur Silk Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Kota Doriya Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Malai Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Handloom Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Bengal Soft Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Munga Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Pure Cotton Sarees</a>
                </li>
              </ul>
            </li>
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <a href="#" className="tracking-wider leading-none">
                DRESSES
              </a>
            </li>
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <a href="#" className="tracking-wider leading-none">
                DUPATTAS
              </a>
            </li>
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <Link to="/contact" className="tracking-wider leading-none">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="flex justify-center">
          <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1  p-2 md:px-4">
            <Link
              to="/login"
              className="flex flex-col items-center justify-center gap-1"
            >
              <PiUser className="text-xl" />
              <span className="hidden lg:block text-sm tracking-wider leading-none">
                Profile
              </span>
            </Link>
          </li>
          <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1  p-2 md:px-4">
            <Link
              to="/login"
              className="flex flex-col items-center justify-center gap-1"
            >
              <PiHeart className="text-xl" />
              <span className="hidden lg:block text-sm tracking-wider leading-none">
                Wishlist
              </span>
            </Link>
          </li>
          <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 md:px-4">
            <a
              href="#"
              className="flex flex-col items-center justify-center gap-1"
            >
              <PiShoppingCartSimple className="text-xl" />
              <span className="hidden lg:block text-sm tracking-wider leading-none">
                Cart
              </span>
            </a>
          </li>
          <li className="flex lg:hidden hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 md:px-4">
            {/* Hamburger */}
            <a
              href="#"
              onClick={openMobileMenu}
              onBlur={closeMobileMenu}
              className="text-xl"
            >
              <IoMenu />
            </a>
            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className="right-0 top-full hidden w-60 flex-col bg-(--color-primary) text-(--color-secondary) shadow-lg z-50 group-hover:flex p-2 absolute"
            >
              <Link
                to="/"
                className="block rounded-md space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                HOME
              </Link>
              <a
                href="#"
                className="block rounded-md space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                SAREES
              </a>
              <ul
                id="SareeMenu"
                className="left-0 top-full flex-col bg-white/5 text-(--color-secondary) group-hover:flex p-2"
              >
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Chennur Silk Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Kota Doriya Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Malai Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Handloom Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Bengal Soft Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Munga Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md">
                  <a href="#">Pure Cotton Sarees</a>
                </li>
              </ul>
              <a
                href="#"
                className="block rounded-md space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                DRESSES
              </a>
              <a
                href="#"
                className="block rounded-md space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                DUPATTAS
              </a>
              <Link
                to="/contact"
                className="block rounded-md space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                CONTACT
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
