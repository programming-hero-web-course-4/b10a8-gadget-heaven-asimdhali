import { Link, useLocation } from "react-router-dom";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext, WishlistContext } from "../Root/Root";

const Navbar = () => {
  const location = useLocation();
  const { wCart } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  // Check the current route to highlight active links
  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  return (
    <div className={`navbar shadow-lg container mx-auto px-4 py-3 mt-2  ${
        isHomePage ? "bg-[#9538E2] text-white" : "bg-base-100"
      }`}>
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to="/"
                className={isActive("/") ? "font-bold " : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-extrabold">
          Gadget Heaven
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 ">
          <li>
            <Link
              to="/"
              className={`hover:text-blue-600  ${
                isActive("/") ? "underline font-bold text-white" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className={`hover:text-blue-600 ${
                isActive("/statistics") ? "text-blue-600 underline font-bold" : ""
              }`}
            >
              Statistics
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`hover:text-blue-600 ${
                isActive("/dashboard") ? "text-blue-600 underline font-bold" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-blue-600 ${
                isActive("/contact") ? "text-blue-600 underline font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex gap-4">
        <Link
          to="/dashboard"
          className="btn btn-circle bg-gray-100 hover:bg-gray-200 relative"
        >
          <FaCartArrowDown className="text-xl text-gray-700" />
          {cart.length > 0 && (
            <span className="badge badge-primary absolute -top-2 -right-2">
              {cart.length}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard"
          className="btn btn-circle bg-gray-100 hover:bg-gray-200 relative"
        >
          <FaHeart className="text-xl text-gray-700" />
          {wCart.length > 0 && (
            <span className="badge badge-secondary absolute -top-2 -right-2">
              {wCart.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
