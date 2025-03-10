import {useState} from "react";
import { Link } from "react-router";

const UserDropDown = () =>{
    const [userDropdown, setUserDropdown] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const username = userData.username;
    console.log(userData);
    const balance = userData.balance;
    return (
        <div className="user-control hidden w-full lg:flex lg:items-center lg:w-auto">
            <div className="items-center flex-1 pt-6 justify-center text-lg text-gray-500 lg:pt-0 ">
                <div className="relative inline-block"
                     onMouseEnter={() => setUserDropdown(true)} // Show on hover
                     onMouseLeave={() => setUserDropdown(false)} // Hide on leave
                >
                    <div className="flex items-center p-2 rounded-md">
                        <p className="mr-3 italic text-gray-500"> {balance}đ </p>
                        <p className="mr-3">{username} </p>
                        <img
                            className="w-8 h-8 rounded"
                            src="https://innostudio.de/fileuploader/images/default-avatar.png"
                            alt="avatar"
                        />
                        <span className="transition-transform duration-500 transform">
                <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </span>
                    </div>
                    {/* Dropdown Menu */}
                    {userDropdown && (
                        <div className="absolute right-0 py-1 text-gray-500 bg-white rounded-lg shadow-xl min-w-max">
                            <Link
                                href="#"
                                className="block px-4 py-1 hover:text-gray-900 hover:bg-gray-100"
                            >
                                Cài đặt
                            </Link>
                            <Link
                                to="/logout"
                                className="block px-4 py-1 hover:text-gray-900 hover:bg-gray-100"
                            >
                                Đăng xuất.
                            </Link>
                        </div>
                    )}
                    {/* End Dropdown Menu */}
                    {/* End Dropdown 1 */}
                </div>
            </div>
        </div>
    );
}
export default UserDropDown;