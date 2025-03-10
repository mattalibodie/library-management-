import Card from "../../components/Card.jsx";
import {useEffect, useState} from "react";
import apiRequest from "../../api/apiRequest.js";

const Main = () => {

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://127.0.0.1:8081/library/list"
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const data = await apiRequest(url, "GET", headers, null);
            setBookList(data.result);
        }
        fetchData();
    },[])
    return (
        <>
            <div className="container px-10 grid grid-cols-1 items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                {bookList.map((book) => (
                    <div key={book.id}>
                        <Card book={book}></Card>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Main;