import { useNavigate  } from "react-router-dom";
export const ErrorPage = () =>{
    const navigate = useNavigate();
    return (

        <div
            className="h-screen mx-auto grid place-items-center text-center px-8"
        >
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-20 h-20 mx-auto"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <h1
                    className="block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-blue-gray-900 mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                    Error 404 <br/>
                    Đường dẫn bạn đang truy cập không tồn tài
                </h1>
                <p
                    className="block antialiased font-sans text-[18px] font-light leading-relaxed text-inherit mt-8 mb-14 font-normal text-gray-500 mx-auto md:max-w-sm"
                >
                    Nếu bạn đang cố gắng truy cập vào những trang không có thẩm quyền, vui lòng quay lại.
                </p>
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-full px-4 md:w-[8rem]"
                    type="button"
                    onClick={() => navigate(-1)}
                    data-ripple-light="true"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );

};
export default ErrorPage;

