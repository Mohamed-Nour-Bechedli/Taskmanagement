import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserFirstName(payload.firstName || "U");
      } catch (err) {
        console.error("Invalid token");
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            className="h-8"
          />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ProductManager
          </span>
        </a>

        <div className="relative" ref={dropdownRef}>
          {userFirstName && (
            <>
              {/* User Avatar */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold focus:outline-none"
              >
                {userFirstName.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow-md z-50">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button
                        onClick={handleProfile}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </button>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
