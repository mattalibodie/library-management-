import apiRequest from "./apiRequest";

export const getUserList = async () =>{
    const token = localStorage.getItem("token")
    const url = "http://localhost:8081/user/showlist"
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    return apiRequest(url, "GET", headers, null);
}
export default getUserList;