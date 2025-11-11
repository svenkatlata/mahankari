import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import logo1 from "../assets/logo1.png";
import { IoChevronDown, IoMenu } from "react-icons/io5";
import { PiShoppingCartSimple, PiHeart, PiUser } from "react-icons/pi";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const submenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
    const mobileMenu = mobileMenuRef.current;
    mobileMenu.style.display = "block";
    mobileMenu.style.transform = "translateX(0)";
  };

  const closeMobileMenu = () => {
    const mobileMenu = mobileMenuRef.current;
    mobileMenu.style.display = "none";
    mobileMenu.style.transform = "translateX(-100%)";
  };

  // const openSareeDropdown = () => {
  //   const sareeDropdown = submenuRef.current;
  //   sareeDropdown.style.display = "block";
  //   sareeDropdown.style.transform = "translateX(0)";
  // };
  // const closeSareeDropdown = () => {
  //   const sareeDropdown = submenuRef.current;
  //   sareeDropdown.style.display = "none";
  //   sareeDropdown.style.transform = "translateX(-100%)";
  // };
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

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
            <li
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
              className="relative group hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2 "
            >
              <Link
                to="/collections/sarees"
                onClick={openDropdown}
                className="flex justify-between gap-1 items-center m-0"
              >
                <span className="tracking-wider leading-none">SAREES</span>
                <IoChevronDown />
              </Link>
              <ul
                ref={submenuRef}
                className={`absolute left-0 top-full w-56 flex-col bg-(--color-primary) text-(--color-secondary) shadow-lg z-50 p-2 ${
                  isDropdownOpen ? "group-hover:flex translateX(0)" : "hidden translateX(-100%)"
                }`}
              >
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/chennur-silk-sarees" onClick={closeDropdown}>
                    Chennur Silk Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/kota-doriya-sarees"  onClick={closeDropdown}>
                    Kota Doriya Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/malai-cotton-sarees"  onClick={closeDropdown}>
                    Malai Cotton Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/handloom-cotton-sarees"  onClick={closeDropdown}>
                    Handloom Cotton Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/bengal-soft-cotton-sarees"  onClick={closeDropdown}>
                    Bengal Soft Cotton Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/kota-cotton-sarees"  onClick={closeDropdown}>
                    Kota Cotton Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/munga-kota-cotton-sarees"  onClick={closeDropdown}>
                    Munga Kota Cotton Sarees
                  </Link>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <Link to="/collections/pure-cotton-sarees"  onClick={closeDropdown}>
                    Pure Cotton Sarees
                  </Link>
                </li>
              </ul>
            </li>
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <Link to="/collections/dresses" className="tracking-wider leading-none">
                DRESSES
              </Link>
            </li>
            <li className="flex items-center hover:text-(--color-accent) hover:bg-white/5 space-y-1 px-4 py-2">
              <Link to="/collections/dupattas" className="tracking-wider leading-none">
                DUPATTAS
              </Link>
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
              ref={mobileMenuRef}
              className="right-0 top-full hidden w-60 flex-col bg-(--color-primary) text-(--color-secondary) shadow-lg z-50 group-hover:flex p-2 absolute"
            >
              <Link
                to="/"
                className="block space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:text-(--color-accent) tracking-wider"
              >
                HOME
              </Link>
              <a
                href="#"
                className="block space-y-1 p-2 text-base font-medium hover:bg-white/5 hover:t-(--color-accent) tracking-wider"
              >
                SAREES
              </a>
              <ul
                id="SareeMenu"
                className="left-0 top-full flex-col bg-white/5 text-(--color-secondary) group-hover:flex p-2"
              >
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Chennur Silk Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Kota Doriya Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Malai Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Handloom Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Bengal Soft Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
                  <a href="#">Munga Kota Cotton Sarees</a>
                </li>
                <li className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2">
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
