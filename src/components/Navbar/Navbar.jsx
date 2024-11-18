import { Link, useLocation } from "react-router-dom";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext, WishlistContext } from "../Root/Root";

const Navbar = () => {
  const location = useLocation();
  const { wCart } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`navbar shadow-lg container mx-auto px-4 py-3 mt-2 ${
        isHomePage ? "bg-[#9538E2] text-white" : "bg-base-100"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to="/"
                className={isActive("/") ? "font-bold text-primary" : ""}
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
        <Link
          to="/"
          className={`text-xl font-extrabold tracking-wide lg:text-2xl ${
            isHomePage ? "text-white" : "text-[#9538E2]"
          }`}
        >
          Gadget Heaven
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">
          {[
            { label: "Home", path: "/" },
            { label: "Statistics", path: "/statistics" },
            { label: "Dashboard", path: "/dashboard" },
            { label: "Contact", path: "/contact" },
          ].map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${
                  isActive(path)
                    ? "bg-white text-[#9538E2] font-bold px-4 py-2 rounded-lg shadow"
                    : "hover:text-[#9538E2] transition"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <Link
          to="/dashboard"
          className="btn btn-circle bg-gray-100 hover:bg-gray-200 relative"
          aria-label="Cart"
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
          aria-label="Wishlist"
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
