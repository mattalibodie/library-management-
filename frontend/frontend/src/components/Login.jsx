
import { getUserInfo } from "../api/getUserInfo";
import loginRequest from "../api/loginRequest";

export const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;
    if (username === "" || password === "") {
      alert("Email và mật khẩu không được để trống");
      return;
    }
    const result = loginRequest(username, password);
    result.then((data) => {
      if (data.result) {
        localStorage.setItem("token", data.result.token);
        const userInfo = getUserInfo();
        userInfo.then((data) => {
          const userInfo = data.result;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          if (userInfo.roles[0] === "ADMIN") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        });
      } else {
        alert("Đăng nhập thất bại");
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      <div className="background  min-h-screen bg-no-repeat bg-cover bg-center">
        <div className="flex justify-end">
          <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
            <div>
              <form>
                <div>
                  <span className="text-sm text-gray-900">Chào mừng</span>
                  <h1 className="text-2xl font-bold">Đăng nhập</h1>
                </div>
                <div className="my-3">
                  <label className="block text-md mb-2" htmlFor="email">
                    Tên đăng nhập
                  </label>
                  <input
                    className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                    type="text"
                    name="username"
                    placeholder="username"
                  ></input>
                </div>
                <div className="mt-5">
                  <label className="block text-md mb-2" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                    type="password"
                    name="password"
                    placeholder="password"
                  ></input>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="">
                  <button
                    className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                    onClick={handleLogin}
                    type="button"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              <p className="mt-8">
                {" "}
                Dont have an account?{" "}
                <span className="cursor-pointer text-sm text-blue-600">
                  {" "}
                  Join free today
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
