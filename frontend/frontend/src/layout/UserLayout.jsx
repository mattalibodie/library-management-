import Navbar from "../components/Navbar.jsx";
import {Outlet} from "react-router";
import UserDropDown from "../components/UserDropDown.jsx";
import PropTypes from 'prop-types';
export const UserLayout = ({token}) => {
    return(
        <div className="block">
            <Navbar token={token}>{UserDropDown()}</Navbar>
            <div className="main-content mt-24">
                <Outlet/>
            </div>
        </div>
    );
};

UserLayout.propTypes = {
    token: PropTypes.string.isRequired,
};
export default UserLayout;
