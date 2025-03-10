import apiRequest from "../api/apiRequest";
import { useEffect } from "react";
import redirectToLogin from "../api/redirectToLogin";

export const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      const url = "http://127.0.0.1:8081/auth/logout";
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      const body = { token: token };
      try {
        const response = await apiRequest(url, "POST", headers, body);
        if (response.code === 200) localStorage.removeItem("token");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    logout().then(redirectToLogin);
  }, []);
};

export default Logout;
