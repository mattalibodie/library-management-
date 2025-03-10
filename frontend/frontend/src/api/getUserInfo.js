import apiRequest from "./apiRequest";

export const getUserInfo = async () => {    
    const token = localStorage.getItem("token");
    const url = "http://localhost:8081/user/me";
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    return apiRequest(url, "GET", headers, null);
}