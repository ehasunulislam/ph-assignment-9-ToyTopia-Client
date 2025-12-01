import { RiMenu2Line } from "react-icons/ri";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutFunction } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutFunction()
      .then(() => {
        toast.success("sign out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="navbar mt-10 px-3 md:px-8 lg:px-10">
      <div className="navbar-start">
        <Link to="/" className="ext-xl">
          <img src={assets.logo} alt="logo" className="w-30" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink to="/" className="me-3">Home</NavLink>
          <NavLink to="/card/showAllCards" className="me-3">All Toys</NavLink>
          <NavLink to="/contact" className="me-3">Contact</NavLink>

          {user && (
            <NavLink to="/auth/myProfile" className="me-3">My Profile</NavLink>
          )}
        </ul>
      </div>
      <div className="navbar-end ">
        <div className="relative pe-3 group">
          {user && (
            <>
              <Link to="/auth/myProfile">
                <img
                  src={user.photoURL}
                  alt="user image"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {user?.displayName || "No name"}
              </span>
            </>
          )}
        </div>

        {user ? (
          <button
            className="btn bg-[#0F83B2] text-white rounded-full px-6"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="btn bg-[#0F83B2] text-white rounded-full px-6"
          >
            Login
          </Link>
        )}

        {/* mobile dropdown */}
        <div className="dropdown relative">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RiMenu2Line />
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow right-0">
            <NavLink to="/" className="me-3">Home</NavLink>
             <NavLink to="/contact" className="me-3">Contact</NavLink>
            <NavLink to="/card/showAllCards" className="me-3">Service</NavLink>
            {user && <NavLink to="/auth/myProfile" className="me-3">My Profile</NavLink>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
