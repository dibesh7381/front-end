// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar({ user, setUser }) {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-14">
//           {/* Logo */}
//           <Link to="/" className="text-xl font-bold hover:text-gray-200">
//             MyWebsite
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/" className="hover:text-gray-200">
//               Home
//             </Link>
//             <Link to="/about" className="hover:text-gray-200">
//               About
//             </Link>
//             <Link to="/contact" className="hover:text-gray-200">
//               Contact
//             </Link>

//             {!user && (
//               <>
//                 <Link to="/signup" className="hover:text-gray-200">
//                   Signup
//                 </Link>
//                 <Link to="/login" className="hover:text-gray-200">
//                   Login
//                 </Link>
//               </>
//             )}

//             {user && (
//               <>
//                 <Link to="/profile" className="hover:text-gray-200">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="focus:outline-none text-2xl"
//               aria-label="Toggle menu"
//             >
//               ☰
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
//           <Link
//             to="/"
//             className="block hover:text-gray-200"
//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>

//           <Link
//             to="/about"
//             className="block hover:text-gray-200"
//             onClick={() => setMenuOpen(false)}
//           >
//             About
//           </Link>

//           <Link
//             to="/contact"
//             className="block hover:text-gray-200"
//             onClick={() => setMenuOpen(false)}
//           >
//             Contact
//           </Link>

//           {!user && (
//             <>
//               <Link
//                 to="/signup"
//                 className="block hover:text-gray-200"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Signup
//               </Link>
//               <Link
//                 to="/login"
//                 className="block hover:text-gray-200"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             </>
//           )}

//           {user && (
//             <>
//               <Link
//                 to="/profile"
//                 className="block hover:text-gray-200"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Profile
//               </Link>
//               <div className="block px-3 py-1 text-white">Hi, {user.name}</div>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMenuOpen(false);
//                 }}
//                 className="w-full bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-left"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutsideDesktop =
        desktopProfileRef.current && !desktopProfileRef.current.contains(event.target);
      const clickedOutsideMobile =
        mobileProfileRef.current && !mobileProfileRef.current.contains(event.target);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    else return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-14 justify-between">
          {/* Logo on left */}
          <Link to="/" className="text-xl font-bold hover:text-gray-200 order-1 md:order-1">
            MyWebsite
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center order-2">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>

            {!user && (
              <>
                <Link
                  to="/signup"
                  className="hover:text-gray-200 bg-green-600 px-6 py-2 rounded-3xl"
                >
                  Signup
                </Link>
                <Link to="/login" className="hover:text-gray-200 bg-red-600 px-6 py-2 rounded-3xl">
                  Login
                </Link>
              </>
            )}

            {user && (
              <div className="relative" ref={desktopProfileRef}>
                {/* Profile Avatar */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setMenuOpen(false);
                  }}
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center cursor-pointer select-none hover:ring-2 hover:ring-white transition"
                  aria-label="Toggle profile menu"
                >
                  <span className="text-white font-semibold">{getInitials(user.name)}</span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg text-gray-800 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right Side: Hamburger + Profile */}
          <div className="flex items-center space-x-3 order-2 md:hidden">
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setProfileOpen(false);
              }}
              className="focus:outline-none text-2xl"
              aria-label="Toggle menu"
            >
              ☰
            </button>

            {/* Mobile Profile Avatar */}
            {user && (
              <div className="relative" ref={mobileProfileRef}>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setMenuOpen(false);
                  }}
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center cursor-pointer select-none hover:ring-2 hover:ring-white transition"
                  aria-label="Toggle profile menu"
                >
                  <span className="text-white font-semibold">{getInitials(user.name)}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-40 bg-white rounded-md shadow-lg text-gray-800 z-50">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setProfileOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - only links, no profile/logout */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          <Link to="/" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          {!user && (
            <>
              <Link
                to="/signup"
                className="block hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
              <Link to="/login" className="block hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

