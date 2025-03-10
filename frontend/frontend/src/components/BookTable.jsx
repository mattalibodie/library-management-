import PropTypes from "prop-types";
import {Link} from "react-router";

export const BookTable = ({bookLists, setEditBookModalOpen, setDeleteBookModalOpen}) => {
    const bookList = bookLists.result;
    return (
        <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
            <div className="overflow-x-auto rounded-2xl">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Tên Sách
                                </th>
                                <th
                                    scope="col"
                                    className="hidden p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Id
                                </th>
                                <th
                                    scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Tác giả
                                </th>
                                <th
                                    scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Thể loại
                                </th>
                                <th
                                    scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Phí mượn
                                </th>
                                <th
                                    scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                                >
                                    Epub file
                                </th>

                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookList && bookList.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-100">
                                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap lg:p-5 lg:mr-0">
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">
                                                    <Link to="/book/${book.id}" >{book.title}</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
                                            {book.authors.map((author) => (
                                                <p key={author.id}>{author.name}</p>
                                            ))}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
                                            {book.genres.map((genre) => (
                                                <p key={genre.id}>{genre.name}</p>
                                            ))}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
                                            {book.rentalPrice}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
                                            <a href={book.epubFileUrl} className="text-blue-500 underline">Link</a>
                                        </td>
                                        <td className="p-4 space-x-2 whitespace-nowrap lg:p-5 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setEditBookModalOpen(book)}
                                                data-modal-toggle="user-modal"
                                                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all"
                                            >
                                                <svg
                                                    className="mr-2 w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                Chỉnh sửa
                                            </button>
                                            <button
                                                onClick={() => setDeleteBookModalOpen(book)}
                                                type="button"
                                                data-modal-toggle="delete-user-modal"
                                                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                                            >
                                                <svg
                                                    className="mr-2 w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
BookTable.propTypes = {
    bookLists: PropTypes.array.isRequired,
    setEditBookModalOpen: PropTypes.func.isRequired,
    setDeleteBookModalOpen: PropTypes.func.isRequired,

};
