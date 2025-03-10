import { useEffect, useState } from "react";
import ApiRequest from "../../api/apiRequest.js";
import {useNavigate, useParams } from "react-router-dom";


const BookDetail = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8081/library/book/id=" + id;
      const headers = new Headers();
      const response = await ApiRequest(url, "GET", headers, null);
      if (response && response.result) {
        setBook(response.result);
      } else {
        window.location.replace("/error");
      }
    };
    fetchData();
  }, [id]);

  const authors = book.authors;
  const genres = book.genres;

  const handleCheckout = () => {
    localStorage.setItem("checkoutBook", JSON.stringify(book))
    navigate(`/book/${id}/checkout`);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-row md:grid-cols-3">
          <div className="">
            <img
              src={book.coverImageUrl}
              alt=""
              className="h-[70%] object-cover mx-auto"
            />
          </div>
          <div className="col-span-2 ml-10">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <div className="flex text-gray-600 text-sm">
              <p>Tác giả:&nbsp;</p>
              {authors &&
                authors.map((author) => <p key={author.id}>{author.name}</p>)}
            </div>
            <div className="flex text-gray-600 text-sm">
              <p>Thể loại:&nbsp;</p>
              {genres &&
                genres.map((genres) => <p key={genres.id}>{genres.name}</p>)}
            </div>
            <h2 className="text-xl font-semibold mt-4">Nội dung</h2>
            <p className="flex text-base text-black">{book.description}</p>
            <div className="flex flex-wrap mt-4 text-gray-600 text-sm">
              <div className="flex-1">
                <span className="font-medium">Số trang:&nbsp;</span>{" "}
                {book.pages}
              </div>
              <div className="flex-1">
                <span className="font-medium">Ngày xuất bản:&nbsp;</span>
                {book.publicationDate}
              </div>
              <div className="flex-1">
                <span className="font-medium">Nhà xuất bản:&nbsp;</span>
                {book.publisher}
              </div>
            </div>
            <div className="mt-10 flex flex-row items-start gap-5">
              <button 
                onClick={() => handleCheckout()}
                className="bg-yellow-400 text-black px-4 py-2 rounded-3xl hover:cursor-pointer"
              >
                Mượn sách
              </button>
              <p className=" antialiased tracking-normal text-3xl font-sans  font-semibold leading-snug text-blue-gray-900">
                {book.rentalPrice}đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookDetail;
