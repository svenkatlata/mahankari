import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import {
  FaUserCircle,
  FaInstagram,
  FaShoppingCart,
  FaAngleDown,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const submenuRef = React.useRef(null);
  const mobileMenuRef = React.useRef(null);
  const navigate = useNavigate();
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
  const openSareeDropdown = () => {
    const sareeDropdown = submenuRef.current;
    sareeDropdown.style.display = "block";
    sareeDropdown.style.transform = "translateX(0)";
  };
  const closeSareeDropdown = () => {
    const sareeDropdown = submenuRef.current;
    sareeDropdown.style.display = "none";
    sareeDropdown.style.transform = "translateX(-100%)";
  };

  const handleDropdownClick = (event, redirecturl) => {
    // event.stopPropagation();
    console.log("handleDropdownClick called", event);
    closeSareeDropdown();
    navigate(redirecturl);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 ${
        isTop ? "shadow-none" : "shadow-lg bg-white/80 backdrop-blur-md "
      } transition-shadow duration-300`}
    >
      <div className="flex md:hidden justify-center bg-(--color-topbar) text-(--color-secondary) font-(family-name:--font-primary) px-6 sm:px-10 text-[0.9rem] border-none items-center">
        <span className="animate-pulse tracking-wider text-center">
          🚚 FREE SHIPPING AVAILABLE FOR ORDERS WITHIN INDIA!!
        </span>
      </div>
      <div className="flex justify-between bg-(--color-topbar) text-(--color-secondary) font-(family-name:--font-primary) px-6 sm:px-10 text-[0.9rem] border-none items-center">
        <a
          href="https://www.instagram.com/mahankari.hyd/"
          className="flex justify-between gap-2"
        >
          <FaInstagram className="h-5" />
          <span className="tracking-wider">mahankari.hyd</span>
        </a>
        <span className="hidden md:block animate-pulse tracking-wider text-center px-4">
          🚚 FREE SHIPPING AVAILABLE FOR ORDERS WITHIN INDIA!!
        </span>
        <div>
          <ul className="flex justify-between gap-4">
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <Link to="/login" className="flex justify-between gap-2">
                <FaUserCircle className="h-5" />
                <span className="tracking-wider">Profile</span>
              </Link>
            </li>
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <a href="#" className="flex justify-between gap-2">
                <FaShoppingCart className="h-5" />
                <span className="tracking-wider">Cart</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex bg-(--color-primary) px-4 py-3 sm:px-10 justify-between items-center text-(--color-secondary)">
        <Link to="/">
          <img src={logo1} alt="Mahankari" className="h-18" />
        </Link>

        <nav className="relative">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex justify-between gap-8">
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <Link to="/" className="tracking-wider">
                HOME
              </Link>
            </li>
            <li className="relative group hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <Link
                onClick={openSareeDropdown}
                onBlur={closeSareeDropdown}
                className="flex justify-between gap-1 items-center"
              >
                <span className="tracking-wider">SAREES</span>
                <FaAngleDown />
              </Link>
              <ul
                ref={submenuRef}
                className="absolute left-0 top-full hidden w-56 flex-col bg-(--color-primary) text-(--color-secondary) shadow-lg z-50 group-hover:flex p-2"
              >
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/chennur-silk-sarees"
                    )
                  }
                >
                  <Link>Chennur Silk Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/kota-doriya-sarees"
                    )
                  }
                >
                  <Link>Kota Doriya Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/malai-cotton-sarees"
                    )
                  }
                >
                  <Link>Malai Cotton Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/handloom-cotton-sarees"
                    )
                  }
                >
                  <Link>Handloom Cotton Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/bengal-soft-cotton-sarees"
                    )
                  }
                >
                  <Link>Bengal Soft Cotton Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/kota-cotton-sarees"
                    )
                  }
                >
                  <Link>Kota Cotton Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(
                      event,
                      "/collections/munga-kota-cotton-sarees"
                    )
                  }
                >
                  <Link>Munga Kota Cotton Sarees</Link>
                </li>
                <li
                  className="hover:bg-white/5 hover:text-(--color-accent) transition-colors duration-200 space-y-1 p-2 rounded-md"
                  onClick={(event) =>
                    handleDropdownClick(event, "/collections/pure-kota-sarees")
                  }
                >
                  <Link to="/collections/pure-kota-sarees">
                    Pure Cotton Sarees
                  </Link>
                </li>
              </ul>
            </li>
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <a href="#" className="tracking-wider">
                DRESSES
              </a>
            </li>
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <a href="#" className="tracking-wider">
                DUPATTAS
              </a>
            </li>
            <li className="hover:text-(--color-accent) hover:bg-white/5 space-y-1 p-2 rounded-md">
              <Link to="/contact" className="tracking-wider">
                CONTACT
              </Link>
            </li>
          </ul>
          <div className="flex lg:hidden hover:text-(--color-accent)">
            {/* Hamburger */}
            <a
              href="#"
              onClick={openMobileMenu}
              onBlur={closeMobileMenu}
              className="text-[30px]"
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
