// Navbar.jsx
import { useState, useRef, useEffect } from "react";
import {Link, NavLink} from "react-router";
export const Navbar = ({token, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tabRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    if (isOpen) {
      return { maxHeight: tabRef.current.scrollHeight + "px" };
    } else {
      return { maxHeight: "0px" };
    }
  };

  useEffect(() => {
    if (isOpen && tabRef.current) {
      tabRef.current.style.maxHeight = tabRef.current.scrollHeight + "px";
    } else if (tabRef.current) {
      tabRef.current.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
      <nav
          className="fixed top-0 z-40 flex flex-wrap items-center justify-between w-full px-4 py-5 tracking-wide shadow-md bg-white bg-opacity-90 md:py-4 md:px-8 lg:px-14">
        {/* Left nav */}
        <div className="flex items-center">
          <NavLink to="/" end className="text-3xl tracking-wide">
            Library
          </NavLink>
        </div>
        {/* End left nav */}

        {/* Right nav */}
        {/* Show menu sm,md */}
        {/* Toggle button */}
        <div
            onClick={handleClick}
            className="block text-gray-600 cursor-pointer lg:hidden"
        >
          <button className="w-6 h-6 text-lg">
            {isOpen ? (
                <img src="" alt=""/>
            ) : (
                <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-full each-in-out transform duration-500"
                >
                  <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                  <path
                      d="M7.94977 11.9498H39.9498"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M7.94977 23.9498H39.9498"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M7.94977 35.9498H39.9498"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
            )}
          </button>
        </div>
        {/* End toggle button */}

        {/* Toggle menu */}
        <div
            ref={tabRef}
            style={handleToggle()}
            className="relative w-full overflow-hidden transition-all duration-700 lg:hidden max-h-0"
        >
          <div className="flex flex-col my-3 space-y-2 text-lg hover:font-b text-gray-600">
            <a href="#" className="hover:text-gray-900">
              <span>Link</span>
            </a>
            <hr/>
            <a href="#" className="hover:text-gray-900">
              <span>Link</span>
            </a>
            <hr/>
            <a href="#" className="hover:text-gray-900">
              <span>Link</span>
            </a>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                About
              </a>

              <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="button">
            <Link
                to="/sign-up"
                className="w-full flex items-center justify-center text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium bg-gray-600 hover:bg-gray-700"
            >
              Sign up
            </Link>
            <p className="mt-6 text-center text-base font-medium text-gray-500">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </p>
          </div>
        </div>
        {/* End toggle menu */}
        {/* End show menu sm,md */}

        {/* Show Menu lg */}
        <div className="hidden w-full lg:flex lg:items-center lg:w-auto">
          <div className="items-center flex-1 pt-6 justify-center text-lg text-gray-500 lg:pt-0 list-reset lg:flex">
            <div className="mr-3">
              <a
                  href="#"
                  className="inline-block px-4 py-2 no-underline hover:text-gray-900 text-gray-600"
              >
                Home
              </a>
            </div>

            <div className="mr-3">
              <a
                  href="#"
                  className="inline-block px-4 py-2 no-underline hover:text-gray-900 text-gray-600"
              >
                About
              </a>
            </div>

            {/* Dropdown 1 */}
            <div
                className="relative inline-block"
                onMouseEnter={() => setDropdownOpen(true)} // Show on hover
                onMouseLeave={() => setDropdownOpen(false)} // Hide on leave
            >
              {/* Dropdown Toggle Button */}
              <button className="flex items-center p-2 rounded-md">
                <span className="mr-4">TEST DROPDOWN</span>
                <span className="transition-transform duration-500 transform">
                <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </span>
              </button>
              {/* End Dropdown Toggle Button */}

              {/* Dropdown Menu */}
              {dropdownOpen && (
                  <div className="absolute right-0 py-1 text-gray-500 bg-white rounded-lg shadow-xl min-w-max">
                    <a
                        href="#"
                        className="block px-4 py-1 hover:text-gray-900 hover:bg-gray-100"
                    >
                      Lorem, ipsum.
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-1 hover:text-gray-900 hover:bg-gray-100"
                    >
                      Lorem, ipsum dolor.
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-1 hover:text-gray-900 hover:bg-gray-100"
                    >
                      Lorem ipsum dolor sit amet.
                    </a>
                  </div>
              )}
              {/* End Dropdown Menu */}
            </div>
            {/* End Dropdown 1 */}
          </div>
        </div>
        <form action="#" method="GET" className="hidden lg:block lg:pl-8">
          <label htmlFor="topbar-search" className="sr-only">Search</label>
          <div className="relative mt-1 lg:w-80">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"></path>
              </svg>
            </div>
            <input type="text" name="email" id="topbar-search"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full pl-10 p-2.5"
                   placeholder="Search"/>
          </div>
        </form>
        {token ? children : <div className="hidden w-full lg:flex lg:items-center lg:w-auto">
          <div className="items-center flex-1 pt-6 justify-center text-lg text-gray-500 lg:pt-0 list-reset lg:flex">
            <Link
                to="/signin"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
                to="/login"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"
            >
              Login
            </Link>
          </div>
        </div>}

        {/* End show Menu lg */}
        {/* End right nav */}
      </nav>
  );
}

export default Navbar;
