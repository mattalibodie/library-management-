// Change fee
import PropTypes from 'prop-types'
import {useState} from "react";
import apiRequest from "../../api/apiRequest.js";
const EditBookModal = ({ isOpen, onClose, bookData, setMessageFromChild }) => {
    const [rentalPrice, setRentalPrice] = useState("");

    const handleEditUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const url = "http://127.0.0.1:8081/management/book/fee/change";
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        const body = {"id": bookData.id, "rentalPrice" : rentalPrice};
        try {
            const res = await apiRequest(url, "PUT", headers, body);
            if (res.code === 200) {
                onClose();
                window.location.reload();
            } else {
                setMessageFromChild(res.message);

            }
        } catch (error) {
            setMessageFromChild(error);
        }
        onClose();
    };
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
                    <div className="flex justify-between items-start p-5 rounded-t border-b">
                        <h3 className="text-xl font-semibold">Edit user</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="edit-user-modal"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="balance"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                         Thay đổi phí mượn sách
                                    </label>
                                    <input
                                        onChange={(e) => setRentalPrice(e.target.value)}
                                        type="number"
                                        name="rentalFee"
                                        id="rentalFee"
                                        className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                        placeholder="0"
                                        required=""
                                        defaultValue={bookData?.rentalPrice}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Modal footer */}
                    <div className="items-center p-6 rounded-b border-t border-gray-200">
                        <button
                            className="text-white rounded-lg bg-gradient-to-br from-pink-500 to-voilet-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform text-sm px-5 py-2.5 text-center"
                            onClick={handleEditUser}
                        >
                            Save all
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-400 opacity-70  fixed inset-0 z-[-1]"></div>
        </div>
    );
};

EditBookModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bookData: PropTypes.shape({
        balance: PropTypes.number
    }).isRequired,
    setMessageFromChild: PropTypes.func.isRequired,
};
export default EditBookModal;