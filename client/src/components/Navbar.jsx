import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = ({ isHomePage = false, scrolled = false }) => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  const isTransparent = isHomePage && !scrolled;

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery?.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 relative transition-all duration-300 ${isTransparent ? "text-white bg-gradient-to-b from-slate-950/45 via-slate-950/20 to-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : "text-gray-700 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md"}`}
    >
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img
          className={`h-9 transition duration-300 ${isTransparent ? "brightness-0 invert" : ""}`}
          src={assets.logo}
          alt="logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          className={`font-medium tracking-wide transition-colors hover:opacity-80 ${isTransparent ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" : "text-gray-700"}`}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={`font-medium tracking-wide transition-colors hover:opacity-80 ${isTransparent ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" : "text-gray-700"}`}
          to="/products"
        >
          All Product
        </NavLink>
        <NavLink
          className={`font-medium tracking-wide transition-colors hover:opacity-80 ${isTransparent ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" : "text-gray-700"}`}
          to="/"
        >
          Contact
        </NavLink>

        <div
          className={`hidden lg:flex items-center text-sm gap-2 px-3 rounded-full border transition-colors ${isTransparent ? "border-white/30" : "border-gray-300"}`}
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`py-1.5 w-full bg-transparent outline-none ${isTransparent ? "placeholder-white/70 text-white" : "placeholder-gray-500 text-gray-700"}`}
            type="text"
            placeholder="Search products"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className={`w-4 h-4 ${isTransparent ? "brightness-0 invert" : ""}`}
          />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className={`w-4 opacity-80 ${isTransparent ? "brightness-0 invert" : ""}`}
          />
          <button
            className={`absolute -top-2 -right-3 text-xs w-[18px] h-[18px] rounded-full ${isTransparent ? "text-gray-900 bg-white" : "text-white bg-primary"}`}
          >
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className={`cursor-pointer px-8 py-2 transition rounded-full ${isTransparent ? "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15" : "bg-primary hover:bg-primary-dull text-white"}`}
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul
              className="hidden group-hover:block absolute top-10 right-0 bg-white shadow
                        border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40"
            >
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 
                            hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 
                            cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className={`w-4 opacity-80 ${isTransparent ? "brightness-0 invert" : ""}`}
          />
          <button
            className={`absolute -top-2 -right-3 text-xs w-[18px] h-[18px] rounded-full ${isTransparent ? "text-gray-900 bg-white" : "text-white bg-primary"}`}
          >
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img
            src={assets.menu_icon}
            alt="Menu"
            className={`${isTransparent ? "brightness-0 invert" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white/95 backdrop-blur-md
                shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden text-gray-700`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition 
                    text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary 
                    hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
