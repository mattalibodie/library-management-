import apiRequest from "./apiRequest";
import redirectToLogin from "./redirectToLogin";

export  const refreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const url = "http://localhost:8000/auth/refresh";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = { refresh: refreshToken };
    const response = apiRequest(url, "POST", headers, body);
    response.then((data) =>{
        if(data.result.token){
            localStorage.setItem("token", data.result.token);
        }
        else
            redirectToLogin;
    })
};
export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};
export default refreshToken;