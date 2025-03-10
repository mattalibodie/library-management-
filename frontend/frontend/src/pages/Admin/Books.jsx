import HomeSVG from "../../assets/home.svg";
import {useEffect, useState} from "react";
import AddBookModal from "../../components/modal/AddBookModal.jsx";
import {BookTable} from "../../components/BookTable.jsx";
import {getBookList} from "../../api/getBookList.js";
import DeleteBookModal from "../../components/modal/DeleteBookModal.jsx";
import EditBookModal from "../../components/modal/EditBookModal.jsx";
import ErrorMessageModal from "../../components/modal/errorMessageModal.jsx";


export const Books = () => {
    const [messageFromChild, setMessageFromChild] = useState("");
    const [errorMessageModal, setErrorMessageModalOpen] = useState(false);
    const [addBookModal, setAddBookModalOpen] = useState(false);
    const [deleteBookModal, setDeleteBookModalOpen] = useState(false);
    const [editBookModal, setEditBookModalOpen] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const response = await getBookList();
                setBookList(response);
            } catch (error) {
                console.error("Failed to fetch user list", error);
            }
        };
        fetchBookList();
    }, []);

    useEffect(() => {
        const handleErrorMessageModal = () => {
            if (messageFromChild)
                setErrorMessageModalOpen(true);
            else
                setErrorMessageModalOpen(false);
        }
        handleErrorMessageModal();
    }, [messageFromChild])

    const handleDeleteBook = (book) => {
        setSelectedBook(book);
        setDeleteBookModalOpen(true);
    }
    const handleEditBook = (book) => {
        setSelectedBook(book);
        setEditBookModalOpen(true);
    }


    return (
        <>
            <main className="h-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                <div
                    className="block justify-between items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
                    <div className="mb-1 w-full">
                        <div className="mb-4">
                            <nav className="flex mb-5" aria-label="">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                    <a href='/admin' className="inline-flex items-center">
                                        <img className="w-8 h-8" src={HomeSVG} alt=""/>
                                    </a>
                                    Home
                                    <li>
                                        <div className="flex items-center">
                                            <svg
                                                className="w-6 h-6 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <a
                                                href="#"
                                                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                                            >
                                                Book
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <svg
                                                className="w-6 h-6 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span
                                                className="ml-1 text-sm font-medium text-gray-400 md:ml-2"
                                                aria-current="page"
                                            >
                                            List
                                            </span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                All Book
                            </h1>
                        </div>
                        <div className="sm:flex">
                            <div className="hidden items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0">
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative mt-1 lg:w-64 xl:w-96">
                                        <input
                                            type="text"
                                            name="email"
                                            id="users-search"
                                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                                            placeholder="Search for users"
                                        />
                                    </div>
                                </form>
                                <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0"></div>
                            </div>
                            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                <button
                                    onClick={() => {
                                        setAddBookModalOpen(true)
                                    }}
                                    type="button"
                                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br bg-gray-600 sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                                >
                                    <svg
                                        className="mr-2 -ml-1 w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Thêm Sách
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <BookTable bookLists={bookList}
                            setDeleteBookModalOpen={handleDeleteBook}
                           setEditBookModalOpen={handleEditBook}/>
                <div
                    className="items-center p-4 my-4 mx-4 bg-white rounded-2xl shadow-xl shadow-gray-200 sm:flex sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <a
                            href="#"
                            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <span className="text-sm font-normal text-gray-500">
              Showing <span className="font-semibold text-gray-900">1-20</span>{" "}
                            of <span className="font-semibold text-gray-900">2290</span>
            </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <a
                            href="#"
                            className="inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center bg-gradient-to-br from-dark-700 to-dark-900 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        >
                            <svg
                                className="mr-1 -ml-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Previous
                        </a>
                        <a
                            href="#"
                            className="inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        >
                            Next
                            <svg
                                className="ml-1 -mr-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
                {/* Modal */}
                <AddBookModal
                    isOpen={addBookModal}
                    setMessageFromChild={setMessageFromChild}
                    onClose={() => setAddBookModalOpen(false)}
                ></AddBookModal>
                <EditBookModal
                    isOpen={editBookModal}
                    onClose={() => setEditBookModalOpen(false)}
                    bookData={selectedBook}
                    setMessageFromChild={setMessageFromChild}
                />
                <DeleteBookModal
                    isOpen={deleteBookModal}
                    onClose={() => setDeleteBookModalOpen(false)}
                    bookId={selectedBook?.id}
                    setMessageFromChild={setMessageFromChild}/>
                <ErrorMessageModal
                    isOpen={errorMessageModal}
                    errorMessage={messageFromChild}
                    onClose={() => {
                        setMessageFromChild('');
                    }}
                ></ErrorMessageModal>
            </main>
        </>
    );
}
export default Books;