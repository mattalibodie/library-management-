import PropTypes from "prop-types";
import { useState } from "react";
import apiRequest from "../../api/apiRequest";
import XIcon from "../../assets/x.svg";
export const AddUserModal = ({ isOpen, onClose, setMessageFromChild }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  if (!isOpen) {
    return null;
  }
  const handleAddUser = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8081/user/adduser";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = { username, name, email, birthday, password };
    try {
      const res = await apiRequest(url, "POST", headers, body);
      if (res.code === 200) {
        onClose();
        window.location.reload("/admin");
      } else {
        onClose();
        setMessageFromChild(res.message);
      }
    } catch (error) {
      setMessageFromChild(error);
    }

  };

  const inputUsernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const inputNameHandler = (e) => {
    setName(e.target.value);
  };
  const inputBirthdayHandler = (e) => {
    setBirthday(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex"
      id="user-modal"
      role="dialog"
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-lg">
          {/* Modal header */}
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3 className="text-xl font-semibold">Thêm người dùng</h3>
            <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
            >
              <img src={XIcon} alt=""/>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tên đăng nhập
                  </label>
                  <input
                    onChange={inputUsernameHandler}
                    type="text"
                    name="username"
                    id="username"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                    placeholder="Bonnie"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Họ và tên
                  </label>
                  <input
                    onChange={inputNameHandler}
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                    placeholder="Bonnie"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    onChange={inputEmailHandler}
                    type="text"
                    name="email"
                    id="email"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                    placeholder="example@email.com"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sinh nhật
                  </label>
                  <input
                    onChange={inputBirthdayHandler}
                    type="date"
                    name="birthday"
                    id="birthday"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                    placeholder=""
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    onChange={inputPasswordHandler}
                    type="password"
                    name="password"
                    id="password"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                    placeholder=""
                    required=""
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Modal footer */}
          <div className="items-center p-6 rounded-b border-t border-gray-200">
            <button
              onClick={handleAddUser}
              className="text-white rounded-lg bg-gradient-to-br from-pink-500 to-voilet-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 opacity-70  fixed inset-0 z-[-1]"></div>
    </div>
  );
};
AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setMessageFromChild: PropTypes.func.isRequired
};
export default AddUserModal;
