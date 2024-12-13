import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems2 } from "../constants";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { BellRing } from "lucide-react";
import { Settings } from "lucide-react";
import { Search } from "lucide-react";

const Navbar2 = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navigate = useNavigate();

  const handleGoToLogin = () => navigate("/login");
  const handleGoToRegisterPage = () => navigate("/register");

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight">GrowWise</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems2.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation if necessary
                    item.onClick && item.onClick(navigate);
                  }}
                  className="hover:text-orange-500 cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-2 items-center">
            <button
              onClick={() => alert("Profile")}
              className="p-1 border-[1px] border-white border-opacity-30 rounded-md opacity-80"
            >
              <User />
            </button>
            <button
              onClick={() => alert("Notifications")}
              className="p-1 border-[1px] border-white border-opacity-30 rounded-md opacity-80"
            >
              <BellRing />
            </button>
            <button
              onClick={() => alert("Settings")}
              className="p-1 border-[1px] border-white border-opacity-30 rounded-md opacity-80"
            >
              <Settings />
            </button>
            <button
              onClick={() => alert("Search")}
              className="p-1 border-[1px] border-white border-opacity-30 rounded-md opacity-80"
            >
              <Search />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems2.map((item, index) => (
                <li key={index} className="py-4">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default navigation if necessary
                      item.onClick && item.onClick(navigate);
                    }}
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-6">
              <button
                onClick={handleGoToLogin}
                className="py-2 px-3 border rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={handleGoToRegisterPage}
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;

