import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineBakeryDining } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSingOut = () => {
    logOut();
  };

  // Active link style
  const activeStyle = "bg-amber-100 text-amber-800 font-semibold";

  return (
    <div className="bg-[linear-gradient(to_right,_#fff3e0_0%,_#ffe0b2_50%,_#ffcc80_100%)] shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">
        {/* Logo and brand section */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-50 border border-amber-300">
              <MdOutlineBakeryDining className="text-amber-700 text-2xl" />
            </div>
            <motion.span
              className="font-bold text-xl text-amber-800"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Bakery Bliss
            </motion.span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-center">
          <ul className="menu menu-horizontal px-1 space-x-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeStyle : "text-amber-800 hover:bg-amber-100"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? activeStyle : "text-amber-800 hover:bg-amber-100"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customerOrder"
                className={({ isActive }) =>
                  isActive ? activeStyle : "text-amber-800 hover:bg-amber-100"
                }
              >
                Custom Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/becomeABaker"
                className={({ isActive }) =>
                  isActive ? activeStyle : "text-amber-800 hover:bg-amber-100"
                }
              >
                Become a Baker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Inbox"
                className={({ isActive }) =>
                  isActive ? activeStyle : "text-amber-800 hover:bg-amber-100"
                }
              >
                Inbox
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Cart button */}
          <Link
            to="/cart"
            className="btn btn-ghost btn-circle text-amber-700 hover:bg-amber-100"
          >
            <div className="indicator">
              <FaShoppingCart className="h-5 w-5" />
              <span className="badge badge-sm badge-primary indicator-item bg-amber-600 border-0">
                0
              </span>
            </div>
          </Link>

          {/* Login button */}

          <div className="flex items-center gap-4 flex-none">
            {user && user?.email ? (
              <div>
                <img
                  src={user?.photoURL}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-amber-800 ">{user.displayName}</p>
              </div>
            ) : (
              <iframe
                className="w-12 h-12 md:w-16 md:h-16"
                src="https://lottie.host/embed/21c0f04d-247e-460b-921b-f165217a9ef3/Mov0qGZhSD.json"
              ></iframe>
            )}
             {user ? (
            <button onClick={handleSingOut} className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md">
              Logout
            </button>
          ) : (
            <Link
              to="/Login"
              className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md"
            >
              Login
            </Link>
          )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-circle text-amber-800"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden py-2 px-4 bg-amber-50 shadow-inner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-amber-200 text-amber-800 font-medium"
                      : "text-amber-700 hover:bg-amber-100"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Products"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-amber-200 text-amber-800 font-medium"
                      : "text-amber-700 hover:bg-amber-100"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/CustomOrders"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-amber-200 text-amber-800 font-medium"
                      : "text-amber-700 hover:bg-amber-100"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Become_a_Baker"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-amber-200 text-amber-800 font-medium"
                      : "text-amber-700 hover:bg-amber-100"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Baker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Inbox"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-amber-200 text-amber-800 font-medium"
                      : "text-amber-700 hover:bg-amber-100"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Inbox
              </NavLink>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
