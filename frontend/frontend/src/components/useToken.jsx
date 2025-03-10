import {useState} from "react";
import {jwtDecode} from "jwt-decode"; // You need to install this package
import validateToken from "../api/validateToken";

export const useToken = () => {
  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;    
    return decodedToken.exp < currentTime;
  };
  const isTokenValidate = async (token) =>{
    return await validateToken(token)
  }

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return null;

    const isValidate = isTokenValidate(tokenString)
    if(!isValidate){
      return null;
    }

    const isExpired = isTokenExpired(tokenString);
    if (isExpired) {
      return null;
    }
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  return { setToken: saveToken, token };
};

export default useToken;
