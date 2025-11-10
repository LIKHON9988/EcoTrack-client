import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to={"/"} className="hover:text-emerald-300 transition-colors">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/challenges"}
          className="hover:text-emerald-300 transition-colors"
        >
          Challenges
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/myActivities"}
          className="hover:text-emerald-300 transition-colors"
        >
          My Activities
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/15 backdrop-blur-lg shadow-sm">
      <div className="navbar w-11/12 mx-auto text-white">
        {/* Left Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
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
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-xl bg-white/20 backdrop-blur-xl shadow-lg text-white"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <p className="hover:cursor-pointer  text-2xl font-bold text-white">
              Eco<span className="text-emerald-300">Track</span>
            </p>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end flex items-center gap-3">
          {user ? (
            <button
              onClick={logOut}
              className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to={"/signIn"}
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
              >
                Log In
              </NavLink>
              <NavLink
                to={"/signUp"}
                className="btn btn-sm bg-white/30 hover:bg-white/40 text-white border-none backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
