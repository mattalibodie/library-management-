import Sidebar from "../components/Sidebar.jsx";
import {useEffect} from "react";
import {Outlet} from "react-router";
const AdminLayout = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        const authenticate =  () => {
            const roles = userData.roles;
            roles.map((role) => {
                if(role !== "ADMIN"){
                    window.location.replace("/error")
                }
            })
        }
        authenticate()

    });

    const username = userData.username;
    return(
        <div className="admin-layout">
            <Sidebar username={username} />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}
export default AdminLayout;