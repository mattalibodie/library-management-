import apiRequest from "./apiRequest";

export const loginRequest = (username, password) => {
  const url = "http://localhost:8081/auth/login";
  const body = { username: username, password: password };
  const headers = new Headers();
  headers.append("Content-Type", "application/json"); 
  return apiRequest(url, "POST", headers, body);
};

export default loginRequest;
