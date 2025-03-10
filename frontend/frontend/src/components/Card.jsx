import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const Card = ({ book }) => {
  // Handle cases where book or its properties might be undefined
  if (!book) {
    return <div>Error: Book data not found.</div>;
  }

  const { id, title, coverImageUrl, authors, description, rentalPrice } = book;
  return (
    <div
      key={id}
 
      className="max-w-[360px] h-full relative flex flex-col bg-clip-border p-6 rounded-xl bg-white text-gray-700 hover:cursor-pointer"
    >
      <div className="max-h-[420px] relative bg-clip-border rounded-xl overflow-hidden bg-gray-900 text-white shadow-gray-900/20 shadow-lg mx-0 mt-0 mb-4">
        <img
          alt={title || "Book Cover"} // Fallback alt text if title is undefined
          loading="lazy"
          decoding="async"
          className="object-cover object-center w-full h-full"
          src={coverImageUrl} 
        />
      </div>
      <div className="p-0 flex flex-col justify-between h-full">
        <div>
          {authors &&
            authors.length > 0 &&
            authors.map((author) => (
              <p
                key={author.id || author.name} // Use author.name as fallback key
                className="block antialiased font-sans font-light text-blue-500 mb-2 text-xs !font-semibold"
              >
                {author.name}
              </p>
            ))}

          <Link to={`/book/${id}`}>
            <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-blue-gray-900 mb-3 font-bold normal-case xl:w-64 hover:text-blue-500 transition-colors">
              {title}
            </h5>
          </Link>
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-4 font-normal !text-gray-500 line-clamp-3">
            {description ? description : "Không có nội dung"}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
            {rentalPrice === 0 ? "Miễn phí" : rentalPrice + "đ"}
          </h5>
          <Link
            to={`/book/${id}`}
            className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:cursor-pointer hover:bg-blue-500 transition-colors"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    coverImageUrl: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })
    ),
    description: PropTypes.string,
    rentalPrice: PropTypes.number.isRequired,
  }),
};
export default Card;
