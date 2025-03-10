// DeleteUserModal.js
import PropTypes from 'prop-types'
import apiRequest from "../../api/apiRequest.js";

const DeleteBookModal = ({ isOpen, onClose, bookId, setMessageFromChild}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const url = "http://127.0.0.1:8081/management/book/delete/id=" + e.currentTarget.id;
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        apiRequest(url, "DELETE", headers, null).then((response) => {
            if(response.status === 200) {
                onClose();
                window.location.reload();
            }
            else{
                onClose();
                setMessageFromChild(response.message);
            }
        });
    }
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex"
            id="user-modal"
            aria-modal="true"
            role="dialog"
            aria-hidden="true"
        >
            <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                {/* Modal content */}
                <div className="relative bg-white rounded-2xl shadow-lg">
                    {/* Modal header */}
                    <div className="p-6 space-y-6">
                        <div className="p-6 pt-0 text-center">
                            <svg className="mx-auto mb-4 w-14 h-14 text-gray-500 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có chắc muốn xoá không?</h3>
                            <button
                                id={bookId}
                                data-modal-toggle="popup-modal"
                                type="button"
                                onClick={handleDelete}
                                className="text-white bg-gradient-to-br from-red-400 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform">
                                Đồng ý
                            </button>
                            <button
                                onClick={onClose}
                                data-modal-toggle="popup-modal"
                                type="button"
                                className="text-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-400 opacity-70  fixed inset-0 z-[-1]"></div>
        </div>
    );
};
DeleteBookModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired,
    setMessageFromChild : PropTypes.func.isRequired,
}; 
export default DeleteBookModal;