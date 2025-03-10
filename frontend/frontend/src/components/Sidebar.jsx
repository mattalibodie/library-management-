import { Link, NavLink } from "react-router";
import UserSVG from "../assets/user.svg";
import BookSVG from "../assets/book.svg";
import XIconSVG from "../assets/x.svg";
const Sidebar = ({username}) => {
  return (
    <>
      <div className="flex items-center content-between justify-between">
        <div className="flex justify-start items-center">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
          >
            <svg
              id="toggleSidebarMobileHamburger"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <img src={XIconSVG} alt="x-icon"/>
          </button>
          <a
            href="#"
            className="text-md font-semibold flex items-center lg:mr-1.5"
          >
            <img
              src="https://demos.creative-tim.com/soft-ui-flowbite/images/logo.svg"
              className="mr-2 h-8"
              alt="Creative Tim Logo"
            />
            <span className="hidden md:inline-block self-center text-xl font-bold whitespace-nowrap">
              Library Admin
            </span>
          </a>
        </div>
        <div className="flex items-center">
          <h1>Hello {username}</h1>
          <div className=" flex-1 p-3 justify-center text-lg text-gray-500 lg:pt-2 list-reset lg:flex lg:items-center">
            <NavLink
              to="/logout"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
      <aside
        id="sidebar"
        className="flex hidden fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50">
          <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
            <div className="flex-1 px-3 bg-gray-50" id="sidebar-items">
              <ul className="pb-2 pt-1">
                <li>
                  <Link
                    to="books"
                    className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 bg-white shadow-lg shadow-gray-200 group transition-all duration-200"
                  >
                    <div className="bg-white shadow-lg shadow-gray-30 !text-white  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center">
                      <img className = "h-6 w-6 absolute" src={BookSVG} alt="book-icon "/>
                    </div>
                    <span className="ml-3 text-dark-500 text-sm font-light">
                      Books
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 bg-white shadow-lg shadow-gray-200  group transition-all duration-200"
                    sidebar-toggle-collapse=""
                  >
                    <div className="bg-white shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center">
                      <img className="w-6 h-6 absolute" src={UserSVG} alt="user-icon"/>
                    </div>
                    <span className="ml-3 text-dark-500 text-sm font-light">
                      Users
                    </span>
                  </Link>
                </li>
              </ul>
              <hr className="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100" />
              <div className="pt-2"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
