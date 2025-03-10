import { BrowserRouter, Routes, Route} from "react-router-dom";
import useToken from "./components/useToken";
import Login from "./components/login";

import Logout from "./components/Logout";
import ErrorPage from "./pages/ErrorPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import User from "./pages/Admin/User.jsx";
import Books from "./pages/Admin/Books.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import Main from "./pages/User/Main.jsx";
import EpubReader from "./components/EpubReader.jsx";
import BookDetail from "./pages/User/BookDetail.jsx";
import Checkout from "./pages/User/Checkout.jsx";
export const App = () => {
    const { token, setToken } = useToken();



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLayout token={token}/>} >
                    <Route index element={<Main />} />
                    <Route path="/book/:id" element={<BookDetail/>}/>
                    <Route path="/book/:id/checkout" element={<Checkout/>} />
                </Route>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/admin" element={<PrivateRoute token={token}><AdminLayout /></PrivateRoute>} >
                    <Route index="users" element={<PrivateRoute token={token}><User /></PrivateRoute>} />
                    <Route path="books" element={<PrivateRoute token={token}><Books /></PrivateRoute>} />
                </Route>
                <Route path="/test" element={<EpubReader/>}/>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;