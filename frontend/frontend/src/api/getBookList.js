import apiRequest from "./apiRequest";

export const getBookList = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:8081/management/book/list";
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    return apiRequest(url, "GET", headers, null);
}