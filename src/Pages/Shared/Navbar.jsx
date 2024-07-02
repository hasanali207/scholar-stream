import { Link, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "synthwave" : "light");
  };

  const { user, logOut } = useAuth();



  const handleLogout = () => {
    logOut();
  };

  const NavList = (
    <>
      <li className="bg-white">
        <NavLink className="text-lg" to="/" href="">
          Home
        </NavLink>
      </li>
      <li className="bg-white">
        <NavLink to="/allScholarship" className="text-lg" href="">
          All Scholarship
        </NavLink>
      </li>
      <li className="bg-white">
        <NavLink to="/dashboard" className="text-lg" href="">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar px-4 w-full lg:px-8  shadow-sm flex justify-between  items-center border-b-2 ">
        <div className="">
          <div className="dropdown z-50 ">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {NavList}
            </ul>
          </div>
          <Link to="/" className="text-2xl text-slate-600 font-semibold">
            Scholar <span>Stream</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavList}</ul>
        </div>

        <div>
         

          <div className="dropdown dropdown-hover">
            <div
              title={user?.displayName}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative"
            >
              <div className="w-10 rounded-full">
                {user && user.photoURL && (
                  <img tabIndex={0} alt="User Avatar" src={user?.photoURL} />
                )}
              </div>
            </div>

            {user && (
              <ul
                tabIndex={0}
                className="dropdown-content  z-[10] menu p-2 shadow bg-base-100 rounded-box "
              >
                <li>
                  <a>{user?.displayName}</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li></li>
              </ul>
            )}
          </div>

          <div className="ml-3 flex flex-col lg:flex-row">
            {/* <Link onClick={handleSignOut}>
            <button>Logout</button>
          </Link> */}

            {!user && (
              <>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <span className="hidden lg:inline-block mx-2"> / </span>
                <Link to="/register">
                  <button>Sign up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
