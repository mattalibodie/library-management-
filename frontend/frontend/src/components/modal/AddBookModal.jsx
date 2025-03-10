import PropTypes from "prop-types";
import {useRef, useState} from "react";
import apiRequest from "../../api/apiRequest";
import XIcon from "../../assets/x.svg";

const AddBookModal = ({isOpen, onClose, setMessageFromChild }) => {
    const formRef = useRef(null);
    const coverImageInputRef = useRef(null);
    const epubFileInputRef = useRef(null);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", formRef.current.title.value);
        formData.append("publisher", formRef.current.publisher.value);
        formData.append("isbn", formRef.current.isbn.value);
        formData.append("pages", formRef.current.pages.value);
        formData.append("publicationDate", formRef.current.publicationDate.value);
        formData.append("description", formRef.current.description.value);
        formData.append("rentalPrice", formRef.current.rentalPrice.value);
        formData.append("authorNames", formRef.current.authorNames.value);
        formData.append("genreNames", formRef.current.genreNames.value);

        // Lấy file từ input type="file"
        formData.append("coverImageUrl", coverImageInputRef.current.files[0]);
        formData.append("epubFileUrl", epubFileInputRef.current.files[0]);

        // In ra FormData để kiểm tra (chỉ để debug)
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        const token = localStorage.getItem("token");
        const url = "http://127.0.0.1:8081/management/book/create";
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        try {
            const res = await apiRequest(url, "POST", headers, formData);
            if (res.code === 200) {
                onClose();
                window.location.reload();
            } else {
                onClose();
                setMessageFromChild(res.message);
            }
        } catch (error) {
            setMessageFromChild(error.message); // Truyền thông báo lỗi ra component cha
            // window.location.replace('/admin')
        }
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
                        <form action="#" ref={formRef}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Tên Sách
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        required=""
                                        defaultValue="Captain BloodCaptain Blood"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="publisher"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Nhà xuất bản
                                    </label>
                                    <input
                                        type="text"
                                        name="publisher"
                                        id="publisher"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        required=""
                                        defaultValue="Houghton Mifflin Company
"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="publicationDate"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Ngày xuất bản
                                    </label>
                                    <input
                                        type="date"
                                        name="publicationDate"
                                        id="publicationDate"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        required=""
                                        defaultValue="1922-07-29"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="isbn"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        ISBN
                                    </label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        id="isbn"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        required=""
                                        defaultValue="2852081113"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="pages"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Số trang
                                    </label>
                                    <input
                                        type="text"
                                        name="pages"
                                        id="pages"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                        defaultValue="452"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="rentalPrice"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Phí mượn
                                    </label>
                                    <input
                                        type="text"
                                        name="rentalPrice"
                                        id="rentalPrice"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                        defaultValue="0"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="authorNames"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Tác giả
                                    </label>
                                    <input
                                        type="text"
                                        name="authorNames"
                                        id="authorNames"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                        defaultValue="Rafael Sabatini"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="genreNames"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Thể loại
                                    </label>
                                    <input
                                        type="text"
                                        name="genreNames"
                                        id="genre"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                        defaultValue="Action,Adventure"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="coverImageUrl"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Thêm ảnh bìa
                                    </label>
                                    <input
                                        type="file"
                                        ref={coverImageInputRef}
                                        name="coverImageUrl"
                                        id="coverImageUrl"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="epubFileUrl"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Epub File
                                    </label>
                                    <input
                                        ref={epubFileInputRef}
                                        type="file"
                                        name="epubFileUrl"
                                        id="epubFileUrl"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                        required=""
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Nội dung
                                    </label>
                                    <textarea
                                        maxLength="1000"
                                        name="description"
                                        id="description"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Modal footer */}
                    <div className="items-center p-6 rounded-b border-t border-gray-200">
                        <button
                            className="text-white rounded-lg bg-gradient-to-br from-pink-500 to-voilet-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform text-sm px-5 py-2.5 text-center"
                            type="submit"
                            onClick={handleSubmit}
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
AddBookModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setMessageFromChild: PropTypes.func.isRequired
};
export default AddBookModal;