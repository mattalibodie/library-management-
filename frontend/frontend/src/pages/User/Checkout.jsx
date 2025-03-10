const Checkout = () => {
    const book = JSON.parse(localStorage.getItem('checkoutBook'));
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const { id, title, publisher, coverImageUrl, authors, rentalPrice } = book;
  return (
    <div className="min-h-screen bg-cream-100 text-brown-900">
      <div className="flex p-6 max-w-5xl mx-auto">
        <div className="w-1/2 pr-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-brown-300 pb-2">PHƯƠNG THỨC THANH TOÁN</h3>
          <div className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-cream-50">
            <div className="flex items-center">
              <span className="text-2xl mr-2">📖</span>
              <span>Số dư tài khoản của bạn <span className="text-green-600">{userData.balance}đ</span></span>
            </div>
          </div>

          {/* Other Payment Methods */}
          <div className="border-t border-brown-300 pt-4">
            <h4 className="text-md font-semibold mb-2">Không đủ số dư tài khoản để thanh toán?</h4>
          </div>
          
        </div>

        {/* Order Summary */}
        <div className="w-1/2 pl-6">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-brown-300 pb-2">TÓM TẮT ĐƠN HÀNG</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Book Image and Details */}
            <div className="flex items-center mb-4">
              <img
                src={coverImageUrl}
                alt="Book Cover"
                className="w-24 h-36 mr-4 rounded"
              />
              <div>
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-sm text-gray-600">{publisher}</p>
                <p className="text-sm text-gray-600">{authors.map((authors) => `${authors.name}, `)}</p>
              </div>
            </div>


            <div className="space-y-2">
              <p>Phí mượn: <span className="font-semibold">{rentalPrice === 0 ? "Miễn phí" : `VNĐ ${rentalPrice}`}</span></p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <p className="text-base">
                  Đồng ý với các điều khoản và quyền sở hữu {' '}
                  <a href="#" className="text-blue-600 underline">điều khoản</a>.
                </p>
              </label>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="w-2/5 py-2 bg-yellow-200 text-brown-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-200">
                Quay Lại
              </button>
              <button className="w-3/5 py-2 bg-yellow-200 text-brown-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-200">
                XÁC NHẬN ĐƠN HÀNG
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;